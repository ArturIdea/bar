import React from 'react';
import { useCitizensCount } from '@/ui/hooks/ui/useCitizensCount';
import { useRegistrationRequestPercentage } from '@/ui/hooks/ui/useRegistrationRequestPercentage';
import { useStatistics } from '@/ui/hooks/ui/useStatistics';
import { useDateRangeStore } from '@/ui/stores/useDateRangeStore';
import PercentageBarGraph from '../Charts/PercentageGraph/PercentageGraph';
import LivenessPills from './LivenessPills';
import { StatisticsSkeleton } from './StatisticsSkeleton';
import { useTranslations } from 'next-intl';

export const StatisticsDashboard = () => {
  const fromDate = useDateRangeStore((s) => s.fromDate);
  const toDate = useDateRangeStore((s) => s.toDate);
  const t = useTranslations();

  const { loading: statsLoading } = useStatistics();
  const { data: registrationData, loading: registrationLoading } = useRegistrationRequestPercentage(
    fromDate,
    toDate
  );
  const {
    count: citizensCount,
    loading: citizensLoading,
    error: citizensError,
  } = useCitizensCount();

  const customColors = {
    total: '#13AB3F',
    successful: '#13AB3F',
    failed: '#DC1B25',
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
      <div className="flex gap-2 justify-between">
        <div className="">
          <LivenessPills />
        </div>
        <div className="py-2 px-6 text-[24px]">
          {citizensError ? (
            <span className="text-red-500">{t('StatisticsDashboard.Error')}: {citizensError}</span>
          ) : (
            <span className='text-[#0B0B22] font-medium leading-normal'>{t('StatisticsDashboard.citizensCount')}: {citizensCount}</span>
          )}
        </div>
      </div>
      <div className="w-full">
        {/* graph */}
        {registrationData && registrationData.length > 0 ? (
          <PercentageBarGraph
            data={registrationData}
            colors={customColors}
            fromDate={fromDate}
            toDate={toDate}
          />
        ) : (
          <div className="w-full text-center text-gray-500">{t('StatisticsDashboard.NoData')}</div>
        )}
      </div>
    </>
  );
};
