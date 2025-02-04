import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import DotsVerticalIcon from '@/../public/images/icons/dashboard/dotsVertical.svg';
import { Link, usePathname } from '@/i18n/routing';
import { useSignUpRequests } from '@/ui/hooks/ui/useSignupRequests';
import { TableSkeleton } from '../TableSkeleton';
import SignupRequestDetailModal from './SignupRequestDetailModal';

export const SignUpRequestsTable: React.FC<{
  filters?: {
    createdAtFrom?: string;
    createdAtTo?: string;
    pinflSearch?: string;
    statuses?: string;
  };
}> = ({ filters = {} }) => {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [dropdownOpen, setDropdownOpen] = useState<Record<string, boolean>>({});
  const [selectedRequestId, setSelectedRequestId] = useState<string | null>(null);
  const { requests, loading, totalPages, totalElements } = useSignUpRequests(
    page,
    pageSize,
    filters.createdAtFrom,
    filters.createdAtTo,
    filters.pinflSearch,
    filters.statuses
  );
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const t = useTranslations();

  //resets page when filters change
  useEffect(() => {
    setPage(0);
  }, [filters]);

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

  const openModal = (id: string) => {
    setSelectedRequestId(id);
    setDropdownOpen({});
  };

  const closeModal = () => {
    setSelectedRequestId(null);
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
        {pathname === '/dashboard/signup-requests' ? (
          <h4 className="font-semibold text-[#0B0B22]">{t('SignupRequests.title2')}</h4>
        ) : (
          <h4 className="font-semibold text-[#0B0B22]">{t('SignupRequests.title')}</h4>
        )}
        {pathname === '/dashboard' && (
          <Link
            href="/dashboard/signup-requests"
            className="border border-gray-300 py-2 px-3 rounded-full cursor-pointer"
          >
            {t('Buttons.viewDetails')}
          </Link>
        )}
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-t-lg">
        <table className="w-full border-collapse border-spacing-0">
          {/* Table Header */}
          <thead>
            <tr className="bg-gray-100 text-left text-gray-400 rounded-lg">
              <th className="px-6 py-3 font-normal">{t('SignupRequests.name')}</th>
              <th className="px-6 py-3 font-normal">{t('SignupRequests.email')}</th>
              <th className="px-6 py-3 font-normal">{t('SignupRequests.mobile')}</th>
              <th className="px-6 py-3 font-normal">{t('SignupRequests.pinfl')}</th>
              <th className="px-6 py-3 font-normal">{t('SignupRequests.createdAt')}</th>
              <th className="px-6 py-3 font-normal">{t('SignupRequests.status')}</th>
              <th className="px-6 py-3" />
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {requests.map((req) => (
              <tr key={req.id} className={`  hover:bg-gray-100 transition-colors`}>
                <td className="px-6 py-4 text-[#0B0B22] text-sm">
                  {`${req.firstName || ''} ${req.lastName || ''}`}
                </td>
                <td className="px-6 py-4 text-[#0B0B22] text-sm">{req.email || 'N/A'}</td>
                <td className="px-6 py-4 text-[#0B0B22] text-sm">{req.phoneNumber || 'N/A'}</td>
                <td className="px-6 py-4 text-[#0B0B22] text-sm">{req.pinfl || 'N/A'}</td>
                <td className="px-6 py-4 text-[#0B0B22] text-sm">
                  {new Date(req.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 text-[#0B0B22] text-sm">
                  <span
                    className={`px-3 py-1 rounded-full text-white text-xs ${
                      req.status === 'CREATED'
                        ? 'bg-blue-300'
                        : req.status === 'OTP_SENT'
                          ? 'bg-blue-400'
                          : req.status === 'MOBILE_VERIFIED'
                            ? 'bg-green-300'
                            : req.status === 'AGREEMENTS_ACCEPTED'
                              ? 'bg-green-400'
                              : req.status === 'FACE_VERIFICATION_IN_PROGRESS'
                                ? 'bg-yellow-500'
                                : req.status === 'VERIFICATION_COMPLETED'
                                  ? 'bg-green-400'
                                  : req.status === 'VERIFICATION_FAILED'
                                    ? 'bg-red-500'
                                    : req.status === 'FAILED_FINALIZATION'
                                      ? 'bg-red-500'
                                      : req.status === 'NOT_ELIGIBLE'
                                        ? 'bg-red-500'
                                        : req.status === 'COMPLETED'
                                          ? 'bg-green-500'
                                          : 'bg-gray-400'
                    }`}
                  >
                    {req.status ? req.status.replace(/_/g, ' ') : 'UNKNOWN'}
                  </span>
                </td>
                <td className="px-6 py-4 flex items-center justify-end">
                  <button
                    type="button"
                    className="text-gray-500 hover:text-gray-700 cursor-pointer"
                    onClick={() => toggleDropdown(req.id)}
                  >
                    <Image src={DotsVerticalIcon} alt="vertical dots" className="h-5 w-5" />
                  </button>

                  {/* Dropdown Menu */}
                  {dropdownOpen[req.id] && (
                    <div
                      ref={dropdownRef}
                      className="absolute right-20 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50"
                    >
                      <button
                        type="button"
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                        onClick={() => openModal(req.id)}
                      >
                        {t('Buttons.viewSignupDetails')}
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Render Modal */}
      {selectedRequestId && (
        <SignupRequestDetailModal id={selectedRequestId} onClose={closeModal} />
      )}

      {/* Pagination */}
      {pathname === '/dashboard/signup-requests' && (
        <div className="flex items-center justify-between px-2 pt-4">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span>{t('Pagination.showing')}</span>
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
            <span>
              {t('Pagination.itemsOf')} {totalElements} {t('Pagination.entries')}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Previous Page Button */}
            <button
              type="button"
              disabled={page === 0}
              onClick={() => handlePageChange(page - 1)}
              className={`px-3 py-1 ${page === 0 ? 'text-gray-300' : 'text-blue-600 cursor-pointer'} `}
            >
              <ChevronLeft />
            </button>

            {/* Dynamic Page Numbers */}
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
                    className="px-3 py-1 rounded-xl bg-gray-100 text-[#08678E] cursor-pointer"
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
                    className=" px-3 py-1 bg-gray-100 rounded-xl text-[#08678E] cursor-pointer"
                  >
                    {totalPages}
                  </button>
                );
              }

              return pageButtons;
            })()}

            {/* Next Page Button */}
            <button
              type="button"
              disabled={page === totalPages - 1}
              onClick={() => handlePageChange(page + 1)}
              className={`px-3 py-1 ${page === totalPages - 1 ? 'text-gray-300' : 'text-blue-600 cursor-pointer'} `}
            >
              <ChevronRight />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
