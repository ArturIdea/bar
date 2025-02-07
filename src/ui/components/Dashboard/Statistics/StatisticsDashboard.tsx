import React from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import CardsIssuedIcon from '@/../public/images/icons/dashboard/statistics/cardsIssued.svg';
import FundsDisbursedIcon from '@/../public/images/icons/dashboard/statistics/fundsDisbursed.svg';
import NewAccountsIcon from '@/../public/images/icons/dashboard/statistics/newAccounts.svg';
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

  return (
    <div className="flex items-center gap-12 p-6">
      {/* New Accounts */}
      <div className="flex items-center gap-4">
        <Image src={NewAccountsIcon} alt="New Accounts Icon" className="w-12 h-12" />
        <div>
          <h4 className="text-gray-400">{t('Statistics.newAccounts')}</h4>
          <p className="text-4xl font-bold">{currentStats?.newAccountsSince || 0}</p>
          {previousStats &&
            renderChangeIndicator(
              currentStats?.newAccountsSince || 0,
              previousStats?.newAccountsSince || 0
            )}
        </div>
      </div>

      <div className="border-l border-gray-300 h-16" />

      {/* Funds Disbursed */}
      <div className="flex items-center gap-4">
        <Image src={FundsDisbursedIcon} alt="Funds Disbursed Icon" className="w-12 h-12" />
        <div>
          <h4 className="text-gray-400">{t('Statistics.fundsDisbursed')}</h4>
          <p className="text-4xl font-bold">{currentStats?.newFundsDisbursedSince || 0}</p>
          {previousStats &&
            renderChangeIndicator(
              currentStats?.newFundsDisbursedSince || 0,
              previousStats?.newFundsDisbursedSince || 0
            )}
        </div>
      </div>

      <div className="border-l border-gray-300 h-16" />

      {/* Cards Issued */}
      <div className="flex items-center gap-4">
        <Image src={CardsIssuedIcon} alt="Cards Issued Icon" className="w-12 h-12" />
        <div>
          <h4 className="text-gray-400">{t('Statistics.cardsIssued')}</h4>
          <p className="text-4xl font-bold">{currentStats?.cardsIssuedSince || 0}</p>
          {previousStats &&
            renderChangeIndicator(
              currentStats?.cardsIssuedSince || 0,
              previousStats?.cardsIssuedSince || 0
            )}
        </div>
      </div>
    </div>
  );
};
