/* eslint-disable no-console */
import { useEffect, useState } from 'react';
import { useAgent } from '@/contexts/AgentContext';
import { diContainer } from '@/core/di/setup';
import { ChannelMetric } from '@/domain/metrics/onboardingChannelsMetrics/entities/ChannelMetric';
import { GetChannelMetrics } from '@/domain/metrics/onboardingChannelsMetrics/useCases/GetChannelMetrics';
import { useBankFilterStore } from '@/ui/stores/useBankFilterStore';
import { useAppTypeFilterStore } from '@/ui/stores/useAppTypeFilterStore';

export const useChannelMetrics = (fromDate?: string, toDate?: string) => {
  const [metrics, setMetrics] = useState<ChannelMetric | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { selectedAgent } = useAgent();
  const selectedBank = useBankFilterStore((state) => state.selectedBank);
  const selectedAppType = useAppTypeFilterStore((state) => state.selectedAppType);

  useEffect(() => {
    const fetchMetrics = async () => {
      setLoading(true);
      setError(null);
      const useCase = diContainer.get<GetChannelMetrics>('GetChannelMetrics');

      try {
        const data = await useCase.execute(
          selectedAgent?.id as string | undefined, 
          fromDate, 
          toDate, 
          selectedBank as string | undefined,
          selectedAppType as string | undefined
        );
        setMetrics(data);
      } catch (err) {
        setError('Failed to fetch channel metrics');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
  }, [selectedAgent?.id, fromDate, toDate, selectedBank, selectedAppType]);

  return { metrics, loading, error };
};
