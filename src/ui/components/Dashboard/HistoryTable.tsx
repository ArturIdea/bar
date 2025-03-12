import { useRef, useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import DotsVerticalIcon from '@/../public/images/icons/dashboard/dotsVertical.svg';
import SignupRequestDetailModal from '@/ui/components/Dashboard/SignupRequests/SignupRequestDetailModal';
import UserDetailsModal from '@/ui/components/Dashboard/Users/UserDetailsModal';
import { useUsers } from '@/ui/hooks/ui/useUsers';
import { Pagination } from './Pagination';
import { TableSkeleton } from './TableSkeleton';

interface HistoryTableProps {
  createdBy: string;
}

const HistoryTable: React.FC<HistoryTableProps> = ({ createdBy }) => {
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const t = useTranslations();

  const [dropdownOpen, setDropdownOpen] = useState<Record<string, boolean>>({});
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [selectedPinfl, setSelectedPinfl] = useState<string | null>(null);
  const [selectedSignupRequestId, setSelectedSignupRequestId] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const { users, total, loading } = useUsers(
    page,
    pageSize,
    undefined,
    undefined,
    undefined,
    undefined,
    createdBy
  );

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

  const handleViewDetails = (pinfl?: string, userId?: string) => {
    setSelectedUserId(userId || null);
    setSelectedPinfl(pinfl || null);
    setDropdownOpen({});
    setSelectedSignupRequestId(null);
  };

  const handleOpenSignupRequest = (signupRequestId: string) => {
    setSelectedSignupRequestId(signupRequestId);
    setDropdownOpen({});
    setSelectedUserId(null);
    setSelectedPinfl(null);
  };

  return (
    <div className="p-6 overflow-x-auto rounded-t-lg">
      {loading && <TableSkeleton />}
      {!loading && users.length === 0 && <p>No users found.</p>}

      {!loading && users.length > 0 && (
        <>
          <table className="w-full border-collapse border-spacing-0">
            <thead>
              <tr className="bg-gray-100 text-left text-gray-400 rounded-lg">
                <th className="px-6 py-3 font-normal">{t('UserManagement.name')}</th>
                <th className="px-6 py-3 font-normal">{t('UserManagement.email')}</th>
                <th className="px-6 py-3 font-normal">{t('UserManagement.mobile')}</th>
                <th className="px-6 py-3 font-normal">{t('UserManagement.pinfl')}</th>
                <th className="px-6 py-3 font-normal">{t('UserManagement.createdAt')}</th>
                <th className="px-6 py-3 font-normal" />
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr key={user.userId} className="hover:bg-gray-100 transition-colors">
                  <td className="px-6 py-4 text-[#0B0B22] text-sm">
                    {user.firstName} {user.lastName}
                  </td>
                  <td className="px-6 py-4 text-[#0B0B22] text-sm">{user.email || 'N/A'}</td>
                  <td className="px-6 py-4 text-[#0B0B22] text-sm">{user.phoneNumber || 'N/A'}</td>
                  <td className="px-6 py-4 text-[#0B0B22] text-sm">{user.pinfl || 'N/A'}</td>
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

                    {dropdownOpen[user.userId] && (
                      <div
                        ref={dropdownRef}
                        className="absolute right-20 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50"
                      >
                        <button
                          type="button"
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                          onClick={() => handleViewDetails(user.pinfl, user.userId)}
                        >
                          {t('Buttons.viewUserDetails')}
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <Pagination
            page={page}
            pageSize={pageSize}
            total={total}
            onPageChange={handlePageChange}
            onPageSizeChange={handlePageSizeChange}
          />
        </>
      )}

      {/* User Details Modal */}
      {(selectedPinfl || selectedUserId) && (
        <UserDetailsModal
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
    </div>
  );
};

export default HistoryTable;
