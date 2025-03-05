import { useEffect, useState } from 'react';
import { diContainer } from '@/core/di/setup';
import { User } from '@/domain/users/entities/User';
import { GetUsersUseCase } from '@/domain/users/useCases/GetUsers';

export const useUsers = (
  page: number,
  size: number,
  createdAtFrom?: string,
  createdAtTo?: string,
  pinflSearch?: string,
  usernameSearch?: string,
  createdBy?: string
) => {
  const [users, setUsers] = useState<User[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      const useCase = diContainer.get<GetUsersUseCase>('GetUsers');

      try {
        const { users, total } = await useCase.execute(
          page,
          size,
          createdAtFrom,
          createdAtTo,
          pinflSearch,
          usernameSearch,
          createdBy
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
  }, [page, size, createdAtFrom, createdAtTo, pinflSearch, usernameSearch]);

  return { users, total, loading };
};
