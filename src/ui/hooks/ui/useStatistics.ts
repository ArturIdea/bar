import { useEffect, useState } from 'react';
import { Statistics } from '@/domain/statistics/entities/Statistics';
import { GetStatistics } from '@/domain/statistics/useCases/GetStatistics';
import { StatisticsRepositoryAPI } from '@/infrastructure/api/StatisticsRepositoryAPI';

export const useStatistics = () => {
  const [statistics, setStatistics] = useState<Statistics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStatistics = async () => {
      const repository = new StatisticsRepositoryAPI();
      const getStatistics = new GetStatistics(repository);

      try {
        const result = await getStatistics.execute();
        setStatistics(result);
      } catch (err) {
        setError('Failed to fetch statistics');
      } finally {
        setLoading(false);
      }
    };

    fetchStatistics();
  }, []);

  return { statistics, loading, error };
};
