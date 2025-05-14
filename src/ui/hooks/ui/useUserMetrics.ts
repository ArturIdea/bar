import { useEffect, useState } from 'react';
import { diContainer } from '@/core/di/setup';
import { GetUserMetrics } from '@/domain/metrics/userMetrics/useCases/GetUserMetric';

export function useUserMetrics(
  fromDate?: string,
  toDate?: string,
  granularity: 'day' | 'week' | 'month' = 'month'
) {
  const [metrics, setMetrics] = useState<{ date: string; users: number }[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMetrics = async () => {
      setLoading(true);
      setError(null);
      const useCase = diContainer.get<GetUserMetrics>('GetUserMetrics');

      try {
        const data = await useCase.execute(fromDate, toDate);
        setMetrics(data);
      } catch (err) {
        setError('Failed to fetch user metrics');
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
  }, [fromDate, toDate, granularity]);

  return { metrics, loading, error };
}
