import { useEffect, useState } from 'react';
import { UserDetail } from '@/domain/users/entities/UserDetail';
import { GetUserDetail } from '@/domain/users/useCases/GetUserDetail';
import { UserDetailRepositoryAPI } from '@/infrastructure/api/UserDetailRepositoryAPI';

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
      const userDetailRepository = new UserDetailRepositoryAPI();
      const getUserUseCase = new GetUserDetail(userDetailRepository);

      try {
        const userData = await getUserUseCase.execute(userId);
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
