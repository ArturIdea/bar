'use client';

import { RadialBar, RadialBarChart } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

const chartData = [
  { ageGroup: 'teens', people: 145, fill: 'var(--color-teens)' },
  { ageGroup: 'twenties', people: 200, fill: 'var(--color-twenties)' },
  { ageGroup: 'thirtiesForties', people: 187, fill: 'var(--color-thirtiesForties)' },
  { ageGroup: 'fiftiesSixties', people: 173, fill: 'var(--color-fiftiesSixties)' },
  { ageGroup: 'seventiesPlus', people: 90, fill: 'var(--color-seventiesPlus)' },
];

const chartConfig = {
  people: {
    label: 'Age Group',
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

export function AppUsageAgeDistributionRadialChart() {
  return (
    <Card className="w-1/2 flex flex-col border-r-0 border-t-0 border-b-0 border-l rounded-none shadow-none">
      <CardHeader className=" pb-0">
        <CardTitle>App Usage Age Distribution</CardTitle>
      </CardHeader>
      <CardContent className="flex gap-16 items-center justify-center h-full pb-0">
        <ChartContainer config={chartConfig} className="h-[25vh] aspect-square min-h-[350px]">
          <RadialBarChart data={chartData} innerRadius={80} outerRadius={150}>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel nameKey="ageGroup" />}
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
