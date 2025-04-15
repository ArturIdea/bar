import { UserImpersonationOtp } from '@/domain/users/dev/entities/UserImpersonationOtp';

export const UserImpersonationOtpAdapter = {
  toDomain(raw: any): UserImpersonationOtp {
    return new UserImpersonationOtp(
      raw.agentId,
      raw.otp,
      raw.createdAt,
      raw.expiresAt,
      raw.hasBeenUsedOrSkipped
    );
  },

  toDomainList(rawList: any[]): UserImpersonationOtp[] {
    return rawList.map((raw) => UserImpersonationOtpAdapter.toDomain(raw));
  },
};
