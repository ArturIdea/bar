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
import { useCardMetrics } from '@/ui/hooks/ui/useCardMetrics';
import { ExportDropdown } from '../../ExportDropdown';

export function CardTypesPieChart() {
  const t = useTranslations();
  const { metrics, loading, error } = useCardMetrics();

  if (!metrics) {
    return (
      <div className="flex items-center justify-center h-[25vh] w-full rounded-md">
        <div className="w-10 h-10 border-4 border-t-blue-500 border-gray-300 rounded-full animate-spin" />
      </div>
    );
  }

  const chartData = [
    { cardType: t('Charts.physicalCard'), holders: metrics.physicalCards, fill: '#13AB3F' },
    { cardType: t('Charts.virtualCard'), holders: metrics.virtualCards, fill: '#2157E2' },
  ];

  const totalHolders = chartData.reduce((sum, entry) => sum + entry.holders, 0);

  const chartConfig: ChartConfig = {
    physical: { label: t('Charts.physicalCard'), color: '#13AB3F' },
    virtual: { label: t('Charts.virtualCard'), color: '#2157E2' },
  };

  const renderLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    value,
  }: PieLabelRenderProps) => {
    if (!cx || !cy || !midAngle || !innerRadius || !outerRadius || !value) {
      return null;
    }

    const RADIAN = Math.PI / 180;
    const radius = Number(innerRadius) + (Number(outerRadius) - Number(innerRadius)) / 2;
    const x = Number(cx) + radius * Math.cos(-Number(midAngle) * RADIAN);
    const y = Number(cy) + radius * Math.sin(-Number(midAngle) * RADIAN);
    const percentage = ((Number(value) / totalHolders) * 100).toFixed(1);

    return (
      <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={12}>
        {percentage}%
      </text>
    );
  };

  return (
    <Card className="w-1/2 flex flex-col border-r-0 border-t-0 rounded-none shadow-none">
      <div className="flex justify-between pr-8">
        <CardHeader className="">
          <CardTitle>{t('Charts.cardTypes')}</CardTitle>
        </CardHeader>
        <div className="flex justify-center items-center gap-2">
          <ExportDropdown
            chartData={chartData}
            fileName={t('Charts.cardTypes')}
            labelMapping={{ cardType: 'Card Type', holders: 'Holders' }}
          />
        </div>
      </div>

      {loading && (
        <div className="flex items-center justify-center h-[25vh] w-full rounded-md">
          <div className="w-10 h-10 border-4 border-t-blue-500 border-gray-300 rounded-full animate-spin" />
        </div>
      )}

      {error && <p className="text-red-500">{error}</p>}

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
          {Object.entries(chartConfig).map(([key, value]) => (
            <div key={key} className="flex items-center gap-2">
              <span className="w-4 h-4 rounded-full" style={{ backgroundColor: value.color }} />
              <CardDescription>{value.label}</CardDescription>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
