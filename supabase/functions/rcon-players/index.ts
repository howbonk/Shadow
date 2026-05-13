import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers":
    "Content-Type, Authorization, X-Client-Info, Apikey",
};

function jsonResponse(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

function errorResponse(status: number, message: string, detail?: string) {
  return jsonResponse({ error: message, detail }, status);
}

// Source - https://stackoverflow.com/a/6313008
// Posted by powtac, modified by community. See post 'Timeline' for change history
// Retrieved 2026-05-12, License - CC BY-SA 4.0

function toHHMMSS(sec_num: string | number): string {
    var sec_num = parseInt(sec_num.toString(), 10); 
    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    return hours+':'+minutes+':'+seconds;
}


// ------------------------------------------------------------
// Rust WebSocket RCON
//
// Rust's RCON uses WebSockets, not Source/TCP RCON.
// URL format:  ws://host:port/password
// Send:        { Identifier: <int>, Message: "<command>", Name: "WebRcon" }
// Receive:     { Identifier: <int>, Message: "<response>", Type: "Generic", Stacktrace: "" }
//
// Rust can broadcast unsolicited messages (player join/leave, chat, etc.)
// with Identifier = -1. We wait for the packet that echoes back our
// Identifier to distinguish the command response from broadcast noise.
// ------------------------------------------------------------

interface RconMessage {
  Identifier: number;
  Message: string;
  Type: string;
  Stacktrace?: string;
}

function rconExec(
  host: string,
  port: number,
  password: string,
  command: string,
  timeoutMs = 10000
): Promise<string> {
  return new Promise((resolve, reject) => {
    // Use a random positive identifier so we can match the response
    const id = Math.floor(Math.random() * 90000) + 10000;
    let settled = false;

    const settle = (fn: () => void) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      fn();
    };

    const timer = setTimeout(() => {
      settle(() => reject(new Error(`RCON timed out after ${timeoutMs}ms`)));
      try { ws.close(); } catch { /* ignore */ }
    }, timeoutMs);

    let ws: WebSocket;
    try {
      ws = new WebSocket(`ws://${host}:${port}/${password}`);
    } catch (e) {
      clearTimeout(timer);
      reject(new Error(`WebSocket URL error: ${e instanceof Error ? e.message : String(e)}`));
      return;
    }

    ws.onopen = () => {
      try {
        ws.send(JSON.stringify({ Identifier: id, Message: command, Name: "WebRcon" }));
      } catch (e) {
        settle(() => reject(new Error(`Send failed: ${e instanceof Error ? e.message : String(e)}`)));
        ws.close();
      }
    };

    ws.onmessage = (event: MessageEvent) => {
      let msg: RconMessage;
      try {
        msg = JSON.parse(event.data as string);
      } catch {
        // Rust occasionally sends non-JSON keep-alives; skip them
        return;
      }

      // Only resolve on OUR identifier; ignore broadcast noise (id = -1)
      if (msg.Identifier === id) {
        settle(() => resolve(msg.Message ?? ""));
        ws.close();
      }
    };

    ws.onerror = () => {
      // onclose fires right after with a code, which carries more detail
    };

    ws.onclose = (event: CloseEvent) => {
      settle(() =>
        reject(
          new Error(
            `WebSocket closed${event.code ? ` (code ${event.code})` : ""}${
              event.reason ? `: ${event.reason}` : ""
            }. Check host, port, and password.`
          )
        )
      );
    };
  });
}

// ------------------------------------------------------------
// Rust / Carbon player list parser
//
// Carbon's `playerlist` returns a JSON array with rich fields.
// We map it to a clean, flat structure and strip noise (IPs, positions, etc.)
// ------------------------------------------------------------

interface RconPlayer {
  steam_id: string;
  name: string;
  ping: number;
  health: number;
  connected_seconds: number;
  connected_hhmmss: string;
  team_id: number;
  is_muted: boolean;
}

interface CarbonPlayer {
  SteamID: string;
  DisplayName: string;
  Ping: number;
  Health: number;
  ConnectedSeconds: number;
  TeamID: number;
  IsMuted: boolean;
  ViolationLevel: number;
  CurrentLevel: number;
}

function parsePlayerList(response: string): RconPlayer[] {
  const trimmed = response.trim();
  if (!trimmed || trimmed === "[]") return [];

  let raw: CarbonPlayer[];
  try {
    raw = JSON.parse(trimmed);
  } catch {
    throw new Error(`playerlist response was not valid JSON: ${trimmed.slice(0, 200)}`);
  }

  return raw.map((p) => ({
    steam_id: p.SteamID,
    name: p.DisplayName,
    ping: p.Ping,
    health: Math.round(p.Health),
    connected_seconds: p.ConnectedSeconds,
    connected_hhmmss: toHHMMSS(p.ConnectedSeconds),
    team_id: p.TeamID,
    is_muted: p.IsMuted,
    violation_level: p.ViolationLevel,
    current_level: p.CurrentLevel,
  }));
}

// ------------------------------------------------------------
// Edge function entry point
// ------------------------------------------------------------

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const action = url.searchParams.get("action");

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // ---- servers ----
    if (action === "servers") {
      const { data, error } = await supabase
        .from("rcon_servers")
        .select("id, map_name, sort_order")
        .eq("enabled", true)
        .order("sort_order", { ascending: true });

      if (error) return errorResponse(500, error.message);

      return jsonResponse({
        servers: (data || []).map((s: { id: string; map_name: string }) => ({
          id: s.id,
          name: s.map_name,
        })),
      });
    }

    // ---- players ----
    if (action === "players") {
      const serverId = url.searchParams.get("server");
      if (!serverId) return errorResponse(400, "server parameter is required");

      const { data: server, error } = await supabase
        .from("rcon_servers")
        .select("host, rcon_port, rcon_password")
        .eq("id", serverId)
        .eq("enabled", true)
        .maybeSingle();

      if (error) return errorResponse(500, error.message);
      if (!server) return errorResponse(404, "Server not found");

      const debug = url.searchParams.get("debug") === "1";

      try {
        const response = await rconExec(
          server.host,
          server.rcon_port,
          server.rcon_password,
          "playerlist"
        );

        if (debug) {
          return jsonResponse({ raw: response, length: response.length });
        }

        const players = parsePlayerList(response);
        return jsonResponse({ players });
      } catch (err) {
        return errorResponse(502, "RCON failed", err instanceof Error ? err.message : String(err));
      }
    }

    // ---- test ----
    if (action === "test") {
      const serverId = url.searchParams.get("server");
      if (!serverId) return errorResponse(400, "server parameter is required");

      const { data: server, error: sErr } = await supabase
        .from("rcon_servers")
        .select("host, rcon_port, rcon_password")
        .eq("id", serverId)
        .eq("enabled", true)
        .maybeSingle();

      if (sErr) return errorResponse(500, sErr.message);
      if (!server) return errorResponse(404, "Server not found");

      const steps: Array<string | { alive: boolean }> = [];

      try {
        steps.push({ alive: true });
        steps.push(`Connecting via WebSocket`);
        const hostname = await rconExec(
          server.host,
          server.rcon_port,
          server.rcon_password,
          "server.hostname"
        );
        steps.push("WebSocket connected OK");
        steps.push("Auth OK");
        steps.push(hostname ? hostname : "Received empty hostname");
      } catch (e) {
        steps.push(`ERROR: ${e instanceof Error ? e.message : String(e)}`);
      }

      return jsonResponse({ steps });
    }

    return errorResponse(400, "Invalid action. Use 'servers', 'players', or 'test'");
  } catch (err) {
    const message = err instanceof Error ? err.message : "Internal server error";
    return errorResponse(500, message);
  }
});