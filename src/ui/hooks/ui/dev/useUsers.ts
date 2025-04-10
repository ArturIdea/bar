import { useEffect, useState } from 'react';
import { diContainer } from '@/core/di/setup';
import { User } from '@/domain/users/dev/entities/User';
import { GetUsersUseCase } from '@/domain/users/dev/useCases/GetUsers';

export const useUsers = (
  page: number,
  size: number,
  signupRequestId?: string,
  documentTypeId?: string,
  pinflSearch?: string
) => {
  const [users, setUsers] = useState<User[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      const useCase = diContainer.get<GetUsersUseCase>('GetDevUsers');

      try {
        const { users, total } = await useCase.execute(
          page,
          size,
          signupRequestId,
          documentTypeId,
          pinflSearch
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
  }, [page, size, pinflSearch, signupRequestId, documentTypeId]);

  return { users, total, loading };
};
