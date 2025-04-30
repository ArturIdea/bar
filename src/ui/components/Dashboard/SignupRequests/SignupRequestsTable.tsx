import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import DotsVerticalIcon from '@/../public/images/icons/dashboard/dotsVertical.svg';
import { usePathname } from '@/i18n/routing';
import { useSignUpRequests } from '@/ui/hooks/ui/useSignupRequests';
import { Pagination } from '../Pagination';
import { TableSkeleton } from '../TableSkeleton';
import UserDetailsModal from '../Users/UserDetailsModal';
import ViewDetailsButton from '../ViewDetailsButton';
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
  const [pageSize, setPageSize] = useState(20);
  const [dropdownOpen, setDropdownOpen] = useState<Record<string, boolean>>({});
  const [selectedRequestId, setSelectedRequestId] = useState<string | null>(null);
  const [selectedPinfl, setSelectedPinfl] = useState<string | null>(null);
  const { requests, total, loading } = useSignUpRequests(
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

  useEffect(() => setPage(0), [filters]);

  const openSignupModal = (id: string) => {
    setSelectedRequestId(id);
    setSelectedPinfl(null);
    setDropdownOpen({});
  };

  const openUserDetails = (pinfl: string) => {
    setSelectedPinfl(pinfl);
    setSelectedRequestId(null);
  };

  const handlePageChange = (newPage: number) => setPage(newPage);

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
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (loading) {
    return <TableSkeleton />;
  }

  const getStatusClass = (status: string) => {
    const statusClasses: Record<string, string> = {
      CREATED: 'bg-blue-300',
      OTP_SENT: 'bg-blue-400',
      MOBILE_VERIFIED: 'bg-green-300',
      AGREEMENTS_ACCEPTED: 'bg-green-400',
      FACE_VERIFICATION_IN_PROGRESS: 'bg-yellow-500',
      VERIFICATION_COMPLETED: 'bg-green-400',
      VERIFICATION_FAILED: 'bg-red-500',
      FAILED_FINALIZATION: 'bg-red-500',
      NOT_ELIGIBLE: 'bg-red-500',
      COMPLETED: 'bg-green-500',
      DEFAULT: 'bg-gray-400',
    };
    return statusClasses[status] || statusClasses.DEFAULT;
  };

  const columns = [
    { key: 'name', label: t('SignupRequests.name') },
    { key: 'email', label: t('SignupRequests.email') },
    { key: 'pinfl', label: t('SignupRequests.pinfl') },
    { key: 'createdAt', label: t('SignupRequests.createdAt') },
    { key: 'status', label: t('SignupRequests.status') },
  ];

  return (
    <div className="flex flex-col h-full border-t border-b border-gray-200">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b">
        <h4 className="font-semibold text-[#0B0B22]">
          {t(
            pathname === '/dashboard/signup-requests'
              ? 'SignupRequests.title2'
              : 'SignupRequests.title'
          )}
        </h4>
        <ViewDetailsButton href="signup-requests" />
      </div>

      {/* Table */}
      <div className="flex-1 overflow-y-auto">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border-spacing-0">
            <thead className="border-b border-gray-200">
              <tr className=" text-left text-gray-400">
                {columns.map((col) => (
                  <th key={col.key} className="w-1/8 px-6 py-3 font-normal">
                    {col.label}
                  </th>
                ))}
                <th className="w-2/8 px-6 py-3" />
              </tr>
            </thead>
            <tbody className="border-b border-gray-200">
              {requests.map((req) => (
                <tr key={req.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-[#0B0B22] text-sm">
                    {`${req.firstName || ''} ${req.lastName || ''}`}
                  </td>
                  <td className="px-6 py-4 text-[#0B0B22] text-sm">{req.email || 'N/A'}</td>
                  <td className="px-6 py-4 text-[#0B0B22] text-sm">{req.pinfl || 'N/A'}</td>
                  <td className="px-6 py-4 text-[#0B0B22] text-sm">
                    {new Date(req.createdAt).toLocaleString('uz-UZ', {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-white text-xs ${getStatusClass(req.status)}`}
                    >
                      {req.status.replace(/_/g, ' ') || 'UNKNOWN'}
                    </span>
                  </td>
                  <td className="px-6 py-4 flex items-center justify-end relative">
                    <button
                      type="button"
                      className="text-gray-500 hover:text-gray-700 cursor-pointer"
                      onClick={() => toggleDropdown(req.id)}
                    >
                      <Image src={DotsVerticalIcon} alt="Options" className="h-5 w-5" />
                    </button>

                    {dropdownOpen[req.id] && (
                      <div
                        ref={dropdownRef}
                        className="absolute right-16 w-52 bg-white border border-gray-200 rounded-lg shadow-lg z-50"
                      >
                        <button
                          type="button"
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                          onClick={() => openSignupModal(req.id)}
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
      </div>

      {/* Modals */}
      {selectedRequestId && (
        <SignupRequestDetailModal
          id={selectedRequestId}
          onClose={() => setSelectedRequestId(null)}
          onOpenUserDetails={openUserDetails}
        />
      )}

      {selectedPinfl && (
        <UserDetailsModal
          pinfl={selectedPinfl}
          onClose={() => setSelectedPinfl(null)}
          onOpenSignupRequest={openSignupModal}
        />
      )}

      {/* Pagination */}
      {pathname === '/dashboard/signup-requests' && (
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
    </div>
  );
};
