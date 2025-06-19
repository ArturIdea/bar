import { useState, useEffect } from 'react';
import { AgentOnboardingStatus } from '@/domain/agentOnboarding/entities/AgentOnboardingStatus';
import { ApiClient } from '@/core/ApiClient';

export const useAgentOnboardingStatus = (
  userId: string,
  fromDate: string,
  toDate: string
) => {
  const [data, setData] = useState<AgentOnboardingStatus | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await ApiClient.shared.get<AgentOnboardingStatus>(
          `/api/admin/agent-onboarding-status?fromDate=${fromDate}&toDate=${toDate}&userId=${userId}`
        );
        
        setData(response.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch onboarding status');
      } finally {
        setLoading(false);
      }
    };

    if (userId && fromDate && toDate) {
      fetchData();
    }
  }, [userId, fromDate, toDate]);

  return { data, loading, error };
}; 