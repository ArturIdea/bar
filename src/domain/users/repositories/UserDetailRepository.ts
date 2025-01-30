import { UserDetail } from '../entities/UserDetail';

export interface UserDetailRepository {
  getUser: (userId: string) => Promise<UserDetail>;
}
