'use client';

import { useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { Pie, PieChart, PieLabelRenderProps, TooltipProps } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip } from '@/components/ui/chart';
import { useChannelMetrics } from '@/ui/hooks/ui/useChannelMetrics';
import { ExportDropdown } from '../../ExportDropdown';
import { useDateRangeStore } from '@/ui/stores/useDateRangeStore';

export function OnboardingChannelPieChart() {
  const t = useTranslations();
  const fromDate = useDateRangeStore((state) => state.fromDate);
  const toDate = useDateRangeStore((state) => state.toDate);
  const { metrics, loading, error } = useChannelMetrics(fromDate, toDate);

  const chartConfig: Record<string, { label: string; color: string }> = useMemo(
    () => ({
      CITIZEN_APP: { label: t('Charts.CITIZEN_APP'), color: '#2EC4B6' },
      AGENT_APP: { label: t('Charts.AGENT_APP'), color: '#F4743B' },
      BANK_PORTAL: { label: t('Charts.BANK_PORTAL'), color: '#F6A600' },
      WEB_PORTAL: { label: t('Charts.WEB_PORTAL'), color: '#DC1B25' },
      XALQ_FILE: { label: t('Charts.XALQ_PORTAL'), color: '#FFB700' },
      HTTP_CLIENT: { label: t('Charts.HTTP_CLIENT'), color: '#253A60' },
    }),
    [t]
  );

  const chartData = useMemo(() => {
    if (!metrics) {
      return [];
    }
    return Object.entries(metrics.channels).map(([key, value]) => {
      let label = chartConfig[key]?.label;
      if (!label) {
        try {
          label = t(`Charts.${key}` as any);
        } catch {
          label = key;
        }
      }
      return {
        onboardingChannel: label,
        Total: value.Total,
        Failed: value.Failed,
        Success: value.Success,
        fill: chartConfig[key]?.color || '#000',
      };
    });
  }, [metrics, t, chartConfig]);

  //total requests
  const totals = useMemo(() => {
    return chartData.reduce(
      (acc, cur) => ({
        Total: acc.Total + cur.Total,
        Success: acc.Success + cur.Success,
        Failed: acc.Failed + cur.Failed,
      }),
      { Total: 0, Success: 0, Failed: 0 }
    );
  }, [chartData]);

  const totalHolders = useMemo(
    () => chartData.reduce((sum, entry) => sum + entry.Total, 0),
    [chartData]
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[25vh] w-full rounded-md">
        <div className="w-10 h-10 border-4 border-t-blue-500 border-gray-300 rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
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
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={12}
        fontWeight="semibold"
      >
        {((Number(value) / totalHolders) * 100).toFixed(1)}%
      </text>
    );
  };

  const CustomTooltip = ({ active, payload }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-[6px] rounded-lg shadow-md text-xs w-42">
          <p className="font-semibold pb-1">{data.onboardingChannel}</p>
          <div>
            <div className="flex justify-between">
              <p className="text-gray-500">{t('Charts.totalRequests')}</p>
              <p className="text-gray-500 ">{data.Total}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-500">{t('Charts.successfulRequests')}</p>
              <p className="text-gray-500">{data.Success}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-500">{t('Charts.failedRequests')}</p>
              <p className="text-gray-500">{data.Failed}</p>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="w-full min-h-[690px] p-6 bg-white rounded-[24px] flex flex-col border-l-0 border-t-0 border-b-0  2xl:border-b-0 shadow-none">
      <div className="flex justify-between pr-8">
        <CardHeader>
          <CardTitle>{t('Charts.onboardingChannel')}</CardTitle>
        </CardHeader>
        <div className="flex justify-center">
          <ExportDropdown
            chartData={chartData}
            fileName={t('Charts.onboardingChannel')}
            labelMapping={{
              onboardingChannel: t('Charts.onboardingChannel'),
              Total: t('Charts.totalRequests'),
              Failed: t('Charts.failedRequests'),
              Success: t('Charts.successfulRequests'),
            }}
          />
        </div>
      </div>
      <CardContent className="flex items-center justify-center pb-0">
        <ChartContainer config={chartConfig} className="aspect-square min-h-[320px]">
          <PieChart>
            <ChartTooltip cursor={false} content={<CustomTooltip />} />
            <Pie
              label={renderLabel}
              labelLine={false}
              data={chartData}
              dataKey="Total"
              nameKey="onboardingChannel"
              innerRadius={75}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <div className="flex flex-col gap-2 overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">
                  {t('Charts.channels')}
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">
                  {t('Charts.totalRequests')}
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">
                  {t('Charts.successfulRequests')}
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">
                  {t('Charts.failedRequests')}
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 ">%</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {chartData.map((entry) => {
                const percentage =
                  totalHolders > 0 ? ((entry.Total / totalHolders) * 100).toFixed(1) : '0.0';
                return (
                  <tr key={entry.onboardingChannel}>
                    <td className="px-4 py-2 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <span
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: entry.fill }}
                        />
                        <span className="text-sm font-medium">{entry.onboardingChannel}</span>
                      </div>
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                      {entry.Total}
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                      {entry.Success}
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                      {entry.Failed}
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                      {percentage}%
                    </td>
                  </tr>
                );
              })}
              {/* Total Requests row */}
              <tr className="bg-neutral-50 font-semibold">
                <td className="px-4 py-2 whitespace-nowrap">{t('Charts.totalRequests')}</td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                  {totals.Total}
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                  {totals.Success}
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                  {totals.Failed}
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">100%</td>
              </tr>
            </tbody>
          </table>
        </div>
    </Card>
  );
}

