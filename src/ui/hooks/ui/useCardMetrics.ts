import { useEffect, useState } from 'react';
import { diContainer } from '@/core/di/setup';
import { CardMetrics } from '@/domain/metrics/cardMetrics/entities/CardMetrics';
import { GetCardMetrics } from '@/domain/metrics/cardMetrics/useCases/GetCardMetrics';

export const useCardMetrics = () => {
  const [metrics, setMetrics] = useState<CardMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMetrics = async () => {
      setLoading(true);
      setError(null);
      const useCase = diContainer.get<GetCardMetrics>('GetCardMetrics');

      try {
        const data = await useCase.execute();
        setMetrics(data);
      } catch (err) {
        setError('Failed to fetch channel metrics');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
  }, []);

  return { metrics, loading, error };
};
