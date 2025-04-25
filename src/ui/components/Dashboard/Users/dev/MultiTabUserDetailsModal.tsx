import React, { useState } from 'react';
import Image from 'next/image';
import { Loader2, XIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import placeholderUserImage from '@/../public/images/icons/dashboard/placeholderUserImage.jpg';
import { useUserBenefitBankAccount } from '@/ui/hooks/ui/dev/useUserBenefitBankAccount';
import { useDevUserBenefits } from '@/ui/hooks/ui/dev/useUserBenefits';
import { useUserDetail } from '@/ui/hooks/ui/dev/useUserDetails';
import { useUserDevices } from '@/ui/hooks/ui/dev/useUserDevices';
import { useUserDocuments } from '@/ui/hooks/ui/dev/useUserDocuments';
import { useUserImpersonationsOtps } from '@/ui/hooks/ui/dev/useUserImpersonationsOtps';
import { useUserPublicOfferAgreement } from '@/ui/hooks/ui/dev/useUserPublicOfferAgreement';
import { useUserVouchers } from '@/ui/hooks/ui/dev/useUserVouchers';
import { useClickOutside } from '@/ui/hooks/ui/useClickOutside';
import { BenefitBankAccountTab } from './BenefitBankAccountTab';
import { BenefitsTab } from './BenefitsTab';
import { DevicesTab } from './DevicesTab';
import { DocumentsTab } from './DocumentsTab';
import { ImpersonationsTab } from './ImpersonationsTab';
import { PublicOfferAgreementsTab } from './PublicOfferAgreementsTab';
import UserDetailsTab from './UserDetailsTab';
import { VouchersTab } from './VouchersTab';

interface MultiTabUserDetailsModalProps {
  userId: string;
  onClose: () => void;
}

const MultiTabUserDetailsModal: React.FC<MultiTabUserDetailsModalProps> = ({ userId, onClose }) => {
  const t = useTranslations();
  const modalRef = useClickOutside<HTMLDivElement>(onClose);

  const [activeTab, setActiveTab] = useState<string>('details');
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);

  const { userDetail, loading: userLoading, error: userError } = useUserDetail(userId);
  const {
    impersonations,
    total: impersonationsTotal,
    loading: impersonationsLoading,
    error: impersonationsError,
  } = useUserImpersonationsOtps(userId, page, pageSize);
  const { documents, loading: documentsLoading, error: documentsError } = useUserDocuments(userId);
  const {
    bankAccounts,
    loading: bankLoading,
    error: bankError,
  } = useUserBenefitBankAccount(userId);
  const { devices, loading: devicesLoading, error: devicesError } = useUserDevices(userId);
  const {
    vouchers,
    total: vouchersTotal,
    loading: vouchersLoading,
    error: vouchersError,
  } = useUserVouchers(userId, page, pageSize);
  const {
    agreement,
    loading: agreementLoading,
    error: agreementError,
  } = useUserPublicOfferAgreement(userId);

  const {
    benefits,
    total: benefitsTotal,
    loading: benefitsLoading,
    error: benefitsError,
  } = useDevUserBenefits(userId, page, pageSize);

  const Tabs = [
    { id: 'details', title: t('Dev.userDetails') },
    { id: 'impersonations', title: t('Dev.impersonations') },
    { id: 'documents', title: t('Dev.documents') },
    { id: 'devices', title: t('Dev.devices') },
    { id: 'benefitBank', title: t('Dev.benefitBankAcc') },
    { id: 'benefit', title: t('UserManagement.benefits.title') },
    { id: 'vouchers', title: t('Dev.vouchers') },
    { id: 'publicOfferAgreement', title: t('Dev.publicOfferAgreement') },
  ];

  const handlePageChange = (newPage: number) => setPage(newPage);

  const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPageSize(Number(e.target.value));
    setPage(0);
  };

  const renderTabContent = () => {
    const showLoader = () => <Loader2 className="animate-spin text-gray-500" />;
    const showError = (error: any) => <div className="text-red-500">Error: {error}</div>;

    switch (activeTab) {
      case 'details':
        if (userLoading) {
          return showLoader();
        }
        if (userError) {
          return showError(userError);
        }
        return userDetail && <UserDetailsTab user={userDetail} />;

      case 'impersonations':
        if (impersonationsLoading) {
          return showLoader();
        }
        if (impersonationsError) {
          return showError(impersonationsError);
        }
        return (
          impersonations && (
            <ImpersonationsTab
              userImpersonationOtp={impersonations}
              page={page}
              pageSize={pageSize}
              impersonationsTotal={impersonationsTotal}
              handlePageChange={handlePageChange}
              handlePageSizeChange={handlePageSizeChange}
            />
          )
        );

      case 'documents':
        if (documentsLoading) {
          return showLoader();
        }

        if (documentsError) {
          return showError(documentsError);
        }
        return documents && <DocumentsTab documents={documents} />;

      case 'benefitBank':
        if (bankLoading) {
          return showLoader();
        }
        if (bankError) {
          return showError(bankError);
        }
        return bankAccounts && <BenefitBankAccountTab userBenefitBankAcc={bankAccounts} />;
      case 'benefit':
        if (benefitsLoading) {
          return showLoader();
        }
        if (benefitsError) {
          return showError(benefitsError);
        }
        return (
          benefits && (
            <BenefitsTab
              benefits={benefits}
              page={page}
              pageSize={pageSize}
              benefitsTotal={benefitsTotal}
              handlePageChange={handlePageChange}
              handlePageSizeChange={handlePageSizeChange}
            />
          )
        );
      case 'devices':
        if (devicesLoading) {
          return showLoader();
        }
        if (devicesError) {
          return showError(devicesError);
        }
        return devices && <DevicesTab devices={devices} />;

      case 'vouchers':
        if (vouchersLoading) {
          return showLoader();
        }
        if (vouchersError) {
          return showError(vouchersError);
        }
        return (
          vouchers && (
            <VouchersTab
              vouchers={vouchers}
              page={page}
              pageSize={pageSize}
              vouchersTotal={vouchersTotal}
              handlePageChange={handlePageChange}
              handlePageSizeChange={handlePageSizeChange}
            />
          )
        );

      case 'publicOfferAgreement':
        if (agreementLoading) {
          return showLoader();
        }
        if (agreementError) {
          return showError(agreementError);
        }
        return agreement && <PublicOfferAgreementsTab agreement={agreement} />;

      default:
        return null;
    }
  };

  return (
    <div className="z-[999] fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-md">
      <div
        ref={modalRef}
        className="rounded-xl relative bg-white w-[90%] h-[90%] shadow-xl overflow-y-auto"
      >
        <div className="p-4 flex justify-between items-center shadow-md">
          <div className="flex items-center gap-6 px-4">
            {userDetail && (
              <>
                <div className="relative">
                  <Image
                    src={userDetail.userPhoto?.photoUri || placeholderUserImage}
                    alt="User Avatar"
                    width={128}
                    height={128}
                    className="w-24 h-24 rounded-full shadow object-cover border-2 border-blue-100"
                  />
                  {userDetail?.studentOnboarding?.hasBeenEnrolledAsStudent && (
                    <span className="absolute bottom-0 right-0 bg-primary text-white px-2 py-1 rounded-full text-xs font-bold">
                      {t('Dev.student')}
                    </span>
                  )}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-primary">
                    {userDetail.firstName} {userDetail.lastName}
                  </h2>
                  <p className="text-gray-500">{userDetail?.email}</p>
                  {userDetail.pinfl && (
                    <p className="mt-1 text-sm text-gray-500 bg-gray-100 inline-block px-2 py-1 rounded">
                      {t('UserProfile.pinfl')}: {userDetail.pinfl}
                    </p>
                  )}
                </div>
              </>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="text-gray-500 hover:text-gray-700 absolute top-4 right-4"
          >
            <XIcon />
          </button>
        </div>

        {/* Tabs */}
        <div className="pt-4 px-4 pb-2 flex gap-4 ">
          {Tabs.map((tab) => (
            <button
              type="button"
              key={tab.id}
              className={`px-4 py-2 whitespace-nowrap overflow-hidden text-ellipsis ${activeTab === tab.id ? 'text-white rounded-full bg-primary' : 'rounded-full bg-primary/10'}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.title}
            </button>
          ))}
        </div>
        <div className="p-4">{renderTabContent()}</div>
      </div>
    </div>
  );
};

export default MultiTabUserDetailsModal;
