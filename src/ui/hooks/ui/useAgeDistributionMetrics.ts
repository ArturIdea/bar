import { useEffect, useState } from 'react';
import { ApiClient } from '@/core/ApiClient';
import { AgeDistributionMetric } from '@/domain/metrics/ageDistributionMetrics/entities/AgeDistributionMetric';
import { AgeDistributionAdapter } from '@/interfaces/AgeDistributionMetricsAdapter';
import { useAgent } from '@/contexts/AgentContext';
import { useBankFilterStore } from '@/ui/stores/useBankFilterStore';
import { useAppTypeFilterStore } from '@/ui/stores/useAppTypeFilterStore';

export const useAgeDistribution = (fromDate: string, toDate: string) => {
  const [data, setData] = useState<AgeDistributionMetric | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { selectedAgent } = useAgent();
  const selectedBank = useBankFilterStore((state) => state.selectedBank);
  const selectedAppType = useAppTypeFilterStore((state) => state.selectedAppType);

  useEffect(() => {
    const fetchData = async () => {
      const apiClient = ApiClient.shared;

      try {
        const response = await apiClient.get('/api/admin/metrics/citizen-age-distribution', {
          params: {
            fromDate,
            toDate,
            ...(selectedAgent?.id && { userId: selectedAgent.id }),
            ...(selectedBank && { bankType: selectedBank }),
            ...(selectedAppType && { onboardingChannel: selectedAppType })
          }
        });
        setData(AgeDistributionAdapter.toDomain(response.data));
      } catch (err) {
        setError('Failed to fetch age distribution data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [fromDate, toDate, selectedAgent?.id, selectedBank,selectedAppType]);

  return { data, loading, error };
};
