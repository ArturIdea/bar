'use client';

import { useMemo } from 'react';
import { Users2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Pie, PieChart, PieLabelRenderProps, TooltipProps } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartConfig, ChartContainer, ChartTooltip } from '@/components/ui/chart';
import { useAgeDistribution } from '@/ui/hooks/ui/useAgeDistributionMetrics';
import { useDateRangeStore } from '@/ui/stores/useDateRangeStore';
import { ExportDropdown } from '../../ExportDropdown';

export function AppUsageAgeDistributionRadialChart() {
  const t = useTranslations();
  const fromDate = useDateRangeStore((s) => s.fromDate);
  const toDate = useDateRangeStore((s) => s.toDate);
  const { data, loading, error } = useAgeDistribution(fromDate, toDate);

  const chartConfig = useMemo(
    () =>
      ({
        teens: { label: '14-19', color: '#253A60' },
        twenties: { label: '20-29', color: '#FFB700' },
        thirtiesForties: { label: '30-49', color: '#2EC4B6' },
        fiftiesSixties: { label: '50-69', color: '#F4743B' },
        seventiesPlus: { label: '70+', color: '#BFD7B5' },
      }) satisfies ChartConfig,
    []
  );

  const values = useMemo(
    () =>
      data
        ? {
            teens: data.R14_19 || 0,
            twenties: data.R20_29 || 0,
            thirtiesForties: data.R30_49 || 0,
            fiftiesSixties: data.R50_69 || 0,
            seventiesPlus: data.R70_PLUS || 0,
          }
        : null,
    [data]
  );

  const totalPeople = useMemo(
    () => (values ? Object.values(values).reduce((sum, v) => sum + v, 0) : 0),
    [values]
  );

  const chartData = useMemo(
    () =>
      values
        ? Object.entries(values).map(([key, people]) => ({
            ageGroup: chartConfig[key as keyof typeof chartConfig].label,
            people,
            fill: chartConfig[key as keyof typeof chartConfig].color,
          }))
        : [],
    [values, chartConfig]
  );

  const formattedTotal = useMemo(() => totalPeople.toLocaleString(), [totalPeople]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[25vh] w-full rounded-md">
        <div className="w-10 h-10 border-4 border-t-blue-500 border-gray-300 rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!data || totalPeople === 0) {
    return <p className="text-gray-500">Data Unavailable</p>;
  }

  const renderLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    value,
  }: PieLabelRenderProps) => {
    if (!(cx && cy && midAngle && innerRadius && outerRadius && value) || totalPeople === 0) {
      return null;
    }

    const RADIAN = Math.PI / 180;
    const radius = Number(innerRadius) + (Number(outerRadius) - Number(innerRadius)) / 2;
    const x = Number(cx) + radius * Math.cos(-Number(midAngle) * RADIAN);
    const y = Number(cy) + radius * Math.sin(-Number(midAngle) * RADIAN);

    return (
      <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={12}>
        {((Number(value) / totalPeople) * 100).toFixed(1)}%
      </text>
    );
  };

  const CustomTooltip = ({ active, payload }: TooltipProps<number, string>) => {
    if (!active || !payload?.length) {
      return null;
    }
    const data = payload[0].payload;

    return (
      <div className="bg-white p-[6px] rounded-lg shadow-md text-xs w-20">
        <p className="font-semibold pb-1">{data.ageGroup}</p>
        <div className="flex justify-between">
          <p className="text-gray-500">{t('Charts.people')}</p>
          <p className="text-gray-500">{data.people.toLocaleString()}</p>
        </div>
      </div>
    );
  };

  return (
    <Card className="w-full min-h-[690px] rounded-[24px] p-3 flex flex-col border-l-0 border-b-0 border-t-0 border-r-0  2xl:border-b-0 shadow-none ">
      {/* header */}
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
      {/* Pie chart */}
      <CardContent className="flex items-center justify-center pb-0">
        <ChartContainer config={chartConfig} className="aspect-square min-h-[320px]">
          <PieChart>
            <ChartTooltip cursor={false} content={<CustomTooltip />} />
            <Pie
              data={chartData}
              dataKey="people"
              nameKey="ageGroup"
              innerRadius={75}
              label={renderLabel}
              labelLine={false}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
      {/* Table  */}
      <div className="flex flex-col gap-4 w-full overflow-x-auto">
        <div className="flex items-center justify-center gap-2">
          <Users2 className="w-4 h-4 text-gray-500" />
          <p className="text-gray-500 text-sm">
            {t('Charts.appUsers')}: {formattedTotal}
          </p>
        </div>
        <table className="min-w-full divide-y divide-gray-200 ">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">
                {t('Charts.ageGroup')}
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">
                {t('Charts.people')}
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 ">%</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {chartData.map(({ ageGroup, people, fill }) => {
              const percentage =
                totalPeople > 0 ? ((people / totalPeople) * 100).toFixed(1) : '0.0';
              return (
                <tr key={ageGroup}>
                  <td className="px-4 py-2 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full" style={{ backgroundColor: fill }} />
                      <span className="text-sm font-medium">{ageGroup}</span>
                    </div>
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                    {people.toLocaleString()}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                    {percentage}%
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
