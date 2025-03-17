import React from 'react';

export default function ProfilePageSkeleton() {
  return (
    <div>
      <div className="flex items-center gap-6 border-b border-gray-200 p-6">
        <div className="w-32 h-32 rounded-full bg-gray-300 animate-pulse" />
        <div className="flex-1">
          <div className="h-6 w-40 bg-gray-300 rounded animate-pulse" />
        </div>
      </div>

      <div className="p-6">
        <div className="h-6 w-56 bg-gray-300 rounded animate-pulse" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-12 mt-6">
          {Array.from({ length: 14 }).map((_, index) => (
            <div key={index}>
              <div className="h-4 w-32 bg-gray-300 rounded animate-pulse mb-2" />
              <div className="h-6 w-48 bg-gray-300 rounded animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
