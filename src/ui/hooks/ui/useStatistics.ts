import { useEffect, useState } from 'react';
import { diContainer } from '@/core/di/setup';
import { Statistics } from '@/domain/statistics/entities/Statistics';
import { GetStatisticsUseCase } from '@/domain/statistics/useCases/GetStatistics';

export const useStatistics = (
  newAccountsSince: string,
  newFundsDisbursedSince: string,
  cardsIssuedSince: string
) => {
  const [statistics, setStatistics] = useState<Statistics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStatistics = async () => {
      const useCase = diContainer.get<GetStatisticsUseCase>('GetStatistics');

      try {
        const result = await useCase.execute(
          newAccountsSince,
          newFundsDisbursedSince,
          cardsIssuedSince
        );
        setStatistics(result);
      } catch (err) {
        setError('Failed to fetch statistics');
      } finally {
        setLoading(false);
      }
    };

    fetchStatistics();
  }, [newAccountsSince, newFundsDisbursedSince, cardsIssuedSince]);

  return { statistics, loading, error };
};
