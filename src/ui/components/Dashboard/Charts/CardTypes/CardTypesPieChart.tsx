'use client';

import { useTranslations } from 'next-intl';
import { Cell, Pie, PieChart, PieLabelRenderProps } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

export function CardTypesPieChart() {
  const t = useTranslations();

  const chartData = [
    { cardType: t('Charts.physicalCard'), holders: 275, fill: 'var(--color-physical)' },
    { cardType: t('Charts.virtualCard'), holders: 200, fill: 'var(--color-virtual)' },
  ];

  const totalHolders = chartData.reduce((sum, entry) => sum + entry.holders, 0);

  const chartConfig = {
    physical: {
      label: t('Charts.physicalCard'),
      color: '#13AB3F',
    },
    virtual: {
      label: t('Charts.virtualCard'),
      color: '#2157E2',
    },
  } satisfies ChartConfig;

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
    <Card className="w-1/2 flex flex-col border-r-0 border-t-0  rounded-none shadow-none">
      <CardHeader className="pb-0">
        <CardTitle>{t('Charts.cardTypes')}</CardTitle>
      </CardHeader>
      <CardContent className="flex gap-16 items-center justify-center h-full pb-0">
        <ChartContainer config={chartConfig} className="h-[25vh] aspect-square min-h-[350px]">
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideIndicator hideLabel />}
            />
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
