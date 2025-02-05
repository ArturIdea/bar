import { UserDetail } from '../entities/UserDetail';

export interface UserDetailRepository {
  getUserDetails: (userId: string) => Promise<UserDetail>;
}
