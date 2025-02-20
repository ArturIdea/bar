import { useEffect, useState } from 'react';
import { diContainer } from '@/core/di/setup';
import { UserDetail } from '@/domain/users/entities/UserDetail';
import { GetUserProfileUseCase } from '@/domain/users/useCases/GetUserProfile';

export const useUserProfile = () => {
  const [userProfile, setUserProfile] = useState<UserDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      setError(null);
      const useCase = diContainer.get<GetUserProfileUseCase>('GetUserProfile');

      try {
        const userData = await useCase.execute();
        setUserProfile(userData);
      } catch (err) {
        setError('Failed to fetch user data');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return { userProfile, loading, error };
};
