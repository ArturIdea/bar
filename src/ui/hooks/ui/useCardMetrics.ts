/* eslint-disable no-console */
import { useEffect, useState } from 'react';
import { ApiClient } from '../../../core/ApiClient';
import { useAgent } from '@/contexts/AgentContext';

interface CardMetrics {
  XALQ: number;
  ALOHA: number;
  totalCardCount: number;
}

export const useCardMetrics = (fromDate?: string, toDate?: string) => {
  const [metrics, setMetrics] = useState<CardMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { selectedAgent } = useAgent();

  useEffect(() => {
    const fetchMetrics = async () => {
      setLoading(true);
      setError(null);

      try {
        const baseUrl = `/api/admin/bank-card-statistics?fromDate=${fromDate}&toDate=${toDate}`;
        const url = selectedAgent?.id ? `${baseUrl}&userId=${selectedAgent.id}` : baseUrl;
        
        const response = await ApiClient.shared.get<CardMetrics>(url);
        
        if (!response.data) {
          throw new Error('No data received from the API');
        }

        setMetrics(response.data);
      } catch (err) {
        console.error('Error fetching card metrics:', err);
        setError('Failed to fetch card metrics');
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
  }, [fromDate, toDate, selectedAgent?.id]);

  return { metrics, loading, error };
};
