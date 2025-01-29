import React from 'react';

export const StatisticsSkeleton: React.FC = () => {
  return (
    <div className="flex items-center gap-12 p-6">
      {/* New Accounts */}
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-gray-200 rounded-full animate-pulse" />
        <div>
          <div className="h-4 w-24 bg-gray-200 rounded-md animate-pulse mb-2" />
          <div className="h-8 w-16 bg-gray-200 rounded-md animate-pulse" />
        </div>
      </div>

      <div className="border-l border-gray-300 h-16" />

      {/* Funds Disbursed */}
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-gray-200 rounded-full animate-pulse" />
        <div>
          <div className="h-4 w-24 bg-gray-200 rounded-md animate-pulse mb-2" />
          <div className="h-8 w-16 bg-gray-200 rounded-md animate-pulse" />
        </div>
      </div>

      <div className="border-l border-gray-300 h-16" />

      {/* Cards Issued */}
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-gray-200 rounded-full animate-pulse" />
        <div>
          <div className="h-4 w-24 bg-gray-200 rounded-md animate-pulse mb-2" />
          <div className="h-8 w-16 bg-gray-200 rounded-md animate-pulse" />
        </div>
      </div>
    </div>
  );
};
