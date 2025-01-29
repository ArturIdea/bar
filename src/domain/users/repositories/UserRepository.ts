import { User } from '@/domain/users/entities/User';

export interface UserRepository {
  fetchUsers: (
    page: number,
    size: number,
    createdAtFrom?: string,
    createdAtTo?: string
  ) => Promise<{ users: User[]; total: number }>;
}
