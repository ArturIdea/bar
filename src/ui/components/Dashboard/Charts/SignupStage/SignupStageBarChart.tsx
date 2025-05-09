'use client';

import React, { useState } from 'react';
import { format, subDays } from 'date-fns';
import { useTranslations } from 'next-intl';
import { Bar, BarChart, CartesianGrid, XAxis, XAxisProps, YAxis } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { useSignupStageMetrics } from '@/ui/hooks/ui/useSignupStageMetrics';
import { ExportDropdown } from '../../ExportDropdown';
import { DateRangeSelector } from '../RegistrationRequestsOverview/DateRangeSelector';

export function SignupStageBarChart() {
  const t = useTranslations();

  const today = new Date();
  const defaultStart = format(subDays(today, 31), 'yyyy-MM-dd');
  const defaultEnd = format(today, 'yyyy-MM-dd');

  const [startDate, setStartDate] = useState<string>(defaultStart);
  const [endDate, setEndDate] = useState<string>(defaultEnd);

  const { metrics, loading, error } = useSignupStageMetrics(startDate, endDate);

  const chartData = metrics.map((m) => ({
    stage: t(`SignupStages.${m.stage}`),
    requests: m.signupRequestsNumber,
  }));

  const chartConfig = {
    requests: {
      label: t('SignupRequests.title2'),
      color: '#2157E2',
    },
  } satisfies ChartConfig;

  const renderWrappedTick: XAxisProps['tick'] = (props) => {
    const { x, y, payload } = props as any;
    const words = (payload.value as string).split(' ');
    const lineHeight = 14;
    return (
      <text x={x} y={y + 10} textAnchor="middle">
        {words.map((word, i) => (
          <tspan key={i} x={x} dy={i === 0 ? 0 : lineHeight}>
            {word}
          </tspan>
        ))}
      </text>
    );
  };

  return (
    <Card className="w-1/2 rounded-none shadow-none border-l-0 border-t-0 border-b-0">
      <div className="flex justify-between items-center pr-8">
        <CardHeader>
          <CardTitle>{t('Charts.signupStages')}</CardTitle>
        </CardHeader>
        <div className="flex items-center gap-2">
          <DateRangeSelector
            onDateChange={(start, end) => {
              setStartDate(start);
              setEndDate(end);
            }}
          />
          <ExportDropdown
            chartData={chartData}
            fileName={t('Charts.signupStages')}
            labelMapping={{
              stage: t('Charts.stage'),
              requests: chartConfig.requests.label,
            }}
          />
        </div>
      </div>

      {loading && (
        <div className="flex items-center justify-center h-[25vh] w-full">
          <div className="w-10 h-10 border-4 border-t-blue-500 border-gray-300 rounded-full animate-spin" />
        </div>
      )}

      {error && <p className="text-red-500 px-4">{error}</p>}

      {!loading && !error && (
        <CardContent>
          <ChartContainer className="h-[25vh] w-full" config={chartConfig}>
            <BarChart data={chartData}>
              <CartesianGrid vertical={false} />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={10}
                label={{
                  value: chartConfig.requests.label,
                  angle: -90,
                  position: 'insideLeft',
                  dy: -10,
                  style: { textAnchor: 'middle', fontSize: '14px', fill: '#9D9DA7' },
                }}
                domain={[0, (dataMax: number) => dataMax * 1.2]}
              />
              <XAxis
                dataKey="stage"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                interval={0}
                height={60}
                tick={renderWrappedTick}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent className="w-40" hideIndicator />}
              />
              <Bar dataKey="requests" fill={chartConfig.requests.color} barSize={75} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      )}
    </Card>
  );
}
