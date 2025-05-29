'use client';

import { useMemo } from 'react';
import { format } from 'date-fns';
import { useTranslations } from 'next-intl';
import { Area, AreaChart, CartesianGrid, Tooltip, XAxis, YAxis } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartConfig, ChartContainer } from '@/components/ui/chart';
import { useSignupFailureRates } from '@/ui/hooks/ui/useSignupFailureRates';
import { useDateRangeStore } from '@/ui/stores/useDateRangeStore';
import { ExportDropdown } from '../../ExportDropdown';

export function SignupFailureRateAreaChart() {
  const t = useTranslations();
  const fromDate = useDateRangeStore((s) => s.fromDate);
  const toDate = useDateRangeStore((s) => s.toDate);

  const { failureRates, loading, error } = useSignupFailureRates(fromDate, toDate);

  const sortedMetrics = useMemo(
    () =>
      failureRates
        ? [...failureRates].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
        : [],
    [failureRates]
  );

  const chartData = useMemo(
    () =>
      sortedMetrics.map((m) => ({
        date: m.date,
        month: format(new Date(m.date), 'MMM dd'),
        totalDropOffRate:
          m.totalRequests > 0 ? Math.round((m.totalDropOffs / m.totalRequests) * 100) : 0,
        totalDropOffs: m.totalDropOffs,
      })),
    [sortedMetrics]
  );

  const chartConfig = useMemo(
    () =>
      ({
        totalDropOffRate: {
          label: t('Charts.totalDropOffRate'),
          color: '#13AB3F',
        },
      }) satisfies ChartConfig,
    [t]
  );

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload[0]) {
      const row = payload[0].payload;
      return (
        <div className="p-2 bg-white border rounded shadow">
          <p className="font-medium mb-1">{label}</p>
          <p>
            {t('Charts.totalDropOffs')}: {row.totalDropOffs}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="w-1/2 rounded-none shadow-none border-t-0 border-b-0 border-l-0 border-r-0">
      <div className="flex items-center justify-between gap-2 pr-8">
        <CardHeader>
          <CardTitle>Onboarding Success Rate</CardTitle>
        </CardHeader>
        <div className="flex justify-center items-center gap-2">
          <ExportDropdown
            chartData={chartData}
            fileName={t('Charts.signupFailureRate')}
            keysToExclude={['month']}
            labelMapping={{
              date: t('Filter.date'),
              totalDropOffRate: t('Charts.totalDropOffRate'),
              totalDropOffs: t('Charts.totalDropOffs'),
            }}
          />
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
            <AreaChart data={chartData} accessibilityLayer>
              <CartesianGrid vertical={false} />
              <YAxis
                unit="%"
                tickLine={false}
                axisLine={false}
                tickMargin={10}
                tickFormatter={(value) => Number(value).toFixed(0)}
              />
              <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
              <Tooltip cursor={false} content={<CustomTooltip />} />
              <defs>
                <linearGradient id="fillRate" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor={chartConfig.totalDropOffRate.color}
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor={chartConfig.totalDropOffRate.color}
                    stopOpacity={0.1}
                  />
                </linearGradient>
              </defs>
              <Area
                type="monotone"
                dataKey="totalDropOffRate"
                stroke={chartConfig.totalDropOffRate.color}
                fill="url(#fillRate)"
                fillOpacity={0.4}
              />
            </AreaChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}
