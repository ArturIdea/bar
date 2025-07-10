'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/routing';
import { useUsersByBenefit } from '@/ui/hooks/ui/useUsersByBenefit';

const columns = [
  { key: 'name', label: 'Name' },
  { key: 'email', label: 'Email' },
  { key: 'mobile', label: 'Mobile' },
  { key: 'role', label: 'Role' },
  { key: 'createdAt', label: 'Created At' },
  { key: 'status', label: 'Status' },
  { key: 'sources', label: 'Sources' },
];

// Channel display name mapping
const channelDisplayNames: Record<string, string> = {
  AGENT_APP: 'Agent App',
  CITIZEN_APP: 'Citizen App',
  XALQ_FILE: 'XALQ Pre Approved',
  HTTP_CLIENT: 'Manual addition',
};

export default function UsersByBenefitPage() {
  const searchParams = useSearchParams();
  const benefitTypeId = searchParams.get('benefitTypeId');
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const { users, total, loading } = useUsersByBenefit(page, pageSize, benefitTypeId || undefined);
  const totalPages = Math.ceil(total / pageSize);
  const t = useTranslations();
  const pathname = usePathname();

  // Reset page to 0 when benefitTypeId changes
  useEffect(() => {
    setPage(0);
  }, [benefitTypeId]);

  // Helper to render page numbers (max 5 at a time, with ellipsis and first/last page)
  const renderPageNumbers = () => {
    const totalVisiblePages = 5;
    let startPage = Math.max(0, page - Math.floor(totalVisiblePages / 2));
    let endPage = startPage + totalVisiblePages;
    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(0, endPage - totalVisiblePages);
    }
    const pageButtons = [];
    if (startPage > 0) {
      pageButtons.push(
        <button
          key="first"
          type="button"
          onClick={() => setPage(0)}
          className="px-3 py-1 rounded-full text-primary cursor-pointer"
        >
          1
        </button>
      );
      if (startPage > 1) {
        pageButtons.push(
          <span key="ellipsis-start" className="px-2">
            ...
          </span>
        );
      }
    }
    for (let i = startPage; i < endPage; i++) {
      pageButtons.push(
        <button
          type="button"
          key={i}
          onClick={() => setPage(i)}
          className={`px-3 py-1 rounded-full ${page === i ? 'bg-blue-600 text-white' : 'text-primary cursor-pointer'}`}
        >
          {i + 1}
        </button>
      );
    }
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pageButtons.push(
          <span key="ellipsis-end" className="px-2">
            ...
          </span>
        );
      }
      pageButtons.push(
        <button
          key="last"
          type="button"
          onClick={() => setPage(totalPages - 1)}
          className="px-3 py-1 rounded-full text-primary cursor-pointer"
        >
          {totalPages}
        </button>
      );
    }
    return pageButtons;
  };

  return (
    <>
      {pathname === '/dashboard/benefits/users' && (
        <>
          <div className="p-6 justify-end items-center">
            <Link href="/dashboard/benefits" className="flex items-center gap-2 cursor-pointer">
              <ArrowLeft /> {t('Buttons.back')}
            </Link>
            
          </div>
        </>
      )}
      <div className="flex flex-col m-3 bg-white rounded-[24px] h-full border-gray-200">
        {/* Header */}
        <div className="flex items-center justify-between p-6">
          <h4 className="font-semibold text-[#0B0B22]">Users</h4>
        </div>

        {/* Table */}
        <div className="flex-1 p-3 min-h-0 overflow-y-auto">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#FAFAFA] rounded-[8px]">
                <tr className="text-left text-gray-400">
                  {columns.map((col) => (
                    <th
                      key={col.key}
                      className={`px-6 py-3 font-normal${col.key === 'createdAt' ? ' min-w-[170px]' : ''}`}
                    >
                      {col.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={columns.length} className="text-center py-8 text-gray-400">
                      Loading...
                    </td>
                  </tr>
                ) : users.length === 0 ? (
                  <tr>
                    <td colSpan={columns.length} className="text-center py-8 text-gray-400">
                      No users found.
                    </td>
                  </tr>
                ) : (
                  users.map((user, idx) => (
                    <tr
                      key={user.userId || idx}
                      className="hover:bg-gray-50 transition-colors border-b"
                    >
                      <td className="px-6 py-4 text-[#0B0B22] text-sm">
                        {user?.firstName} {user.lastName}
                      </td>
                      <td className="px-6 py-4 text-[#0B0B22] text-sm">{user?.email || '-'}</td>
                      <td className="px-6 py-4 text-[#0B0B22] text-sm">{user?.mobile || '-'}</td>
                      <td className="px-6 py-4 text-[#0B0B22] text-sm">{user?.role || '-'}</td>
                      <td className={`px-6 py-4 text-[#0B0B22] text-sm${' min-w-[170px]'}`}>
                        {user?.createdAt
                          ? new Date(user?.createdAt).toLocaleString('uz-UZ', {
                              timeZone: 'Asia/Tashkent',
                              year: 'numeric',
                              month: '2-digit',
                              day: '2-digit',
                              hour: '2-digit',
                              minute: '2-digit',
                            })
                          : 'No Data'}
                      </td>
                      <td className="px-6 py-4 text-[#0B0B22] text-sm">{user?.status || '-'}</td>
                      <td className="px-6 py-4 text-[#0B0B22] text-sm">
                        {channelDisplayNames[user?.channel] || user?.channel || '-'}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          {/* Pagination */}
          <div className="sticky bottom-0 bg-[#FAFAFA] rounded-[8px] mt-4 p-4 flex flex-col gap-2">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span>Showing</span>
                <select
                  className="border border-gray-300 rounded-xl px-4 py-2"
                  value={pageSize}
                  onChange={(e) => {
                    setPageSize(Number(e.target.value));
                    setPage(0);
                  }}
                >
                  {[10, 20, 30, 50].map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
                <span>
                  {total === 0 ? 0 : page * pageSize + 1} - {Math.min((page + 1) * pageSize, total)}{' '}
                  of {total} entries
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={page === 0}
                  onClick={() => setPage(page - 1)}
                  className={`px-3 py-1 ${page === 0 ? 'text-gray-300' : 'text-blue-600 cursor-pointer'}`}
                >
                  <ChevronLeft />
                </button>
                {renderPageNumbers()}
                <button
                  type="button"
                  disabled={page >= totalPages - 1}
                  onClick={() => setPage(page + 1)}
                  className={`px-3 py-1 ${page >= totalPages - 1 ? 'text-gray-300' : 'text-blue-600 cursor-pointer'}`}
                >
                  <ChevronRight />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
