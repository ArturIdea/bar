/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react';

interface District {
  districtName: string;
  users: number;
}

interface Region {
  RegionName: string;
  regionUserCount: number;
  districts: District[];
}

interface RegionData {
  regions: Region[];
}

const UserRegionalBreakdownBarChart = ({ data }: { data: RegionData }) => {
  // Find the maximum user count for scaling the bars
  const maxUserCount = Math.max(...data.regions.map((region) => region.regionUserCount));

  return (
    <div className="p-6 pr-15 bg-white w-full">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Users by Region</h2>
      </div>

      <div className="space-y-4 w-full">
        <div className="relative h-[200px] w-full">
          {/* Y-axis labels */}
          <div className="absolute left-[-90px] top-1/2 transform -translate-y-1/2 -rotate-90 text-xs text-gray-500">
              Percentage of Users by Region
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
              {data.regions.map((region) => (
                <div
                  key={region.RegionName}
                  className="flex-1 flex flex-col justify-end items-center min-w-0"
                >
                  <div
                    className="w-full bg-[#ADD9F4] rounded-t-md transition-all duration-300 ease-in-out min-h-[2px] relative"
                    style={{
                      height: `${(region.regionUserCount / maxUserCount) * 100}%`,
                    }}
                  >
                    <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-xs font-medium whitespace-nowrap">
                      {region.regionUserCount.toLocaleString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Region names row */}
        <div className="ml-12 w-full">
          <div className="flex gap-4 px-4 justify-between w-full">
            {data.regions.map((region) => (
              <div key={region.RegionName} className="flex-1 text-center min-w-0 px-1">
                <div className="overflow-hidden text-[12px] text-[#9D9DA7] text-center truncate" title={region.RegionName}>
                  {region.RegionName}
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
