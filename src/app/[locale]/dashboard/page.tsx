'use client';

import { SignUpRequestsTable } from '@/ui/components/Dashboard/SignupRequests/SignupRequestsTable';
import { StatisticsDashboard } from '@/ui/components/Dashboard/Statistics/StatisticsDashboard';
import { UsersTable } from '@/ui/components/Dashboard/Users/UsersTable';
import { useAuth } from '@/ui/hooks/ui/useAuth';

const DashboardPage = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-10 h-10 border-4 border-t-blue-500 border-gray-300 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <StatisticsDashboard />
      <SignUpRequestsTable />
      <UsersTable />
    </div>
  );
};

export default DashboardPage;
