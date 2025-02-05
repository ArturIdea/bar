'use client';

import { useEffect } from 'react';
import { setupDependencies } from '@/core/di/setup';

export function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    setupDependencies();
  }, []);

  return <>{children}</>;
}
