import React, { useMemo, useState } from 'react';
import Image from 'next/image';
import { ArrowRight, Loader2, XIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Cookies from 'universal-cookie';
import placeholderUserImage from '@/../public/images/icons/dashboard/placeholderUserImage.jpg';
import { assignDotColors } from '@/core/utils/dotColors';
import { truncate } from '@/core/utils/truncate';
import { useRouter } from '@/i18n/routing';
import { useClickOutside } from '@/ui/hooks/ui/useClickOutside';
import { useUserDetail } from '@/ui/hooks/ui/useUserDetail';

interface MultiTabUserDetailsModalProps {
  userId?: string;
  pinfl?: string;
  onClose: () => void;
  onOpenSignupRequest: (signupRequestId: string) => void;
}

const UserDetailsModal: React.FC<MultiTabUserDetailsModalProps> = ({
  userId,
  pinfl,
  onClose,
  onOpenSignupRequest,
}) => {
  const { user, loading, error } = useUserDetail(userId, pinfl);
  const t = useTranslations();
  const modalRef = useClickOutside<HTMLDivElement>(onClose);
  const cookies = new Cookies();
  const locale = cookies.get('NEXT_LOCALE') || 'en';
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<string>('details');

  const handleHistoryClick = () => {
    if (user?.createdBy?.userId) {
      router.push(`/dashboard/history?userId=${user.createdBy.userId}`);
    }
  };

  const getBenefitName = (benefitType: any) => {
    const names = benefitType?.name || {};
    return names[locale] || names.uzLatn || 'N/A';
  };

  const UserInfoSection = ({ user, t }: { user: any; t: any }) => {
    const fields = [
      { label: 'email', value: user.email },
      { label: 'phone', value: user.phoneNumber },
      { label: 'nationality', value: user.nationalityName },
      { label: 'citizenship', value: user.citizenshipName },
      { label: 'birthCountry', value: user.birthCountryName },
      { label: 'dob', value: user.dateOfBirth },
      { label: 'socialNumber', value: user.socialNumber },
      { label: 'pinfl', value: user.pinfl },
      { label: 'address', value: user.address },
      {
        label: 'createdAt',
        value: user.createdAt ? new Date(user.createdAt).toLocaleString() : 'N/A',
      },
    ];
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {fields.map(({ label, value }) => (
          <div key={label}>
            <p className="text-gray-400 font-light">{t(`UserManagement.${label}`)}</p>
            {value ?? 'N/A'}
          </div>
        ))}
      </div>
    );
  };

  const AgentDataSection = ({ agentData, t }: { agentData: any; t: any }) => {
    const fields = [
      { label: 'firstName', value: agentData.firstName },
      { label: 'lastName', value: agentData.lastName },
      { label: 'jobTitle', value: agentData.jobTitle },
      { label: 'dob', value: agentData.dateOfBirth },
      { label: 'pinfl', value: agentData.pinfl?.id },
      { label: 'address', value: agentData.address },
      { label: 'responsiblePerson', value: agentData.responsiblePerson },
      { label: 'insonCenterDistrict', value: agentData.insonCenterDistrict },
      { label: 'insonCenterBranchCode', value: agentData.insonCenterBranchCode },
      {
        label: 'personalPhone',
        value:
          agentData.personalPhone &&
          `${agentData.personalPhone.phoneCode}-${agentData.personalPhone.phoneNumber}`,
      },
      { label: 'personalEmail', value: agentData.personalEmailAddress },
      { label: 'agreementEmail', value: agentData.agreementEmailAddress },
      { label: 'location', value: agentData.location },
    ];
    return (
      <div className="mt-6">
        <h3 className="pb-2 text-lg font-semibold text-gray-400">
          {t('UserManagement.agentData.title')}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          {fields.map(({ label, value }) => (
            <div key={label}>
              <p className="text-gray-400 font-normal">{t(`UserManagement.agentData.${label}`)}</p>
              {value ?? 'N/A'}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const BenefitsSection = ({ benefits, getBenefitName, t }: any) => {
    const [filter, setFilter] = useState<'ACTIVE' | 'EXPIRED'>('ACTIVE');
    const filtered = benefits.filter((b: any) => b.status === filter);
    const STATUS = [t('UserManagement.details.active'), t('UserManagement.details.expired')];
    const colors = useMemo(() => assignDotColors(benefits), [benefits]);

    return (
      <div className="flex flex-col gap-6 h-[60vh]">
        <div className="flex bg-gray-100 rounded-full justify-evenly p-2 mb-4">
          {STATUS.map((status) => (
            <button
              type="button"
              key={status}
              onClick={() => setFilter(status as any)}
              className={`px-9 py-2 rounded-full whitespace-nowrap w-full ${
                filter === status ? 'bg-primary text-white' : 'text-primary'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
        <div className="flex flex-col gap-4 overflow-y-auto h-full">
          {filtered.map((benefit: any, index: number) => {
            const fullTitle = getBenefitName(benefit.benefitType, locale);
            const shortTitle = truncate(fullTitle, 90);
            return (
              <div
                key={index}
                className="border rounded-xl p-4 flex justify-between items-center bg-white"
              >
                <div className="flex items-start gap-4">
                  <span className={`p-1 rounded-full ${colors[index]} mt-[6px]`} />
                  <div>
                    <h3
                      className="font-semibold text-base leading-snug max-h-[3rem] overflow-hidden line-clamp-2"
                      title={fullTitle}
                    >
                      {shortTitle}
                    </h3>
                    <div className="flex items-center gap-2">
                      <p className="font-bold">лв</p>
                      <div className="border-r-2 h-3" />
                      <span
                        className={`font-medium ${benefit.status === 'EXPIRED' ? 'text-red-500' : 'text-green-500'}`}
                      >
                        {benefit.amount}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          {filtered.length === 0 && <p className="text-center text-gray-500 mt-10">Empty</p>}
        </div>
      </div>
    );
  };

  const CreatedBySection = ({ createdBy, handleHistoryClick, t }: any) => (
    <div className="flex justify-between items-center gap-6">
      <div className="flex items-center gap-4">
        <Image
          src={createdBy.photoUrl || placeholderUserImage}
          width={80}
          height={80}
          alt="Agent Image"
          className="w-20 h-20 rounded-full shadow-md object-cover"
        />
        <h3 className="text-xl font-semibold">
          {createdBy.firstName} {createdBy.lastName}
        </h3>
      </div>
      <button
        type="button"
        className="cursor-pointer bg-primary text-white px-4 py-2 rounded-full flex items-center gap-1"
        onClick={handleHistoryClick}
      >
        {t('Buttons.history')} <ArrowRight className="w-5 h-5" />
      </button>
    </div>
  );

  const renderTabContent = () => {
    if (loading) {
      return (
        <div className="flex flex-col items-center justify-center py-10">
          <Loader2 className="animate-spin h-8 w-8 text-gray-600" />
        </div>
      );
    }
    if (error) {
      return (
        <div className="text-center py-10">
          <h2 className="text-xl font-bold text-red-600">Error</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      );
    }
    if (!user) {
      return null;
    }

    switch (activeTab) {
      case 'details':
        return (
          <>
            <div className="flex flex-col">
              <UserInfoSection user={user} t={t} />
              {user.agentData && <AgentDataSection agentData={user.agentData} t={t} />}
            </div>
          </>
        );

      case 'benefits':
        if (!user.benefits) {
          return <p className="text-center text-gray-500">Empty</p>;
        }
        return <BenefitsSection benefits={user.benefits} getBenefitName={getBenefitName} t={t} />;

      case 'createdBy':
        if (!user.createdBy) {
          return <p className="text-center text-gray-500">Empty</p>;
        }
        return (
          <CreatedBySection
            createdBy={user.createdBy}
            handleHistoryClick={handleHistoryClick}
            t={t}
          />
        );

      case 'signup':
        if (!user.signupRequestId) {
          return <p className="text-center text-gray-500">Empty</p>;
        }
        return (
          <div className="text-center">
            <button
              type="button"
              className="bg-primary text-white px-4 py-2 rounded-full transition"
              onClick={() => onOpenSignupRequest(user.signupRequestId!)}
            >
              {t('Buttons.viewSignupDetails')}
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="z-[999] fixed inset-0 flex items-center justify-end bg-primary/5 backdrop-blur-md transition-opacity">
      <div
        ref={modalRef}
        className="relative bg-white w-full max-w-lg md:max-w-2xl lg:max-w-4xl shadow-xl overflow-y-auto h-full"
      >
        <div className="p-12 flex justify-between items-center">
          <h1 className="text-xl">{t('UserManagement.modalTitle')}</h1>
          <button
            type="button"
            className="cursor-pointer text-neutral-900"
            onClick={onClose}
            aria-label="Close modal"
          >
            <XIcon className="w-6 h-6" />
          </button>
        </div>
        <div className="px-12 py-6 flex items-center gap-4">
          {user?.photoUrl && (
            <Image
              src={user.photoUrl || placeholderUserImage}
              width={72}
              height={72}
              alt="User Avatar"
              className="w-18 h-18 rounded-full shadow-md object-cover"
            />
          )}
          <div>
            <h2 className="text-2xl font-semibold">
              {user?.firstName} {user?.lastName}
            </h2>
          </div>
        </div>

        <div className="flex gap-6 px-12 overflow-x-auto">
          {[
            { id: 'details', title: t('UserManagement.modalTitle') },
            { id: 'benefits', title: t('UserManagement.benefits.title') },
            { id: 'createdBy', title: t('UserManagement.details.createdBy') },
          ].map((tab) => (
            <button
              type="button"
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`cursor-pointer whitespace-nowrap ${
                activeTab === tab.id
                  ? 'text-primary border-b-2 border-primary'
                  : ' text-neutral-900'
              }`}
            >
              {tab.title}
            </button>
          ))}
        </div>

        <div className="px-12 py-6 flex-1 overflow-y-auto">{renderTabContent()}</div>
      </div>
    </div>
  );
};

export default UserDetailsModal;
