/* eslint-disable no-console */
import { useEffect, useState } from 'react';
import { ApiClient } from '../../../core/ApiClient';

interface CardMetrics {
  XALQ: number;
  ALOHA: number;
  totalCardCount: number;
}

export const useCardMetrics = (fromDate?: string, toDate?: string) => {
  const [metrics, setMetrics] = useState<CardMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMetrics = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await ApiClient.shared.get<CardMetrics>(
          `/api/admin/bank-card-statistics?fromDate=${fromDate}&toDate=${toDate}`
        );
        
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
  }, [fromDate, toDate]);

  return { metrics, loading, error };
};
