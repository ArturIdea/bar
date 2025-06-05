import React, { ReactNode } from 'react';
import { AgentProvider } from '@/contexts/AgentContext';

interface AgentLayoutProps {
  children: ReactNode;
}

export const AgentLayout: React.FC<AgentLayoutProps> = ({ children }) => {
  return <AgentProvider>{children}</AgentProvider>;
}; 