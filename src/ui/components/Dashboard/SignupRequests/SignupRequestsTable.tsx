import React, { useEffect, useState } from 'react';
import { EyeIcon } from 'lucide-react';
// import Image from 'next/image';
import { useTranslations } from 'next-intl';
// import DotsVerticalIcon from '@/../public/images/icons/dashboard/dotsVertical.svg';
import { usePathname } from '@/i18n/routing';
import { useSignUpRequests } from '@/ui/hooks/ui/useSignupRequests';
import { Pagination } from '../Pagination';
import { TableSkeleton } from '../TableSkeleton';
import UserDetailsModal from '../Users/UserDetailsModal';
import ViewDetailsButton from '../ViewDetailsButton';
// import ViewDetailsButton from '../ViewDetailsButton';
import SignupRequestDetailModal from './SignupRequestDetailModal';

export const SignUpRequestsTable: React.FC<{
  filters?: {
    fromDate?: string;
    toDate?: string;
    pinflSearch?: string;
    statuses?: string;
  };
}> = ({ filters = {} }) => {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [selectedRequestId, setSelectedRequestId] = useState<string | null>(null);
  const [selectedPinfl, setSelectedPinfl] = useState<string | null>(null);
  const { requests, total, loading } = useSignUpRequests(
    page,
    pageSize,
    filters.fromDate,
    filters.toDate,
    filters.pinflSearch,
    filters.statuses
  );
  const pathname = usePathname();
  const t = useTranslations();

  useEffect(() => setPage(0), [filters]);

  const openSignupModal = (id: string) => {
    setSelectedRequestId(id);
    setSelectedPinfl(null);
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

  if (loading) {
    return <TableSkeleton />;
  }

  // Mapping for bankType codes to translated labels
  const getBankTypeLabel = (bankType: string) => {
    switch ((bankType || '').toUpperCase().trim()) {
      case 'XALQ':
        return t('Navbar.XALQ');
      case 'ALOQA':
        return t('Navbar.ALOQA');
      case 'NODATA':
      case 'NO DATA':
      case 'N/A':
        return t('Charts.NoData');
      default:
        return t('Charts.NoData');
    }
  };

  // Mapping for onboarding channel codes to translated labels
  const getChannelLabel = (channel: string) => {
    switch ((channel || '').toUpperCase().trim()) {
      case 'CITIZEN_APP':
        return t('Charts.CITIZEN_APP');
      case 'AGENT_APP':
        return t('Charts.AGENT_APP');
      case 'BANK_PORTAL':
        return t('Charts.BANK_PORTAL');
      case 'WEB_PORTAL':
        return t('Charts.WEB_PORTAL');
      case 'XALQ_FILE':
        return t('Charts.XALQ_PORTAL');
      case 'HTTP_CLIENT':
        return t('Charts.HTTP_CLIENT');
      case 'NODATA':
      case 'NO DATA':
      case 'N/A':
        return t('Charts.NoData');
      default:
        return t('Charts.NoData');
    }
  };

  // Mapping for status codes to translated labels
  const getStatusLabel = (status: string) => {
    switch ((status || '').toUpperCase().trim()) {
      case 'CREATED':
        return t('OnboardingStatus.CREATED');
      case 'OTP_SENT':
        return t('OnboardingStatus.OTP_SENT');
      case 'MOBILE_VERIFIED':
        return t('OnboardingStatus.MOBILE_VERIFIED');
      case 'AGREEMENTS_ACCEPTED':
        return t('OnboardingStatus.AGREEMENTS_ACCEPTED');
      case 'FACE_VERIFICATION_IN_PROGRESS':
        return t('OnboardingStatus.FACE_VERIFICATION_IN_PROGRESS');
      case 'VERIFICATION_COMPLETED':
        return t('OnboardingStatus.VERIFICATION_COMPLETED');
      case 'VERIFICATION_FAILED':
        return t('OnboardingStatus.VERIFICATION_FAILED');
      case 'FAILED_FINALIZATION':
        return t('OnboardingStatus.FAILED_FINALIZATION');
      case 'COMPLETED':
        return t('OnboardingStatus.COMPLETED');
      case 'NODATA':
      case 'NO DATA':
      case 'N/A':
        return t('Charts.NoData');
      default:
        return t('Charts.NoData');
    }
  };

  const getStatusClass = (status: string) => {
    const statusClasses: Record<string, string> = {
      CREATED: 'bg-[rgba(33,87,226,0.20)] text-[color:var(--Alert-info,#2157E2)]',
      OTP_SENT: 'bg-[rgba(33,87,226,0.25)] text-[color:var(--Alert-info,#2157E2)]',
      MOBILE_VERIFIED: 'bg-[rgba(19,171,63,0.20)] text-[color:var(--Alert-success,#13AB3F)]',
      AGREEMENTS_ACCEPTED: 'bg-[rgba(19,171,63,0.25)] text-[color:var(--Alert-success,#13AB3F)]',
      FACE_VERIFICATION_IN_PROGRESS: 'bg-[rgba(234,179,8,0.30)] text-[#EAB308]', // you can also use var() if you define it
      VERIFICATION_COMPLETED: 'bg-[rgba(19,171,63,0.25)] text-[color:var(--Alert-success,#13AB3F)]',
      VERIFICATION_FAILED: 'bg-[rgba(220,27,37,0.25)] text-[color:var(--Alert-error,#DC1B25)]',
      FAILED_FINALIZATION: 'bg-[rgba(220,27,37,0.20)] text-[color:var(--Alert-error,#DC1B25)]',
      COMPLETED: 'bg-[rgba(19,171,63,0.20)] text-[color:var(--Alert-success,#13AB3F)]',
      DEFAULT: 'bg-[rgba(156,163,175,0.20)] text-[#6B7280]',
    };

    return statusClasses[status] || statusClasses.DEFAULT;
  };

  const getNoDataLabel = () => t('Charts.NoData');

  const columns = [
    { key: 'name', label: t('SignupRequests.name') },
    { key: 'pinfl', label: t('SignupRequests.pinfl') },
    { key: 'createdAt', label: t('SignupRequests.createdAt') },
    { key: 'status', label: t('SignupRequests.status') },
    { key: 'bank', label: t('UserManagement.bank') },
    { key: 'onboardingChannel', label: t('UserManagement.onboardingChannel') },
    { key: 'action', label: t('UserManagement.action') },
  ];

  return (
    <div className="flex flex-col h-full border-gray-200">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b">
        <h4 className="font-semibold text-[#0B0B22]">
          {t(
            pathname === '/dashboard/signup-requests'
              ? 'Sidebar.signupRequests'
              : 'Statistics.requests'
          )}
        </h4>
        <ViewDetailsButton href="signup-requests" />
      </div>

      {/* Table */}
      <div className="flex-1 min-h-0 overflow-y-auto">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#FAFAFA] rounded-[8px]">
              <tr className=" text-left text-gray-400">
                {columns.map((col) => (
                  <th
                    key={col.key}
                    className={`px-6 py-3 font-normal ${col.key === 'action' ? 'flex justify-end' : ''}${col.key === 'createdAt' ? ' min-w-[170px]' : ''}`}
                  >
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="">
              {requests.map((req) => (
                <tr key={req.id} className="hover:bg-gray-50 transition-colors border-b">
                  <td className="px-6 py-4 text-[#0B0B22] text-sm">
                    {req.firstName && req.lastName ? `${req.firstName} ${req.lastName}` : getNoDataLabel()}
                  </td>
                  <td className="px-6 py-4 text-[#0B0B22] text-sm">{req.pinfl || t('Charts.NoData')}</td>
                  <td className={`px-6 py-4 text-[#0B0B22] text-sm${' min-w-[170px]'}`}>
                    {req.createdAt
                      ? new Date(req.createdAt).toLocaleString('uz-UZ', {
                          timeZone: 'Asia/Tashkent',
                          year: 'numeric',
                          month: '2-digit',
                          day: '2-digit',
                          hour: '2-digit',
                          minute: '2-digit',
                        })
                      : t('Charts.NoData')}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full whitespace-nowrap text-xs ${getStatusClass(req.status)}`}
                    >
                      {getStatusLabel(req.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-[#0B0B22] text-sm">
                    {getBankTypeLabel(req.bankType)}
                  </td>
                  <td className="px-6 py-4 text-[#0B0B22] text-sm">
                    {getChannelLabel(req.channel)}
                  </td>
                  <td className="px-6 py-4 flex items-center justify-end relative">
                    <button
                      type="button"
                      className="text-gray-500 hover:text-gray-700 cursor-pointer"
                      onClick={() => openSignupModal(req.id)}
                    >
                      <EyeIcon color="#0B0B22" />
                    </button>
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
      <div className="bg-[#FAFAFA] rounded-[8px]">
        <Pagination
          page={page}
          pageSize={pageSize}
          total={total}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
          pageSizeOptions={[10, 20, 50, 70, 100]}
        />
      </div>
    </div>
  );
};
