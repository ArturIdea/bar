'use client';

import { useEffect } from 'react';
import { generateCodeChallenge, generateCodeVerifier } from '@/core/utils/oauth';
import { useRouter } from '@/i18n/routing';

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    const initiateLogin = async () => {
      const state = crypto.randomUUID();
      const codeVerifier = generateCodeVerifier();
      const codeChallenge = await generateCodeChallenge(codeVerifier);

      sessionStorage.setItem('oauth_state', state);
      sessionStorage.setItem('code_verifier', codeVerifier);

      try {
        const authUrl = new URL(
          `https://kc-staging.uz-pay-dev.ox.one/realms/datawise/protocol/openid-connect/auth`
        );

        authUrl.searchParams.set('response_type', 'code');
        authUrl.searchParams.set('client_id', 'baraka');
        authUrl.searchParams.set(
          'redirect_uri',
          `https://baraka-app-webapp-staging.uz-pay-dev.ox.one/en/callback`
        );
        authUrl.searchParams.set('scope', 'openid profile');
        authUrl.searchParams.set('state', state);
        authUrl.searchParams.set('code_challenge', codeChallenge);
        authUrl.searchParams.set('code_challenge_method', 'S256');

        console.log('Final auth URL:', authUrl.toString());
        const redirectUrl = authUrl.toString();
        console.log('Redirecting to:', redirectUrl);
        window.location.href = redirectUrl;
      } catch (error) {
        console.error('Error constructing auth URL:', error);
      }
    };

    initiateLogin();
  }, [router]);
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-10 h-10 border-4 border-t-blue-500 border-gray-300 rounded-full animate-spin" />
    </div>
  );
}
