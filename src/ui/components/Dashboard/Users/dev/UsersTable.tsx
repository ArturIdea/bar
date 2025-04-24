import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import DotsVerticalIcon from '@/../public/images/icons/dashboard/dotsVertical.svg';
import { usePathname } from '@/i18n/routing';
import { useUsers } from '@/ui/hooks/ui/dev/useUsers';
import { Pagination } from '../../Pagination';
import { TableSkeleton } from '../../TableSkeleton';
import ViewDetailsButton from '../../ViewDetailsButton';
import MultiTabUserDetailsModal from './MultiTabUserDetailsModal';

export const UsersTable: React.FC<{
  filters?: {
    signupRequestId?: string;
    documentTypeId?: string;
    pinflSearch?: string;
  };
}> = ({ filters = {} }) => {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState<Record<string, boolean>>({});
  const { users, total, loading } = useUsers(
    page,
    pageSize,
    filters.signupRequestId,
    filters.documentTypeId,
    filters.pinflSearch
  );
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const t = useTranslations();

  //resets page when filters change
  useEffect(() => {
    setPage(0);
  }, [filters]);

  const handleViewDetails = (userId?: string) => {
    setSelectedUserId(userId || null);
    setDropdownOpen({});
  };

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

  const columns = [
    { key: 'name', label: t('UserManagement.name') },
    { key: 'pinfl', label: t('UserManagement.pinfl') },
    { key: 'socialNumber', label: t('UserManagement.socialNumber') },
    { key: 'email', label: t('UserManagement.email') },
    { key: 'mobile', label: t('UserManagement.mobile') },
    { key: 'createdAt', label: t('UserManagement.createdAt') },
  ];

  return (
    <div className="flex flex-col h-full border-t border-b border-gray-200">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b">
        {pathname === '/dashboard/dev/user-management/baraka-users' ? (
          <h4 className="font-semibold text-[#0B0B22]">{t('UserManagement.title2')}</h4>
        ) : (
          <h4 className="font-semibold text-[#0B0B22]">{t('UserManagement.title')}</h4>
        )}

        <ViewDetailsButton href="user-management" />
      </div>

      {/* Table */}
      <div className="flex-1 min-h-0 overflow-y-auto">
        <div className="overflow-x-auto ">
          <table className="w-full">
            {/* Table Header */}
            <thead className="border-b border-gray-200">
              <tr className="text-left text-gray-400">
                {columns.map((col) => (
                  <th key={col.key} className="w-1/9 px-4 py-3 font-normal">
                    {col.label}
                  </th>
                ))}
                <th className="w-3/9 px-4 py-3" />
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {users.map((user) => {
                return (
                  <tr key={user.id} className={` hover:bg-gray-50 transition-colors`}>
                    <td className="px-4 py-2 text-[#0B0B22] text-sm">
                      {user.firstName} {user.lastName}
                    </td>
                    <td className="px-4 py-2 text-[#0B0B22] text-sm">{user.pinfl || 'N/A'}</td>
                    <td className="px-4 py-2 text-[#0B0B22] text-sm">
                      {user.socialNumber || 'N/A'}
                    </td>
                    <td className="px-4 py-2 text-[#0B0B22] text-sm">{user.email || 'N/A'}</td>
                    <td className="px-4 py-2 text-[#0B0B22] text-sm">{user.phone || 'N/A'}</td>
                    <td className="px-4 py-2 text-[#0B0B22] text-sm">
                      {new Date(user.createdAt).toLocaleString('uz-UZ', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </td>
                    <td className="px-6 py-4 flex items-center justify-end relative">
                      <button
                        type="button"
                        className="text-gray-500 hover:text-gray-700 cursor-pointer"
                        onClick={() => toggleDropdown(user.id)}
                      >
                        <Image src={DotsVerticalIcon} alt="vertical dots" className="h-5 w-5" />
                      </button>

                      {/* Dropdown Menu */}
                      {dropdownOpen[user.id] && (
                        <div
                          ref={dropdownRef}
                          className="absolute right-16 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50"
                        >
                          <button
                            type="button"
                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                            onClick={() => {
                              handleViewDetails(user.id);
                            }}
                          >
                            {t('Buttons.viewUserDetails')}
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {pathname === '/dashboard/dev/user-management/baraka-users' && (
        <div className="sticky bottom-0 bg-white border-t border-gray-200">
          <Pagination
            page={page}
            pageSize={pageSize}
            total={total}
            onPageChange={handlePageChange}
            onPageSizeChange={handlePageSizeChange}
          />
        </div>
      )}

      {/* Multitab Modal */}
      {selectedUserId && (
        <MultiTabUserDetailsModal
          userId={selectedUserId}
          onClose={() => {
            setSelectedUserId(null);
          }}
        />
      )}
    </div>
  );
};
