export const DEVICE_STORAGE_KEY = 'device_id';

export function getDeviceId(): string {
  //check if in browser
  if (typeof window === 'undefined') {
    return 'server-side-placeho lder';
  }

  let deviceId = localStorage.getItem(DEVICE_STORAGE_KEY);

  if (!deviceId) {
    deviceId = crypto.randomUUID();
    localStorage.setItem(DEVICE_STORAGE_KEY, deviceId);
  }

  return deviceId;
}

export function getDeviceData() {
  if (typeof window === 'undefined') {
    // server-side fallback
    return {
      manufacturer: 'Web',
      model: 'Browser',
      platform: 'Browser',
      osVersion: 'Server',
    };
  }

  // client-side
  return {
    manufacturer: 'Web',
    model: 'Browser',
    platform: 'Browser',
    osVersion: navigator.userAgent,
  };
}
