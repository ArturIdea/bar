'use client';

import { useEffect, useState } from 'react';
import { addDays, addMonths, addWeeks, format, subDays, subMonths, subWeeks } from 'date-fns';
import { useTranslations } from 'next-intl';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import DateRangePicker from '@/components/ui/DateRangePicker';
import { useUserMetrics } from '@/ui/hooks/ui/useUserMetrics';
import { ExportDropdown } from '../../ExportDropdown';
import { DateRangeSelector } from './DateRangeSelector';

type DateGranularity = 'day' | 'week' | 'month';

export function NewAccountsBarChart() {
  const t = useTranslations();
  const [granularity, setGranularity] = useState<DateGranularity>('month');
  const [fromDate, setFromDate] = useState<string>(format(subMonths(new Date(), 11), 'yyyy-MM-01'));
  const [toDate, setToDate] = useState<string>(format(new Date(), 'yyyy-MM-dd'));
  const [customDateRange, setCustomDateRange] = useState<{ from: string; to: string } | null>(null);
  const { metrics, loading, error } = useUserMetrics(fromDate, toDate, granularity);

  const applyDateRangeForGranularity = (selectedGranularity: DateGranularity) => {
    const today = new Date();

    if (customDateRange) {
      const startDate = new Date(customDateRange.from);
      const endDate = new Date(customDateRange.to);

      let paddedStartDate, paddedEndDate;

      if (selectedGranularity === 'day') {
        paddedStartDate = format(subDays(startDate, 7), 'yyyy-MM-dd');
        paddedEndDate = format(addDays(endDate, 7), 'yyyy-MM-dd');
      } else if (selectedGranularity === 'week') {
        paddedStartDate = format(subWeeks(startDate, 4), 'yyyy-MM-dd');
        paddedEndDate = format(addWeeks(endDate, 4), 'yyyy-MM-dd');
      } else {
        // month
        paddedStartDate = format(subMonths(startDate, 3), 'yyyy-MM-01');
        paddedEndDate = format(addMonths(endDate, 3), 'yyyy-MM-dd');
      }

      setFromDate(paddedStartDate);
      setToDate(paddedEndDate);
    } else {
      let defaultFromDate;

      if (selectedGranularity === 'day') {
        defaultFromDate = format(subDays(today, 14), 'yyyy-MM-dd');
      } else if (selectedGranularity === 'week') {
        defaultFromDate = format(subWeeks(today, 8), 'yyyy-MM-dd');
      } else {
        defaultFromDate = format(subMonths(today, 11), 'yyyy-MM-01');
      }

      setFromDate(defaultFromDate);
      setToDate(format(today, 'yyyy-MM-dd'));
    }
  };

  useEffect(() => {
    applyDateRangeForGranularity(granularity);
  }, [granularity]);

  const chartData = metrics.map((metric) => {
    const date = new Date(metric.date);

    let period;
    if (granularity === 'week') {
      const startOfWeek = format(date, 'MMM dd');
      const endOfWeek = format(subDays(date, -6), 'MMM dd');
      period = `${startOfWeek} - ${endOfWeek}`;
    } else {
      period = format(date, granularity === 'day' ? 'MMM dd' : 'MMM yyyy');
    }

    return {
      period,
      accounts: metric.users,
    };
  });

  const chartConfig = {
    accounts: {
      label: t('Charts.accounts'),
      color: 'hsl(var(--chart-1))',
    },
  } satisfies ChartConfig;

  const handleDateRangeChange = (start: string, end: string) => {
    setCustomDateRange({ from: start, to: end });
    applyDateRangeForGranularity(granularity);
  };

  return (
    <Card className="w-full 2xl:w-1/2 rounded-none shadow-none border-l-0 border-r-0 border-t-0 border-b">
      <div className="flex justify-between pr-8">
        <CardHeader>
          <CardTitle>{t('Charts.newAccounts')}</CardTitle>
        </CardHeader>
        <div className="flex justify-center items-center gap-2">
          <div>
            <div>
              <DateRangePicker onDateChange={handleDateRangeChange} />
            </div>
          </div>
          <DateRangeSelector
            onDateChange={(start, end, selectedGranularity) => {
              if (!customDateRange) {
                setFromDate(start);
                setToDate(end);
              }
              setGranularity(selectedGranularity);
            }}
          />
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
              tickMargin={7}
              orientation="top"
              angle={-20}
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
