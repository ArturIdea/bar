import { User } from '@/domain/users/entities/User';

export interface UserRepository {
  fetchUsers: (page: number, size: number) => Promise<{ users: User[]; total: number }>;
}
