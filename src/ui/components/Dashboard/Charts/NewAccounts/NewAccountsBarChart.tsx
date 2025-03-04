'use client';

import { useState } from 'react';
import { format, subMonths } from 'date-fns';
import { useTranslations } from 'next-intl';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { useUserMetrics } from '@/ui/hooks/ui/useUserMetrics';
import { DateRangeSelector } from './DateRangeSelector';

type DateGranularity = 'day' | 'week' | 'month';

export function NewAccountsBarChart() {
  const t = useTranslations();
  const [granularity, setGranularity] = useState<DateGranularity>('month');
  const [fromDate, setFromDate] = useState<string>(format(subMonths(new Date(), 11), 'yyyy-MM-01'));
  const [toDate, setToDate] = useState<string>(format(new Date(), 'yyyy-MM-dd'));

  const { metrics, loading, error } = useUserMetrics(fromDate, toDate, granularity);

  const chartData = metrics.map((metric) => ({
    period: format(
      new Date(metric.date),
      granularity === 'day' ? 'MMM dd' : granularity === 'week' ? "'Week' wo" : 'MMM yyyy'
    ),
    accounts: metric.users,
  }));

  const chartConfig = {
    accounts: {
      label: t('Charts.accounts'),
      color: 'hsl(var(--chart-1))',
    },
  } satisfies ChartConfig;

  return (
    <Card className=" w-1/2 rounded-none shadow-none border-l-0 border-r-0 border-t-0 border-b">
      <div className="flex justify-between pr-8">
        <CardHeader>
          <CardTitle>{t('Charts.newAccounts')}</CardTitle>
        </CardHeader>
        {/* Date Range Selector Component */}
        <div className="place-content-center place-items-end">
          <DateRangeSelector
            onDateChange={(start, end, selectedGranularity) => {
              setFromDate(start);
              setToDate(end);
              setGranularity(selectedGranularity);
            }}
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
          className="h-[25vh] w-full aspect-square min-h-[300px] "
          config={chartConfig}
        >
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              label={{
                value: t('Charts.registrations'),
                angle: -90,
                position: 'insideLeft',
                dy: -10,
                style: { textAnchor: 'middle', fontSize: '14px', fill: '#9D9DA7' },
              }}
              domain={[0, (dataMax: number) => dataMax * 1.2]}
            />
            <XAxis
              dataKey="period"
              tickLine={false}
              axisLine={false}
              interval={0}
              tickMargin={10}
              orientation="top"
            />
            <ChartTooltip
              cursor={{ fill: '#D3D3D3' }}
              content={<ChartTooltipContent hideIndicator hideLabel />}
            />
            <Bar
              dataKey="accounts"
              fill="#679436"
              radius={[9999, 9999, 0, 0]}
              activeBar={{ fill: '#A5BE19 ' }}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
