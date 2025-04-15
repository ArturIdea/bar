import { useEffect, useState } from 'react';
import { diContainer } from '@/core/di/setup';
import { UserDevice } from '@/domain/users/dev/entities/UserDevice';
import { GetUserDevices } from '@/domain/users/dev/useCases/GetUserDevices';

export const useUserDevices = (userId: string) => {
  const [devices, setDevices] = useState<UserDevice[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) {
      setDevices(null);
      setLoading(false);
      return;
    }

    const fetchUserDevices = async () => {
      setLoading(true);
      setError(null);
      const useCase = diContainer.get<GetUserDevices>('GetDevUserDevices');
      try {
        const userDevicesData = await useCase.execute(userId);
        setDevices(userDevicesData);
      } catch (error) {
        setError('Error fetching documents');
        console.error('Error fetching documents:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDevices();
  }, [userId]);

  return { devices, loading, error };
};
