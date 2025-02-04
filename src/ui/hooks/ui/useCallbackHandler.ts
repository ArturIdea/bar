import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { setServerCookie } from '@/core/utils/setCookies';
import { useRouter } from '@/i18n/routing';
import { AuthRepositoryAPI } from '@/infrastructure/api/AuthRepositoryAPI';

export const useCallbackHandler = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const code = searchParams.get('code');
        const state = searchParams.get('state');

        if (!code || !state) {
          setError('Missing authorization code or state.');
          setIsLoading(false);
          return;
        }

        const storedState = sessionStorage.getItem('oauth_state');
        if (state !== storedState) {
          setError('State mismatch.');
          setIsLoading(false);
          return;
        }

        const codeVerifier = sessionStorage.getItem('code_verifier');
        if (!codeVerifier) {
          setError('Missing code verifier.');
          setIsLoading(false);
          return;
        }

        const authRepo = new AuthRepositoryAPI();
        const tokenData = await authRepo.getToken(code, codeVerifier, state);

        await setServerCookie({ name: 'accessToken', value: tokenData.accessToken });
        await setServerCookie({ name: 'refreshToken', value: tokenData.refreshToken });
        // await setServerCookie('idToken', tokenData.idToken);

        router.push('/dashboard');
      } catch (err: any) {
        console.error('Error during callback handling:', err.message || err);
        setError(err.message || 'Unknown error occurred.');
        setIsLoading(false);
      }
    };

    handleCallback();
  }, [searchParams, router]);

  return { isLoading, error };
};
