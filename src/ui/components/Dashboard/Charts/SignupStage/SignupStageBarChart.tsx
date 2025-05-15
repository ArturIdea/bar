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

export function SignupStageBarChart() {
  const t = useTranslations();

  const startDate = useDateRangeStore((s) => s.fromDate);
  const endDate = useDateRangeStore((s) => s.toDate);

  const { metrics, loading, error } = useSignupStageMetrics(startDate, endDate);

  const chartData = metrics.map((m) => ({
    stage: t(`SignupStages.${m.stage}`),
    requests: m.signupRequestsNumber,
    dropOffPercentage: m.dropOffPercentage,
  }));

  const chartConfig = {
    requests: {
      label: t('SignupRequests.title2'),
      color: '#2157E2',
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
    const rectHeight = 50;
    const rectX = x;
    const rectY = y - rectHeight;

    return (
      <g>
        <rect x={rectX} y={rectY} width={width} height={rectHeight} fill="#ECEEF4" />
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
    <Card className="w-1/2 rounded-none shadow-none border-l-0 border-t-0 border-b-0">
      <div className="flex justify-between items-center pr-8">
        <CardHeader>
          <CardTitle>{t('Charts.signupStages')}</CardTitle>
        </CardHeader>
        <div className="flex items-center gap-2">
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
              <Bar dataKey="requests" fill={chartConfig.requests.color} barSize={75}>
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
