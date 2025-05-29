import React from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import CardsIssuedIcon from '@/../public/images/icons/dashboard/statistics/cardsIssued.svg';
import { useRegistrationRequestPercentage } from '@/ui/hooks/ui/useRegistrationRequestPercentage';
// import FundsDisbursedIcon from '@/../public/images/icons/dashboard/statistics/fundsDisbursed.svg';
// import NewAccountsIcon from '@/../public/images/icons/dashboard/statistics/newAccounts.svg';
// import RejectedRequestsIcon from '@/../public/images/icons/dashboard/statistics/rejectedRequests.svg';
// import SuccessfulRequestsIcon from '@/../public/images/icons/dashboard/statistics/successfulRequests.svg';
import { useStatistics } from '@/ui/hooks/ui/useStatistics';
import { useUsers } from '@/ui/hooks/ui/useUsers';
import { useDateRangeStore } from '@/ui/stores/useDateRangeStore';
import PercentageBarGraph from '../Charts/PercentageGraph/PercentageGraph';
import LivenessPills from './LivenessPills';
import { StatisticsSkeleton } from './StatisticsSkeleton';

export const StatisticsDashboard = () => {
  const t = useTranslations();
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
  const { currentStats, previousStats, loading: statsLoading } = useStatistics();
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

  const getPercentageChange = (current: number, previous: number) => {
    if (previous === 0) {
      return current > 0 ? 100 : 0;
    }
    return (((current - previous) / previous) * 100).toFixed(1);
  };

  const renderChangeIndicator = (current: number, previous: number) => {
    const change = getPercentageChange(current, previous);
    return (
      <span
        className={`text-sm font-semibold ${
          current >= previous ? 'text-green-500' : 'text-red-500'
        }`}
      >
        {current >= previous ? '▲' : '▼'} {change}%
      </span>
    );
  };

  const StatItem = ({
    icon,
    label,
    currentValue,
    previousValue,
    reverseColor = false,
  }: {
    icon: string;
    label: string;
    currentValue: number;
    previousValue: number;
    reverseColor?: boolean;
  }) => (
    <div className="flex items-center 2xl:gap-4 gap-2">
      <Image src={icon} alt={`${label} Icon`} className="w-12 h-12" />
      <div>
        <h4 className="2xl:text-md text-sm text-gray-400">{label}</h4>
        <p className="2xl:text-4xl text-xl font-bold">{currentValue}</p>
        <div className="flex flex-col gap-2 items-start">
          {previousStats &&
            (reverseColor ? (
              <span
                className={`text-sm font-semibold ${
                  currentValue >= previousValue ? 'text-green-500' : 'text-red-500'
                }`}
              >
                {currentValue <= previousValue ? '▼' : '▲'}{' '}
                {getPercentageChange(currentValue, previousValue)}%
              </span>
            ) : (
              renderChangeIndicator(currentValue, previousValue)
            ))}
          <p className="text-sm">{t('Statistics.thisWeek')}</p>
          <span className="text-xs font-semiboldtext-gray-500">
            ({previousValue} {t('Statistics.pastWeek')})
          </span>
        </div>
      </div>
    </div>
  );

  // const Divider = () => <div className="border-l border-gray-300 h-16" />;

  return (
    <>
      {/* Total Users and Liveness Pills */}
      <div className="w-full flex justify-end py-2 px-6 text-[32px]">
        {t('Statistics.totalUsers')}: {total}
      </div>
      <LivenessPills />

      <div className="flex items-center rounded-[20px] m-3 justify-between 2xl:gap-12 gap-2 p-4 mt-4">
        <div className="flex items-center justify-between w-full">
          {/* graph */}
          {registrationData && registrationData.length > 0 ? (
            <PercentageBarGraph
              data={registrationData}
              colors={customColors}
              fromDate={fromDate}
              title='Registration Requests'
              toDate={toDate}
              width={800}
              height={250}
              barWidth={25}
            />
          ) : (
            <div className="w-full text-center text-gray-500">No data available</div>
          )}
        </div>
        {/* New Accounts */}

        {/* <div className="flex items-center justify-between w-1/5 2xl:gap-0 gap-4">
          <StatItem
            icon={NewAccountsIcon}
            label={t('Statistics.newAccounts')}
            currentValue={currentStats?.newAccountsSince || 0}
            previousValue={previousStats?.newAccountsSince || 0}
          />

          <Divider />
        </div> */}

        {/* Requests */}
        {/* <div className="flex items-center justify-between w-1/5 2xl:gap-0 gap-4">
          <StatItem
            icon={FundsDisbursedIcon}
            label={t('Statistics.requests')}
            currentValue={currentStats?.requestsSince || 0}
            previousValue={previousStats?.requestsSince || 0}
          />

          <Divider />
        </div> */}

        {/* Successful Requests */}
        {/* <div className="flex items-center justify-between w-1/5 2xl:gap-0 gap-4">
          <StatItem
            icon={SuccessfulRequestsIcon}
            label={t('Statistics.successfulRequests')}
            currentValue={currentStats?.successfulRequestsSince || 0}
            previousValue={previousStats?.successfulRequestsSince || 0}
          />

          <Divider />
        </div> */}

        {/* Failed Requests */}
        {/* <div className="flex items-center justify-between w-1/5 2xl:gap-0 gap-4">
          <StatItem
            icon={RejectedRequestsIcon}
            label={t('Statistics.failedRequests')}
            currentValue={currentStats?.failedRequestsSince || 0}
            previousValue={previousStats?.failedRequestsSince || 0}
            reverseColor
          />

          <Divider />
        </div> */}

        {/* Cards Issued */}
        <div className="flex items-center justify-between w-1/5 2xl:gap-0 gap-4">
          <StatItem
            icon={CardsIssuedIcon}
            label={t('Statistics.cardsIssued')}
            currentValue={currentStats?.cardsIssuedSince || 0}
            previousValue={previousStats?.cardsIssuedSince || 0}
          />
        </div>
      </div>
    </>
  );
};
