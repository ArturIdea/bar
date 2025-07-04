import { useState } from 'react';
import { ApiClient } from '@/core/ApiClient';

export const useLogActivity = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const apiClient = ApiClient.shared;

  const logActivity = async (actionId: number, pinfl: string, dob: string) => {
    try {
      setLoading(true);
      setError(null);
      await apiClient.post(
        `/api/agent/log-activity?action_id=${actionId}&pinfl=${pinfl}&dob=${dob}`,
        null,
        {
          headers: {
            accept: 'application/json',
          },
        }
      );
    } catch (err: any) {
      setError(err.message || 'Failed to log activity');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    logActivity,
    loading,
    error,
  };
}; 