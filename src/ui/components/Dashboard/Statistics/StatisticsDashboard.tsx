import React from 'react';
import { useRegistrationRequestPercentage } from '@/ui/hooks/ui/useRegistrationRequestPercentage';
import { useStatistics } from '@/ui/hooks/ui/useStatistics';
import { useDateRangeStore } from '@/ui/stores/useDateRangeStore';
import { CardTypesPieChart } from '../Charts/CardTypes/CardTypesPieChart';
import PercentageBarGraph from '../Charts/PercentageGraph/PercentageGraph';
import LivenessPills from './LivenessPills';
import { StatisticsSkeleton } from './StatisticsSkeleton';
import { useCitizensCount } from '@/ui/hooks/ui/useCitizensCount';

export const StatisticsDashboard = () => {
  const fromDate = useDateRangeStore((s) => s.fromDate);
  const toDate = useDateRangeStore((s) => s.toDate);

  const { loading: statsLoading } = useStatistics();
  const { data: registrationData, loading: registrationLoading } = useRegistrationRequestPercentage(
    fromDate,
    toDate
  );
  const { count: citizensCount, loading: citizensLoading, error: citizensError } = useCitizensCount();

  const customColors = {
    total: 'rgb(33, 87, 226)',
    successful: 'rgb(19, 171, 63)',
    failed: 'rgb(220, 27, 37)',
    dropped_off: 'rgb(255, 165, 0)',
  };

  if (citizensLoading) {
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
        {citizensError ? (
          <span className="text-red-500">Error: {citizensError}</span>
        ) : (
          <>Onboarded Users: {citizensCount}</>
        )}
      </div>
      <LivenessPills />

      <div className="flex w-full">
        <div className="w-2/3">
          {/* graph */}
          {registrationData && registrationData.length > 0 ? (
            <PercentageBarGraph
              data={registrationData}
              colors={customColors}
              fromDate={fromDate}
              title="Final Status per User Registration Attempt"
              toDate={toDate}
              width={600}
              height={300}
              barWidth={50}
            />
          ) : (
            <div className="w-full text-center text-gray-500">No data available</div>
          )}
        </div>
        <div className="h-[320px] w-[1px] mt-10 bg-gray-300 mx-4" />
        <div className="w-1/3 p-10">
          <CardTypesPieChart />
        </div>
      </div>
    </>
  );
};
