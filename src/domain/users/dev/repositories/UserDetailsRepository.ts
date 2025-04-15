import { UserDetail } from '../entities/UserDetail';

export interface UserDetailRepository {
  getUserDetailById: (userId: string) => Promise<UserDetail>;
}
