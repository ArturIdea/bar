import { useEffect, useState } from 'react';
import { Benefit } from '@/domain/benefits/entities/Benefit';
import { BenefitsRepositoryAPI } from '@/infrastructure/api/BenefitsRepositoryAPI';

export const useBenefits = (page: number, size: number) => {
  const [benefits, setBenefits] = useState<Benefit[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBenefits() {
      setLoading(true);
      try {
        const { benefits, total } = await new BenefitsRepositoryAPI().getBenefits(page, size);
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
