'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Bar, BarChart, CartesianGrid, LabelList, XAxis, XAxisProps, YAxis } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { useSignupStageMetrics } from '@/ui/hooks/ui/useSignupStageMetrics';
import { useDateRangeStore } from '@/ui/stores/useDateRangeStore';
import { ExportDropdown } from '../../ExportDropdown';
import { SignupStage } from '@/domain/metrics/signupMetrics/entities/SignupStageMetric';

export function SignupStageBarChart() {
  const t = useTranslations();

  const startDate = useDateRangeStore((s) => s.fromDate);
  const endDate = useDateRangeStore((s) => s.toDate);

  const { metrics, loading, error } = useSignupStageMetrics(startDate, endDate);

  // Filter out the 'Created' stage
  const filteredMetrics = metrics.filter((m) => m.stage !== SignupStage.CREATED);

  const chartData = filteredMetrics.map((m) => {
    return {
      stage: t(`SignupStages.${m.stage}` as any),
      reached: m.signupRequestsNumber,
      dropOffPercentage: m.dropPercentage,
    };
  });

  // Calculate overall drop-off percentage
  let overallDropOff = null;
  if (filteredMetrics.length > 1) {
    const firstStage = filteredMetrics[0]?.signupRequestsNumber || 0;
    const lastStage = filteredMetrics[filteredMetrics.length - 1]?.signupRequestsNumber || 0;
    if (firstStage > 0) {
      overallDropOff = ((firstStage - lastStage) / firstStage) * 100;
    }
  }

  const chartConfig = {
    reached: {
      label: t('SignupRequests.title2'),
      color: '#253A60',
    },
    dropOffPercentage: {
      label: t('Charts.dropOffPercentage'),
    },
  } satisfies ChartConfig;

  const renderTruncatedTick: XAxisProps['tick'] = (props: any) => {
    const { x, y, payload } = props;
    const fullText: string = payload.value as string;
    const MAX_CHARS = 8;

    const displayText =
      fullText.length > MAX_CHARS ? `${fullText.slice(0, MAX_CHARS - 1)}…` : fullText;

    return (
      <text
        x={x}
        y={y + 10}
        textAnchor="middle"
        style={{ cursor: 'default', userSelect: 'none', fontSize: 12 }}
      >
        <title>{fullText}</title>
        {displayText}
      </text>
    );
  };

  const CustomizedLabel = (props: any) => {
    const { x, y, width, value } = props;
    // if (index === 0) {
    //   return null;
    // }
    const rectHeight = 30;
    const rectX = x;
    const rectY = y - rectHeight;

    return (
      <g>
        <rect x={rectX} y={rectY} width={width} height={rectHeight} fill="#ECEEF4" rx={8} ry={8} />
        <text
          x={rectX + width / 2}
          y={rectY + rectHeight / 2}
          fill="#0B0B22"
          textAnchor="middle"
          dominantBaseline="middle"
          style={{ fontSize: 12, fontWeight: 600 }}
        >
          {`${Math.round(value)}%`}
        </text>
      </g>
    );
  };

  return (
    <Card className="w-1/2 shadow-none border-t-0 border-b-0 border-l-0 border-r-0 rounded-[24px] p-3 ">
      <div className="flex justify-between items-center pr-8">
        <CardHeader>
          <CardTitle>{t('Charts.signupStages')}</CardTitle>
          <div className='text-[#DC1B25] hidden text-[12px] font-medium leading-normal tracking-[0px]'>
            {loading
              ? 'Loading...'
              : overallDropOff !== null
                ? `Over All Drop Off Percentage: ${overallDropOff.toFixed(2)}%`
                : 'Over All Drop Off Percentage: N/A'}
          </div>
        </CardHeader>
        <div className="flex items-center gap-2">
          <ExportDropdown
            chartData={chartData}
            fileName={t('Charts.signupStages')}
            labelMapping={{
              stage: t('Charts.stage'),
              reached: chartConfig.reached.label, 
              dropOffPercentage: chartConfig.dropOffPercentage.label,
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
                dataKey="reached"
                tickLine={false}
                axisLine={false}
                tickMargin={10}
                label={{
                  value: chartConfig.reached.label,
                  angle: -90,
                  position: 'insideLeft',
                  style: { textAnchor: 'middle', fontSize: '14px', fill: '#9D9DA7' },
                }}
                tickFormatter={(value) => Number(value).toFixed(0)}
                domain={[0, (dataMax: number) => dataMax * 1.2]}
              />
              <XAxis
                dataKey="stage"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                interval={0}
                height={55}
                tick={renderTruncatedTick}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent className="w-40" hideIndicator />}
              />
              <Bar dataKey="reached" fill={chartConfig.reached.color} barSize={75}>
                <LabelList
                  dataKey="dropOffPercentage"
                  content={(labelProps) => <CustomizedLabel {...labelProps} />}
                />
              </Bar>
            </BarChart>
          </ChartContainer>
        </CardContent>
      )}
    </Card>
  );
}
