'use client';

import { setupDependencies } from '@/core/di/setup';

setupDependencies();
export function Providers({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
