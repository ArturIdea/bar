import React from 'react';
import Image from 'next/image';
import { ArrowRight, Loader2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Cookies from 'universal-cookie';
import placeholderUserImage from '@/../public/images/icons/dashboard/placeholderUserImage.jpg';
import { useRouter } from '@/i18n/routing';
import { useClickOutside } from '@/ui/hooks/ui/useClickOutside';
import { useUserDetail } from '@/ui/hooks/ui/useUserDetail';

interface UserDetailsModalProps {
  userId?: string;
  pinfl?: string;
  onClose: () => void;
}

const UserDetailsModal: React.FC<UserDetailsModalProps> = ({ userId, onClose }) => {
  const { user, loading, error } = useUserDetail(userId);
  const t = useTranslations();
  const modalRef = useClickOutside<HTMLDivElement>(onClose);
  const cookies = new Cookies();
  const locale = cookies.get('NEXT_LOCALE') || 'en';
  const router = useRouter();

  const handleHistoryClick = () => {
    if (user?.createdBy?.userId) {
      router.push(`/dashboard/history?userId=${user.createdBy.userId}`);
    }
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
        {fields.map(({ label, value }) => (
          <div key={label}>
            <p className="text-gray-400 font-normal">{t(`UserManagement.${label}`)}</p>
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
      <div className="py-8">
        <h3 className="pb-2 text-lg text-gray-400 font-semibold">
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

  const getBenefitName = (benefitType: any) => {
    const names = benefitType?.name || {};
    return names[locale] || names.uzLatn || 'N/A';
  };

  const BenefitsSection = ({
    benefits,
    getBenefitName,
    t,
  }: {
    benefits: any;
    getBenefitName: any;
    t: any;
  }) => (
    <div className="py-8 h-[28vh] overflow-y-auto">
      <h1 className="text-lg font-normal text-gray-500 pb-2">
        {t('UserManagement.benefits.title')}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
        {benefits.map((benefit: any, index: number) => (
          <div key={index} className="flex flex-col gap-6">
            {['benefitType', 'benefitStatus', 'benefitAmount', 'deductionAmount'].map((field) => (
              <div key={field}>
                <p className="text-gray-400 font-normal">{t(`UserManagement.benefits.${field}`)}</p>
                <p className="text-gray-700 font-medium">
                  {field === 'benefitType'
                    ? getBenefitName(benefit.benefitType)
                    : (benefit[field] ?? 'N/A')}
                </p>
              </div>
            ))}
            <div className="border-b w-32" />
          </div>
        ))}
      </div>
    </div>
  );

  const CreatedBySection = ({
    createdBy,
    handleHistoryClick,
    t,
  }: {
    createdBy: any;
    handleHistoryClick: () => void;
    t: any;
  }) => (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-4">
        <Image
          src={createdBy.photoUrl || placeholderUserImage}
          width={80}
          height={80}
          alt="Agent Image"
          className="w-20 h-20 rounded-full shadow-md object-cover"
        />
        <div>
          <h1 className="text-xl font-semibold">
            {createdBy.firstName} {createdBy.lastName}
          </h1>
          <p className="text-gray-400">{t('UserManagement.agentData.title')}</p>
        </div>
      </div>
      <button
        type="button"
        className="bg-[#08678e] text-white px-4 py-2 rounded-full flex items-center gap-1 cursor-pointer"
        onClick={handleHistoryClick}
      >
        {t('Buttons.history')} <ArrowRight className="w-5 h-5" />
      </button>
    </div>
  );

  return (
    <div className="z-[999] fixed inset-0 flex items-center justify-end bg-black/30 backdrop-blur-md transition-opacity">
      <div
        ref={modalRef}
        className="relative bg-white w-full max-w-lg md:max-w-2xl lg:max-w-3xl  shadow-xl overflow-y-auto h-full"
      >
        {loading && (
          <div className="flex flex-col items-center justify-center py-10">
            <Loader2 className="animate-spin h-8 w-8 text-gray-600" />
          </div>
        )}

        {error && (
          <div className="text-center py-10">
            <h2 className="text-xl font-bold text-red-600">Error</h2>
            <p className="text-gray-600">{error}</p>
          </div>
        )}

        {!loading && !error && user && (
          <div className="flex flex-col justify-between h-full p-10">
            <div>
              <div>
                <h1 className="text-xl">{t('UserManagement.modalTitle')}</h1>
                <button
                  type="button"
                  className="cursor-pointer absolute top-10 right-10 text-gray-500 hover:text-gray-700 transition"
                  onClick={onClose}
                  aria-label="Close modal"
                >
                  ✕
                </button>
              </div>
              <div className="flex items-center gap-8 pt-10">
                {user.photoUrl && (
                  <div className="flex justify-center">
                    <Image
                      src={user.photoUrl || placeholderUserImage}
                      width={128}
                      height={128}
                      alt="User Avatar"
                      className="w-28 h-28 rounded-full shadow-md object-cover"
                    />
                  </div>
                )}

                <h2 className="text-2xl font-semibold text-center">
                  {user.firstName} {user.lastName}
                </h2>
              </div>
              <div className="py-10">
                <div className="border-b border-gray-100" />
              </div>

              {/* user */}
              <div className="h-[28vh] overflow-y-auto">
                <UserInfoSection user={user} t={t} />

                {user.agentData && <AgentDataSection agentData={user.agentData} t={t} />}
              </div>

              {/* benefits */}
              {user.benefits && user.benefits.length > 0 && (
                <BenefitsSection benefits={user.benefits} getBenefitName={getBenefitName} t={t} />
              )}
            </div>
            <div className="flex flex-col gap-12 ">
              <div>
                {user.createdBy && (
                  <CreatedBySection
                    createdBy={user.createdBy}
                    handleHistoryClick={handleHistoryClick}
                    t={t}
                  />
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDetailsModal;
