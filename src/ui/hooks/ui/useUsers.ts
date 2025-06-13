/* eslint-disable no-console */
import { useEffect, useState } from 'react';
import { ApiClient } from '@/core/ApiClient';
import { User } from '@/domain/users/entities/User';
import { UserAdapter } from '@/interfaces/UserAdapter';
import { useAgent } from '@/contexts/AgentContext';

export const useUsers = (
  page: number,
  size: number,
  roles?: string,
  createdAtFrom?: string,
  createdAtTo?: string,
  pinflSearch?: string,
  _channel?:string,
  _bank?: string,
  usernameSearch?: string,
  createdBy?: string,
  isCitizen?: boolean
) => {
  const [users, setUsers] = useState<User[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const { selectedAgent } = useAgent();

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const baseUrl = '/api/admin/users';
        const params = {
          page,
          size,
          roles,
          createdAtFrom,
          createdAtTo,
          pinflSearch,
          usernameSearch,
          createdBy,
          isCitizen,
          sort: 'createdAt,DESC',
          ...(selectedAgent?.id && { userId: selectedAgent.id })
        };

        const response = await ApiClient.shared.get<{ content: any[]; totalElements: number }>(
          baseUrl,
          { params }
        );

        setUsers(response.data.content.map(UserAdapter.toDomain));
        setTotal(response.data.totalElements);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [page, size, roles, createdAtFrom, createdAtTo, pinflSearch, usernameSearch, isCitizen, selectedAgent?.id]);

  return { users, total, loading };
};
