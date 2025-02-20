'use client';

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
  { month: 'June', accounts: 150 },
  { month: 'July', accounts: 220 },
  { month: 'August', accounts: 180 },
  { month: 'September', accounts: 240 },
  { month: 'October', accounts: 300 },
  { month: 'November', accounts: 190 },
  { month: 'December', accounts: 210 },
];

const chartConfig = {
  accounts: {
    label: 'Accounts',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig;

export function NewAccountsBarChart() {
  return (
    <Card className=" w-1/2 rounded-none shadow-none border-l-0 border-r-0 border-t-0 border-b">
      <CardHeader>
        <CardTitle>New Accounts</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer className="h-[25vh] w-full" config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              label={{
                value: 'Registrations',
                angle: -90,
                position: 'insideLeft',
                dy: -10,
                style: { textAnchor: 'middle', fontSize: '14px', fill: '#9D9DA7' }, // Optional styling
              }}
            />
            <XAxis
              dataKey="month"
              tickLine={false}
              orientation="top"
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={{ fill: '#D3D3D3' }}
              content={<ChartTooltipContent hideIndicator hideLabel />}
            />
            <Bar
              dataKey="accounts"
              fill="#679436"
              radius={[9999, 9999, 0, 0]}
              activeBar={{ fill: '#A5BE19 ' }}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
