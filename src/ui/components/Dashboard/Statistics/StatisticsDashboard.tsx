import React from 'react';
import { useRegistrationRequestPercentage } from '@/ui/hooks/ui/useRegistrationRequestPercentage';
import { useStatistics } from '@/ui/hooks/ui/useStatistics';
import { useUsers } from '@/ui/hooks/ui/useUsers';
import { useDateRangeStore } from '@/ui/stores/useDateRangeStore';
import PercentageBarGraph from '../Charts/PercentageGraph/PercentageGraph';
import LivenessPills from './LivenessPills';
import { StatisticsSkeleton } from './StatisticsSkeleton';

export const StatisticsDashboard = () => {
  const fromDate = useDateRangeStore((s) => s.fromDate);
  const toDate = useDateRangeStore((s) => s.toDate);

  const { total, loading: usersLoading } = useUsers(
    0, // page
    0, // size
    undefined, // registrationChannel
    undefined, // createdAtFrom
    undefined, // createdAtTo
    undefined, // pinflSearch
    undefined, // usernameSearch
    undefined, // createdBy
    true // isCitizen,
  );
  const {  loading: statsLoading } = useStatistics();
  const { data: registrationData, loading: registrationLoading } = useRegistrationRequestPercentage(
    fromDate,
    toDate
  );

  const customColors = {
    total: 'rgb(33, 87, 226)',
    successful: 'rgb(19, 171, 63)',
    failed: 'rgb(220, 27, 37)',
    dropped_off: 'rgb(255, 165, 0)'
  };

  if (usersLoading) {
    return (
      <div className="w-full flex justify-end py-2 px-6">
        <div className="h-16 w-64 bg-gray-200 rounded-full animate-pulse" />
      </div>
    );
  }

  if (statsLoading || registrationLoading) {
    return <StatisticsSkeleton />;
  }

  return (
    <>
      {/* Total Users and Liveness Pills */}
      <div className="w-full flex justify-end py-2 px-6 text-[32px]">
        Onboarded Users: {total}
      </div>
      <LivenessPills />

      <div className="flex w-full">
        <div className="">
          {/* graph */}
          {registrationData && registrationData.length > 0 ? (
            <PercentageBarGraph
              data={registrationData}
              colors={customColors}
              fromDate={fromDate}
              title='Registration Requests'
              toDate={toDate}
              width={700}
              height={300}
              barWidth={50}
            />
          ) : (
            <div className="w-full text-center text-gray-500">No data available</div>
          )}
        </div>
      </div>
    </>
  );
};
