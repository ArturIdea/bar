'use client';

import { Users2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Pie, PieChart, PieLabelRenderProps, TooltipProps } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartConfig, ChartContainer, ChartTooltip } from '@/components/ui/chart';
import { useAgeDistribution } from '@/ui/hooks/ui/useAgeDistributionMetrics';
import { ExportDropdown } from '../../ExportDropdown';

export function AppUsageAgeDistributionRadialChart() {
  const t = useTranslations();
  const { data, loading, error } = useAgeDistribution();

  const chartConfig = {
    people: {
      label: t('Charts.people'),
      color: '#00000000',
    },
    teens: {
      label: '14-19',
      color: '#08678E',
    },
    twenties: {
      label: '20-29',
      color: '#A5BE19',
    },
    thirtiesForties: {
      label: '30-49',
      color: '#FAB52D',
    },
    fiftiesSixties: {
      label: '50-69',
      color: '#A53F2B',
    },
    seventiesPlus: {
      label: '70+',
      color: '#F4743B',
    },
  } satisfies ChartConfig;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[25vh] w-full rounded-md">
        <div className="w-10 h-10 border-4 border-t-blue-500 border-gray-300 rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!data) {
    return null;
  }

  const ageGroupLabels = {
    teens: '14-19',
    twenties: '20-29',
    thirtiesForties: '30-49',
    fiftiesSixties: '50-69',
    seventiesPlus: '70+',
  };

  const values = {
    teens: data.R14_19,
    twenties: data.R20_29,
    thirtiesForties: data.R30_49,
    fiftiesSixties: data.R50_69,
    seventiesPlus: data.R70_PLUS,
  };

  const totalPeople = Object.values(values).reduce((sum, value) => sum + value, 0);
  const formattedTotal = totalPeople.toLocaleString();

  const chartData = Object.entries(values).map(([key, people]) => ({
    ageGroup: ageGroupLabels[key as keyof typeof ageGroupLabels],
    people,
    fill: chartConfig[key as keyof typeof chartConfig].color,
  }));

  // Helper function to position the percentages inside the slices
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

    // Only show percentage if totalPeople is greater than 0
    if (totalPeople === 0) {
      return null;
    }

    const percentage = ((Number(value) / totalPeople) * 100).toFixed(1);
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

  const CustomTooltip = ({ active, payload }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-[6px] rounded-lg shadow-md text-xs w-20">
          <p className="font-semibold pb-1">{data.ageGroup}</p>
          <div className="">
            <div className="flex justify-between">
              <p className="text-gray-500">{t('Charts.people')}</p>
              <p className="text-gray-500">{data.people.toLocaleString()}</p>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="w-1/2 flex flex-col border-r-0 border-t-0 border-b-0 border-l rounded-none shadow-none">
      <div className="flex justify-between pr-8">
        <CardHeader>
          <CardTitle>{t('Charts.appUsageAgeDistribution')}</CardTitle>
        </CardHeader>
        <div className="flex justify-center items-center gap-2">
          <ExportDropdown
            chartData={chartData}
            fileName={t('Charts.appUsageAgeDistribution')}
            keysToExclude={['fill']}
            labelMapping={{ ageGroup: t('Charts.ageGroup'), people: t('Charts.people') }}
          />
        </div>
      </div>
      <CardContent className="flex 2xl:gap-16 gap-0 items-center justify-center h-full pb-0">
        <ChartContainer config={chartConfig} className="h-[25vh] aspect-square min-h-[350px]">
          <PieChart>
            <ChartTooltip cursor={false} content={<CustomTooltip />} />
            <Pie
              data={chartData}
              dataKey="people"
              nameKey="ageGroup"
              innerRadius={85}
              label={renderLabel}
              labelLine={false}
            />
            {/* Center text showing total people */}
          </PieChart>
        </ChartContainer>
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <Users2 className="w-4 h-4 text-gray-500" />{' '}
            <p className="text-gray-500 text-sm">
              {t('Charts.appUsers')}: {formattedTotal}
            </p>
          </div>
          <div className="flex flex-col gap-2">
            {Object.entries(values).map(([key, people]) => {
              if (key === 'people') {
                return null;
              }

              const percentage =
                totalPeople > 0 ? ((people / totalPeople) * 100).toFixed(1) : '0.0';

              const configEntry = chartConfig[key as keyof typeof chartConfig];

              return (
                <div key={key} className="flex items-center gap-2">
                  <span
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: configEntry.color }}
                  />
                  <CardDescription className="flex items-center">
                    <span>{configEntry.label}</span>
                    <span className="ml-2 text-gray-500">({percentage}%)</span>
                  </CardDescription>
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
