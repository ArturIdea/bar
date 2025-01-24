import React, { useState } from 'react';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import DotsVerticalIcon from '@/../public/images/icons/dashboard/dotsVertical.svg';
import chevronVerticalIcon from '@/../public/images/icons/dashboard/signupRequests/chevronVertical.svg';
import { useSignUpRequests } from '@/ui/hooks/ui/useSignupRequests';

export const SignUpRequestsTable: React.FC = () => {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const { requests, loading, totalPages, totalElements } = useSignUpRequests(page, pageSize);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const pathname = usePathname();
  const router = useRouter();

  const sortedRequests = [...requests].sort((a, b) => {
    if (sortOrder === 'asc') {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    }
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handlePageSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPageSize(Number(event.target.value));
    setPage(0); // Reset to first page
  };

  if (loading) {
    return <div className="text-center text-gray-500">Loading...</div>;
  }

  return (
    <div className="flex flex-col w-full p-6 bg-white border-t border-b border-gray-200">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-semibold text-[#0B0B22]">Sign up Requests</h4>
        {pathname === '/en/dashboard' && (
          <button
            type="button"
            className="border border-gray-300 py-2 px-3 rounded-full cursor-pointer"
            onClick={() => router.push('/en/dashboard/signup-requests')}
          >
            View details
          </button>
        )}
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-t-lg">
        <table className="w-full border-collapse border-spacing-0">
          {/* Table Header */}
          <thead>
            <tr className="bg-gray-100 text-left text-gray-400 rounded-lg">
              <th className="px-6 py-3 font-normal">Name</th>
              <th className="px-6 py-3 font-normal">Email</th>
              <th className="px-6 py-3 font-normal">Mobile</th>
              <th className="px-6 py-3 font-normal">Pinfl</th>
              <th
                className="px-6 py-3 font-normal cursor-pointer flex items-center"
                onClick={toggleSortOrder}
              >
                Created at
                <span className={`ml-2 transform ${sortOrder === 'asc' ? '' : 'rotate-180'}`}>
                  <Image src={chevronVerticalIcon} alt="Sort icon" width={16} height={16} />
                </span>
              </th>
              <th className="px-6 py-3 font-normal" />
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {sortedRequests.map((req, index) => (
              <tr
                key={req.id}
                className={`${
                  index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                } hover:bg-gray-100 transition-colors`}
              >
                <td className="px-6 py-4 text-gray-600 text-sm">
                  {`${req.firstName || ''} ${req.lastName || ''}`}
                </td>
                <td className="px-6 py-4 text-gray-600 text-sm">{req.email || 'N/A'}</td>
                <td className="px-6 py-4 text-gray-600 text-sm">{req.phoneNumber || 'N/A'}</td>
                <td className="px-6 py-4 text-gray-600 text-sm">{req.pinfl || 'N/A'}</td>
                <td className="px-6 py-4 text-gray-600 text-sm">
                  {new Date(req.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 flex items-center justify-end">
                  <button type="button" className="text-gray-500 hover:text-gray-700">
                    <Image src={DotsVerticalIcon} alt="vertical dots" className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pathname === '/en/dashboard/signup-requests' && (
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-2 text-sm">
            <span>Showing</span>
            <select
              className="border border-gray-300 rounded px-2 py-1"
              value={pageSize}
              onChange={handlePageSizeChange}
            >
              {[10, 20, 30, 50].map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
            <span>items of {totalElements} entries</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={page === 0}
              onClick={() => handlePageChange(page - 1)}
              className={`px-3 py-1 border rounded ${page === 0 ? 'text-gray-300' : 'text-blue-600'}`}
            >
              &lt;
            </button>
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                type="button"
                key={index}
                onClick={() => handlePageChange(index)}
                className={`px-3 py-1 border rounded ${
                  page === index ? 'bg-blue-600 text-white' : 'text-blue-600'
                }`}
              >
                {index + 1}
              </button>
            ))}
            <button
              type="button"
              disabled={page === totalPages - 1}
              onClick={() => handlePageChange(page + 1)}
              className={`px-3 py-1 border rounded ${
                page === totalPages - 1 ? 'text-gray-300' : 'text-blue-600'
              }`}
            >
              &gt;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
