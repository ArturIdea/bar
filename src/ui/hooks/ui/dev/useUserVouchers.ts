import { useEffect, useState } from 'react';
import { diContainer } from '@/core/di/setup';
import { UserVoucher } from '@/domain/users/dev/entities/UserVoucher';
import { GetUserVouchers } from '@/domain/users/dev/useCases/GetUserVouchers';

export const useUserVouchers = (userId: string, page = 0, size = 10) => {
  const [vouchers, setVouchers] = useState<UserVoucher[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) {
      setVouchers([]);
      setTotal(0);
      setLoading(false);
      return;
    }

    const fetchUserVouchers = async () => {
      setLoading(true);
      setError(null);
      const useCase = diContainer.get<GetUserVouchers>('GetDevUserVouchers');
      try {
        const { vouchers, total } = await useCase.execute(userId, page, size);
        setVouchers(vouchers);
        setTotal(total);
      } catch (error) {
        setError('Error fetching vouchers');
        console.error('Error fetching vouchers:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserVouchers();
  }, [userId, page, size]);

  return { vouchers, total, loading, error };
};
