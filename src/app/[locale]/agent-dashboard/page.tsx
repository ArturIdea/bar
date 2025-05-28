'use client';

import { useAuth } from '@/ui/hooks/ui/useAuth';
import UserLookup from './components/UserLookup';
import { StatisticsDashboard } from './components/StatisticsDashboard';

const AgentDashboardPage = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-10 h-10 border-4 border-t-blue-500 border-gray-300 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <StatisticsDashboard />
      <UserLookup />
    </div>
  );
};

export default AgentDashboardPage; 