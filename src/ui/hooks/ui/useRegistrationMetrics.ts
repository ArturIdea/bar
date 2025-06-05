/* eslint-disable no-console */
import { useEffect, useState } from 'react';
import { ApiClient } from '../../../core/ApiClient';
import { useAgent } from '@/contexts/AgentContext';

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
  const { selectedAgent } = useAgent();

  useEffect(() => {
    const fetchMetrics = async () => {
      setLoading(true);
      setError(null);

      try {
        const baseUrl = `/api/admin/dashboard/metrics/registration-requests?fromDate=${fromDate}&toDate=${toDate}`;
        const url = selectedAgent?.id ? `${baseUrl}&userId=${selectedAgent.id}` : baseUrl;
        
        const data = await ApiClient.shared.get<RegistrationMetric[]>(url);
        setMetrics(data.data);
      } catch (err) {
        setError('Failed to fetch metrics');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
  }, [fromDate, toDate, selectedAgent?.id]);

  return { metrics, loading, error };
}; 