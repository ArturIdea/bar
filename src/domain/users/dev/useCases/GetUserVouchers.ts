import { UserVoucher } from '@/domain/users/dev/entities/UserVoucher';
import { UserVoucherRepository } from '@/domain/users/dev/repositories/UserVoucherRepository';

export class GetUserVouchers {
  constructor(private repository: UserVoucherRepository) {}

  async execute(
    userId: string,
    page = 0,
    size = 10
  ): Promise<{ vouchers: UserVoucher[]; total: number }> {
    return this.repository.getUserVouchers(userId, page, size);
  }
}
