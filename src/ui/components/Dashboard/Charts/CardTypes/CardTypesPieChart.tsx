'use client';

import { useMemo } from 'react';
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  PieLabelRenderProps,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
} from 'recharts';
import { ChartConfig } from '@/components/ui/chart';
import { useCardMetrics } from '@/ui/hooks/ui/useCardMetrics';
import { useDateRangeStore } from '@/ui/stores/useDateRangeStore';

export function CardTypesPieChart() {
  const fromDate = useDateRangeStore((s) => s.fromDate);
  const toDate = useDateRangeStore((s) => s.toDate);
  const { metrics, loading, error } = useCardMetrics(fromDate, toDate);

  const chartConfig: ChartConfig = useMemo(
    () => ({
      XALQ: { label: 'XALQ', color: '#13AB3F' },
      ALOHA: { label: 'ALOHA', color: '#2157E2' },
    }),
    []
  );

  const chartData = useMemo(() => {
    if (!metrics) {
      return [];
    }
    return [
      {
        cardType: 'XALQ',
        holders: metrics.XALQ,
        fill: chartConfig.XALQ.color,
      },
      {
        cardType: 'ALOHA',
        holders: metrics.ALOHA,
        fill: chartConfig.ALOHA.color,
      },
    ];
  }, [metrics, chartConfig]);

  const totalHolders = useMemo(
    () => chartData.reduce((sum, entry) => sum + entry.holders, 0),
    [chartData]
  );

  if (loading) {
    return (
      <div className="w-full">
        <div className="flex flex-col gap-1">
          <h3 className="text-lg font-semibold">User Enrollment Distribution by Bank</h3>
        </div>
        <div className="flex items-center justify-center h-[300px]">
          <div className="w-8 h-8 border-4 border-t-blue-500 border-gray-300 rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (chartData.length === 0) {
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
    if (!(cx && cy && midAngle && innerRadius && outerRadius && value) || totalHolders === 0) {
      return null;
    }

    const RADIAN = Math.PI / 180;
    const radius = Number(innerRadius) + (Number(outerRadius) - Number(innerRadius)) / 2;
    const x = Number(cx) + radius * Math.cos(-Number(midAngle) * RADIAN);
    const y = Number(cy) + radius * Math.sin(-Number(midAngle) * RADIAN);

    return (
      <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={12}>
        {((Number(value) / totalHolders) * 100).toFixed(1)}%
      </text>
    );
  };

  const CustomTooltip = ({ active, payload }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const percentage = ((data.holders / totalHolders) * 100).toFixed(1);
      return (
        <div className="bg-white p-2">
          <p className="font-medium">{data.cardType}</p>
          <p className="text-sm">Holders: {data.holders}</p>
          <p className="text-sm">Percentage: {percentage}%</p>
        </div>
      );
    }
    return null;
  };

  const renderLegend = (props: any) => {
    const { payload } = props;
    return (
      <ul className="flex justify-center gap-4">
        {payload.map((entry: any, index: number) => (
          <li key={`item-${index}`} className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }} />
            <span>{entry.value}</span>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="w-full">
      <div className="flex flex-col gap-1">
        <h3 className="text-lg font-semibold">Card Types Distribution</h3>
      </div>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="holders"
              label={renderLabel}
              nameKey="cardType"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend content={renderLegend} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
