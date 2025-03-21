import FingerprintJS from '@fingerprintjs/fingerprintjs';

export const DEVICE_STORAGE_KEY = 'device_id';

let cachedDeviceId: string | null = null;

export async function getDeviceId(): Promise<string> {
  if (typeof window === 'undefined') {
    return 'server-side-placeholder';
  }

  if (cachedDeviceId) {
    return cachedDeviceId;
  }

  const storedId = localStorage.getItem(DEVICE_STORAGE_KEY);
  if (storedId) {
    cachedDeviceId = storedId;
    return storedId;
  }

  try {
    const fp = await FingerprintJS.load();
    const result = await fp.get();

    //visitorId is the fingerprint
    const fingerprintId = result.visitorId;

    localStorage.setItem(DEVICE_STORAGE_KEY, fingerprintId);
    cachedDeviceId = fingerprintId;

    return fingerprintId;
  } catch (error) {
    console.error('Failed to generate fingerprint:', error);

    //fallback to a random UUID
    const fallbackId = crypto.randomUUID();
    localStorage.setItem(DEVICE_STORAGE_KEY, fallbackId);
    cachedDeviceId = fallbackId;
    return fallbackId;
  }
}

//synchronous version for contexts where we cant use async
export function getDeviceIdSync(): string {
  if (typeof window === 'undefined') {
    return 'server-side-placeholder';
  }

  if (cachedDeviceId) {
    return cachedDeviceId;
  }

  const storedId = localStorage.getItem(DEVICE_STORAGE_KEY);
  if (storedId) {
    cachedDeviceId = storedId;
    return storedId;
  }

  //if no device ID yet, return a temporary one, it will be replaced with the fingerprint once generated
  const tempId = `temp-${Date.now()}`;
  return tempId;
}
