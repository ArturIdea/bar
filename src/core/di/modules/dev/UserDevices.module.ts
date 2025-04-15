import { Container } from 'inversify';
import { UserDevicesRepository } from '@/domain/users/dev/repositories/UserDevicesRepository';
import { GetUserDevices } from '@/domain/users/dev/useCases/GetUserDevices';
import { UserDevicesRepositoryAPI } from '@/infrastructure/api/dev/UserDevicesRepositoryAPI';

export const loadDevUserDevicesRepositories = (container: Container) => {
  container.bind('DevUserDevicesRepository').to(UserDevicesRepositoryAPI).inSingletonScope();
};

export const loadDevUserDevicesUseCases = (container: Container) => {
  container
    .bind('GetDevUserDevices')
    .toDynamicValue((context) => {
      const publicRepo = context.container.get<UserDevicesRepository>('DevUserDevicesRepository');
      return new GetUserDevices(publicRepo);
    })
    .inSingletonScope();
};
