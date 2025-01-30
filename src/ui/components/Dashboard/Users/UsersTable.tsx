import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import DotsVerticalIcon from '@/../public/images/icons/dashboard/dotsVertical.svg';
import { useUsers } from '@/ui/hooks/ui/useUsers';
import { TableSkeleton } from '../TableSkeleton';
import UserDetailsModal from './UserDetailsModal';

export const UsersTable: React.FC<{
  filters?: { createdAtFrom?: string; createdAtTo?: string; pinflSearch?: string };
}> = ({ filters = {} }) => {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState<Record<string, boolean>>({});
  const { users, total, loading } = useUsers(
    page,
    pageSize,
    filters.createdAtFrom,
    filters.createdAtTo,
    filters.pinflSearch
  );
  const pathname = usePathname();
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const totalPages = Math.ceil(total / pageSize);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handlePageSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPageSize(Number(event.target.value));
    setPage(0);
  };

  const toggleDropdown = (id: string) => {
    setDropdownOpen((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const handleViewDetails = (userId: string) => {
    setSelectedUserId(userId);
    setDropdownOpen({});
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen({});
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  if (loading) {
    return <TableSkeleton />;
  }

  return (
    <div className="flex flex-col w-full p-6 bg-white border-t border-b border-gray-200">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-semibold text-[#0B0B22]">Latest User Registrations</h4>
        {pathname === '/en/dashboard' && (
          <button
            type="button"
            className="border border-gray-300 py-2 px-3 rounded-full cursor-pointer"
            onClick={() => router.push('/en/dashboard/user-management')}
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
              <th className="px-6 py-3 font-normal">Role</th>
              <th className="px-6 py-3 font-normal">Created At</th>
              <th className="px-6 py-3 font-normal" />
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {users.map((user) => (
              <tr key={user.userId} className={` hover:bg-gray-100 transition-colors`}>
                <td className="px-6 py-4 text-[#0B0B22] text-sm">
                  {user.firstName} {user.lastName}
                </td>
                <td className="px-6 py-4 text-[#0B0B22] text-sm">{user.email || 'N/A'}</td>
                <td className="px-6 py-4 text-[#0B0B22] text-sm">{user.phoneNumber || 'N/A'}</td>
                <td className="px-6 py-4 text-[#0B0B22] text-sm">{user.role || 'N/A'}</td>
                <td className="px-6 py-4 text-[#0B0B22] text-sm">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 flex items-center justify-end">
                  <button
                    type="button"
                    className="text-gray-500 hover:text-gray-700 cursor-pointer"
                    onClick={() => toggleDropdown(user.userId)}
                  >
                    <Image src={DotsVerticalIcon} alt="vertical dots" className="h-5 w-5" />
                  </button>

                  {/* Dropdown Menu */}
                  {dropdownOpen[user.userId] && (
                    <div
                      ref={dropdownRef}
                      className="absolute right-20 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50"
                    >
                      <button
                        type="button"
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                        onClick={() => handleViewDetails(user.userId)}
                      >
                        View User Details
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* User Details Modal */}
      {selectedUserId && (
        <UserDetailsModal userId={selectedUserId} onClose={() => setSelectedUserId(null)} />
      )}

      {/* Pagination */}
      {pathname === '/en/dashboard/user-management' && (
        <div className="flex items-center justify-between px-2 pt-4">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span>Showing</span>
            <select
              className="border border-gray-300 rounded-xl px-4 py-2"
              value={pageSize}
              onChange={handlePageSizeChange}
            >
              {[10, 20, 30, 50].map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
            <span>items of {total} entries</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={page === 0}
              onClick={() => handlePageChange(page - 1)}
              className={`px-3 py-1 ${page === 0 ? 'text-gray-300' : 'text-blue-600 cursor-pointer'}`}
            >
              <ChevronLeft />
            </button>

            {(() => {
              const totalVisiblePages = 5;
              const startPage = Math.max(
                0,
                Math.min(page - Math.floor(totalVisiblePages / 2), totalPages - totalVisiblePages)
              );
              const endPage = Math.min(startPage + totalVisiblePages, totalPages);

              const pageButtons = [];
              if (startPage > 0) {
                pageButtons.push(
                  <button
                    key="start-ellipsis"
                    type="button"
                    onClick={() => handlePageChange(0)}
                    className="px-3 py-1 bg-gray-100 text-[#08678E] cursor-pointer"
                  >
                    1
                  </button>,
                  <span key="ellipsis-start" className="px-2">
                    ...
                  </span>
                );
              }

              for (let i = startPage; i < endPage; i++) {
                pageButtons.push(
                  <button
                    type="button"
                    key={i}
                    onClick={() => handlePageChange(i)}
                    className={`px-3 py-1 rounded-xl ${
                      page === i
                        ? 'bg-[#08678E] text-white'
                        : 'bg-gray-100 text-[#08678E] cursor-pointer'
                    }`}
                  >
                    {i + 1}
                  </button>
                );
              }

              if (endPage < totalPages) {
                pageButtons.push(
                  <span key="ellipsis-end" className="px-2">
                    ...
                  </span>,
                  <button
                    key="end-ellipsis"
                    type="button"
                    onClick={() => handlePageChange(totalPages - 1)}
                    className="px-3 py-1 bg-gray-100 rounded-xl text-[#08678E] cursor-pointer"
                  >
                    {totalPages}
                  </button>
                );
              }

              return pageButtons;
            })()}

            <button
              type="button"
              disabled={page === totalPages - 1}
              onClick={() => handlePageChange(page + 1)}
              className={`px-3 py-1 ${page === totalPages - 1 ? 'text-gray-300 ' : 'text-blue-600 cursor-pointer'}`}
            >
              <ChevronRight />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
