'use client';

import { Pie, PieChart } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

const chartData = [
  { onboardingChannel: 'app', holders: 275, fill: 'var(--color-app)' },
  { onboardingChannel: 'naspCenters', holders: 200, fill: 'var(--color-naspCenters)' },
  { onboardingChannel: 'aloqaBank', holders: 200, fill: 'var(--color-aloqaBank)' },
  { onboardingChannel: 'xalqBank', holders: 200, fill: 'var(--color-xalqBank)' },
];

const chartConfig = {
  holders: {
    label: 'Channels',
  },
  app: {
    label: 'App',
    color: '#2157E2',
  },
  naspCenters: {
    label: 'NASP Centers',
    color: '#13AB3F',
  },
  aloqaBank: {
    label: 'Aloqa Bank',
    color: '#DC1B25',
  },
  xalqBank: {
    label: 'Xalq Bank',
    color: '#FFB700',
  },
} satisfies ChartConfig;

export function OnboardingChannelPieChart() {
  return (
    <Card className="w-1/2 flex flex-col border-r-0 border-t-0 border-b-0 border-l rounded-none">
      <CardHeader className="pb-0">
        <CardTitle>Onboarding Channel</CardTitle>
      </CardHeader>
      <CardContent className="flex gap-16 items-center justify-center h-full pb-0">
        <ChartContainer config={chartConfig} className="h-[25vh] aspect-square min-h-[350px]">
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideIndicator hideLabel />}
            />
            <Pie data={chartData} dataKey="holders" nameKey="onboardingChannel" innerRadius={85} />
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
