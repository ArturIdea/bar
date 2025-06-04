import { useEffect, useState } from 'react';
import { ApiClient } from '@/core/ApiClient';
import { AgeDistributionMetric } from '@/domain/metrics/ageDistributionMetrics/entities/AgeDistributionMetric';
import { AgeDistributionAdapter } from '@/interfaces/AgeDistributionMetricsAdapter';

export const useAgeDistribution = (fromDate: string, toDate: string) => {
  const [data, setData] = useState<AgeDistributionMetric | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const apiClient = ApiClient.shared;

      try {
        const response = await apiClient.get('/api/admin/metrics/citizen-age-distribution', {
          params: {
            fromDate,
            toDate
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
  }, [fromDate, toDate]);

  return { data, loading, error };
};
