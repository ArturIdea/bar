import { UserVoucher } from '@/domain/users/dev/entities/UserVoucher';

export const UserVoucherAdapter = {
  toDomain(raw: any): UserVoucher {
    return new UserVoucher(
      raw.id,
      raw.amount,
      raw.promoCode,
      raw.marketPlaceId,
      raw.marketPlace,
      raw.mxikCode,
      raw.classificatorCode,
      raw.classificatorName,
      raw.givenAt,
      raw.usedAt
    );
  },

  toDomainList(rawList: any[]): UserVoucher[] {
    return rawList.map(UserVoucherAdapter.toDomain);
  },
};
