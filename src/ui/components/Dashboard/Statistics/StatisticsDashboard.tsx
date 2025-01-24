import React from 'react';
import Image from 'next/image';
import CardsIssuedIcon from '@/../public/images/icons/dashboard/statistics/cardsIssued.svg';
import FundsDisbursedIcon from '@/../public/images/icons/dashboard/statistics/fundsDisbursed.svg';
import NewAccountsIcon from '@/../public/images/icons/dashboard/statistics/newAccounts.svg';
import { useStatistics } from '@/ui/hooks/ui/useStatistics';

export const StatisticsDashboard = () => {
  const newAccountsSince = '2023-01-01';
  const newFundsDisbursedSince = '2023-01-01';
  const cardsIssuedSince = '2023-01-01';

  const { statistics, loading } = useStatistics(
    newAccountsSince,
    newFundsDisbursedSince,
    cardsIssuedSince
  );

  console.log(statistics);

  if (loading) {
    return <div className="text-center text-gray-500">Loading...</div>;
  }

  return (
    <div className="flex items-center gap-12 p-6">
      {/* New Accounts */}
      <div className="flex items-center gap-4">
        <Image src={NewAccountsIcon} alt="New Accounts Icon" className="w-12 h-12" />
        <div>
          <h4 className="text-gray-400">New accounts</h4>
          <p className="text-4xl font-bold">{statistics?.newAccountsSince || 0}</p>
        </div>
      </div>

      <div className="border-l border-gray-300 h-16" />

      {/* Funds Disbursed */}
      <div className="flex items-center gap-4">
        <Image src={FundsDisbursedIcon} alt="Funds Disbursed Icon" className="w-12 h-12" />
        <div>
          <h4 className="text-gray-400">Funds Disbursed</h4>
          <p className="text-4xl font-bold">{statistics?.newFundsDisbursedSince || 0}</p>
        </div>
      </div>

      <div className="border-l border-gray-300 h-16" />

      {/* Cards Issued */}
      <div className="flex items-center gap-4">
        <Image src={CardsIssuedIcon} alt="Cards Issued Icon" className="w-12 h-12" />
        <div>
          <h4 className="text-gray-400">Cards Issued</h4>
          <p className="text-4xl font-bold">{statistics?.cardsIssuedSince || 0}</p>
        </div>
      </div>
    </div>
  );
};
