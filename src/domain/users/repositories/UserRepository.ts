import { User } from '@/domain/users/entities/User';

export interface UserRepository {
  getUsers: (
    page: number,
    size: number,
    registrationChannel?: string,
    createdAtFrom?: string,
    createdAtTo?: string,
    pinflSearch?: string,
    usernameSearch?: string,
    createdBy?: string,
    isCitizen?: boolean
  ) => Promise<{ users: User[]; total: number }>;
}
