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
  CREATED: 'PNFL verification Failed',
  OTP_SENT: 'OTP Sent',
  NASP_FAILED: 'NASP API Failed',
  MOBILE_VERIFIED: 'Abandoned at OTP verification completed',
  PERSONAL_INFO_VERIFIED: 'Abandoned at personal verification completed',
  AGREEMENTS_ACCEPTED: 'Abandoned at T&C accepted',
  FACE_VERIFICATION_IN_PROGRESS: 'Abandoned while face verification in progress',
  VERIFICATION_COMPLETED: 'Abandoned at face verification completed',
  VERIFICATION_FAILED: 'Face verification failed',
  FAILED_FINALIZATION: 'Failed Finalization',
  COMPLETED: 'Bank Sign up successful',
};

// Custom label with line and text outside the pie
const renderCustomizedLabel = ({ cx, cy, midAngle, outerRadius, payload }: any) => {
  const RADIAN = Math.PI / 180;
  const radius = outerRadius + 30;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  const textAnchor = x > cx ? 'start' : 'end';
  const label = STATUS_LABELS[payload.status] || payload.status.replace(/_/g, ' ');
  // Ensure percentage is always a valid number
  let percent = Number(payload.percentage);
  if (!isFinite(percent) || isNaN(percent)) {
    percent = 0;
  }
  // Calculate label box width and position for better spacing
  const labelBoxWidth = 700;
  const labelBoxX = textAnchor === 'start' ? x : x - labelBoxWidth;
  // Calculate the connector line color
  const connectorColor = '#9D9DA7';
  // Custom y position for specific labels to avoid overlap
  let customY = y;
  if (label === 'Abandoned at OTP verification completed') {
    customY = 10.263389;
  } else if (label === 'NASP API Failed') {
    customY = 49.736875;
  } 
  return (
    <g>
      {/* Connector line from arc to label */}
      <polyline
        stroke={connectorColor}
        strokeWidth={1}
        fill="none"
        points={`
          ${cx + outerRadius * Math.cos(-midAngle * RADIAN)},${cy + outerRadius * Math.sin(-midAngle * RADIAN)}
          ${cx + (outerRadius + 12) * Math.cos(-midAngle * RADIAN)},${cy + (outerRadius + 12) * Math.sin(-midAngle * RADIAN)}
          ${x},${y}
        `}
      />
      <foreignObject x={labelBoxX} y={customY} width={labelBoxWidth} height="40">
        <div
          style={{
            fontSize: 14,
            color: '#9D9DA7',
            fontWeight: 400,
            textAlign: textAnchor,
            lineHeight: 1.2,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'normal', // allow wrapping
            maxHeight: 48, // limit height to 2-3 lines
            display: 'block',
          }}
          title={label}
        >
          {label}
          <span
            style={{
              color: '#0B0B22',
              fontFamily: 'Inter, sans-serif',
              fontSize: 14,
              fontWeight: 300,
              lineHeight: 'normal',
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
    <>
      <Card className="m-3 p-3 bg-white shadow-none border-t-0 border-b-0 border-l-0 border-r-0 rounded-[24px]">
        <div className="flex justify-between items-center pr-8">
          <CardHeader>
            <CardTitle className="text-[#0B0B22] text-[16px] font-semibold leading-normal">
              Onboarding Status
            </CardTitle>
          </CardHeader>
          <div className="flex justify-center">
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
        </div>
        <CardContent className="w-full flex justify-center items-center min-h-[440px]">
            <PieChart width={1200} style={{left:"50px"}} height={400}>
            <Pie
              data={chartData}
              dataKey="count"
              nameKey="status"
              style={{ display: 'flex', justifyContent: 'center' }}
              cx={450}
              cy={200}
              innerRadius={70}
              outerRadius={140}
              labelLine
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
        </CardContent>
      </Card>
    </>
  );
}
