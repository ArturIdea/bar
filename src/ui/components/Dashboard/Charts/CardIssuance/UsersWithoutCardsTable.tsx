'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, Search } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useUsersWithoutCards } from '@/ui/hooks/ui/useUsersWithoutCards';
import { useDateRangeStore } from '@/ui/stores/useDateRangeStore';
import { TableSkeleton } from '../../TableSkeleton';

interface UsersWithoutCardsTableProps {
  onClose: () => void;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const UsersWithoutCardsTable: React.FC<UsersWithoutCardsTableProps> = ({ onClose }) => {
  const [page, setPage] = useState(0);
  const [searchInput, setSearchInput] = useState('');
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [pageSize, setPageSize] = useState(10);

  const fromDate = useDateRangeStore((s) => s.fromDate);
  const toDate = useDateRangeStore((s) => s.toDate);
  const t = useTranslations();

  const { data, loading, error } = useUsersWithoutCards({
    fromDate,
    toDate,
    page,
    size: pageSize,
    search: search || undefined,
  });

  const handleSearch = () => {
    setSearch(searchInput);
    setPage(0); // Reset to first page when searching
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortDirection('asc');
      setSortBy(column);
    }
  };

  // const getSortIcon = (column: string) => {
  //   if (sortBy !== column) {
  //     return <ChevronDown size={16} className="text-gray-400" />;
  //   }
  //   return sortDirection === 'asc' ? (
  //     <ArrowUp size={16} className="text-blue-600" />
  //   ) : (
  //     <ArrowDown size={16} className="text-blue-600" />
  //   );
  // };

  if (loading) {
    return (
      <div className="w-full bg-white rounded-lg p-6 border border-gray-200">
        <TableSkeleton />
      </div>
    );
  }

  const columns = [
    { key: 'name', label: t('UserManagement.name'), sortable: true },
    { key: 'pinfl', label: t('Agents.PINFLNo'), sortable: true },
    { key: 'socialNumber', label: t('Dev.socialNumber'), sortable: true },
    { key: 'channel', label: t('Charts.onboardingChannel'), sortable: true },
    { key: 'createdAt', label: t('Dev.createdAtLabel'), sortable: true },
    { key: 'bankType', label: t('Dev.bankCode'), sortable: true },
  ];

  return (
    <div className="w-full bg-white rounded-lg pb-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-sm font-bold p-2 text-gray-800">{t('Charts.UsersWithNoCardIssued')}</h2>
        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="flex w-[270px] gap-2 border border-gray-300 rounded-full py-2 px-4">
            <input
              type="text"
              placeholder={t('Filter.searchPlaceHolder')}
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="outline-none bg-transparent text-sm placeholder:text-gray-400"
            />
            <button type="button" onClick={handleSearch} className="cursor-pointer">
              <Search size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          {/* Table Header */}
          <thead className="bg-[#FAFAFA] rounded-[8px]">
            <tr className="text-left text-gray-400">
              {columns.map((col) => (
                <th key={col.key} className="px-6 py-3 font-normal">
                  {col.sortable ? (
                    <button
                      type="button"
                      onClick={() => handleSort(col.key)}
                      className="flex items-center gap-1 hover:text-gray-600 w-full text-left group"
                    >
                      <span>{col.label}</span>
                      {/* <span className="inline-flex items-center opacity-50 group-hover:opacity-100">
                        {getSortIcon(col.key)}
                      </span> */}
                    </button>
                  ) : (
                    col.label
                  )}
                </th>
              ))}
            </tr>
          </thead>
          {/* Table Body */}
          <tbody>
            {data?.content && data.content.length > 0 ? (
              data.content.map((user: any, index: number) => (
                <tr
                  key={`${user.userId}-${index}`}
                  className="hover:bg-neutral-50 transition-colors border-b"
                >
                  <td className="px-6 py-4 text-[#0B0B22] text-sm">
                    {user.firstName || ''} {user.lastName || ''}
                  </td>
                  <td className="px-6 py-4 text-[#0B0B22] text-sm">{user.pinfl || '-'}</td>
                  <td className="px-6 py-4 text-[#0B0B22] text-sm">{user.socialNumber || '-'}</td>
                  <td className="px-6 py-4 text-[#0B0B22] text-sm">{user.channel || '-'}</td>
                  <td className="px-6 py-4 text-[#0B0B22] text-sm">
                    {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : '-'}
                  </td>
                  <td className="px-6 py-4 text-[#0B0B22] text-sm">{user.bankType || '-'}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="px-6 py-4 text-center text-gray-500">
                  {error ? t('Charts.ErrorLoadingData') : t('Charts.NoDataAvailable')}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {data && (
        <div className="sticky bottom-0 bg-[#FAFAFA] rounded-[8px] mt-4">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span>{t('Pagination.showing')}</span>
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
                {t('Pagination.itemsOf')} {data.totalElements} {t('Pagination.entries')}
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

              {(() => {
                const totalVisiblePages = 5;
                const totalPages = data.totalPages;
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
                      className={`px-3 py-1 rounded-full ${
                        page === i ? 'bg-primary text-white' : 'text-primary cursor-pointer'
                      }`}
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
              })()}

              <button
                type="button"
                disabled={page >= data.totalPages - 1}
                onClick={() => setPage(page + 1)}
                className={`px-3 py-1 ${page >= data.totalPages - 1 ? 'text-gray-300' : 'text-blue-600 cursor-pointer'}`}
              >
                <ChevronRight />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
