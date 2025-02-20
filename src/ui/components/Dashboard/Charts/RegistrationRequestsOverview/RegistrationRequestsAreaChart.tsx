'use client';

import { ChevronDown } from 'lucide-react';
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

const chartData = [
  { month: 'January', totalRequests: 180, successfulRequests: 160, failedRequests: 20 },
  { month: 'February', totalRequests: 300, successfulRequests: 250, failedRequests: 50 },
  { month: 'March', totalRequests: 240, successfulRequests: 210, failedRequests: 30 },
  { month: 'April', totalRequests: 70, successfulRequests: 60, failedRequests: 10 },
  { month: 'May', totalRequests: 210, successfulRequests: 170, failedRequests: 40 },
  { month: 'June', totalRequests: 214, successfulRequests: 174, failedRequests: 50 },
];

const chartConfig = {
  totalRequests: {
    label: 'Total Requests',
    color: '#2157E2',
  },
  successfulRequests: {
    label: 'Successful Requests',
    color: '#13AB3F',
  },
  failedRequests: {
    label: 'Failed Requests',
    color: '#DC1B25',
  },
} satisfies ChartConfig;

export function RegistrationRequestsAreaChart() {
  return (
    <Card className=" rounded-none border-b border-l-0 border-r-0">
      <div className="grid grid-cols-2 grid-rows-2 pr-8">
        <div>
          <CardHeader>
            <CardTitle>Registration Requests Overview</CardTitle>
          </CardHeader>
        </div>
        <div className="place-content-center place-items-end">
          <button
            type="button"
            className="rounded-full border border-gray-300 px-4 py-1 flex items-center gap-1 cursor-pointer"
          >
            Week
            <ChevronDown size={16} />
          </button>
        </div>
        <div />
        <div className="place-content-center place-items-end ">
          <div className="flex gap-5">
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
        </div>
      </div>
      <CardContent>
        <ChartContainer className="h-[25vh] w-full" config={chartConfig}>
          <AreaChart accessibilityLayer data={chartData}>
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
                style: { textAnchor: 'middle', fontSize: '14px', fill: '#9D9DA7' },
              }}
              domain={[0, (dataMax: number) => dataMax * 1.2]}
            />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />

            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent className="w-[15em]" hideIndicator />}
            />
            <defs>
              <linearGradient id="fillFailed" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-failedRequests)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--color-failedRequests)" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="fillSuccessful" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-successfulRequests)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--color-successfulRequests)" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="fillTotal" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-totalRequests)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--color-totalRequests)" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <Area
              dataKey="failedRequests"
              type="natural"
              fill="url(#fillFailed)"
              fillOpacity={0.4}
              stroke="red"
            />
            <Area
              dataKey="successfulRequests"
              type="natural"
              fill="url(#fillSuccessful)"
              fillOpacity={0.4}
              stroke="green"
            />
            <Area
              dataKey="totalRequests"
              type="natural"
              fill="url(#fillTotal)"
              fillOpacity={0.4}
              stroke="blue"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
