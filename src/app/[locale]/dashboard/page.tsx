'use client';

import { AgentsTable } from '@/ui/components/Dashboard/Agents/AgentsTable';
import { StatisticsDashboard } from '@/ui/components/Dashboard/Statistics/StatisticsDashboard';
import { AdminUsersTable } from '@/ui/components/Dashboard/SuperAdmin/UserTable/UsersTable';
import { UsersTable } from '@/ui/components/Dashboard/Users/UsersTable';
import { useAuth } from '@/ui/hooks/ui/useAuth';
import { useUserRoles } from '@/ui/hooks/ui/useUserRoles';
import { useDateRangeStore } from '@/ui/stores/useDateRangeStore';
import Charts from './Charts/page';
import SignUpRequests from './signup-requests/page';

const DashboardPage = () => {
  const { isAuthenticated } = useAuth();
  const { isAdmin, isSuperAdmin } = useUserRoles();
  const fromDate = useDateRangeStore((s) => s.fromDate);
  const toDate = useDateRangeStore((s) => s.toDate);

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-10 h-10 border-4 border-t-blue-500 border-gray-300 rounded-full animate-spin" />
      </div>
    );
  }

  if (isSuperAdmin) {
    return (
      <>
        <StatisticsDashboard />
        <Charts />
        <AdminUsersTable filters={{ fromDate, toDate }} />
        <AgentsTable />
        <SignUpRequests />
      </>
    );
  }

  if (isAdmin) {
    return (
      <div>
        <StatisticsDashboard />
        <Charts />
        <UsersTable filters={{ fromDate, toDate }} />
        <AgentsTable />
        <SignUpRequests />
      </div>
    );
  }

  return null;
};

export default DashboardPage;
