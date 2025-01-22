import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ApiClient } from '@/core/ApiClient';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => {
      const storedAccessToken = ApiClient.shared.getAuthToken();
      const storedRefreshToken = ApiClient.shared.getRefreshToken();

      if (storedAccessToken && storedRefreshToken) {
        setAccessToken(storedAccessToken);
        setRefreshToken(storedRefreshToken);
        setIsAuthenticated(true);
      } else {
        router.push('/');
      }
    };

    checkAuth();
  }, [router]);

  return { isAuthenticated, accessToken, refreshToken };
};
