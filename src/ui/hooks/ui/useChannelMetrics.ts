import { useEffect, useState } from 'react';
import { ChannelMetric } from '@/domain/onboardingChannels/entities/ChannelMetric';
import { GetChannelMetrics } from '@/domain/onboardingChannels/useCases/GetChannelMetrics';
import { ChannelMetricsRepositoryAPI } from '@/infrastructure/api/ChannelMetricsRepositoryAPI';

export const useChannelMetrics = () => {
  const [metrics, setMetrics] = useState<ChannelMetric | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMetrics = async () => {
      setLoading(true);
      setError(null);

      try {
        const repository = new ChannelMetricsRepositoryAPI();
        const getChannelMetrics = new GetChannelMetrics(repository);
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
