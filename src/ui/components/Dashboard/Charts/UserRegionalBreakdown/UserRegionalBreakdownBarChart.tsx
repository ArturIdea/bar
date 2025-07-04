/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react';
import { useDateRangeStore } from '@/ui/stores/useDateRangeStore';
import { useRegionDistrictMetrics, Region } from '@/ui/hooks/ui/useRegionDistrictMetrics';

const UserRegionalBreakdownBarChart = () => {
  const fromDate = useDateRangeStore((s) => s.fromDate);
  const toDate = useDateRangeStore((s) => s.toDate);
  const { data, loading, error } = useRegionDistrictMetrics(fromDate, toDate);

  if (loading) {
    return (
      <div className="p-6 pr-15 bg-white rounded-[24px] w-full">
        <div className="mb-6">
          <h2 className="font-semibold leading-none tracking-tight">Users by Region</h2>
        </div>
        <div className="flex items-center justify-center h-[300px]">
          <div className="w-8 h-8 border-4 border-t-blue-500 border-gray-300 rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 pr-15 bg-white w-full">
        <div className="mb-6">
          <h2 className="font-semibold leading-none tracking-tight">Users by Region</h2>
        </div>
        <p className="text-red-500">Error loading data</p>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="p-6 pr-15 bg-white w-full">
        <div className="mb-6">
          <h2 className="font-semibold leading-none tracking-tight">Users by Region</h2>
        </div>
        <p className="text-gray-500">No data available</p>
      </div>
    );
  }

  // Find the maximum user count for scaling the bars
  const maxUserCount = Math.max(...data.map((region: Region) => region.regionUserCount));

  return (
    <div className="p-6 pr-15 bg-white w-full">
      <div className="mb-6">
        <h2 className="font-semibold leading-none tracking-tight">Users by Region</h2>
      </div>

      <div className="space-y-4 w-full">
        <div className="relative h-[200px] w-full">
          {/* Y-axis labels */}
          <div className="absolute left-[-50px] top-1/2 transform -translate-y-1/2 -rotate-90 text-xs text-gray-500">
            Number of Users
          </div>
          <div className="absolute left-[16px] top-0 bottom-0 w-12 flex flex-col-reverse justify-between text-xs text-gray-500">
            {[0, 25, 50, 75, 100].map((percent) => (
              <div key={percent} className="transform translate-y-1/2">
                {Math.round((percent / 100) * maxUserCount).toLocaleString()}
              </div>
            ))}
          </div>

          {/* Chart area with grid lines */}
          <div className="ml-12 relative h-full w-full">
            {/* Grid lines */}
            <div className="absolute inset-0 flex flex-col-reverse justify-between">
              {[0, 25, 50, 75, 100].map((percent) => (
                <div
                  key={percent}
                  className="w-full border-t border-gray-200"
                  style={{ bottom: `${percent}%` }}
                />
              ))}
            </div>

            {/* Bars */}
            <div className="flex h-full gap-4 px-4 justify-between w-full">
              {data.map((region: Region) => (
                <div
                  key={region.region}
                  className="flex-1 flex flex-col justify-end items-center min-w-0"
                >
                  <div
                    className="w-full bg-[#ADD9F4] rounded-t-md transition-all duration-300 ease-in-out min-h-[2px] relative group"
                    style={{
                      height: `${(region.regionUserCount / maxUserCount) * 100}%`,
                    }}
                  >
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-white text-black text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                      <div className="font-medium">{region.region}</div>
                      <div>Users: {region.regionUserCount.toLocaleString()}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Region names row */}
        <div className="ml-12 w-full">
          <div className="flex gap-4 px-4 justify-between w-full">
            {data.map((region: Region) => (
              <div key={region.region} className="flex-1 text-center min-w-0 px-1">
                <div className="overflow-hidden text-[12px] text-[#9D9DA7] text-center truncate" title={region.region}>
                  {region.region}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserRegionalBreakdownBarChart;
