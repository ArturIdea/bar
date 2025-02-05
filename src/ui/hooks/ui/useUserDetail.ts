import { useEffect, useState } from 'react';
import { diContainer } from '@/core/di/setup';
import { UserDetail } from '@/domain/users/entities/UserDetail';
import { GetUserDetailUseCase } from '@/domain/users/useCases/GetUserDetail';

export const useUserDetail = (userId: string) => {
  const [user, setUser] = useState<UserDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) {
      return;
    }

    const fetchUser = async () => {
      setLoading(true);
      setError(null);
      const useCase = diContainer.get<GetUserDetailUseCase>('GetUserDetail');

      try {
        const userData = await useCase.execute(userId);
        setUser(userData);
      } catch (err) {
        setError('Failed to fetch user data');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  return { user, loading, error };
};
