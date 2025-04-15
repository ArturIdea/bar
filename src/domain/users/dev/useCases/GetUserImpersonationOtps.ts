import { UserImpersonationOtpRepository } from '@/domain/users/dev/repositories/UserImpersonationOtpRepository';
import { UserImpersonationOtp } from '../entities/UserImpersonationOtp';

export class GetUserImpersonationOtps {
  constructor(private repository: UserImpersonationOtpRepository) {}

  async execute(
    userId: string,
    page: number,
    size: number
  ): Promise<{ impersonations: UserImpersonationOtp[]; total: number }> {
    return this.repository.getUserImpersonationOtps(userId, page, size);
  }
}
