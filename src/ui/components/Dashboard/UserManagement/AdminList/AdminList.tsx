'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
// import { IconFileTextFilled } from '@tabler/icons-react';
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  CircleSlash,
  Eye,
  ListFilter,
  Pencil,
  Plus,
  Search,
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import DotsVerticalIcon from '@/../public/images/icons/dashboard/dotsVertical.svg';
import { useAdminUsers } from '@/ui/hooks/ui/useAdminUsers';
import { useDeactivateAdmin } from '@/ui/hooks/ui/useDeactivateAdmin';
import { AddAdminDrawer } from './AddAdminDrawer';
import { AdminProfileDrawer } from './AdminProfileDrawer';

interface Admin {
  id: string;
  username: string;
  email: string | null;
  firstName: string;
  lastName: string;
  enabled: boolean;
  emailVerified: boolean;
  attributes: {
    locale?: string[];
    phone?: string[];
    organization?: string[];
  } | null;
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
  const [isAddDrawerOpen, setIsAddDrawerOpen] = useState(false);
  const [showDeactivateConfirm, setShowDeactivateConfirm] = useState<string | null>(null);
  const [selectedAdmin, setSelectedAdmin] = useState<Admin | null>(null);
  const [isProfileDrawerOpen, setIsProfileDrawerOpen] = useState(false);

  const { users, total, loading } = useAdminUsers(page, pageSize, searchTerm);
  const { deactivateAdmin, isLoading: isDeactivating } = useDeactivateAdmin();

  const columns: Column[] = [
    { key: 'username', label: t('UserManagement.name'), sortable: true },
    { key: 'email', label: t('UserManagement.email'), sortable: true },
    { key: 'attributes', label: t('UserManagement.mobile'), sortable: true },
    { key: 'enabled', label: t('UserManagement.role'), sortable: true },
    { key: 'attributes', label: t('UserManagement.organisation'), sortable: true },
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

  const toggleDropdown = (id: string) => {
    setShowDropdown(showDropdown === id ? null : id);
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

  // Pagination
  const totalPages = Math.ceil(total / pageSize);

  const handleDeactivate = async (userId: string) => {
    const success = await deactivateAdmin(userId);
    if (success) {
      setShowDeactivateConfirm(null);
      setShowDropdown(null);
      // Refresh the list
      window.location.reload();
    }
  };

  const filteredUsers = users.filter(
    (admin) =>
      `${admin.firstName} ${admin.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (admin.username && admin.username.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="">
      <div className="flex justify-between p-6 items-center">
        <Link href="/" className="flex items-center gap-2 cursor-pointer">
          <ArrowLeft /> {t('Buttons.back')}
        </Link>
        <div className="flex items-center gap-4 ">
          <div className="flex items-center gap-2 border border-gray-300 rounded-full py-2 px-4">
            <button type="button" className="cursor-pointer">
              <Search size={15} />
            </button>
            <input
              type="text"
              placeholder={t('Filter.searchPlaceHolder')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="outline-none bg-transparent text-sm placeholder:text-gray-400 placeholder:text-[14px]"
            />
            <button type="button" className="cursor-pointer">
              <ListFilter />
            </button>
          </div>
          <button
            type="button"
            className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-full cursor-pointer"
            onClick={() => setIsAddDrawerOpen(true)}
          >
            <Plus size={20} />
            {t('Buttons.addUser')}
          </button>
        </div>
      </div>

      <div className="flex flex-col m-3 mt-0 p-3 bg-white rounded-[24px]">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-gray-200">
          <h4 className="font-semibold text-[#0B0B22]">{t('Sidebar.adminList')}</h4>
        </div>
        {/* Table */}
        <div className="flex-1 min-h-0 overflow-y-auto">
          <div className="overflow-x-auto">
            <table className="w-full">
              {/* Table Header */}
              <thead className="bg-[#FAFAFA] rounded-[8px]">
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
                {loading ? (
                  <tr>
                    <td colSpan={columns.length} className="px-6 py-4 text-center text-gray-500">
                      Loading...
                    </td>
                  </tr>
                ) : filteredUsers.length > 0 ? (
                  filteredUsers.map((admin) => (
                    <tr key={admin.id} className="hover:bg-neutral-50 transition-colors border-b">
                      <td className="px-6 py-4 text-[#0B0B22] text-sm">
                        {`${admin.firstName} ${admin.lastName}`}
                      </td>
                      <td className="px-6 py-4 text-[#0B0B22] text-sm">{admin.email || '-'}</td>
                      <td className="px-6 py-4 text-[#0B0B22] text-sm">
                        {admin.attributes?.phone?.[0] || '-'}
                      </td>
                      <td className="px-6 py-4 text-[#0B0B22] text-sm">
                        {admin.enabled ? 'Active' : 'Inactive'}
                      </td>
                      <td className="px-6 py-4 text-[#0B0B22] text-sm">
                        {admin.attributes?.organization?.[0] || '-'}
                      </td>
                      <td className="px-6 py-4 flex items-center justify-end relative">
                        <button
                          type="button"
                          className="text-gray-500 hover:text-gray-700 cursor-pointer dots-vertical-button"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleDropdown(admin.id);
                          }}
                        >
                          <Image src={DotsVerticalIcon} alt="vertical dots" className="h-5 w-5" />
                        </button>
                        {showDropdown === admin.id && (
                          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 dropdown-menu">
                            <div className="py-1">
                              {/* <button
                              type="button"
                              className="block px-4 cursor-pointer py-2 text-sm text-[#0B0B22] hover:bg-gray-100 w-full text-left"
                              onClick={() => {
                                setSelectedAdmin(admin);
                                setIsProfileDrawerOpen(true);
                                setShowDropdown(null);
                              }}
                            >
                              <div className="flex gap-2 items-center">
                                <IconFileTextFilled /> History Profile
                              </div>
                            </button> */}
                              <button
                                type="button"
                                className="block px-4 cursor-pointer py-2 text-sm text-[#0B0B22] hover:bg-gray-100 w-full text-left"
                                onClick={() => {
                                  setSelectedAdmin(admin);
                                  setIsProfileDrawerOpen(true);
                                  setShowDropdown(null);
                                }}
                              >
                                <div className="flex gap-2 items-center">
                                  <Eye /> Profile
                                </div>
                              </button>
                              <button
                                type="button"
                                className="block cursor-pointer px-4 text-[#9D9DA7] py-2 text-sm hover:bg-gray-100 w-full text-left"
                              >
                                <div className="flex gap-2 items-center">
                                  <Pencil /> Edit
                                </div>
                              </button>
                              <button
                                type="button"
                                className="block cursor-pointer px-4 py-2 text-sm text-[#DC1B25] hover:bg-red-100 w-full text-left"
                                onClick={() => setShowDeactivateConfirm(admin.id)}
                              >
                                <div className="flex gap-2 items-center">
                                  <CircleSlash /> Deactivate
                                </div>
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
                  {t('Pagination.itemsOf')} {total} {t('Pagination.entries')}
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
                    Math.min(
                      page - Math.floor(totalVisiblePages / 2),
                      totalPages - totalVisiblePages
                    )
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
      <AddAdminDrawer
        isOpen={isAddDrawerOpen}
        onClose={() => setIsAddDrawerOpen(false)}
        onSuccess={() => {
          setIsAddDrawerOpen(false);
          // Refresh the list
          window.location.reload();
        }}
      />

      {/* Deactivate Confirmation Dialog */}
      {showDeactivateConfirm && (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">Confirm Deactivation</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to deactivate this admin user? This action can be reversed
              later.
            </p>
            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={() => setShowDeactivateConfirm(null)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                disabled={isDeactivating}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleDeactivate(showDeactivateConfirm)}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
                disabled={isDeactivating}
              >
                {isDeactivating ? 'Deactivating...' : 'Deactivate'}
              </button>
            </div>
          </div>
        </div>
      )}
      <AdminProfileDrawer
        isOpen={isProfileDrawerOpen}
        onClose={() => setIsProfileDrawerOpen(false)}
        admin={selectedAdmin}
      />
    </div>
  );
}
