import React, { useState } from 'react';
import { format, subDays } from 'date-fns';
import { Calendar as CalendarIcon, ChevronDown } from 'lucide-react';
import { DateRange } from 'react-date-range';
import { Cell, Pie, PieChart, Tooltip } from 'recharts';
import { useAgentOnboardingStatus } from '@/ui/hooks/ui/useAgentOnboardingStatus';

import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

import { useTranslations } from 'next-intl';

interface ChartDataItem {
  name: string;
  value: number;
  color: string;
  label?: string;
}

interface OnboardingStatusProps {
  userId: string;
  fromDate: string;
  toDate: string;
}

const STATUS_COLORS: Record<string, string> = {
  CREATED: '#8884d8',
  OTP_SENT: '#82ca9d',
  NASP_FAILED: '#ffc658',
  MOBILE_VERIFIED: '#ff8042',
  PERSONAL_INFO_VERIFIED: '#8dd1e1',
  AGREEMENTS_ACCEPTED: '#a4de6c',
  FACE_VERIFICATION_IN_PROGRESS: '#d0ed57',
  VERIFICATION_COMPLETED: '#8884d8',
  VERIFICATION_FAILED: '#d62728',
  FAILED_FINALIZATION: '#ffbb28',
  NOT_ELIGIBLE: '#bdbdbd',
  COMPLETED: '#00C49F',
};

function transformDistributionToChartData(distribution: Record<string, number>): ChartDataItem[] {
  return Object.entries(distribution)
    .filter(([_, value]) => value > 0)
    .map(([name, value]) => ({
      name,
      value,
      color: STATUS_COLORS[name] || '#8884d8',
    }));
}

// Loading skeleton component
const OnboardingStatusSkeleton = () => {
  return (
    <div className="bg-white p-4 min-h-[475px]">
      {/* Top summary section skeleton */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2 gap-4">
        <div>
          <div className="h-8 w-64 bg-gray-200 rounded-md animate-pulse mb-2" />
        </div>
        <div className="flex items-center gap-3">
          <div className="h-8 w-32 bg-gray-200 rounded-md animate-pulse" />
          <div className="h-8 w-48 bg-gray-200 rounded-md animate-pulse" />
        </div>
      </div>
      <div className="mt-4">
        <div className="flex items-center mt-2">
          <div className="h-6 w-40 bg-gray-200 rounded-md animate-pulse mr-2" />
          <div className="h-8 w-48 bg-gray-200 rounded-md animate-pulse" />
        </div>
      </div>

      {/* Donut chart skeleton */}
      <div className="flex justify-center items-center mt-8">
        <div className="w-[240px] h-[240px] rounded-full border-8 border-gray-200 animate-pulse flex items-center justify-center">
          <div className="w-[180px] h-[180px] rounded-full bg-gray-200" />
        </div>
      </div>
    </div>
  );
};

const OnboardingStatus: React.FC<OnboardingStatusProps> = ({
  userId,
  fromDate: initialFromDate,
  toDate: initialToDate,
}) => {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<'custom' | 'month' | 'week' | 'day'>('custom');
  const t = useTranslations();

  // Temporary date range for the picker
  const [tempDateRange, setTempDateRange] = useState<{
    startDate: Date;
    endDate: Date;
    key: string;
  }>({
    startDate: new Date(initialFromDate),
    endDate: new Date(initialToDate),
    key: 'selection',
  });

  // Actual date range used for API calls
  const [apiDateRange, setApiDateRange] = useState({
    fromDate: initialFromDate,
    toDate: initialToDate,
  });

  const { data, loading, error } = useAgentOnboardingStatus(
    userId,
    apiDateRange.fromDate,
    apiDateRange.toDate
  );

  const QUICK_FILTERS = {
    month: t('Charts.lastMonth'),
    week: t('Charts.week'),
    day: t('Buttons.today'),
    custom: t('Agents.CustomRange'),
  } as const;

  const handleRangeChange = (ranges: any) => {
    setActiveFilter('custom');
    setTempDateRange({
      startDate: ranges.selection.startDate,
      endDate: ranges.selection.endDate,
      key: 'selection',
    });
  };

  const handleApplyDateRange = () => {
    setApiDateRange({
      fromDate: format(tempDateRange.startDate, 'yyyy-MM-dd'),
      toDate: format(tempDateRange.endDate, 'yyyy-MM-dd'),
    });
    setIsDatePickerOpen(false);
  };

  const handleCancel = () => {
    setTempDateRange({
      startDate: new Date(apiDateRange.fromDate),
      endDate: new Date(apiDateRange.toDate),
      key: 'selection',
    });
    setIsDatePickerOpen(false);
  };

  const handleQuickFilter = (filter: 'month' | 'week' | 'day' | 'custom') => {
    setActiveFilter(filter);
    setIsFilterDropdownOpen(false);

    if (filter === 'custom') {
      setIsDatePickerOpen(true);
      return;
    }

    const today = new Date();
    let startDate: Date;
    const endDate = today;

    switch (filter) {
      case 'month':
        startDate = subDays(today, 30);
        break;
      case 'week':
        startDate = subDays(today, 7);
        break;
      case 'day':
        startDate = today;
        break;
      default:
        return;
    }

    const newRange = {
      fromDate: format(startDate, 'yyyy-MM-dd'),
      toDate: format(endDate, 'yyyy-MM-dd'),
    };

    // Update both temporary and API date ranges
    setTempDateRange({
      startDate,
      endDate,
      key: 'selection',
    });
    setApiDateRange(newRange);
  };

  if (loading) {
    return <OnboardingStatusSkeleton />;
  }
  if (error) {
    return <div className="text-red-500">{error}</div>;
  }
  if (!data) {
    return <div>{t('Charts.NoDataAvailable')}</div>;
  }

  // Get raw chart data, then add translated label in-place
  const chartData = transformDistributionToChartData(data.distribution).map((item) => ({
    ...item,
    label: t(`OnboardingStatus.${item.name}` as any),
  }));

  return (
    <div className="bg-white p-4 min-h-[475px]">
      {/* Top summary section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2 gap-4">
        <div>
          <div className="text-2xl font-semibold text-gray-900 mb-2">
            {t('Agents.totalFailedCases')}: <span className="font-bold">{data.totalCases}</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {/* Filter Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsFilterDropdownOpen(!isFilterDropdownOpen)}
              className="flex items-center gap-2 px-3 py-1.5 border border-gray-200 rounded-md hover:bg-gray-50 text-xs transition-colors"
            >
              <span>{QUICK_FILTERS[activeFilter]}</span>
              <ChevronDown className="h-3 w-3" />
            </button>

            {isFilterDropdownOpen && (
              <div className="absolute right-0 mt-1 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                {(Object.entries(QUICK_FILTERS) as [keyof typeof QUICK_FILTERS, string][]).map(
                  ([key, label]) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => handleQuickFilter(key)}
                      className={`w-full px-3 py-1.5 text-left text-xs hover:bg-gray-50 first:rounded-t-md last:rounded-b-md transition-colors
                      ${activeFilter === key ? 'bg-primary/10 text-primary font-medium' : 'text-gray-700'}`}
                    >
                      {label}
                    </button>
                  )
                )}
              </div>
            )}
          </div>

          {/* Custom Date Range Picker */}
          {activeFilter === 'custom' && (
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
                className="flex items-center gap-2 px-3 py-1.5 border border-gray-200 rounded-md hover:bg-gray-50 text-xs transition-colors"
              >
                <CalendarIcon className="h-3 w-3" />
                <span>
                  {format(new Date(apiDateRange.fromDate), 'dd/MM/yyyy')} -{' '}
                  {format(new Date(apiDateRange.toDate), 'dd/MM/yyyy')}
                </span>
              </button>

              {isDatePickerOpen && (
                <div className="absolute right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                  <DateRange
                    ranges={[tempDateRange]}
                    onChange={handleRangeChange}
                    months={2}
                    direction="horizontal"
                    rangeColors={['#08678e']}
                    showDateDisplay={false}
                  />
                  <div className="flex justify-end gap-2 p-2 border-t">
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="px-3 py-1.5 text-xs text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
                    >
                      {t('Filter.cancel')}
                    </button>
                    <button
                      type="button"
                      onClick={handleApplyDateRange}
                      className="px-3 py-1.5 text-xs bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
                    >
                      {t('Filter.apply')}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="mt-4">
        <div className="flex items-center mt-2">
          <span className="text-lg mr-2">{t('Filter.TopErrorReason')}:</span>
          <span className="bg-red-500 text-white px-2 py-0 rounded-lg font-semibold text-lg">
            {data.topErrorReason
              ? t(`OnboardingStatus.${data.topErrorReason}` as any)
              : t('Filter.NoChartDataAvailable')}
          </span>
        </div>
      </div>

      {/* Donut chart section */}
      <div className="flex justify-center items-center">
        {chartData.length > 0 ? (
          <PieChart width={800} height={350}>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={90}
              outerRadius={120}
              fill="#8884d8"
              paddingAngle={2}
              dataKey="value"
              labelLine
              label={({ label, percent }) => `${label}\n${(percent * 100).toFixed(1)}%`}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value: number, _name: string, props: any) => [
                `${value}`,
                props.payload.label,
              ]}
            />
          </PieChart>
        ) : (
          <div className="text-gray-500 text-lg"> {t('Filter.NoChartDataAvailable')}</div>
        )}
      </div>
    </div>
  );
};

export default OnboardingStatus;
