import { UserCard } from '../entities/UserCard';

export interface UserCardRepository {
  getUserCards: (userId?: string) => Promise<UserCard>;
}
