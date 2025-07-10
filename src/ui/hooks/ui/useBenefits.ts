/* eslint-disable no-console */
import { useEffect, useState } from 'react';
import { diContainer } from '@/core/di/setup';
import { Benefit } from '@/domain/benefits/entities/Benefit';
import { GetBenefits } from '@/domain/benefits/useCases/GetBenefits';

export const useBenefits = (page: number, size: number) => {
  const [benefits, setBenefits] = useState<Benefit[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBenefits() {
      setLoading(true);
      const useCase = diContainer.get<GetBenefits>('GetBenefits');
      try {
        const { benefits, total } = await useCase.execute(page, size);
        setBenefits(benefits);
        setTotal(total);
      } catch (error) {
        console.error('Error fetching benefits:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchBenefits();
  }, [page, size]);

  return { benefits, total, loading };
};
