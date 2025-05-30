"use client";

import { useState } from 'react';
import { useDateRangeStore } from '@/ui/stores/useDateRangeStore';
import { useRegionDistrictMetrics, Region, District } from '@/ui/hooks/ui/useRegionDistrictMetrics';

const DistrictBreakdownBarChart = () => {
  const fromDate = useDateRangeStore((s) => s.fromDate);
  const toDate = useDateRangeStore((s) => s.toDate);
  const { data, loading, error } = useRegionDistrictMetrics(fromDate, toDate);
  const [selectedRegion, setSelectedRegion] = useState<string>('');
  const [hoveredDistrict, setHoveredDistrict] = useState<District | null>(null);

  if (loading) {
    return (
      <div className="p-6 pr-15 bg-white w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-semibold leading-none tracking-tight">Users by District</h2>
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
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-semibold leading-none tracking-tight">Users by District</h2>
        </div>
        <p className="text-red-500">Error loading data</p>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="p-6 pr-15 bg-white w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-semibold leading-none tracking-tight">Users by District</h2>
        </div>
        <p className="text-gray-500">No data available</p>
      </div>
    );
  }

  // Set initial selected region if not set
  if (!selectedRegion && data.length > 0) {
    setSelectedRegion(data[0].region);
  }

  // Get districts for the selected region
  const selectedRegionData = data.find((region: Region) => region.region === selectedRegion);
  const districts = selectedRegionData?.districts || [];

  // Find the maximum user count for scaling the bars
  const maxUserCount = Math.max(...districts.map((district: District) => district.userCount));

  return (
    <div className="p-6 pr-15 bg-white w-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-semibold leading-none tracking-tight">Users by District</h2>
        <div className="w-48">
          <div className="relative inline-block w-full px-3 rounded-full border border-[#DEDEE4] bg-white">
            <select
              id="region-select"
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="w-full p-2 rounded-md cursor-pointer appearance-none text-[#0B0B22] font-[Inter] text-[14px] font-medium leading-normal bg-transparent focus:outline-none"
            >
              {data.map((region: Region) => (
                <option key={region.region} value={region.region}>
                  {region.region}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="relative h-[200px] w-full">
        {/* Y-axis labels */}
        <div className="absolute left-[-90px] top-1/2 transform -translate-y-1/2 -rotate-90 text-xs text-gray-500">
          Percentage of Users by District
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
            {districts.map((district: District) => (
              <div
                key={district.district}
                className="flex flex-col justify-end items-center mb-[-22px] w-[60px]"
              >
                <div
                  className="w-full bg-[#08678E] rounded-t-md transition-all duration-300 ease-in-out min-h-[2px] relative group"
                  style={{
                    height: `${(district.userCount / maxUserCount) * 100}%`,
                  }}
                  onMouseEnter={() => setHoveredDistrict(district)}
                  onMouseLeave={() => setHoveredDistrict(null)}
                >
                  {hoveredDistrict?.district === district.district && (
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-white text-black text-xs rounded shadow-lg whitespace-nowrap">
                      <div>{district.district}</div>
                      <div>Users: {district.userCount.toLocaleString()}</div>
                    </div>
                  )}
                </div>
                <div className="text-xs text-gray-600 mt-2 text-center w-full truncate" title={district.district}>
                  {district.district}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DistrictBreakdownBarChart;
