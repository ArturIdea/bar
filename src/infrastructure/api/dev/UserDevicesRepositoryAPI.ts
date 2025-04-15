import { ApiClient } from '@/core/ApiClient';
import { UserDevice } from '@/domain/users/dev/entities/UserDevice';
import { UserDevicesRepository } from '@/domain/users/dev/repositories/UserDevicesRepository';
import { UserDevicesAdapter } from '@/interfaces/dev/UserDevicesAdapter';

export class UserDevicesRepositoryAPI implements UserDevicesRepository {
  private apiClient = ApiClient.shared;
  private apiUrl = '/api/developer/user';

  async getUserDevices(userId: string): Promise<UserDevice[]> {
    const response = await this.apiClient.get<any[]>(`${this.apiUrl}/${userId}/devices`);

    return UserDevicesAdapter.toDomainList(response.data);
  }
}
