import { useEffect, useState } from 'react';
import { diContainer } from '@/core/di/setup';
import { ChannelMetric } from '@/domain/metrics/onboardingChannelsMetrics/entities/ChannelMetric';
import { GetChannelMetrics } from '@/domain/metrics/onboardingChannelsMetrics/useCases/GetChannelMetrics';

export const useChannelMetrics = () => {
  const [metrics, setMetrics] = useState<ChannelMetric | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMetrics = async () => {
      setLoading(true);
      setError(null);
      const useCase = diContainer.get<GetChannelMetrics>('GetChannelMetrics');

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
