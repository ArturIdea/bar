import { UserImpersonationOtp } from '../entities/UserImpersonationOtp';

export interface UserImpersonationOtpRepository {
  getUserImpersonationOtps: (
    userId: string,
    page: number,
    size: number
  ) => Promise<{ impersonations: UserImpersonationOtp[]; total: number }>;
}
