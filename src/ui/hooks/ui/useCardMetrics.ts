import { useEffect, useState } from 'react';
import { CardMetrics } from '@/domain/cards/entities/CardMetrics';
import { GetCardMetrics } from '@/domain/cards/useCases/GetCardMetrics';
import { CardMetricsRepositoryAPI } from '@/infrastructure/api/CardMetricsRepositoryAPI';

export const useCardMetrics = () => {
  const [metrics, setMetrics] = useState<CardMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMetrics = async () => {
      setLoading(true);
      setError(null);

      try {
        const repository = new CardMetricsRepositoryAPI();
        const getChannelMetrics = new GetCardMetrics(repository);
        const data = await getChannelMetrics.execute();
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
