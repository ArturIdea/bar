import { useEffect, useState } from 'react';
import { diContainer } from '@/core/di/setup';
import { UserDetail } from '@/domain/users/dev/entities/UserDetail';
import { GetUserDetailsById } from '@/domain/users/dev/useCases/GetUserDetailById';

export const useUserDetail = (userId: string) => {
  const [userDetail, setUserDetail] = useState<UserDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) {
      return;
    }

    const fetchUserDetails = async () => {
      setLoading(true);
      setError(null);
      const useCase = diContainer.get<GetUserDetailsById>('GetDevUserDetail');

      try {
        const userDetailsData = await useCase.execute(userId);
        setUserDetail(userDetailsData);
      } catch (err) {
        setError('Failed to fetch user data');
        console.error('Error fetching user data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [userId]);

  return { userDetail, loading, error };
};
