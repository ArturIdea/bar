'use client';

import { useTranslations } from 'next-intl';
import { Pie, PieChart, PieLabelRenderProps } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { useChannelMetrics } from '@/ui/hooks/ui/useChannelMetrics';
import { ExportDropdown } from '../../ExportDropdown';

export function OnboardingChannelPieChart() {
  const t = useTranslations();
  const { metrics, loading, error } = useChannelMetrics();

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

  interface ChannelConfig {
    label: string;
    color?: string;
  }

  const chartConfig: Record<string, ChannelConfig> = {
    holders: {
      label: 'Channels',
    },
    CITIZEN_APP: {
      label: t('Charts.CITIZEN_APP'),
      color: '#2157E2',
    },
    AGENT_APP: {
      label: t('Charts.AGENT_APP'),
      color: '#13AB3F',
    },
    BANK_PORTAL: {
      label: t('Charts.BANK_PORTAL'),
      color: '#DC1B25',
    },
  };

  type ChartKeys = 'CITIZEN_APP' | 'AGENT_APP' | 'BANK_PORTAL';

  const chartData = Object.entries(metrics?.channels || {}).map(([key, value]) => ({
    onboardingChannel: t(`Charts.${key as ChartKeys}`),
    holders: value,
    fill: chartConfig[key]?.color || '#000',
  }));

  const totalHolders = chartData.reduce((sum, entry) => sum + entry.holders, 0);

  //helper function to position the percentages inside the slices
  const renderLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    value,
  }: PieLabelRenderProps) => {
    if (
      cx === undefined ||
      cy === undefined ||
      midAngle === undefined ||
      innerRadius === undefined ||
      outerRadius === undefined ||
      value === undefined
    ) {
      return null;
    }

    const RADIAN = Math.PI / 180;
    const radius = Number(innerRadius) + (Number(outerRadius) - Number(innerRadius)) / 2;
    const x = Number(cx) + radius * Math.cos(-Number(midAngle) * RADIAN);
    const y = Number(cy) + radius * Math.sin(-Number(midAngle) * RADIAN);
    const percentage = ((Number(value) / totalHolders) * 100).toFixed(1);

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
        {percentage}%
      </text>
    );
  };
  return (
    <Card className="w-1/2 flex flex-col border-r-0 border-t-0 border-b-0 border-l rounded-none shadow-none">
      <div className="flex justify-between pr-8">
        <CardHeader className="">
          <CardTitle>{t('Charts.onboardingChannel')}</CardTitle>
        </CardHeader>
        <div className="flex justify-center items-center gap-2">
          <ExportDropdown
            chartData={chartData}
            dataToExtract="channels"
            labelMapping={{ onboardingChannel: 'Onboarding Channel', holders: 'Holders' }}
          />
        </div>
      </div>
      <CardContent className="flex gap-16 items-center justify-center h-full pb-0">
        <ChartContainer config={chartConfig} className="h-[25vh] aspect-square min-h-[350px]">
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideIndicator hideLabel />}
            />
            <Pie
              label={renderLabel}
              labelLine={false}
              data={chartData}
              dataKey="holders"
              nameKey="onboardingChannel"
              innerRadius={85}
            />
          </PieChart>
        </ChartContainer>
        <div className="flex flex-col gap-2">
          {Object.entries(chartConfig).map(([key, value]) => {
            if (key === 'holders') {
              return null;
            }
            return (
              <div key={key} className="flex items-center gap-2">
                <span
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: (value as { color: string }).color }}
                />
                <CardDescription>{(value as { label: string }).label}</CardDescription>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
