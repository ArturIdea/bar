'use client';

import { useTranslations } from 'next-intl';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

export function NewAccountsBarChart() {
  const t = useTranslations();

  const chartData = [
    { month: t('Charts.months.january'), accounts: 186 },
    { month: t('Charts.months.february'), accounts: 305 },
    { month: t('Charts.months.march'), accounts: 237 },
    { month: t('Charts.months.april'), accounts: 73 },
    { month: t('Charts.months.may'), accounts: 209 },
    { month: t('Charts.months.june'), accounts: 150 },
    { month: t('Charts.months.july'), accounts: 220 },
    { month: t('Charts.months.august'), accounts: 180 },
    { month: t('Charts.months.september'), accounts: 240 },
    { month: t('Charts.months.october'), accounts: 300 },
    { month: t('Charts.months.november'), accounts: 190 },
    { month: t('Charts.months.december'), accounts: 210 },
  ];

  const chartConfig = {
    accounts: {
      label: t('Charts.accounts'),
      color: 'hsl(var(--chart-1))',
    },
  } satisfies ChartConfig;

  return (
    <Card className=" w-1/2 rounded-none shadow-none border-l-0 border-r-0 border-t-0 border-b">
      <CardHeader>
        <CardTitle>{t('Charts.newAccounts')}</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          className="h-[25vh] w-full aspect-square min-h-[300px] "
          config={chartConfig}
        >
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              label={{
                value: t('Charts.registrations'),
                angle: -90,
                position: 'insideLeft',
                dy: -10,
                style: { textAnchor: 'middle', fontSize: '14px', fill: '#9D9DA7' },
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
