/* eslint-disable no-console */
import { useEffect, useState } from 'react';
import { diContainer } from '@/core/di/setup';
import { User } from '@/domain/users/entities/User';
import { GetUsersUseCase } from '@/domain/users/useCases/GetUsers';
import { useAgent } from '@/contexts/AgentContext';
import { useBankFilterStore } from '@/ui/stores/useBankFilterStore';
import { useAppTypeFilterStore } from '@/ui/stores/useAppTypeFilterStore';

export const useUsers = (
  page: number,
  size: number,
  roles?: string,
  fromDate?: string,
  toDate?: string,
  pinflSearch?: string,
  _channel?:string,
  _bank?: string,
  usernameSearch?: string,
  createdBy?: string,
  isCitizen?: boolean) => {
  const [users, setUsers] = useState<User[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const { selectedAgent } = useAgent();
  const selectedBank = useBankFilterStore((state) => state.selectedBank);
  const selectedAppType = useAppTypeFilterStore((state) => state.selectedAppType);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      const useCase = diContainer.get<GetUsersUseCase>('GetUsers');

      try {
        const { users, total } = await useCase.execute(
          page,
          size,
          roles,
          fromDate,
          toDate,
          pinflSearch,
          usernameSearch,
          createdBy,
          isCitizen,
          selectedAgent?.id as string | undefined,
          selectedBank || undefined,
          selectedAppType || undefined
        );
        setUsers(users);
        setTotal(total);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [page, size, roles, fromDate, toDate, pinflSearch, usernameSearch, isCitizen, selectedAgent?.id, selectedBank, selectedAppType]);

  return { users, total, loading };
};
