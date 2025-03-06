'use client';

import { useState } from 'react';
import { format } from 'date-fns';
import { useTranslations } from 'next-intl';
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { useSignupMetrics } from '@/ui/hooks/ui/useSignupMetrics';
import { ExportDropdown } from '../../ExportDropdown';
import { DateRangeSelector } from './DateRangeSelector';

export function RegistrationRequestsAreaChart() {
  const t = useTranslations();
  const [fromDate, setFromDate] = useState<string>(format(new Date(), 'yyyy-MM-01'));
  const [toDate, setToDate] = useState<string>(format(new Date(), 'yyyy-MM-dd'));

  const { metrics, loading, error } = useSignupMetrics(fromDate, toDate);

  const sortedMetrics = [...metrics].sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return dateA - dateB;
  });

  const chartData = sortedMetrics.map((metric) => ({
    date: metric.date,
    month: format(new Date(metric.date), 'MMM dd'),
    totalRequests: metric.totalSignupRequests,
    successfulRequests: metric.successfulSignupRequests,
    failedRequests: metric.failedSignupRequests,
  }));

  const chartConfig = {
    totalRequests: {
      label: t('Charts.totalRequests'),
      color: '#2157E2',
    },
    successfulRequests: {
      label: t('Charts.successfulRequests'),
      color: '#13AB3F',
    },
    failedRequests: {
      label: t('Charts.failedRequests'),
      color: '#DC1B25',
    },
  } satisfies ChartConfig;

  return (
    <Card className="rounded-none border-b border-l-0 border-r-0">
      <div className="grid grid-cols-2 grid-rows-2 pr-8">
        <div>
          <CardHeader>
            <CardTitle>{t('Charts.registrationOverview')}</CardTitle>
          </CardHeader>
        </div>
        {/* Date Range Selector Component */}
        <div className="place-content-center place-items-end">
          <div className="flex justify-center items-center gap-2">
            <DateRangeSelector
              onDateChange={(start, end) => {
                setFromDate(start);
                setToDate(end);
              }}
            />
            <ExportDropdown
              chartData={chartData}
              fileName={t('Charts.registrationOverview')}
              keysToExclude={['month']}
              labelMapping={{
                date: 'Date',
                totalRequests: 'Total Requests',
                successfulRequests: 'Successful Requests',
                failedRequests: 'Failed Requests',
              }}
            />
          </div>
        </div>
        <div />
        <div className="flex justify-end gap-5">
          {Object.entries(chartConfig).map(([key, value]) => (
            <div key={key} className="flex items-center gap-2">
              <span
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: (value as { color: string }).color }}
              />
              <CardDescription>{(value as { label: string }).label}</CardDescription>
            </div>
          ))}
        </div>
      </div>
      <CardContent>
        {loading ? (
          <div className="flex items-center justify-center h-[25vh] w-full rounded-md">
            <div className="w-10 h-10 border-4 border-t-blue-500 border-gray-300 rounded-full animate-spin" />
          </div>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <ChartContainer className="h-[25vh] w-full" config={chartConfig}>
            <AreaChart accessibilityLayer data={chartData}>
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
              <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent className="w-[15em]" hideIndicator />}
              />
              <defs>
                <linearGradient id="fillTotal" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-totalRequests)" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="var(--color-totalRequests)" stopOpacity={0.1} />
                </linearGradient>
                <linearGradient id="fillSuccessful" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-successfulRequests)" stopOpacity={1} />
                  <stop
                    offset="95%"
                    stopColor="var(--color-successfulRequests)"
                    stopOpacity={0.1}
                  />
                </linearGradient>
                <linearGradient id="fillFailed" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-failedRequests)" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="var(--color-failedRequests)" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <Area
                dataKey="totalRequests"
                // type="natural"
                fill="url(#fillTotal)"
                fillOpacity={0.4}
                stroke="blue"
              />
              <Area
                dataKey="successfulRequests"
                // type="natural"
                fill="url(#fillSuccessful)"
                fillOpacity={0.4}
                stroke="green"
              />
              <Area
                dataKey="failedRequests"
                // type="natural"
                fill="url(#fillFailed)"
                fillOpacity={0.4}
                stroke="red"
              />
            </AreaChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}
