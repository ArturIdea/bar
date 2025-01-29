import { useEffect, useState } from 'react';
import { User } from '@/domain/users/entities/User';
import { GetUsers } from '@/domain/users/useCases/GetUsers';
import { UserRepositoryAPI } from '@/infrastructure/api/UserRepositoryAPI';

export const useUsers = (
  page: number,
  size: number,
  createdAtFrom?: string,
  createdAtTo?: string,
  pinflSearch?: string
) => {
  const [users, setUsers] = useState<User[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      const userRepository = new UserRepositoryAPI();
      const getUsers = new GetUsers(userRepository);

      try {
        const { users, total } = await getUsers.execute(
          page,
          size,
          createdAtFrom,
          createdAtTo,
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
  }, [page, size, createdAtFrom, createdAtTo, pinflSearch]);

  return { users, total, loading, createdAtFrom, createdAtTo, pinflSearch };
};
