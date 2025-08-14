'use client';

import { useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Cell, Pie, PieChart, PieLabelRenderProps, Tooltip, TooltipProps } from 'recharts';
import { CardContent } from '@/components/ui/card';
import { ChartConfig, ChartContainer } from '@/components/ui/chart';
import { useCardIssuanceMetrics } from '@/ui/hooks/ui/useCardIssuanceMetrics';
import { useDateRangeStore } from '@/ui/stores/useDateRangeStore';
import { ExportDropdown } from '../../ExportDropdown';
import { UsersWithoutCardsTable } from './UsersWithoutCardsTable';

export function CardIssuancePieChart() {
  const [showUsersTable, setShowUsersTable] = useState(false);
  const fromDate = useDateRangeStore((s) => s.fromDate);
  const toDate = useDateRangeStore((s) => s.toDate);
  const t = useTranslations();
  const { metrics, loading, error } = useCardIssuanceMetrics(fromDate, toDate);

  const chartConfig: ChartConfig = useMemo(
    () => ({
      cardsPrinted: { label: t('Charts.CardsPrinted'), color: '#13AB3F' },
      cardsPendingPrinting: { label: t('Charts.CardsPendingPrinting'), color: '#DC1B25' },
      usersWithNoCardIssued: { label: t('Charts.UsersWithNoCardIssued'), color: '#FFA500' },
    }),
    [t]
  );

  const chartData = useMemo(() => {
    if (!metrics) {
      return [];
    }
    return [
      {
        category: t('Charts.CardsPrinted'),
        value: metrics.cardsPrinted,
        percentage: metrics.cardsPrintedPercentage,
        fill: chartConfig.cardsPrinted.color,
        key: 'cardsPrinted',
      },
      {
        category: t('Charts.CardsPendingPrinting'),
        value: metrics.cardsPendingPrinting,
        percentage: metrics.cardsPendingPrintingPercentage,
        fill: chartConfig.cardsPendingPrinting.color,
        key: 'cardsPendingPrinting',
      },
      {
        category: t('Charts.UsersWithNoCardIssued'),
        value: metrics.usersWithNoCardIssued,
        percentage: metrics.usersWithNoCardIssuedPercentage,
        fill: chartConfig.usersWithNoCardIssued.color,
        key: 'usersWithNoCardIssued',
      },
    ];
  }, [metrics, chartConfig, t]);

  const totalUsers = useMemo(() => metrics?.totalOnboardedBeneficiaries || 0, [metrics]);

  if (loading) {
    return (
      <div className="w-full">
        <div className="flex flex-col gap-1">
          <h3 className="text-lg font-semibold">{t('Charts.CardIssuanceOverview')}</h3>
        </div>
        <div className="flex items-center justify-center h-[300px]">
          <div className="w-8 h-8 border-4 border-t-blue-500 border-gray-300 rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (chartData.length === 0) {
    return <p className="text-gray-500">Data Unavailable</p>;
  }

  const renderLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    value,
  }: PieLabelRenderProps) => {
    if (!(cx && cy && midAngle && innerRadius && outerRadius && value) || totalUsers === 0) {
      return null;
    }

    const RADIAN = Math.PI / 180;
    const radius = Number(innerRadius) + (Number(outerRadius) - Number(innerRadius)) / 2;
    const x = Number(cx) + radius * Math.cos(-Number(midAngle) * RADIAN);
    const y = Number(cy) + radius * Math.sin(-Number(midAngle) * RADIAN);

    return (
      <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={12}>
        {((Number(value) / totalUsers) * 100).toFixed(1)}%
      </text>
    );
  };

  const CustomTooltip = ({ active, payload }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const percentage = ((data.value / totalUsers) * 100).toFixed(1);

      return (
        <div
          className="bg-white p-[6px] rounded-lg text-xs w-50 shadow-lg"
          style={{ transform: 'translate(95%, 0)', zIndex: 9999 }}
        >
          <p className="font-semibold pb-1">{data.category}</p>
          <div className="flex justify-between">
            <p className="text-gray-500">{t('Charts.Count')}</p>
            <p className="text-gray-500">{data.value.toLocaleString()}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-500">{t('Charts.percentage')}</p>
            <p className="text-gray-500">{percentage}%</p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full p-6 bg-white rounded-[24px] flex flex-col">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-start text-[15px] font-bold mt-2 mb-[10px]">
          {t('Charts.CardIssuanceOverview')}
        </h3>
        <ExportDropdown
          chartData={chartData}
          fileName={t('Charts.CardIssuanceOverview')}
          keysToExclude={['fill', 'key']}
          labelMapping={{
            category: t('Charts.Category'),
            value: t('Charts.Count'),
            percentage: t('Charts.percentage'),
          }}
        />
      </div>

      <div className="flex justify-between p-10">
        <div className="relative flex items-center justify-center w-1/4 h-[330px]">
          <CardContent className="flex items-center pb-0">
            <ChartContainer config={chartConfig} className="aspect-square min-h-[320px]">
              <PieChart width={320} height={320}>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="value"
                  label={renderLabel}
                  labelLine={false}
                  nameKey="category"
                  isAnimationActive={false}
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ChartContainer>
          </CardContent>

          {/* Centered total users */}
          <div
            className="absolute left-1/2 top-1/2 flex flex-col items-center justify-center"
            style={{ transform: 'translate(-50%, -50%)' }}
          >
            <span className="text-xs text-gray-500">{t('Statistics.totalUsers')}</span>
            <span className="text-lg font-bold">{totalUsers.toLocaleString()}</span>
          </div>
        </div>

        {/* Data Cards */}
        <div className="flex justify-between items-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            {chartData.map((entry) => (
              <div
                key={entry.key}
                className={`bg-gray-50 p-4 rounded-lg text-start ${
                  entry.key === 'usersWithNoCardIssued'
                    ? 'cursor-pointer hover:bg-gray-100 transition-colors'
                    : ''
                }`}
                role={entry.key === 'usersWithNoCardIssued' ? 'button' : undefined}
                tabIndex={entry.key === 'usersWithNoCardIssued' ? 0 : undefined}
                onKeyDown={(e) => {
                  if (
                    entry.key === 'usersWithNoCardIssued' &&
                    (e.key === 'Enter' || e.key === ' ')
                  ) {
                    e.preventDefault();
                    setShowUsersTable(!showUsersTable);
                  }
                }}
                onClick={() => {
                  if (entry.key === 'usersWithNoCardIssued') {
                    setShowUsersTable(!showUsersTable);
                  }
                }}
              >
                <div className="text-2xl font-bold" style={{ color: entry.fill }}>
                  {entry.value.toLocaleString()}
                </div>
                <div className="text-sm font-bold text-black-600 mt-1">{entry.category}</div>
                <div className="text-sm text-black-500 mt-1">
                  {t('Charts.percentage')}: {entry.percentage.toFixed(1)}%
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Users Without Cards Table - Inline */}
      {showUsersTable && (
        <div>
          <UsersWithoutCardsTable onClose={() => setShowUsersTable(false)} />
        </div>
      )}
    </div>
  );
}
