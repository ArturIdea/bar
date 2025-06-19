import React from 'react';
import AgentLivenessPills from '@/ui/components/Dashboard/Statistics/AgentLivenessPills';
import { StatisticsSkeleton } from '@/ui/components/Dashboard/Statistics/StatisticsSkeleton';
import { useStatistics } from '@/ui/hooks/ui/useStatistics';
import { useUsers } from '@/ui/hooks/ui/useUsers';

export const StatisticsDashboard = () => {
  // const t = useTranslations();
  const { loading: usersLoading } = useUsers(
    0, // page
    0, // size
    undefined, // registrationChannel
    undefined, // fromDate
    undefined, // toDate
    undefined, // pinflSearch
    undefined, // usernameSearch
    undefined, // createdBy
    // 'true' // isCitizen,
  );
  const { loading: statsLoading } = useStatistics();

  if (usersLoading) {
    return (
      <div className="w-full flex justify-end py-2 px-6">
        <div className="h-16 w-64 bg-gray-200 rounded-full animate-pulse" />
      </div>
    );
  }

  if (statsLoading) {
    return <StatisticsSkeleton />;
  }

  return (
    <>
      {/* Total Users and Liveness Pills */}
      {/* <div className="w-full flex justify-end py-2 px-6 text-[32px]">
        {t('Statistics.totalUsers')}: {total}
      </div> */}
      <div className="mt-8">
        <AgentLivenessPills />
      </div>
    </>
  );
};
