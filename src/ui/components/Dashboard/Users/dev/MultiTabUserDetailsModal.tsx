import React, { useState } from 'react';
import { Loader2, XIcon } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { UserBenefitBankAccount } from '@/domain/users/dev/entities/UserBenefitBankAccount';
import { UserDetail } from '@/domain/users/dev/entities/UserDetail';
import { UserDevice } from '@/domain/users/dev/entities/UserDevice';
import { UserDocument } from '@/domain/users/dev/entities/UserDocument';
import { UserImpersonationOtp } from '@/domain/users/dev/entities/UserImpersonationOtp';
import { UserPublicOfferAgreement } from '@/domain/users/dev/entities/UserPublicOfferAgreement';
import { UserVoucher } from '@/domain/users/dev/entities/UserVoucher';
import { useUserBenefitBankAccount } from '@/ui/hooks/ui/dev/useUserBenefitBankAccount';
import { useUserDetail } from '@/ui/hooks/ui/dev/useUserDetails';
import { useUserDevices } from '@/ui/hooks/ui/dev/useUserDevices';
import { useUserDocuments } from '@/ui/hooks/ui/dev/useUserDocuments';
import { useUserImpersonationsOtps } from '@/ui/hooks/ui/dev/useUserImpersonationsOtps';
import { useUserPublicOfferAgreement } from '@/ui/hooks/ui/dev/useUserPublicOfferAgreement';
import { useUserVouchers } from '@/ui/hooks/ui/dev/useUserVouchers';
import { useClickOutside } from '@/ui/hooks/ui/useClickOutside';
import { Pagination } from '../../Pagination';

interface MultiTabUserDetailsModalProps {
  userId: string;
  onClose: () => void;
}

const MultiTabUserDetailsModal: React.FC<MultiTabUserDetailsModalProps> = ({ userId, onClose }) => {
  const modalRef = useClickOutside<HTMLDivElement>(onClose);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [activeTab, setActiveTab] = useState<string>('details');
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

  const t = useTranslations();

  const Tabs = [
    { id: 'details', title: t('Dev.userDetails') },
    { id: 'impersonations', title: t('Dev.impersonations') },
    { id: 'documents', title: t('Dev.documents') },
    { id: 'devices', title: t('Dev.devices') },
    { id: 'benefit', title: t('Dev.benefitBankAcc') },
    { id: 'vouchers', title: t('Dev.vouchers') },
    { id: 'publicOfferAgreement', title: t('Dev.publicOfferAgreement') },
  ];

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handlePageSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPageSize(Number(event.target.value));
    setPage(0);
  };

  const localeMap: Record<string, string> = {
    'uz-latn': 'uzltn',
    'uz-cyrl': 'uz',
  };

  const getLocalizedValue = (
    obj: Record<string, string> = {},
    locale: string,
    fallbackOrder: string[] = ['uz-latn', 'en', 'ru', 'kaa', 'uz-cyrl']
  ): string => {
    const apiLocale = localeMap[locale] || locale;

    return (
      obj[apiLocale] ||
      fallbackOrder.map((loc) => obj[localeMap[loc] || loc]).find(Boolean) ||
      'N/A'
    );
  };

  const getAgreementDataByLocale = (agreement: UserPublicOfferAgreement, locale: string) => {
    return {
      htmlContent: getLocalizedValue(agreement.htmlContent, locale),
      s3Ref: getLocalizedValue(agreement?.s3Refs, locale),
    };
  };

  const UserDetailsTab = ({ user }: { user: UserDetail }) => {
    return (
      <div>
        <h2>
          {user.firstName} {user.lastName}
        </h2>
        <p>{user.email}</p>
      </div>
    );
  };

  const DocumentsTab = ({ documents }: { documents: UserDocument[] }) => {
    return (
      <div>
        {documents.map((doc, index) => (
          <div key={index}>
            <p>Document Name: {doc.name}</p>
            <p>Uploaded: {new Date(doc.createdAt).toLocaleString()}</p>
          </div>
        ))}
      </div>
    );
  };

  const DevicesTab = ({ devices }: { devices: UserDevice[] }) => {
    return (
      <div className="space-y-4">
        {devices.map((device) => (
          <div key={device.id} className="p-4 border rounded-lg shadow-sm">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-medium">
                {device.platform} – {device.osVersion}
              </h2>
              <span
                className={`text-sm font-semibold ${
                  device.active ? 'text-green-600' : 'text-red-500'
                }`}
              >
                {device.active ? 'Active' : 'Inactive'}
              </span>
            </div>

            <div className="text-sm text-gray-600 mt-2">
              <p>
                <strong>Device ID:</strong> {device.deviceId}
              </p>
              <p>
                <strong>Manufacturer:</strong> {device.manufacturer}
              </p>
              <p>
                <strong>Model:</strong> {device.model}
              </p>
              <p>
                <strong>Created At:</strong> {new Date(device.createdAt).toLocaleString()}
              </p>
              <p>
                <strong>Last Activity:</strong> {new Date(device.lastActivity).toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const ImpersonationsTab = ({
    userImpersonationOtp,
  }: {
    userImpersonationOtp: UserImpersonationOtp[];
  }) => {
    return (
      <div>
        {userImpersonationOtp.map((imp, index) => (
          <div key={index}>
            <p>OTP: {imp.otp}</p>
            <p>Expiration: {imp.expiresAt}</p>
          </div>
        ))}

        <Pagination
          page={page}
          pageSize={pageSize}
          total={impersonationsTotal}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
        />
      </div>
    );
  };

  const BenefitBankAccountTab = ({
    userBenefitBankAcc,
  }: {
    userBenefitBankAcc: UserBenefitBankAccount[];
  }) => {
    return (
      <div className="space-y-4">
        {userBenefitBankAcc.map((account, index) => (
          <div key={index} className="p-4 border rounded-lg shadow-sm">
            <p>Benefit Type ID: {account.benefitTypeId}</p>
            <p>Bank Code: {account.bankCode}</p>
            <p>Master Bank Account Number: {account.masterBankAccountNumber}</p>
            <p>Sub Bank Account Number: {account.subBankAccountNumber}</p>
            <p>Branch Code: {account.branchCode.value}</p>
            <p>Created At: {new Date(account.createdAt).toLocaleString()}</p>
          </div>
        ))}
        {userBenefitBankAcc.length === 0 && <p>No benefit bank accounts found</p>}
      </div>
    );
  };

  const VouchersTab = ({ vouchers }: { vouchers: UserVoucher[] }) => {
    return (
      <div>
        {vouchers.map((voucher, index) => (
          <div key={index}>
            <p>Voucher ID: {voucher.id}</p>
            <p>Voucher Amount: {voucher.amount}</p>
          </div>
        ))}

        <Pagination
          page={page}
          pageSize={pageSize}
          total={vouchersTotal}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
        />
      </div>
    );
  };

  const PublicOfferAgreementsTab = ({ agreement }: { agreement: UserPublicOfferAgreement }) => {
    const locale = useLocale();
    const { htmlContent, s3Ref } = getAgreementDataByLocale(agreement, locale);

    // todo:fix s3 ref <link>
    return (
      <div>
        <p>S3 Ref: {s3Ref}</p>
        <p>Status: {agreement.active ? 'Active' : 'Inactive'}</p>
        <p>Created At: {new Date(agreement.createdAt).toLocaleString()}</p>
        <p>Updated At: {new Date(agreement.updatedAt).toLocaleString()}</p>
        <p>Version: {agreement.version}</p>

        <div className="border-b border-t border-gray-200 text-center py-2">
          {t('Dev.publicOfferAgreement')}
        </div>

        <div className="py-2" dangerouslySetInnerHTML={{ __html: htmlContent }} />
      </div>
    );
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'details':
        if (userLoading) {
          return <Loader2 className="animate-spin" />;
        }
        if (userError) {
          return <div>Error: {userError}</div>;
        }
        return userDetail ? <UserDetailsTab user={userDetail} /> : null;
      case 'impersonations':
        if (impersonationsLoading) {
          return <Loader2 className="animate-spin" />;
        }
        if (impersonationsError) {
          return <div>Error: {impersonationsError}</div>;
        }
        return impersonations ? <ImpersonationsTab userImpersonationOtp={impersonations} /> : null;
      case 'documents':
        if (documentsLoading) {
          return <Loader2 className="animate-spin" />;
        }
        if (documentsError) {
          return <div>Error: {documentsError}</div>;
        }
        return documents ? <DocumentsTab documents={documents} /> : null;
      case 'benefit':
        if (bankLoading) {
          return <Loader2 className="animate-spin" />;
        }
        if (bankError) {
          return <div>Error: {bankError}</div>;
        }
        return bankAccounts ? <BenefitBankAccountTab userBenefitBankAcc={bankAccounts} /> : null;
      case 'devices':
        if (devicesLoading) {
          return <Loader2 className="animate-spin" />;
        }
        if (devicesError) {
          return <div>Error: {devicesError}</div>;
        }
        return devices ? <DevicesTab devices={devices} /> : null;
      case 'vouchers':
        if (vouchersLoading) {
          return <Loader2 className="animate-spin" />;
        }
        if (vouchersError) {
          return <div>Error: {vouchersError}</div>;
        }
        return vouchers ? <VouchersTab vouchers={vouchers} /> : null;
      case 'publicOfferAgreement':
        if (agreementLoading) {
          return <Loader2 className="animate-spin" />;
        }
        if (agreementError) {
          return <div>Error: {agreementError}</div>;
        }
        return agreement ? <PublicOfferAgreementsTab agreement={agreement} /> : null;
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
        <div className="p-4 flex justify-between items-center border-b">
          <h1>User Details</h1>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="text-gray-500 hover:text-gray-700"
          >
            <XIcon />
          </button>
        </div>
        <div className="border-b flex">
          {Tabs.map((tab) => (
            <button
              type="button"
              key={tab.id}
              className={`px-4 py-2 ${activeTab === tab.id ? 'border-b-2 border-blue-500' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.title}
            </button>
          ))}
        </div>
        <div className="p-4 ">{renderContent()}</div>
      </div>
    </div>
  );
};

export default MultiTabUserDetailsModal;
