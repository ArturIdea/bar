import React from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import CardsIssuedIcon from '@/../public/images/icons/dashboard/statistics/cardsIssued.svg';
import FundsDisbursedIcon from '@/../public/images/icons/dashboard/statistics/fundsDisbursed.svg';
import NewAccountsIcon from '@/../public/images/icons/dashboard/statistics/newAccounts.svg';
import RejectedRequestsIcon from '@/../public/images/icons/dashboard/statistics/rejectedRequests.svg';
import SuccessfulRequestsIcon from '@/../public/images/icons/dashboard/statistics/successfulRequests.svg';
import { useStatistics } from '@/ui/hooks/ui/useStatistics';
import { StatisticsSkeleton } from './StatisticsSkeleton';

export const StatisticsDashboard = () => {
  const t = useTranslations();
  const { currentStats, previousStats, loading } = useStatistics();

  if (loading) {
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
        className={`text-sm font-semibold ${current >= previous ? 'text-green-500' : 'text-red-500'}`}
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
    <div className="flex items-center gap-4">
      <Image src={icon} alt={`${label} Icon`} className="w-12 h-12" />
      <div>
        <h4 className="text-gray-400">{label}</h4>
        <p className="text-4xl font-bold">{currentValue}</p>
        <div className="flex gap-2">
          {previousStats &&
            (reverseColor ? (
              <span
                className={`text-sm font-semibold ${currentValue <= previousValue ? 'text-green-500' : 'text-red-500'}`}
              >
                {currentValue <= previousValue ? '▼' : '▲'}{' '}
                {getPercentageChange(currentValue, previousValue)}%
              </span>
            ) : (
              renderChangeIndicator(currentValue, previousValue)
            ))}{' '}
          <p className="text-sm">{t('Statistics.thisWeek')}</p>
        </div>
      </div>
    </div>
  );

  const Divider = () => <div className="border-l border-gray-300 h-16" />;

  return (
    <div className="flex items-center justify-center gap-12 p-6">
      {/* New Accounts */}
      <div className="flex items-center justify-between w-1/5">
        <StatItem
          icon={NewAccountsIcon}
          label={t('Statistics.newAccounts')}
          currentValue={currentStats?.newAccountsSince || 0}
          previousValue={previousStats?.newAccountsSince || 0}
        />

        <Divider />
      </div>

      {/* Requests */}
      <div className="flex items-center justify-between w-1/5">
        <StatItem
          icon={FundsDisbursedIcon}
          label={t('Statistics.requests')}
          currentValue={currentStats?.requestsSince || 0}
          previousValue={previousStats?.requestsSince || 0}
        />

        <Divider />
      </div>

      {/* Successful Requests */}
      <div className="flex items-center justify-between w-1/5">
        <StatItem
          icon={SuccessfulRequestsIcon}
          label={t('Statistics.successfulRequests')}
          currentValue={currentStats?.successfulRequestsSince || 0}
          previousValue={previousStats?.successfulRequestsSince || 0}
        />

        <Divider />
      </div>

      {/* Failed Requests */}
      <div className="flex items-center justify-between w-1/5">
        <StatItem
          icon={RejectedRequestsIcon}
          label={t('Statistics.failedRequests')}
          currentValue={currentStats?.failedRequestsSince || 0}
          previousValue={previousStats?.failedRequestsSince || 0}
          reverseColor
        />

        <Divider />
      </div>

      {/* Cards Issued */}
      <div className="flex items-center justify-between w-1/5">
        <StatItem
          icon={CardsIssuedIcon}
          label={t('Statistics.cardsIssued')}
          currentValue={currentStats?.cardsIssuedSince || 0}
          previousValue={previousStats?.cardsIssuedSince || 0}
        />
      </div>
    </div>
  );
};
