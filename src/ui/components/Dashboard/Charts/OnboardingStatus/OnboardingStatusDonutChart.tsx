'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Cell, Pie, PieChart, Tooltip } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useOnboardingStatusMetrics } from '@/ui/hooks/ui/useOnboardingStatusMetrics';
import { ExportDropdown } from '../../ExportDropdown';

const COLORS = [
  '#CDFFFA',
  '#9BF2E9',
  '#65EADD',
  '#45D7C9',
  '#2EC4B6',
  '#29A79C',
  '#1D766F',
  '#15534F',
  '#11403D',
  '#11403D',
];

export function OnboardingStatusDonutChart() {
  const { data, loading, error } = useOnboardingStatusMetrics();
  const t = useTranslations();

  // Responsive width state
  const [chartWidth, setChartWidth] = React.useState(500);

  React.useEffect(() => {
    function updateWidth() {
      setChartWidth(Math.min(1000, window.innerWidth - 64));
    }
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  const STATUS_LABELS: Record<string, string> = {
    VERIFICATION_FAILED: t('OnboardingStatusDonutChart.VERIFICATION_FAILED'),
    VERIFICATION_COMPLETED: t('OnboardingStatusDonutChart.VERIFICATION_COMPLETED'),
    PERSONAL_INFO_VERIFIED: t('OnboardingStatusDonutChart.PERSONAL_INFO_VERIFIED'),
    OTP_SENT: t('OnboardingStatusDonutChart.OTP_SENT'),
    MOBILE_VERIFIED: t('OnboardingStatusDonutChart.MOBILE_VERIFIED'),
    FAILED_FINALIZATION: t('OnboardingStatusDonutChart.FAILED_FINALIZATION'),
    AGREEMENTS_ACCEPTED: t('OnboardingStatusDonutChart.AGREEMENTS_ACCEPTED'),
    NASP_FAILED: t('OnboardingStatusDonutChart.NASP_FAILED'),
    CREATED: t('OnboardingStatusDonutChart.CREATED'),
    COMPLETED: t('OnboardingStatusDonutChart.COMPLETED'),
    FACE_VERIFICATION_IN_PROGRESS: t('OnboardingStatusDonutChart.FACE_VERIFICATION_IN_PROGRESS'),
  };

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    outerRadius,
    payload,
    // index,
    // viewBox
  }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = outerRadius + 30;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    const textAnchor = x > cx ? 'start' : 'end';
    const label = STATUS_LABELS[payload.status] || payload.status.replace(/_/g, ' ');

    let percent = Number(payload.percentage);
    if (!isFinite(percent) || isNaN(percent)) {
      percent = 0;
    }

    // Adjust y position based on angle to prevent overlaps
    let adjustedY = y;
    if (midAngle > 180) {
      // Left side adjustments
      if (midAngle > 270) {
        adjustedY = y - 15; // Top-left quadrant
      } else {
        adjustedY = y + 15; // Bottom-left quadrant
      }
    } else if (midAngle > 90) {
      // Right side adjustments - Bottom-right quadrant
      adjustedY = y + 15;
    } else {
      // Right side adjustments - Top-right quadrant
      adjustedY = y - 15;
    }

    return (
      <g>
        <polyline
          stroke="#9D9DA7"
          strokeWidth={1}
          fill="none"
          points={`
          ${cx + outerRadius * Math.cos(-midAngle * RADIAN)},${cy + outerRadius * Math.sin(-midAngle * RADIAN)}
          ${cx + (outerRadius + 12) * Math.cos(-midAngle * RADIAN)},${cy + (outerRadius + 12) * Math.sin(-midAngle * RADIAN)}
          ${x},${adjustedY}
        `}
        />
        <foreignObject
          x={x > cx ? x : x - 200}
          y={adjustedY - 10}
          width={200}
          height={40}
          style={{ overflow: 'visible' }}
        >
          <div
            style={{
              fontSize: '14px',
              color: '#9D9DA7',
              fontWeight: '400',
              textAlign: textAnchor,
              lineHeight: '1.2',
              whiteSpace: 'nowrap',
            }}
          >
            {label}
            <span
              style={{
                color: '#0B0B22',
                fontWeight: '400',
                paddingLeft: '5px',
              }}
            >
              {percent.toFixed(1)}%
            </span>
          </div>
        </foreignObject>
      </g>
    );
  };

  const chartData = React.useMemo(() => {
    if (!data?.statusCounts) {
      return [];
    }

    const total = data.totalOnboardingApplications || 1;
    return Object.entries(data.statusCounts)
      .filter(([status, count]) => STATUS_LABELS[status] && count > 0)
      .map(([status, count]) => ({
        status,
        count,
        percentage: (count / total) * 100,
      }))
      .sort((a, b) => b.percentage - a.percentage);
  }, [data]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[25vh] w-full">
        <div className="w-10 h-10 border-4 border-t-blue-500 border-gray-300 rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <Card className="bg-white m-3 rounded-[24px] border-none shadow-none">
      <div className="flex justify-between items-center p-6">
        <CardHeader className="p-0">
          <CardTitle className="text-[#0B0B22] text-[16px] font-semibold">
            {t('Navbar.OnboardingStatus')}
          </CardTitle>
        </CardHeader>
        <ExportDropdown
          chartData={chartData}
          fileName="Onboarding Status"
          labelMapping={{
            status: 'Status',
            count: 'Count',
            percentage: 'Percentage (%)',
          }}
        />
      </div>
      <CardContent className="pb-8 w-full">
        <div className="w-full flex justify-center">
          <PieChart
            width={chartWidth}
            height={500}
            margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
          >
            <Pie
              data={chartData}
              dataKey="count"
              nameKey="status"
              cx="50%"
              cy="50%"
              innerRadius={80}
              outerRadius={140}
              labelLine={false}
              label={renderCustomizedLabel}
              paddingAngle={1}
              isAnimationActive={false}
            >
              {chartData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value: number, _: string, props: any) => [
                value,
                STATUS_LABELS[chartData[props.payload.index]?.status] ||
                  chartData[props.payload.index]?.status,
              ]}
            />
          </PieChart>
        </div>
      </CardContent>
    </Card>
  );
}
