/* eslint-disable no-console */
import { useEffect, useState } from 'react';
import { ApiClient } from '../../../core/ApiClient';
import { useAgent } from '@/contexts/AgentContext';
import { useBankFilterStore } from '@/ui/stores/useBankFilterStore';
import { useAppTypeFilterStore } from '@/ui/stores/useAppTypeFilterStore';

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
  const selectedBank = useBankFilterStore((state) => state.selectedBank);
  const selectedAppType = useAppTypeFilterStore((state) => state.selectedAppType);

  useEffect(() => {
    const fetchMetrics = async () => {
      setLoading(true);
      setError(null);

      try {
        const baseUrl = `/api/admin/dashboard/metrics/registration-requests?fromDate=${fromDate}&toDate=${toDate}`;
        const url = selectedAgent?.id 
          ? `${baseUrl}&userId=${selectedAgent.id}${selectedBank ? `&bankType=${selectedBank}` : ''}${selectedAppType ? `&onboardingChannel=${selectedAppType}` : ''}`
          : `${baseUrl}${selectedBank ? `&bankType=${selectedBank}` : ''}${selectedAppType ? `&onboardingChannel=${selectedAppType}` : ''}`;
        
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
  }, [fromDate, toDate, selectedAgent?.id, selectedBank, selectedAppType]);

  return { metrics, loading, error };
}; 