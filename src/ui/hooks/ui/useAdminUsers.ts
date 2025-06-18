import { useEffect, useState } from 'react';
import { ApiClient } from '@/core/ApiClient';

export interface AdminUser {
  id: string;
  username: string;
  email: string | null;
  enabled: boolean;
  emailVerified: boolean;
  firstName: string;
  lastName: string;
  attributes: {
    locale?: string[];
    phone?: string[];
    organization?: string[];
  } | null;
}

export const useAdminUsers = (
  page: number = 0,
  size: number = 10,
  searchQuery?: string,
  enabled?: boolean
) => {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError(null);
      try {
        const params: Record<string, any> = {
          page,
          size,
          sort: 'createdAt,DESC',
        };

        if (searchQuery) {
          params.usernameSearch = searchQuery;
        }

        if (enabled !== undefined) {
          params.enabled = enabled;
        }

        const response = await ApiClient.shared.get(
          '/api/admin/role/users',
          { params }
        );
        const data: any = response.data;
        if (Array.isArray(data)) {
          setUsers(data);
          setTotal(data.length);
        } else {
          setUsers(data && data.content ? data.content : []);
          setTotal(data && data.totalElements ? data.totalElements : 0);
        }
      } catch (err) {
        console.error('Error fetching admin users:', err);
        setError('Failed to fetch users. Please try again later.');
        setUsers([]);
        setTotal(0);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [page, size, searchQuery, enabled]);

  return { users, total, loading, error };
}; 