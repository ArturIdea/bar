'use client';

import { TrendingUp } from 'lucide-react';
import { Pie, PieChart } from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

const chartData = [
  { cardType: 'physical', holders: 275, fill: 'var(--color-physical)' },
  { cardType: 'virtual', holders: 200, fill: 'var(--color-virtual)' },
];

const chartConfig = {
  holders: {
    label: 'Visitors',
  },
  physical: {
    label: 'Physical Card',
    color: '#13AB3F',
  },
  virtual: {
    label: 'Virtual Card',
    color: '#2157E2',
  },
} satisfies ChartConfig;

export function CardTypesPieChart() {
  return (
    <Card className="w-1/2 flex flex-col border-r-0 border-t-0 border-b-0 border-l rounded-none">
      <CardHeader className="pb-0">
        <CardTitle>Card Types</CardTitle>
      </CardHeader>
      <CardContent className="flex gap-16 items-center justify-center h-full pb-0">
        <ChartContainer config={chartConfig} className="aspect-square min-h-[350px]">
          <PieChart>
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Pie data={chartData} dataKey="holders" nameKey="cardType" innerRadius={85} />
          </PieChart>
        </ChartContainer>
        <div>
          <CardDescription>Physical Card</CardDescription>
          <CardDescription>Virtual Card</CardDescription>
        </div>
      </CardContent>
    </Card>
  );
}
