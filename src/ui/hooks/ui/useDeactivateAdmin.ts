import { useState } from 'react';
import { ApiClient } from '@/core/ApiClient';

export const useDeactivateAdmin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deactivateAdmin = async (userId: string) => {
    setIsLoading(true);
    setError(null);
    try {
      await ApiClient.shared.put(
        `/api/admin/users/deactivate/${userId}`,
        {
          enabled: false,
        }
      );
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to deactivate admin');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    deactivateAdmin,
    isLoading,
    error,
  };
}; 