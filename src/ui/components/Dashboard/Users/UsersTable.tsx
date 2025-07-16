import React, { useEffect, useState } from 'react';
import { EyeIcon } from 'lucide-react';
// import Image from 'next/image';
import { useTranslations } from 'next-intl';
// import DotsVerticalIcon from '@/../public/images/icons/dashboard/dotsVertical.svg';
import { usePathname } from '@/i18n/routing';
import { formatChannelName } from '@/lib/utils';
import { useUsers } from '@/ui/hooks/ui/useUsers';
import { Pagination } from '../Pagination';
import SignupRequestDetailModal from '../SignupRequests/SignupRequestDetailModal';
import { TableSkeleton } from '../TableSkeleton';
import ViewDetailsButton from '../ViewDetailsButton';
import MultiTabUserDetailsModal from './UserDetailsModal';

export const UsersTable: React.FC<{
  filters?: {
    registrationChannel?: string;
    fromDate?: string;
    toDate?: string;
    pinflSearch?: string;
    usernameSearch?: string;
  };
}> = ({ filters = {} }) => {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [selectedPinfl, setSelectedPinfl] = useState<string | null>(null);
  const [selectedSignupRequestId, setSelectedSignupRequestId] = useState<string | null>(null);
  const { users, total, loading } = useUsers(
    page,
    pageSize,
    filters.registrationChannel,
    filters.fromDate,
    filters.toDate,
    filters.pinflSearch,
    filters.usernameSearch
  );
  const pathname = usePathname();
  const t = useTranslations();

  //resets page when filters change
  useEffect(() => {
    setPage(0);
  }, [filters]);

  const handleViewDetails = (pinfl?: string, userId?: string) => {
    setSelectedUserId(userId || null);
    setSelectedPinfl(pinfl || null);
    setSelectedSignupRequestId(null);
  };

  const handleOpenSignupRequest = (signupRequestId: string) => {
    setSelectedSignupRequestId(signupRequestId);
    setSelectedUserId(null);
    setSelectedPinfl(null);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handlePageSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPageSize(Number(event.target.value));
    setPage(0);
  };

  if (loading) {
    return <TableSkeleton />;
  }

  const columns = [
    { key: 'name', label: t('UserManagement.name') },
    { key: 'pinfl', label: t('UserManagement.pinfl') },
    { key: 'createdAt', label: t('UserManagement.createdAt') },
    { key: 'bank', label: t('UserManagement.bank') },
    { key: 'onboardingChannel', label: t('UserManagement.onboardingChannel') },
    { key: 'action', label: t("UserManagement.action") },
  ];

  return (
    <div className="flex flex-col m-3 p-3 bg-white rounded-[24px] h-full">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-200">
        {pathname === '/dashboard/user-management/baraka-users' ? (
          <h4 className="font-semibold text-[#0B0B22]">{t('UserManagement.title2')}</h4>
        ) : (
          <h4 className="font-semibold text-[#0B0B22]">{t('UserManagement.title')}</h4>
        )}

        <ViewDetailsButton href="user-management/baraka-users" />
      </div>

      {/* Table */}
      <div className="flex-1 min-h-0 overflow-y-auto">
        <div className="overflow-x-auto">
          <table className="w-full">
            {/* Table Header */}
            <thead className="bg-[#FAFAFA] rounded-[8px] ">
              <tr className="text-left text-[#9D9DA7]">
                {columns.map((col) => (
                  <th
                    key={col.key}
                    className={`px-6 py-3 font-normal ${col.key === 'action' ? 'flex justify-end' : ''}`}
                  >
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="">
              {users.map((user) => (
                <tr key={user.userId} className={` hover:bg-neutral-50 transition-colors border-b`}>
                  <td className="px-6 py-4 text-[#0B0B22] text-sm">
                    {user.firstName} {user.lastName}
                  </td>
                  <td className="px-6 py-4 text-[#0B0B22] text-sm">{user.pinfl || 'No Data'}</td>

                  <td className="px-6 py-4 text-[#0B0B22] text-sm">
                    {new Date(user.createdAt).toLocaleString('uz-UZ', {
                      timeZone: 'Asia/Tashkent',
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </td>
                  <td className="px-6 py-4 text-[#0B0B22] text-sm">{user.bankType || 'No Data'}</td>
                  <td className="px-6 py-4 text-[#0B0B22] text-sm">
                    {formatChannelName(user.channel)}
                  </td>
                  <td className="px-6 py-4 flex items-center justify-end relative">
                    <button
                      type="button"
                      className="text-gray-500 hover:text-gray-700 cursor-pointer"
                      onClick={() => handleViewDetails(user.pinfl, user.userId)}
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

      {/* User Details Modal */}
      {(selectedPinfl || selectedUserId) && (
        <MultiTabUserDetailsModal
          userId={selectedUserId || undefined}
          pinfl={selectedPinfl || undefined}
          onClose={() => {
            setSelectedPinfl(null);
            setSelectedUserId(null);
          }}
          onOpenSignupRequest={handleOpenSignupRequest}
        />
      )}

      {selectedSignupRequestId && (
        <SignupRequestDetailModal
          id={selectedSignupRequestId}
          onClose={() => setSelectedSignupRequestId(null)}
          onOpenUserDetails={handleViewDetails}
        />
      )}

      {/* Pagination */}
      {/* {pathname === '/dashboard/user-management/baraka-users' && (
        
      )} */}
      <div className="sticky bottom-0 bg-[#FAFAFA] rounded-[8px]">
        <Pagination
          page={page}
          pageSize={pageSize}
          total={total}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
        />
      </div>
    </div>
  );
};
