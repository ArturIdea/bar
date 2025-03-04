import { useEffect, useState } from 'react';
import { diContainer } from '@/core/di/setup';
import { AgeDistributionMetric } from '@/domain/metrics/ageDistributionMetrics/entities/AgeDistributionMetric';
import { GetAgeDistribution } from '@/domain/metrics/ageDistributionMetrics/useCases/GetAgeDistributionMetric';

export const useAgeDistribution = () => {
  const [data, setData] = useState<AgeDistributionMetric | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const useCase = diContainer.get<GetAgeDistribution>('GetAgeDistribution');

      try {
        const data = await useCase.execute();
        setData(data);
      } catch (err) {
        setError('Failed to fetch age distribution data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};
