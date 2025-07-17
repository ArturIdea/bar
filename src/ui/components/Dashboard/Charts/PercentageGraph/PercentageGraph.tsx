import React from 'react';

import './PercentageBarGraph.css';
import { useTranslations } from 'next-intl';
import { ExportDropdown } from '../../ExportDropdown';

interface PercentageBarGraphProps {
  data: Array<{
    classification: string;
    percentage: number;
    count: number;
  }>;
  colors?: { [key: string]: string };
  fromDate?: string;
  toDate?: string;
}

const PercentageBarGraph: React.FC<PercentageBarGraphProps> = ({ data, colors }) => {
  // Find total and other statuses
  const totalItem = data.find((item) => item.classification.toLowerCase() === 'total');
  const successfulItem = data.find((item) => item.classification.toLowerCase() === 'successful');
  const failedItem = data.find((item) => item.classification.toLowerCase() === 'failed');
  const abandonedItem = data.find((item) => item.classification.toLowerCase() === 'dropped_off');
  const t = useTranslations();

  const defaultColors = {
    total: 'rgb(33, 87, 226)',
    successful: 'rgb(19, 171, 63)',
    failed: 'rgb(220, 27, 37)',
    dropped_off: 'rgb(255, 165, 0)',
    default: '#2196F3',
  };

  const cardData = [
    {
      key: 'total',
      label: t('Charts.totalRequests'),
      value: totalItem?.count ?? 0,
      percentage: undefined,
      color: colors?.total || defaultColors.total,
      isPercentage: false,
      count: totalItem?.count ?? 0,
    },
    {
      key: 'successful',
      label: t('Charts.successfulRequests'),
      value: successfulItem?.percentage ?? 0,
      percentage: successfulItem?.percentage,
      color: colors?.successful || defaultColors.successful,
      isPercentage: true,
      count: successfulItem?.count ?? 0,
    },
    {
      key: 'failed',
      label: t('Charts.failedRequests'),
      value: failedItem?.percentage ?? 0,
      percentage: failedItem?.percentage,
      color: colors?.failed || defaultColors.failed,
      isPercentage: true,
      count: failedItem?.count ?? 0,
    },
    {
      key: 'dropped_off',
      label: t('Charts.AbandonedRequest'),
      value: abandonedItem?.percentage ?? 0,
      percentage: abandonedItem?.percentage,
      color: colors?.dropped_off || defaultColors.dropped_off,
      isPercentage: true,
      count: abandonedItem?.count ?? 0,
    },
  ];

  // Prepare export data
  const exportData = [
    {
      [t('Charts.totalRequests')]: totalItem?.count ?? 0,
      [t('Charts.successfulRequests')]: `${Number(successfulItem?.percentage ?? 0).toFixed(2)}% (${successfulItem?.count ?? 0})`,
      [t('Charts.failedRequests')]: `${Number(failedItem?.percentage ?? 0).toFixed(2)}% (${failedItem?.count ?? 0})`,
      [t('Charts.AbandonedRequest')]: `${Number(abandonedItem?.percentage ?? 0).toFixed(2)}% (${abandonedItem?.count ?? 0})`,
    },
  ];

  // Label mapping for ExportDropdown
  const labelMapping = {
    [t('Charts.totalRequests')]: t('Charts.totalRequests'),
    [t('Charts.successfulRequests')]: t('Charts.successfulRequests'),
    [t('Charts.failedRequests')]: t('Charts.failedRequests'),
    [t('Charts.AbandonedRequest')]: t('Charts.AbandonedRequest'),
  };

  return (
    <div className="percentage-stats-container p-3">
      <div className="flex justify-between items-center p-2">
        <h2 className="stats-title">{t('Navbar.FinalStatusperUserRegistrationAttempt')}</h2>
        <ExportDropdown
          chartData={exportData}
          fileName={t('Charts.registrationOverview')}
          labelMapping={labelMapping}
        />
      </div>
      
      <div className="stats-grid grid-cols-4">
        {cardData.map((item) => (
          <div key={item.key} className="stat-item p-4 bg-white rounded-[16px]">
            <div className="stat-percentage" style={{ color: item.color }}>
              {item.isPercentage ? `${Number(item.value).toFixed(2)}%` : item.value}
            </div>
            <div className="text-[#9D9DA7] text-[14px] font-normal leading-normal">
              {item.label}
            </div>
            {item.isPercentage && (
              <div className="text-[#9D9DA7] text-[14px] font-normal leading-normal">
              { t('Charts.Count')}: {item.count}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PercentageBarGraph;
