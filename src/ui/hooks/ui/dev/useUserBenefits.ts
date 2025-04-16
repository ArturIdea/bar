import { useEffect, useState } from 'react';
import { diContainer } from '@/core/di/setup';
import { UserBenefit } from '@/domain/users/dev/entities/UserBenefit';
import { GetUserBenefits } from '@/domain/users/dev/useCases/GetUserBenefits';

export const useDevUserBenefits = (userId: string, page: number, size: number) => {
  const [benefits, setBenefits] = useState<UserBenefit[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) {
      setBenefits([]);
      setTotal(0);
      setLoading(false);
      return;
    }

    const fetchBenefits = async () => {
      setLoading(true);
      setError(null);
      const useCase = diContainer.get<GetUserBenefits>('GetDevUserBenefits');

      try {
        const { benefits, total } = await useCase.execute(userId, page, size);
        setBenefits(benefits);
        setTotal(total);
      } catch (err) {
        setError('Error fetching dev user benefits');
        setBenefits([]);
        setTotal(0);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBenefits();
  }, [page, size]);

  return { benefits, total, loading, error };
};
