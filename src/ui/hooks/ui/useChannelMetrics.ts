/* eslint-disable no-console */
import { useEffect, useState } from 'react';
import { useAgent } from '@/contexts/AgentContext';
import { diContainer } from '@/core/di/setup';
import { ChannelMetric } from '@/domain/metrics/onboardingChannelsMetrics/entities/ChannelMetric';
import { GetChannelMetrics } from '@/domain/metrics/onboardingChannelsMetrics/useCases/GetChannelMetrics';

export const useChannelMetrics = (fromDate?: string, toDate?: string) => {
  const [metrics, setMetrics] = useState<ChannelMetric | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { selectedAgent } = useAgent();

  useEffect(() => {
    const fetchMetrics = async () => {
      setLoading(true);
      setError(null);
      const useCase = diContainer.get<GetChannelMetrics>('GetChannelMetrics');

      try {
        const data = await useCase.execute(selectedAgent?.id, fromDate, toDate);
        setMetrics(data);
      } catch (err) {
        setError('Failed to fetch channel metrics');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
  }, [selectedAgent?.id, fromDate, toDate]);

  return { metrics, loading, error };
};
