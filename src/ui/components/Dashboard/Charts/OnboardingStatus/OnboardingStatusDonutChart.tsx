'use client';

import React from 'react';
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

// Mapping from API status codes to user-friendly labels
const STATUS_LABELS: Record<string, string> = {
  VERIFICATION_FAILED: 'FaceID failed',
  VERIFICATION_COMPLETED: 'Exited after FaceID completion',
  PERSONAL_INFO_VERIFIED: 'Exited After Personal Information',
  OTP_SENT: 'OTP Was Sent And The Journey',
  MOBILE_VERIFIED: 'OTP Verified Then Didn\'t Proceed',
  FAILED_FINALIZATION: 'Failed Finalization',
  AGREEMENTS_ACCEPTED: 'Agreements Accepted',
  NASP_FAILED: 'The NASP process has failed',
  CREATED: 'Creation was unsuccessful',
  COMPLETED: 'Completed',
  FACE_VERIFICATION_IN_PROGRESS: 'Face Started Then User Dropped Off',
};

// Custom label with line and text outside the pie
const renderCustomizedLabel = ({ cx, cy, midAngle, outerRadius, payload }: any) => {
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

  // Adjust y for specific label
  let foreignObjectY = y;
  if (label === "OTP Verified Then Didn't Proceed") {
    foreignObjectY = 15.30290897253988;
  }

  return (
    <g>
      {/* Connector line from arc to label */}
      <polyline
        stroke="#9D9DA7"
        strokeWidth={1}
        fill="none"
        points={`
          ${cx + outerRadius * Math.cos(-midAngle * RADIAN)},${cy + outerRadius * Math.sin(-midAngle * RADIAN)}
          ${cx + (outerRadius + 12) * Math.cos(-midAngle * RADIAN)},${cy + (outerRadius + 12) * Math.sin(-midAngle * RADIAN)}
          ${x},${y}
        `}
      />
      <foreignObject 
        x={x > cx ? x : x - 200} 
        y={foreignObjectY - 10} 
        width={200} 
        height={40}
      >
        <div
          style={{
            fontSize: '14px',
            color: '#9D9DA7',
            fontWeight: '400',
            textAlign: textAnchor,
            lineHeight: '1.2',
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

export function OnboardingStatusDonutChart() {
  const { data, loading, error } = useOnboardingStatusMetrics();

  // Transform statusCounts to array for the chart
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
      }));
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
            Onboarding Status
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
          <PieChart width={Math.min(800, window.innerWidth - 64)} height={400}>
            <Pie
              data={chartData}
              dataKey="count"
              nameKey="status"
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={120}
              labelLine={false}
              label={renderCustomizedLabel}
              paddingAngle={0}
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