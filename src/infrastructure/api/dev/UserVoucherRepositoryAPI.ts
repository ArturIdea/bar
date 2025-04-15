import { ApiClient } from '@/core/ApiClient';
import { UserVoucher } from '@/domain/users/dev/entities/UserVoucher';
import { UserVoucherRepository } from '@/domain/users/dev/repositories/UserVoucherRepository';
import { UserVoucherAdapter } from '@/interfaces/dev/UserVoucherAdapter';

export class UserVoucherRepositoryAPI implements UserVoucherRepository {
  private apiClient = ApiClient.shared;
  private apiUrl = '/api/developer/user';

  async getUserVouchers(
    userId: string,
    page = 0,
    size = 10
  ): Promise<{ vouchers: UserVoucher[]; total: number }> {
    const response = await this.apiClient.get<{ content: any[]; totalElements: number }>(
      `${this.apiUrl}/${userId}/vouchers`,
      {
        params: {
          page,
          size,
          sort: 'givenAt,DESC',
        },
      }
    );

    return {
      vouchers: response.data.content.map(UserVoucherAdapter.toDomain),
      total: response.data.totalElements,
    };
  }
}
