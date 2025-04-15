import { UserDevice } from '@/domain/users/dev/entities/UserDevice';

export const UserDevicesAdapter = {
  toDomain(raw: any): UserDevice {
    return new UserDevice(
      raw.id,
      raw.deviceId,
      raw.manufacturer,
      raw.model,
      raw.platform,
      raw.osVersion,
      raw.active,
      raw.createdAt,
      raw.lastActivity
    );
  },

  toDomainList(rawList: any[]): UserDevice[] {
    return rawList.map((raw) => UserDevicesAdapter.toDomain(raw));
  },
};
