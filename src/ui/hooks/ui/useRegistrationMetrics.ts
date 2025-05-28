/* eslint-disable no-console */
import { useEffect, useState } from 'react';
import { ApiClient } from '../../../core/ApiClient';

interface RegistrationMetric {
  id: number;
  date: string;
  totalSignupRequests: number;
  failedSignupRequests: number;
  successfulSignupRequests: number;
  totalDropOffs: number;
}

export const useRegistrationMetrics = (fromDate?: string, toDate?: string) => {
  const [metrics, setMetrics] = useState<RegistrationMetric[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMetrics = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await ApiClient.shared.get<RegistrationMetric[]>(
          `/api/admin/dashboard/metrics/registration-requests?fromDate=${fromDate}&toDate=${toDate}`
        );
        setMetrics(data.data);
      } catch (err) {
        setError('Failed to fetch metrics');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
  }, [fromDate, toDate]);

  return { metrics, loading, error };
}; 