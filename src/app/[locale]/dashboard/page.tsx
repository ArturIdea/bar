'use client';

import { SignUpRequestsTable } from '@/ui/components/Dashboard/SignupRequests/SignupRequestsTable';
import { StatisticsDashboard } from '@/ui/components/Dashboard/Statistics/StatisticsDashboard';
import { UsersTable } from '@/ui/components/Dashboard/Users/UsersTable';
import { useAuth } from '@/ui/hooks/ui/useAuth';

const DashboardPage = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <div>Checking authentication...</div>;
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
