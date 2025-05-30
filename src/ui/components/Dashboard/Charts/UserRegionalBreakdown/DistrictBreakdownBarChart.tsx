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

const DistrictBreakdownBarChart = ({ data }: { data: RegionData }) => {
  const [selectedRegion, setSelectedRegion] = useState<string>(data.regions[0]?.RegionName || '');

  // Get districts for the selected region
  const selectedRegionData = data.regions.find((region) => region.RegionName === selectedRegion);
  const districts = selectedRegionData?.districts || [];

  // Find the maximum user count for scaling the bars
  const maxUserCount = Math.max(...districts.map((district) => district.users));

  return (
    <div className="p-6 pr-15 bg-white w-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-[#0B0B22] leading-normal text-2xl font-bold">Users by District</h2>
        <div className="flex items-center gap-4">
          <div className="w-48">
            <div className="relative inline-block w-full px-3 rounded-full border border-[#DEDEE4] bg-white">
              <select
                id="region-select"
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="w-full p-2 rounded-md cursor-pointer  appearance-none text-[#0B0B22] font-[Inter] text-[14px] font-medium leading-normal bg-transparent focus:outline-none"
              >
                {data.regions.map((region) => (
                  <option key={region.RegionName} value={region.RegionName}>
                    {region.RegionName}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4 w-full">
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
              {districts.map((district) => (
                <div
                  key={district.districtName}
                  className="flex flex-col justify-end items-center w-[60px]"
                >
                  <div
                    className="w-full bg-[#08678E] rounded-t-md transition-all duration-300 ease-in-out min-h-[2px] relative"
                    style={{
                      height: `${(district.users / maxUserCount) * 100}%`,
                    }}
                  >
                    <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-xs font-medium whitespace-nowrap">
                      {district.users.toLocaleString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* District names row */}
        <div className="ml-12 w-full">
          <div className="flex gap-4 px-4 justify-between w-full">
            {districts.map((district) => (
              <div key={district.districtName} className="flex-1 text-center min-w-0 px-1">
                <div className="text-xs text-gray-600 break-words" title={district.districtName}>
                  {district.districtName}
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
