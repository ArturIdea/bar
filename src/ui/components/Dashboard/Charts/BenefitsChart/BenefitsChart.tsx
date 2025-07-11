'use client';

import { useState } from 'react';
import { CardHeader, CardTitle } from '@/components/ui/card';
import { ExportDropdown } from '@/ui/components/Dashboard/ExportDropdown';
import { useBenefits } from '@/ui/hooks/ui/useBenefits';

export default function BenefitsChart() {
  const [page] = useState(0);
  const [pageSize] = useState(16);
  const { benefits } = useBenefits(page, pageSize);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Prepare data for chart
  const chartData = benefits.map((benefit) => {
    const active = benefit.statuses?.ACTIVE?.userCount || 0;
    const expired = benefit.statuses?.EXPIRED?.userCount || 0;
    const totalValue = benefit.statuses?.ACTIVE?.totalAmount?.priceValue || 0;
    const avgPerUser = benefit.statuses?.ACTIVE?.averageAmountPerUser?.priceValue || 0;
    // Use fallback logic for name
    const name =
      benefit.benefitType.name.uzLatn ||
      benefit.benefitType.name.uzCyrl ||
      benefit.benefitType.name.ru ||
      benefit.benefitType.name.qr ||
      'N/A';
    return {
      name,
      active,
      expired,
      totalValue,
      avgPerUser,
    };
  });

  // Export label mapping
  const labelMapping = {
    name: 'Benefit Name',
    active: 'Active Users',
    expired: 'Expired Users',
    totalValue: 'Total Value',
    avgPerUser: 'Avg. per User',
  };

  // Find max Y value for scaling
  const maxY = Math.max(...chartData.map((d) => d.active + d.expired), 1);
  const yAxisPercents = [0, 25, 50, 75, 100];

  return (
    <div className="p-6 pr-15 bg-white rounded-[24px] w-full">
      <div className="flex justify-between mb-5 items-center">
        <CardHeader>
          <CardTitle>Benefit Status</CardTitle>
        </CardHeader>
        <div className="flex items-center gap-2">
          <ExportDropdown chartData={chartData} fileName="Benefits" labelMapping={labelMapping} />
        </div>
      </div>
      <div className="space-y-4 w-full">
        <div className="relative h-[320px] w-full">
          {/* Y-axis label */}
          <div className="absolute left-[-25px] top-1/2 transform -translate-y-1/2 -rotate-90 text-xs text-gray-500">
            Users
          </div>
          {/* Y-axis values */}
          <div className="absolute left-[16px] top-0 bottom-0 w-12 flex flex-col-reverse justify-between text-xs text-gray-500">
            {yAxisPercents.map((percent) => (
              <div key={percent} className="transform translate-y-1/2">
                {Math.round((percent / 100) * maxY).toLocaleString()}
              </div>
            ))}
          </div>
          {/* Chart area with grid lines */}
          <div className="ml-12 relative h-full w-full">
            {/* Grid lines */}
            <div className="absolute inset-0 flex flex-col-reverse justify-between">
              {yAxisPercents.map((percent) => (
                <div
                  key={percent}
                  className="w-full border-t border-gray-200"
                  style={{ bottom: `${percent}%` }}
                />
              ))}
            </div>
            {/* Bars */}
            <div className="flex h-full gap-4 px-4 justify-between w-full">
              {chartData.map((d, idx) => {
                const total = d.active + d.expired;
                const activeHeight = total > 0 ? (d.active / maxY) * 100 : 0;
                const expiredHeight = total > 0 ? (d.expired / maxY) * 100 : 0;
                // Calculate pixel heights with a minimum of 32px if value > 0
                const chartPixelHeight = 320; // matches h-[320px]
                const expiredBarHeight =
                  d.expired > 0 ? Math.max((expiredHeight / 100) * chartPixelHeight, 32) : 0;
                const activeBarHeight =
                  d.active > 0 ? Math.max((activeHeight / 100) * chartPixelHeight, 32) : 0;
                return (
                  <div
                    key={d.name + idx}
                    className="flex-1 flex flex-col top-[27px] justify-end items-center min-w-0 relative group"
                    onMouseEnter={() => setHoveredIndex(idx)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    {/* Tooltip on hover */}
                    {hoveredIndex === idx && (
                      <div
                        className={[
                          'absolute z-20 bottom-full mb-3 min-w-[220px] px-4 py-3 bg-white rounded-xl shadow-lg text-xs text-black whitespace-nowrap',
                          idx === 0
                            ? 'left-0 -translate-x-0'
                            : idx === chartData.length - 1
                              ? 'right-0 translate-x-0'
                              : 'left-1/2 transform -translate-x-1/2',
                        ].join(' ')}
                        style={{ pointerEvents: 'none' }}
                      >
                        <div className="text-base font-semibold mb-1 text-black">{d.name}</div>
                        <div className="flex justify-between mb-1">
                          <span>Active Users</span>
                          <span className="font-semibold">{d.active.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between mb-1">
                          <span>Expired Users</span>
                          <span className="font-semibold">{d.expired.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between mb-1">
                          <span>Total Value</span>
                          <span className="font-semibold">лв {d.totalValue.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Avg. per User</span>
                          <span className="font-semibold">лв {d.avgPerUser.toLocaleString()}</span>
                        </div>
                      </div>
                    )}
                    {/* Expired bar with centered label */}
                    <div
                      className="w-full bg-gray-200 rounded-t-md transition-all duration-300 ease-in-out min-h-[2px] relative flex flex-col items-center justify-center"
                      style={{ height: `${expiredBarHeight}px` }}
                    >
                      {d.expired > 0 && (
                        <div className="text-center">
                          <div className="text-base text-gray">{d.expired}</div>
                          <div className="text-xs text-gray-500">Expired</div>
                        </div>
                      )}
                    </div>
                    {/* Active bar with centered label */}
                    <div
                      className="w-full bg-teal-400 transition-all duration-300 ease-in-out min-h-[2px] relative flex flex-col items-center justify-center"
                      style={{ height: `${activeBarHeight}px` }}
                    >
                      {d.active > 0 && (
                        <div className="text-center">
                          <div className="text-base font-semibold text-black">{d.active}</div>
                          <div className="text-xs text-black">Active</div>
                        </div>
                      )}
                    </div>
                    {/* X-axis label */}
                    <div
                      className="overflow-hidden relative  text-[12px] text-[#9D9DA7] text-center truncate mt-2 w-full"
                      title={d.name}
                    >
                      {d.name}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        {/* Legend */}
        <div className="flex gap-4 mt-13 justify-end">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-teal-400 inline-block" />
            <span className="text-xs text-gray-600">Active Benefit</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-gray-200 inline-block" />
            <span className="text-xs text-gray-600">Expired Benefit</span>
          </div>
        </div>
      </div>
    </div>
  );
}
