import { useState, useEffect } from "react";
import { getRconServers, getRconPlayers } from "../../lib/api";
import type { RconPlayer } from "../../lib/api";
import { Users, Activity, Zap } from "lucide-react";

interface AggregatedStats {
	totalPlayers: number;
	avgHealth: number;
	avgPing: number;
	maxPing: number;
	minHealth: number;
}

export default function PlayerStatsWidget() {
	const [players, setPlayers] = useState<RconPlayer[]>([]);
	const [stats, setStats] = useState<AggregatedStats | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const fetchPlayerData = async () => {
		try {
			setError(null);
			const serversRes = await getRconServers();
			const allPlayers: RconPlayer[] = [];

			const settled = await Promise.allSettled(
				serversRes.servers.map((server) => getRconPlayers(server.id))
			);

			settled.forEach((result) => {
				if (result.status === "fulfilled") {
					allPlayers.push(...result.value.players);
				}
			});

			setPlayers(allPlayers);

			// Calculate aggregated stats
			if (allPlayers.length > 0) {
				const totalHealth = allPlayers.reduce((sum, p) => sum + p.health, 0);
				const totalPing = allPlayers.reduce((sum, p) => sum + p.ping, 0);
				const maxPing = Math.max(...allPlayers.map((p) => p.ping));
				const minHealth = Math.min(...allPlayers.map((p) => p.health));

				setStats({
					totalPlayers: allPlayers.length,
					avgHealth: Math.round(totalHealth / allPlayers.length),
					avgPing: Math.round(totalPing / allPlayers.length),
					maxPing,
					minHealth,
				});
			} else {
				setStats({
					totalPlayers: 0,
					avgHealth: 0,
					avgPing: 0,
					maxPing: 0,
					minHealth: 0,
				});
			}

			setLoading(false);
		} catch (err) {
			setError(err instanceof Error ? err.message : "Failed to load player stats");
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchPlayerData();
		const interval = setInterval(fetchPlayerData, 10000); // Update every 10 seconds
		return () => clearInterval(interval);
	}, []);

	if (error && !stats) {
		return null; // Silently fail, don't break the hero
	}

	const healthColor = (health: number) => {
		if (health > 75) return "bg-green-500";
		if (health > 50) return "bg-yellow-500";
		if (health > 25) return "bg-orange-500";
		return "bg-red-500";
	};

	const pingColor = (ping: number) => {
		if (ping < 50) return "text-green-400";
		if (ping < 100) return "text-yellow-400";
		if (ping < 150) return "text-orange-400";
		return "text-red-400";
	};

	const formatUptime = (seconds: number) => {
		const hours = Math.floor(seconds / 3600);
		const minutes = Math.floor((seconds % 3600) / 60);
		if (hours > 0) {
			return `${hours}h ${minutes}m`;
		}
		return `${minutes}m`;
	};

	return (
		<div className="mt-16 animate-slide-up" style={{ animationDelay: "0.4s", animationFillMode: "both" }}>
			<div className="rounded-xl border border-ark-600/30 bg-volcanic-950/60 backdrop-blur-md p-6 shadow-2xl">
				{/* Summary Stats */}
				{stats && (
					<div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
						<StatCard
							icon={<Users className="w-5 h-5" />}
							label="Online Players"
							value={stats.totalPlayers}
							color="orange"
						/>
						<StatCard
							icon={<Activity className="w-5 h-5" />}
							label="Avg Health"
							value={`${stats.avgHealth}%`}
							color={stats.avgHealth > 50 ? "green" : "orange"}
						/>
						<StatCard
							icon={<Zap className="w-5 h-5" />}
							label="Avg Ping"
							value={`${stats.avgPing}ms`}
							color={stats.avgPing < 100 ? "green" : "orange"}
						/>
						<StatCard
							icon={<Activity className="w-5 h-5" />}
							label="Max Ping"
							value={`${stats.maxPing}ms`}
							color={stats.maxPing < 150 ? "green" : "orange"}
						/>
					</div>
				)}

				{/* Individual Player Cards */}
				{players.length > 0 && (
					<div className="mt-6 pt-6 border-t border-volcanic-700">
						<h3 className="text-sm font-semibold text-volcanic-300 mb-4 uppercase tracking-wider">
							Live Players
						</h3>
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 max-h-64 overflow-y-auto">
							{players.map((player, idx) => (
								<div
									key={`${player.steam_id}-${idx}`}
									className="p-3 rounded-lg bg-volcanic-900/50 border border-volcanic-700/50 hover:border-ark-600/50 transition-all"
								>
									{/* Health Bar */}
									<div className="mb-2">
										<div className="flex justify-between items-center mb-1">
											<span className="text-xs text-volcanic-400">Health</span>
											<span className="text-xs font-semibold text-volcanic-300">{player.health}%</span>
										</div>
										<div className="w-full h-1.5 bg-volcanic-800 rounded-full overflow-hidden">
											<div
												className={`h-full ${healthColor(player.health)} transition-all duration-300`}
												style={{ width: `${player.health}%` }}
											/>
										</div>
									</div>

									{/* Ping */}
									<div className="flex justify-between items-center text-xs mb-2">
										<span className="text-volcanic-400">Ping</span>
										<span className={`font-semibold ${pingColor(player.ping)}`}>{player.ping}ms</span>
									</div>

									{/* Connection Time */}
									<div className="flex justify-between items-center text-xs">
										<span className="text-volcanic-400">Active</span>
										<span className="text-volcanic-300 font-medium">{formatUptime(player.connected_seconds)}</span>
									</div>
								</div>
							))}
						</div>
					</div>
				)}

				{/* Loading State */}
				{loading && (
					<div className="flex items-center justify-center py-8">
						<div className="flex gap-1">
							<div className="w-2 h-2 rounded-full bg-ark-500 animate-bounce" style={{ animationDelay: "0s" }} />
							<div className="w-2 h-2 rounded-full bg-ark-500 animate-bounce" style={{ animationDelay: "0.2s" }} />
							<div className="w-2 h-2 rounded-full bg-ark-500 animate-bounce" style={{ animationDelay: "0.4s" }} />
						</div>
					</div>
				)}

				{/* No Players State */}
				{!loading && players.length === 0 && (
					<div className="text-center py-8">
						<p className="text-sm text-volcanic-400">No players currently online</p>
					</div>
				)}

				{/* Live Indicator */}
				<div className="mt-4 flex items-center justify-center gap-2">
					<span className="relative flex h-2 w-2">
						<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-ark-400 opacity-75" />
						<span className="relative inline-flex rounded-full h-2 w-2 bg-ark-500" />
					</span>
					<span className="text-xs text-ark-400 font-medium">Live updates every 10s</span>
				</div>
			</div>
		</div>
	);
}

function StatCard({
	icon,
	label,
	value,
	color = "orange",
}: {
	icon: React.ReactNode;
	label: string;
	value: string | number;
	color?: "ark" | "green" | "orange";
}) {
	const colorClasses = {
		ark: "text-ark-400 bg-ark-500/10 border-ark-600/30",
		green: "text-green-400 bg-green-500/10 border-green-600/30",
		orange: "text-orange-400 bg-orange-500/10 border-orange-600/30",
	};

	const classes = colorClasses[color];

	return (
		<div className={`p-3 rounded-lg border ${classes}`}>
			<div className="flex items-center gap-2 mb-2">
				{icon}
			</div>
			<div className="text-lg font-bold text-heading">{value}</div>
			<div className="text-xs text-volcanic-400 mt-1">{label}</div>
		</div>
	);
}
