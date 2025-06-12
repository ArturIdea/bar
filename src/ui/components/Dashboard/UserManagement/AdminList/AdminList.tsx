'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ChevronLeft, ChevronRight, Plus, Search } from 'lucide-react';
import { useTranslations } from 'next-intl';
import DotsVerticalIcon from '@/../public/images/icons/dashboard/dotsVertical.svg';
import data from '../data.json';

// import { TableSkeleton } from '../../TableSkeleton';

interface Admin {
  name: string;
  email: string;
  mobile: string;
  role: string;
  organisation: string;
}

interface Column {
  key: keyof Admin | 'action';
  label: string;
  sortable?: boolean;
}

export function AdminList() {
  const t = useTranslations();
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [sortField, setSortField] = useState<keyof Admin | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [showDropdown, setShowDropdown] = useState<string | null>(null);

  const columns: Column[] = [
    { key: 'name', label: t('UserManagement.name'), sortable: true },
    { key: 'email', label: t('UserManagement.email'), sortable: true },
    { key: 'mobile', label: t('UserManagement.mobile'), sortable: true },
    { key: 'role', label: t('UserManagement.role'), sortable: true },
    { key: 'organisation', label: t('UserManagement.organisation'), sortable: true },
    { key: 'action', label: t('UserManagement.action') },
  ];

  const handleSort = (field: keyof Admin) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const toggleDropdown = (email: string) => {
    setShowDropdown(showDropdown === email ? null : email);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (
        showDropdown &&
        !target.closest('.dropdown-menu') &&
        !target.closest('.dots-vertical-button')
      ) {
        setShowDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showDropdown]);

  const getSortIcon = (field: keyof Admin) => {
    if (sortField !== field) {
      return '↕';
    }
    return sortDirection === 'asc' ? '↑' : '↓';
  };

  // Filter and sort data
  const filteredData = data.filter((item) =>
    Object.values(item).some((value) => value.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortField || sortField === ('action' as keyof Admin | 'action')) {
      return 0;
    }
    const aValue = a[sortField as keyof Admin];
    const bValue = b[sortField as keyof Admin];
    return sortDirection === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
  });

  // Pagination
  const totalPages = Math.ceil(sortedData.length / pageSize);
  const paginatedData = sortedData.slice(page * pageSize, (page + 1) * pageSize);

  // if (loading) {
  //   return <TableSkeleton />;
  // }

  return (
    <div className="">
      <div className="flex justify-between p-6 items-center">
        <Link href="/" className="flex items-center gap-2 cursor-pointer">
          <ArrowLeft /> {t('Buttons.back')}
        </Link>
        <div className="flex items-center gap-4 ">
          <div className="flex items-center gap-2 border border-gray-300 rounded-full py-2 px-4">
            <button
              type="button"
              className="cursor-pointer"
              // onClick={handleSearch}
            >
              <Search size={15} />
            </button>
            <input
              type="text"
              placeholder={t('Filter.searchPlaceHolder')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              // onKeyDown={handleSearchKeyDown}
              className="outline-none bg-transparent text-sm placeholder:text-gray-400 placeholder:text-[14px]"
            />
            <button
              type="button"
              className="cursor-pointer"
              // onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M10 18H14"
                  stroke="#0B0B22"
                  stroke-width="1.4"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M7 12H17"
                  stroke="#0B0B22"
                  stroke-width="1.4"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M3 6H21"
                  stroke="#0B0B22"
                  stroke-width="1.4"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
          </div>
          <button
            type="button"
            className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-full cursor-pointer"
            // onClick={handleAddUser}
          >
            <Plus size={20} />
            {t('Buttons.addUser')}
          </button>
        </div>
      </div>
      {/* Table */}
      <div className="flex-1 w-full h-full min-h-0 overflow-y-auto">
        <div className="overflow-x-auto">
          <table className="w-full">
            {/* Table Header */}
            <thead className="border-t border-b border-gray-200 z-[999] ">
              <tr className="text-left text-gray-400">
                {columns.map((col) => (
                  <th
                    key={col.key}
                    className={`px-6 py-3 font-normal ${col.key === 'action' ? 'flex justify-end' : ''}`}
                  >
                    {col.sortable ? (
                      <button
                        type="button"
                        onClick={() => handleSort(col.key as keyof Admin)}
                        className="flex items-center gap-1 hover:text-gray-600 w-full text-left group"
                      >
                        <span>{col.label}</span>
                        <span className="inline-flex items-center opacity-50 group-hover:opacity-100">
                          {getSortIcon(col.key as keyof Admin)}
                        </span>
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
              {paginatedData.length > 0 ? (
                paginatedData.map((admin, index) => (
                  <tr key={index} className="hover:bg-neutral-50 transition-colors">
                    <td className="px-6 py-4 text-[#0B0B22] text-sm">{admin.name}</td>
                    <td className="px-6 py-4 text-[#0B0B22] text-sm">{admin.email}</td>
                    <td className="px-6 py-4 text-[#0B0B22] text-sm">{admin.mobile}</td>
                    <td className="px-6 py-4 text-[#0B0B22] text-sm">{admin.role}</td>
                    <td className="px-6 py-4 text-[#0B0B22] text-sm">{admin.organisation}</td>
                    <td className="px-6 py-4 flex items-center justify-end relative">
                      <button
                        type="button"
                        className="text-gray-500 hover:text-gray-700 cursor-pointer dots-vertical-button"
                        onClick={() => toggleDropdown(admin.email)}
                      >
                        <Image src={DotsVerticalIcon} alt="vertical dots" className="h-5 w-5" />
                      </button>
                      {showDropdown === admin.email && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 dropdown-menu">
                          <div className="py-1">
                            <button
                              type="button"
                              className="block px-4 py-2 text-sm text-[#0B0B22] hover:bg-gray-100 w-full text-left"
                            >
                              Profile History
                            </button>
                            <button
                              type="button"
                              className="block px-4 py-2 text-sm text-[#0B0B22] hover:bg-gray-100 w-full text-left"
                            >
                              Profile
                            </button>
                            <button
                              type="button"
                              className="block px-4 text-[#9D9DA7] py-2 text-sm hover:bg-gray-100 w-full text-left"
                            >
                              Edit
                            </button>
                            <button
                              type="button"
                              className="block px-4 py-2 text-sm text-[#DC1B25] hover:bg-red-100 w-full text-left"
                            >
                              Deactivate
                            </button>
                          </div>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={columns.length} className="px-6 py-4 text-center text-gray-500">
                    No data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="sticky bottom-0 bg-white border-b border-t border-gray-200">
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
                {t('Pagination.itemsOf')} {sortedData.length} {t('Pagination.entries')}
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
                      onClick={() => setPage(0)}
                      className="px-3 py-1 rounded-full text-primary cursor-pointer"
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
                  pageButtons.push(
                    <span key="ellipsis-end" className="px-2">
                      ...
                    </span>,
                    <button
                      key="end-ellipsis"
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
                disabled={page >= totalPages - 1}
                onClick={() => setPage(page + 1)}
                className={`px-3 py-1 ${
                  page >= totalPages - 1 ? 'text-gray-300' : 'text-blue-600 cursor-pointer'
                }`}
              >
                <ChevronRight />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
