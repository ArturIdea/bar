import React, { useState } from 'react';
import Image from 'next/image';
import DotsVerticalIcon from '@/../public/images/icons/dashboard/dotsVertical.svg';
import chevronVerticalIcon from '@/../public/images/icons/dashboard/signupRequests/chevronVertical.svg';
import { useUsers } from '@/ui/hooks/ui/useUsers';

export const UsersTable: React.FC = () => {
  //   const [page, setPage] = useState(0);
  const { users, loading } = useUsers(0, 10);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const sortedUsers = [...users].sort((a, b) => {
    if (sortOrder === 'asc') {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    }
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  if (loading) {
    return <div className="text-center text-gray-500">Loading...</div>;
  }

  return (
    <div className="flex flex-col w-full p-6 bg-white border-t border-b border-gray-200">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-semibold text-[#0B0B22]">User Management</h4>
        <button
          type="button"
          className="border border-gray-300 py-2 px-3 rounded-full cursor-pointer "
        >
          View details
        </button>
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
              <th className="px-6 py-3 font-normal">Role</th>
              <th
                className="px-6 py-3 font-normal cursor-pointer flex items-center"
                onClick={toggleSortOrder}
              >
                Created At
                <span className={`ml-2 transform ${sortOrder === 'asc' ? '' : 'rotate-180'}`}>
                  <Image src={chevronVerticalIcon} alt="Sort icon" width={16} height={16} />
                </span>
              </th>
              <th className="px-6 py-3 font-normal" />
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {sortedUsers.map((user, index) => (
              <tr
                key={user.userId}
                className={`${
                  index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                } hover:bg-gray-100 transition-colors`}
              >
                <td className="px-6 py-4 text-gray-600 text-sm">
                  {user.firstName} {user.lastName}
                </td>
                <td className="px-6 py-4 text-gray-600 text-sm">{user.email}</td>
                <td className="px-6 py-4 text-gray-600 text-sm">{user.phoneNumber}</td>
                <td className="px-6 py-4 text-gray-600 text-sm">{user.role}</td>
                <td className="px-6 py-4 text-gray-600 text-sm">
                  {new Date(user.createdAt).toLocaleDateString()}
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
      {/* <div className="flex justify-between mt-4">
        <button
          type="button"
          onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
          disabled={page === 0}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-gray-500">
          Page {page + 1} of {Math.ceil(total / 10)}
        </span>
        <button
          type="button"
          onClick={() => setPage((prev) => (users.length === 10 ? prev + 1 : prev))}
          disabled={users.length < 10}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div> */}
    </div>
  );
};
