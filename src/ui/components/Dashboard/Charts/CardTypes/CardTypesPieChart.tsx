'use client';

import { useMemo } from 'react';
import {
  Cell,
  Pie,
  PieChart,
  PieLabelRenderProps,
  Tooltip,
  TooltipProps,
} from 'recharts';
import { CardContent } from '@/components/ui/card';
import { ChartConfig, ChartContainer } from '@/components/ui/chart';
import { useCardMetrics } from '@/ui/hooks/ui/useCardMetrics';
import { useDateRangeStore } from '@/ui/stores/useDateRangeStore';
import { useTranslations } from 'next-intl';
import { ExportDropdown } from '../../ExportDropdown';

export function CardTypesPieChart() {
  const fromDate = useDateRangeStore((s) => s.fromDate);
  const toDate = useDateRangeStore((s) => s.toDate);
  const t = useTranslations();
  const { metrics, loading, error } = useCardMetrics(fromDate, toDate);

  const chartConfig: ChartConfig = useMemo(
    () => ({
      XALQ: { label: t('Charts.Xalq'), color: '#253A60' },
      ALOHA: { label: t('Charts.Aloqa'), color: '#2EC4B6' },
      NODATA: { label:  t('Charts.NoData'), color: '#BFD7B5' },
    }),
    []
  );

  const chartData = useMemo(() => {
    if (!metrics) {
      return [];
    }
    return [
      {
        cardType: t('Charts.Xalq'),
        holders: metrics.XALQ,
        fill: chartConfig.XALQ.color,
      },
      {
        cardType: t('Charts.Aloqa'),
        holders: metrics.ALOHA,
        fill: chartConfig.ALOHA.color,
      },
      {
        cardType: t('Charts.NoData'),
        holders: metrics.NODATA,
        fill: chartConfig.NODATA.color,
      },
    ];
  }, [metrics, chartConfig]);

  const totalHolders = useMemo(
    () => chartData.reduce((sum, entry) => sum + entry.holders, 0),
    [chartData]
  );

  if (loading) {
    return (
      <div className="w-full">
        <div className="flex flex-col gap-1">
          <h3 className="text-lg font-semibold">{t('Charts.UserEnrollmentDistributionbyBank')}</h3>
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
    if (!(cx && cy && midAngle && innerRadius && outerRadius && value) || totalHolders === 0) {
      return null;
    }

    const RADIAN = Math.PI / 180;
    const radius = Number(innerRadius) + (Number(outerRadius) - Number(innerRadius)) / 2;
    const x = Number(cx) + radius * Math.cos(-Number(midAngle) * RADIAN);
    const y = Number(cy) + radius * Math.sin(-Number(midAngle) * RADIAN);

    return (
      <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={12}>
        {((Number(value) / totalHolders) * 100).toFixed(1)}%
      </text>
    );
  };

  const CustomTooltip = ({ active, payload }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const percentage = ((data.holders / totalHolders) * 100).toFixed(1);
      const bankNames: { [key: string]: string } = {
        XALQ:  t('Charts.Xalq'),
        ALOHA:  t('Charts.Aloqa'),
        NODATA:  t('Charts.NoData'),
      };
      return (
        <div className="bg-white p-[6px] rounded-lg text-xs w-42 z-[10]">
          <p className="font-semibold pb-1">{bankNames[data.cardType] || data.cardType}</p>
          <div className="flex justify-between">
              <p className="text-gray-500">{t('Charts.holders')}</p>
              <p className="text-gray-500 ">{data.holders}</p>
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
    <div className="w-full min-h-[713px] p-6 bg-white rounded-[24px] flex flex-col">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-start text-[15px] font-bold mt-2 mb-[10px]">
          {t('Charts.UserEnrollmentDistributionbyBank')}
        </h3>
        <ExportDropdown
          chartData={chartData}
          fileName={t('Charts.UserEnrollmentDistributionbyBank')}
          keysToExclude={['fill']}
          labelMapping={{
            cardType: t('Charts.ResisteredUsers'),
            holders: t('Charts.NumberOfUers'),
          }}
        />
      </div>
      <div className="relative flex items-center justify-center w-full h-[330px]">
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
                dataKey="holders"
                label={renderLabel}
                labelLine={false}
                nameKey="cardType"
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
          <span className="text-xs text-gray-500"> {t('Statistics.totalUsers')}</span> 
          <span className="text-lg font-bold">{totalHolders.toLocaleString()}</span>
        </div>
      </div>
      {/* Table below chart */}
      <div className="w-full overflow-x-auto mt-2">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left border-b">
              <th className="font-normal px-4 py-2">{t('Charts.ResisteredUsers')}</th>
              <th className="font-normal px-4 py-2 text-center">{t('Charts.NumberOfUers')}</th>
              <th className="font-normal px-4 py-2 text-center">%</th>
            </tr>
          </thead>
          <tbody>
            {chartData.map((entry) => {
              const percent = totalHolders
                ? ((entry.holders / totalHolders) * 100).toFixed(0)
                : '0';
              const bankNames: { [key: string]: string } = {
                XALQ:  t('Charts.Xalq'),
                ALOHA:  t('Charts.Aloqa'),
                NODATA:  t('Charts.NoData'),
              };
              return (
                <tr key={entry.cardType}>
                  <td className="px-4 py-2 flex items-center gap-2">
                    <span
                      className="inline-block w-2 h-2 rounded-full"
                      style={{ backgroundColor: entry.fill }}
                    />
                    {bankNames[entry.cardType] || entry.cardType}
                  </td>
                  <td className="px-4 py-2 text-center">{entry.holders.toLocaleString()}</td>
                  <td className="px-4 py-2 text-center">{percent}%</td>
                </tr>
              );
            })}
            {/* Total row */}
            <tr className="font-semibold">
              <td className="px-4 py-2 flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-blue-500" /> 
                { t('Charts.TotalRegisteredUsers')}
              </td>
              <td className="px-4 py-2 text-center">{totalHolders.toLocaleString()}</td>
              <td className="px-4 py-2 text-center">100%</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
