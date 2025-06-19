import { User } from '@/domain/users/entities/User';

export interface UserRepository {
  getUsers: (
    page: number,
    size: number,
    registrationChannel?: string,
    fromDate?: string,
    toDate?: string,
    pinflSearch?: string,
    usernameSearch?: string,
    createdBy?: string,
    isCitizen?: boolean,
    userId?: string,
    bankType?: string,
    onboardingChannel?: string
  ) => Promise<{ users: User[]; total: number }>;
}
