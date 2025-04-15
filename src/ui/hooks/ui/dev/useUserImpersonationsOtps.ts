import { useEffect, useState } from 'react';
import { diContainer } from '@/core/di/setup';
import { UserImpersonationOtp } from '@/domain/users/dev/entities/UserImpersonationOtp';
import { GetUserImpersonationOtps } from '@/domain/users/dev/useCases/GetUserImpersonationOtps';

export const useUserImpersonationsOtps = (userId: string, page: number, size: number) => {
  const [impersonations, setImpersonations] = useState<UserImpersonationOtp[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) {
      setImpersonations([]);
      setTotal(0);
      setLoading(false);
      return;
    }

    const fetchUserImpersonations = async () => {
      setLoading(true);
      setError(null);
      const useCase = diContainer.get<GetUserImpersonationOtps>('GetDevUserImpersonationOtps');
      try {
        const { impersonations, total } = await useCase.execute(userId, page, size);
        setImpersonations(impersonations);
        setTotal(total);
      } catch (error) {
        setError('Error fetching impersonations');
        console.error('Error fetching impersonations:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserImpersonations();
  }, [userId, page, size]);

  return { impersonations, total, loading, error };
};
