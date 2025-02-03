import React from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import CardsIssuedIcon from '@/../public/images/icons/dashboard/statistics/cardsIssued.svg';
import FundsDisbursedIcon from '@/../public/images/icons/dashboard/statistics/fundsDisbursed.svg';
import NewAccountsIcon from '@/../public/images/icons/dashboard/statistics/newAccounts.svg';
import { useStatistics } from '@/ui/hooks/ui/useStatistics';
import { StatisticsSkeleton } from './StatisticsSkeleton';

export const StatisticsDashboard = () => {
  const newAccountsSince = '2023-01-01';
  const newFundsDisbursedSince = '2023-01-01';
  const cardsIssuedSince = '2023-01-01';
  const t = useTranslations();

  const { statistics, loading } = useStatistics(
    newAccountsSince,
    newFundsDisbursedSince,
    cardsIssuedSince
  );

  if (loading) {
    return <StatisticsSkeleton />;
  }

  return (
    <div className="flex items-center gap-12 p-6">
      {/* New Accounts */}
      <div className="flex items-center gap-4">
        <Image src={NewAccountsIcon} alt="New Accounts Icon" className="w-12 h-12" />
        <div>
          <h4 className="text-gray-400">{t('Statistics.newAccounts')}</h4>
          <p className="text-4xl font-bold">{statistics?.newAccountsSince || 0}</p>
        </div>
      </div>

      <div className="border-l border-gray-300 h-16" />

      {/* Funds Disbursed */}
      <div className="flex items-center gap-4">
        <Image src={FundsDisbursedIcon} alt="Funds Disbursed Icon" className="w-12 h-12" />
        <div>
          <h4 className="text-gray-400">{t('Statistics.fundsDisbursed')}</h4>
          <p className="text-4xl font-bold">{statistics?.newFundsDisbursedSince || 0}</p>
        </div>
      </div>

      <div className="border-l border-gray-300 h-16" />

      {/* Cards Issued */}
      <div className="flex items-center gap-4">
        <Image src={CardsIssuedIcon} alt="Cards Issued Icon" className="w-12 h-12" />
        <div>
          <h4 className="text-gray-400">{t('Statistics.fundsDisbursed')}</h4>
          <p className="text-4xl font-bold">{statistics?.cardsIssuedSince || 0}</p>
        </div>
      </div>
    </div>
  );
};
