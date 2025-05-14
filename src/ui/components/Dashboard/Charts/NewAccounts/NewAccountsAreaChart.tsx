'use client';

import { useMemo } from 'react';
import { format } from 'date-fns';
import { useTranslations } from 'next-intl';
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { useUserMetrics } from '@/ui/hooks/ui/useUserMetrics';
import { useDateRangeStore } from '@/ui/stores/useDateRangeStore';
import { ExportDropdown } from '../../ExportDropdown';

export function NewAccountsAreaChart() {
  const t = useTranslations();
  const fromDate = useDateRangeStore((s) => s.fromDate);
  const toDate = useDateRangeStore((s) => s.toDate);
  const { metrics, loading, error } = useUserMetrics(fromDate, toDate);

  const sortedMetrics = useMemo(
    () =>
      metrics
        ? [...metrics].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
        : [],
    [metrics]
  );

  const chartData = useMemo(
    () =>
      sortedMetrics.map((metric) => ({
        date: metric.date,
        month: format(new Date(metric.date), 'MMM dd'),
        accounts: metric.users,
      })),
    [sortedMetrics]
  );

  const chartConfig = {
    accounts: {
      label: t('Charts.accounts'),
      color: '#13AB3F',
    },
  } satisfies ChartConfig;

  return (
    <Card className="w-full rounded-none shadow-none border-l-0 border-r-0 border-t-0 border-b-0">
      <div className="flex justify-between pr-6">
        <CardHeader>
          <CardTitle>{t('Charts.newAccounts')}</CardTitle>
        </CardHeader>
        <div className="flex items-center gap-2">
          <ExportDropdown
            chartData={chartData}
            fileName={t('Charts.newAccounts')}
            labelMapping={{ period: t('Charts.period'), accounts: t('Charts.accounts') }}
          />
        </div>
      </div>

      {loading && (
        <div className="flex items-center justify-center h-[25vh] w-full rounded-md">
          <div className="w-10 h-10 border-4 border-t-blue-500 border-gray-300 rounded-full animate-spin" />
        </div>
      )}

      {error && <p className="text-red-500">{error}</p>}

      <CardContent>
        <ChartContainer
          className="h-[25vh] w-full aspect-square min-h-[300px]"
          config={chartConfig}
        >
          <AreaChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              label={{
                value: t('Charts.accounts'),
                angle: -90,
                position: 'insideLeft',
                dy: -10,
                style: { textAnchor: 'middle', fontSize: '14px', fill: '#9D9DA7' },
              }}
              domain={[0, (dataMax: number) => dataMax * 1.2]}
              tickFormatter={(value) => Number(value).toFixed(0)}
            />
            <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent className="w-[15em]" hideIndicator />}
            />
            <defs>
              {Object.entries(chartConfig).map(([key, { color }]) => (
                <linearGradient key={key} id={`fill${key}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={color} stopOpacity={0.8} />
                  <stop offset="95%" stopColor={color} stopOpacity={0.1} />
                </linearGradient>
              ))}
            </defs>
            <Area
              type="monotone"
              dataKey="accounts"
              fill="url(#fillaccounts)"
              fillOpacity={0.4}
              stroke={chartConfig.accounts.color}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
