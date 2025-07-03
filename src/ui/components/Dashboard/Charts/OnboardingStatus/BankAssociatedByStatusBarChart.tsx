import React from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useBankAssociatedByStatus } from '@/ui/hooks/ui/useBankAssociatedByStatus';
import { ExportDropdown } from '../../ExportDropdown';

const BANK_COLORS: Record<string, string> = {
  NODATA: '#08678E', // No Data
  XALQ: '#2EC4B6', // XALQ
  ALOQA: '#A5BE19', // ALOQA
};

const BANK_LABELS: Record<string, string> = {
  NODATA: 'No Data',
  XALQ: 'XALQ',
  ALOQA: 'ALOQA',
};

// Mapping from API status codes to user-friendly labels
const STATUS_LABELS: Record<string, string> = {
  AGREEMENTS_ACCEPTED: 'Agreements Accepted',
  COMPLETED: 'Completed',
  FACE_VERIFICATION_IN_PROGRESS: 'Face Verification in progress',
  FAILED_FINALIZATION: 'Failed Finalization',
  MOBILE_VERIFIED: 'Mobile Verified',
  OTP_SENT: 'OTP Sent',
  PERSONAL_INFO_VERIFIED: 'Personal Info Verified',
  VERIFICATION_COMPLETED: 'Verification Completed',
  VERIFICATION_FAILED: 'Verification Failed',
};

// Order of statuses
const STATUS_ORDER = [
  'AGREEMENTS_ACCEPTED',
  'COMPLETED',
  'FACE_VERIFICATION_IN_PROGRESS',
  'FAILED_FINALIZATION',
  'MOBILE_VERIFIED',
  'OTP_SENT',
  'PERSONAL_INFO_VERIFIED',
  'VERIFICATION_COMPLETED',
  'VERIFICATION_FAILED',
];

// Custom label renderer to hide zero values
const renderLabelIfNotZero = (props: any) => {
  const { value, x, y, width, height, fill } = props;
  if (!value) {
    return null;
  }
  return (
    <text
      x={x + (width ? width / 2 : 0)}
      y={y + (height ? height / 2 : 0)}
      textAnchor="middle"
      dominantBaseline="middle"
      className="font-semibold text-xs"
      fill={fill || '#fff'}
    >
      {value}
    </text>
  );
};

// Custom label renderer for total
const renderTotalLabel = (props: any) => {
  const { value, x, y, width, height } = props;
  if (!value) {
    return null;
  }
  return (
    <text
      x={x + (width ? width + 8 : 8)}
      y={y + (height ? height / 2 : 0)}
      textAnchor="start"
      dominantBaseline="middle"
      className="font-semibold text-xs"
      fill="#9D9DA7"
    >
      {value}
    </text>
  );
};

export function BankAssociatedByStatusBarChart() {
  const { data, loading, error } = useBankAssociatedByStatus();

  const chartData = React.useMemo(() => {
    if (!data) {
      return [];
    }
    return STATUS_ORDER.map((status) => {
      const banks = data[status] || { NODATA: 0, XALQ: 0, ALOQA: 0 };
      return {
        status,
        ...banks,
        total: (banks.NODATA || 0) + (banks.XALQ || 0) + (banks.ALOQA || 0),
      };
    }).filter((row) => row.total > 0);
  }, [data]);

  return (
    <Card className="m-3 mt-0 p-3 bg-white shadow-none border-t-0 border-b-0 border-l-0 border-r-0 rounded-[24px]">
      <div className="flex justify-between items-center pr-8">
        <CardHeader>
          <CardTitle className="text-[#0B0B22] font-semibold text-[16px] leading-normal">
            Bank Associated By Status
          </CardTitle>
        </CardHeader>
        <div className="flex justify-center">
          <ExportDropdown
            chartData={chartData}
            fileName="Bank Associated By Status"
            labelMapping={{
              status: 'Status',
              NODATA: BANK_LABELS.NODATA,
              XALQ: BANK_LABELS.XALQ,
              ALOQA: BANK_LABELS.ALOQA,
              total: 'Total',
            }}
            keysToExclude={[]}
          />
        </div>
      </div>
      <CardContent>
        {loading && (
          <div className="flex items-center justify-center h-[25vh] w-full">
            <div className="w-10 h-10 border-4 border-t-blue-500 border-gray-300 rounded-full animate-spin" />
          </div>
        )}
        {error && <p className="text-red-500 px-4">{error}</p>}
        {!loading && !error && (
          <>
            <ResponsiveContainer width="100%" height={chartData.length * 48 + 40}>
              <BarChart
                data={chartData}
                layout="vertical"
                margin={{ top: 16, right: 32, left: 32, bottom: 16 }}
                barCategoryGap={16}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" allowDecimals={false} axisLine={false} tickLine={false} />
                <YAxis
                  dataKey="status"
                  type="category"
                  width={260}
                  axisLine={false}
                  tickLine={false}
                  tick={({ x, y, payload }) => {
                    const code = payload.value;
                    const label = STATUS_LABELS[code] || code.replace(/_/g, ' ');
                    return (
                      <text
                        x={x}
                        y={y + 5}
                        textAnchor="end"
                        className="text-[#0B0B22] text-left font-normal text-[13px] leading-normal"
                      >
                        <title>{label}</title>
                        {label}
                      </text>
                    );
                  }}
                />
                <Tooltip
                  cursor={{ fill: '#f5f5f5' }}
                  formatter={(value, name) => [value, BANK_LABELS[name as string] || name]}
                />
                <Bar
                  dataKey="NODATA"
                  fill={BANK_COLORS.NODATA}
                  barSize={24}
                  name={BANK_LABELS.NODATA}
                  stackId="a"
                >
                  <LabelList dataKey="NODATA" content={renderLabelIfNotZero} />
                </Bar>
                <Bar
                  dataKey="XALQ"
                  fill={BANK_COLORS.XALQ}
                  barSize={24}
                  name={BANK_LABELS.XALQ}
                  stackId="a"
                >
                  <LabelList dataKey="XALQ" content={renderLabelIfNotZero} />
                </Bar>
                <Bar
                  dataKey="ALOQA"
                  fill={BANK_COLORS.ALOQA}
                  barSize={24}
                  name={BANK_LABELS.ALOQA}
                  stackId="a"
                >
                  <LabelList dataKey="ALOQA" content={renderLabelIfNotZero} />
                  <LabelList dataKey="total" position="right" content={renderTotalLabel} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            <div className="flex flex-row gap-6 justify-end mt-4">
              {Object.keys(BANK_COLORS).map((key) => (
                <div key={key} className="flex items-center gap-2">
                  <span
                    style={{
                      backgroundColor: BANK_COLORS[key],
                      width: 14,
                      height: 14,
                      borderRadius: '50%',
                      display: 'inline-block',
                    }}
                  />
                  <span className="text-[#0B0B22] text-sm font-medium">{BANK_LABELS[key]}</span>
                </div>
              ))}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
