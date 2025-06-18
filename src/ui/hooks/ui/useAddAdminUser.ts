import { useState } from 'react';
import { ApiClient } from '@/core/ApiClient';

interface AddAdminUserData {
  firstName: string;
  lastName: string;
  email: string;
  enabled: boolean;
  username: string;
  attributes: {
    phone: string;
    organization: string;
  };
}

export const useAddAdminUser = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const apiClient = ApiClient.shared;

  const addAdminUser = async (data: AddAdminUserData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiClient.post('/api/admin/role/users', data);
      return response.data;
    } catch (err: any) {
      setError(err.message || 'Failed to add admin user');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    addAdminUser,
    loading,
    error,
  };
}; 