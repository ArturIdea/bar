import { Container } from 'inversify';
import { UserVoucherRepository } from '@/domain/users/dev/repositories/UserVoucherRepository';
import { GetUserVouchers } from '@/domain/users/dev/useCases/GetUserVouchers';
import { UserVoucherRepositoryAPI } from '@/infrastructure/api/dev/UserVoucherRepositoryAPI';

export const loadDevUserVouchersRepositories = (container: Container) => {
  container.bind('DevUserVouchersRepository').to(UserVoucherRepositoryAPI).inSingletonScope();
};

export const loadDevUserVouchersUseCases = (container: Container) => {
  container
    .bind('GetDevUserVouchers')
    .toDynamicValue((context) => {
      const publicRepo = context.container.get<UserVoucherRepository>('DevUserVouchersRepository');
      return new GetUserVouchers(publicRepo);
    })
    .inSingletonScope();
};
