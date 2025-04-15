import { UserDevice } from '@/domain/users/dev/entities/UserDevice';

export interface UserDevicesRepository {
  getUserDevices: (userId: string) => Promise<UserDevice[]>;
}
