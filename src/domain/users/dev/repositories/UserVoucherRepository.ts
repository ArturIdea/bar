import { UserVoucher } from '@/domain/users/dev/entities/UserVoucher';

export interface UserVoucherRepository {
  getUserVouchers: (
    userId: string,
    page: number,
    size: number
  ) => Promise<{ vouchers: UserVoucher[]; total: number }>;
}
