import Image from 'next/image';
import { useTranslations } from 'next-intl';
import placeholderUserImage from '@/../public/images/icons/dashboard/placeholderUserImage.jpg';
import { useUserProfile } from '@/ui/hooks/ui/useUserProfile';
import ProfilePageSkeleton from './ProfilePageSkeleton';

export default function ProfilePage() {
  const { userProfile, loading } = useUserProfile();
  const t = useTranslations();

  if (loading) {
    return <ProfilePageSkeleton />;
  }

  if (!userProfile) {
    return <div className="text-center py-10 text-lg text-red-400">User data not available.</div>;
  }

  const personalInfo = [
    { label: t('UserProfile.firstName'), value: userProfile.firstName },
    { label: t('UserProfile.lastName'), value: userProfile.lastName },
    {
      label: t('UserProfile.patronym'),
      value: userProfile.identityProviderData?.personDataLatin?.middleName,
    },
    { label: t('UserProfile.birthDate'), value: userProfile.dateOfBirth },
    { label: t('UserProfile.jobTitle'), value: userProfile.agentData?.jobTitle },
    { label: t('UserProfile.pinfl'), value: userProfile.pinfl },
    {
      label: t('UserProfile.districtInsonCenter'),
      value: userProfile.agentData?.insonCenterDistrict,
    },
    {
      label: t('UserProfile.branchCodeInsonCenter'),
      value: userProfile.agentData?.insonCenterBranchCode,
    },
    { label: t('UserProfile.phoneNumber'), value: userProfile.phoneNumber },
    { label: t('UserProfile.personalEmail'), value: userProfile.agentData?.personalEmailAddress },
    { label: t('UserProfile.username'), value: userProfile.username },
    { label: t('UserProfile.printEmail'), value: userProfile.agentData?.agreementEmailAddress },
    { label: t('UserProfile.address'), value: userProfile.agentData?.address },
    { label: t('UserProfile.password'), value: '******' },
  ];

  return (
    <div>
      {/* Profile Header */}
      <div className="flex items-center gap-6 border-b border-gray-200 p-6">
        <Image
          // src={userProfile.photoUrl || placeholderUserImage}
          src={placeholderUserImage}
          width={120}
          height={120}
          alt="Profile Picture"
          className="w-32 h-32 rounded-full border border-gray-300"
        />
        <div>
          <h1 className="text-2xl font-semibold">
            {userProfile.firstName} {userProfile.lastName}
          </h1>
        </div>
      </div>

      {/* Personal Information Section */}
      <div className="p-6">
        <h2 className="text-xl font-normal">{t('UserProfile.personalInfo')}</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-12 mt-6">
          {personalInfo.map((item, index) => (
            <div key={index}>
              <p className="text-sm text-gray-400">{item.label}</p>
              <p className="text-lg font-normal">{item.value || '-'}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
