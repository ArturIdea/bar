'use client';

import { TrendingUp } from 'lucide-react';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';
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
  { month: 'January', accounts: 186 },
  { month: 'February', accounts: 305 },
  { month: 'March', accounts: 237 },
  { month: 'April', accounts: 73 },
  { month: 'May', accounts: 209 },
  { month: 'June', accounts: 214 },
];

const chartConfig = {
  accounts: {
    label: 'Accounts',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig;

export function NewAccountsBarChart() {
  return (
    <Card className="w-1/2 rounded-none border-0">
      <CardHeader>
        <CardTitle>New Accounts</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Bar dataKey="accounts" fill="green" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
