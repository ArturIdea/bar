'use client';

import { useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { Cell, Pie, PieChart, PieLabelRenderProps, TooltipProps } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartConfig, ChartContainer, ChartTooltip } from '@/components/ui/chart';
import { useCardMetrics } from '@/ui/hooks/ui/useCardMetrics';
import { ExportDropdown } from '../../ExportDropdown';

export function CardTypesPieChart() {
  const t = useTranslations();
  const { metrics, loading, error } = useCardMetrics();

  const chartConfig: ChartConfig = useMemo(
    () => ({
      physical: { label: t('Charts.physicalCard'), color: '#13AB3F' },
      virtual: { label: t('Charts.virtualCard'), color: '#2157E2' },
    }),
    [t]
  );

  const chartData = useMemo(() => {
    if (!metrics) {
      return [];
    }
    return [
      {
        cardType: t('Charts.physicalCard'),
        holders: metrics.physicalCards,
        fill: chartConfig.physical.color,
      },
      {
        cardType: t('Charts.virtualCard'),
        holders: metrics.virtualCards,
        fill: chartConfig.virtual.color,
      },
    ];
  }, [metrics, t, chartConfig]);

  const totalHolders = useMemo(
    () => chartData.reduce((sum, entry) => sum + entry.holders, 0),
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
      return (
        <div className="bg-white p-[6px] rounded-lg shadow-md text-xs w-42">
          <p className="font-semibold pb-1">{data.cardType}</p>
          <div>
            <div className="flex justify-between">
              <p className="text-gray-500">{t('Charts.holders')}</p>
              <p className="text-gray-500 ">{data.holders}</p>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="w-full flex flex-col border-l-0 border-t-0 2xl:border-l 2xl:border-r-0 2xl:border-t-0 rounded-none shadow-none">
      <div className="flex justify-between pr-8">
        <CardHeader>
          <CardTitle>{t('Charts.cardTypes')}</CardTitle>
        </CardHeader>
        <div className="flex justify-center items-center gap-2">
          <ExportDropdown
            chartData={chartData}
            fileName={t('Charts.cardTypes')}
            labelMapping={{ cardType: t('Charts.cardTypes'), holders: t('Charts.holders') }}
          />
        </div>
      </div>

      <CardContent className="flex 2xl:gap-16 gap-8 items-center 2xl:justify-center h-full pb-0">
        <ChartContainer config={chartConfig} className="h-[25vh] aspect-square min-h-[350px]">
          <PieChart>
            <ChartTooltip cursor={false} content={<CustomTooltip />} />
            <Pie
              data={chartData}
              dataKey="holders"
              nameKey="cardType"
              innerRadius={85}
              label={renderLabel}
              labelLine={false}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
          </PieChart>
        </ChartContainer>
        <div className="flex flex-col gap-2">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">
                  {t('Charts.cardTypes')}
                </th>

                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">
                  {t('Charts.holders')}
                </th>

                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 ">%</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {chartData.map((entry) => {
                const percentage =
                  totalHolders > 0 ? ((entry.holders / totalHolders) * 100).toFixed(1) : '0.0';
                return (
                  <tr key={entry.cardType}>
                    <td className="px-4 py-2 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <span
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: entry.fill }}
                        />
                        <span className="text-sm font-medium">{entry.cardType}</span>
                      </div>
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                      {entry.holders}
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                      {percentage}%
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
