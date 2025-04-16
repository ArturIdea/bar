import { IconBrandAndroid } from '@tabler/icons-react';
import { AppleIcon, Calendar, Clock, PcCase } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { UserDevice } from '@/domain/users/dev/entities/UserDevice';

export const DevicesTab = ({ devices }: { devices: UserDevice[] }) => {
  const t = useTranslations();
  const getPlatformIcon = (platform: string) => {
    const lowerPlatform = platform.toLowerCase();

    if (lowerPlatform.includes('android')) {
      return <IconBrandAndroid />;
    } else if (
      lowerPlatform.includes('ios') ||
      lowerPlatform.includes('macos') ||
      lowerPlatform.includes('ipad')
    ) {
      return <AppleIcon />;
    }
    return <PcCase className="w-5 h-5 text-gray-600" />;
  };

  const getStatusColor = (active: boolean) => {
    return active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
  };

  return (
    <div className="bg-gray-50 p-6 rounded-lg">
      <h2 className="text-xl font-semibold mb-4 text-primary">{t('Dev.devices')}</h2>

      {devices.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-6 text-center border border-gray-100">
          <p className="text-gray-500">No devices connected to this account</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {devices.map((device) => {
            const lastActiveDate = new Date(device.lastActivity);
            const isRecent =
              new Date().getTime() - lastActiveDate.getTime() < 7 * 24 * 60 * 60 * 1000;

            return (
              <div
                key={device.id}
                className="bg-white rounded-lg shadow p-4 border border-gray-100"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center">
                    <div
                      className={`p-3 rounded-lg mr-4 ${device.active ? 'bg-primary/10 text-primary' : 'bg-gray-100 text-gray-600'}`}
                    >
                      {getPlatformIcon(device.platform)}
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-primary">
                        {device.manufacturer} {device.model}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {device.platform} {device.osVersion}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(device.active)}`}
                  >
                    {device.active ? 'Active' : 'Inactive'}
                  </span>
                </div>

                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-3 rounded text-gray-500">
                    <p className="text-sm  mb-1">Device ID</p>
                    <p className="font-medium font-mono text-sm">{device.deviceId}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded text-gray-500">
                    <p className="text-sm  mb-1">Device Record ID</p>
                    <p className="font-medium">{device.id}</p>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex flex-col sm:flex-row sm:justify-between">
                    <div className="mb-2 sm:mb-0">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1 text-gray-500" />
                        <p className="text-sm text-gray-500">
                          Added on{' '}
                          {new Date(device.createdAt).toLocaleString('uz-UZ', {
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </p>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1 text-gray-500" />
                        <p
                          className={`text-sm ${isRecent ? 'text-primary font-medium' : 'text-gray-500'}`}
                        >
                          Last active:{' '}
                          {new Date(device.lastActivity).toLocaleString('uz-UZ', {
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
