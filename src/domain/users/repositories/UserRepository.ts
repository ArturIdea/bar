import { User } from '@/domain/users/entities/User';

export interface UserRepository {
  getUsers: (
    page: number,
    size: number,
    createdAtFrom?: string,
    createdAtTo?: string,
    pinflSearch?: string,
    usernameSearch?: string,
    createdBy?: string
  ) => Promise<{ users: User[]; total: number }>;
}
