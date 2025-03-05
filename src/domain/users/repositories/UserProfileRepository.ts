import { UserProfile } from '../entities/UserProfile';

export interface UserProfileRepository {
  getUserProfile: () => Promise<UserProfile>;
}
