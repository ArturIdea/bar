'use client';

import { setupDependencies } from '@/core/di/setup';
import { AgentProvider } from '@/contexts/AgentContext';

setupDependencies();
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AgentProvider>
      {children}
    </AgentProvider>
  );
}
