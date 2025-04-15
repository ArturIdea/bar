import { UserDevice } from '@/domain/users/dev/entities/UserDevice';
import { UserDevicesRepository } from '@/domain/users/dev/repositories/UserDevicesRepository';

export class GetUserDevices {
  constructor(private repository: UserDevicesRepository) {}

  async execute(userId: string): Promise<UserDevice[]> {
    return this.repository.getUserDevices(userId);
  }
}
