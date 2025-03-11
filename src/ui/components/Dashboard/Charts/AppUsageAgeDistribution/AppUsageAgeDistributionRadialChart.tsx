'use client';

import { useTranslations } from 'next-intl';
import { RadialBar, RadialBarChart } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
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
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>{error}</p>;
  }
  if (!data) {
    return null;
  }

  const ageGroupLabels = {
    teens: '14-19 Years Old',
    twenties: '20-29 Years Old',
    thirtiesForties: '30-49 Years Old',
    fiftiesSixties: '50-69 Years Old',
    seventiesPlus: '70+ Years Old',
  };

  const values = {
    teens: data.R14_19,
    twenties: data.R20_29,
    thirtiesForties: data.R30_49,
    fiftiesSixties: data.R50_69,
    seventiesPlus: data.R70_PLUS,
  };

  const maxPeople = Math.max(...Object.values(values));

  const chartData = Object.entries(values).map(([key, people]) => ({
    ageGroup: ageGroupLabels[key as keyof typeof ageGroupLabels],
    people,
    scaledPeople: (people / maxPeople) * 100,
    fill: chartConfig[key as keyof typeof chartConfig].color,
  }));

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
            keysToExclude={['scaledPeople', 'fill']}
            labelMapping={{ ageGroup: t('Charts.ageGroup'), people: t('Charts.people') }}
          />
        </div>
      </div>
      <CardContent className="flex gap-16 items-center justify-center h-full pb-0">
        <ChartContainer config={chartConfig} className="h-[25vh] aspect-square min-h-[350px]">
          <RadialBarChart
            data={chartData}
            innerRadius={75}
            outerRadius={150}
            startAngle={90}
            endAngle={-270}
          >
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel nameKey="people" />}
            />
            <RadialBar dataKey="people" background />
          </RadialBarChart>
        </ChartContainer>
        <div className="flex flex-col gap-2">
          {Object.entries(chartConfig).map(([key, value]) => {
            if (key === 'people') {
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
