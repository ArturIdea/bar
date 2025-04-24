import React from 'react';
import { usePathname } from '@/i18n/routing';

export const TableSkeleton: React.FC = () => {
  const pathname = usePathname();

  return (
    <div className="flex flex-col w-full bg-white border-t border-b border-gray-200">
      {/* Header */}
      <div className="flex items-center justify-between p-6">
        <div className="h-6 bg-gray-200 rounded-md animate-pulse w-52" />
        {pathname === '/dashboard' && (
          <div className="h-9 w-32 bg-gray-200 rounded-full animate-pulse" />
        )}
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-t-lg">
        <table className="w-full border-collapse border-spacing-0">
          {/* Table Header */}
          <thead>
            <tr className="border-t border-b border-gray-200">
              <th className="px-6 py-3 font-normal">
                <div className="h-3 bg-gray-200 rounded-md animate-pulse w-3/4" />
              </th>
              <th className="px-6 py-3 font-normal">
                <div className="h-3 bg-gray-200 rounded-md animate-pulse w-3/4" />
              </th>
              <th className="px-6 py-3 font-normal">
                <div className="h-3 bg-gray-200 rounded-md animate-pulse w-3/4" />
              </th>
              <th className="px-6 py-3 font-normal">
                <div className="h-3 bg-gray-200 rounded-md animate-pulse w-3/4" />
              </th>
              <th className="px-6 py-3 font-normal">
                <div className="h-3 bg-gray-200 rounded-md animate-pulse w-3/4" />
              </th>
              <th className="px-6 py-3 font-normal" />
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {Array.from({ length: 10 }).map((_, index) => (
              <tr key={index} className="hover:bg-gray-100 transition-colors">
                <td className="px-6 py-4">
                  <div className="h-4 bg-gray-200 rounded-md animate-pulse w-3/4" />
                </td>
                <td className="px-6 py-4">
                  <div className="h-4 bg-gray-200 rounded-md animate-pulse w-3/4" />
                </td>
                <td className="px-6 py-4">
                  <div className="h-4 bg-gray-200 rounded-md animate-pulse w-2/3" />
                </td>
                <td className="px-6 py-4">
                  <div className="h-4 bg-gray-200 rounded-md animate-pulse w-1/3" />
                </td>
                <td className="px-6 py-4">
                  <div className="h-4 bg-gray-200 rounded-md animate-pulse w-1/2" />
                </td>
                <td className="px-6 py-4">
                  <div className="h-5 w-5 bg-gray-200 rounded-full animate-pulse" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
