import { useEffect, useRef, useState } from 'react';
import { Loader as Loader2, CircleAlert as AlertCircle, CircleCheck as CheckCircle2 } from 'lucide-react';
import { usePageTitle } from '../lib/usePageTitle';

const ORIGIN_KEY = 'steam_oauth_opener_origin';

export default function SteamOAuthCallbackPage() {
  usePageTitle('Steam');
  const [status, setStatus] = useState<'pending' | 'success' | 'error'>('pending');
  const [message, setMessage] = useState<string>('');
  const handledRef = useRef(false);

  useEffect(() => {
    if (handledRef.current) return;
    handledRef.current = true;

    const params = new URLSearchParams(window.location.search);
    const mode = params.get('openid.mode');
    const identity = params.get('openid.identity') || params.get('openid.claimed_id');
    const errorReason = params.get('openid.error') || params.get('openid.error_description');

    let targetOrigin = window.location.origin;
    try {
      const stored = window.sessionStorage.getItem(ORIGIN_KEY);
      if (stored) targetOrigin = stored;
    } catch {
      // ignore
    }

    if (mode === 'cancel') {
      setStatus('error');
      setMessage('Steam login was canceled.');
      try {
        window.opener?.postMessage({ type: 'steam-oauth', ok: false, error: 'User canceled Steam login' }, targetOrigin);
      } catch {
        // ignore
      }
      setTimeout(() => window.close(), 800);
      return;
    }

    if (mode !== 'id_res' || !identity) {
      setStatus('error');
      setMessage(errorReason || 'Invalid Steam OpenID response.');
      try {
        window.opener?.postMessage({ type: 'steam-oauth', ok: false, error: errorReason || 'Invalid response' }, targetOrigin);
      } catch {
        // ignore
      }
      setTimeout(() => window.close(), 800);
      return;
    }

    // Extract Steam ID from identity URL
    const match = identity.match(/\/openid\/id\/(\d+)/);
    if (!match) {
      setStatus('error');
      setMessage('Invalid Steam ID format.');
      try {
        window.opener?.postMessage({ type: 'steam-oauth', ok: false, error: 'Invalid Steam ID' }, targetOrigin);
      } catch {
        // ignore
      }
      setTimeout(() => window.close(), 800);
      return;
    }

    const steamId = match[1];
    if (!/^\d{17}$/.test(steamId)) {
      setStatus('error');
      setMessage('Invalid Steam ID.');
      try {
        window.opener?.postMessage({ type: 'steam-oauth', ok: false, error: 'Invalid Steam ID' }, targetOrigin);
      } catch {
        // ignore
      }
      setTimeout(() => window.close(), 800);
      return;
    }

    setStatus('success');
    setMessage(steamId);
    try {
      window.opener?.postMessage(
        {
          type: 'steam-oauth',
          ok: true,
          id: steamId,
        },
        targetOrigin,
      );
    } catch {
      // ignore
    }
    setTimeout(() => window.close(), 600);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-volcanic-900">
      <div className="max-w-md mx-auto px-4 text-center">
        <div className="w-16 h-16 rounded-full bg-ark-600/15 flex items-center justify-center mx-auto mb-6">
          {status === 'pending' && <Loader2 className="w-8 h-8 text-ark-500 animate-spin" />}
          {status === 'success' && <CheckCircle2 className="w-8 h-8 text-green-500" />}
          {status === 'error' && <AlertCircle className="w-8 h-8 text-red-500" />}
        </div>
        <h1 className="text-xl font-bold text-heading mb-2">Steam Login</h1>
        <p className="text-volcanic-400 mb-4">
          {status === 'pending' && 'Processing...'}
          {status === 'success' && 'Connected successfully!'}
          {status === 'error' && 'Connection failed.'}
        </p>
        {message && (
          <p className="text-sm text-volcanic-500">{message}</p>
        )}
      </div>
    </div>
  );
}