import { User } from '../entities/User';

export interface UserRepository {
  getUsers: (
    page: number,
    size: number,
    signupRequestId?: string,
    documentTypeId?: string,
    pinflSearch?: string
  ) => Promise<{ users: User[]; total: number }>;
}
