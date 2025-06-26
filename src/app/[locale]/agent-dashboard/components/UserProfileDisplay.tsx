import { useState } from 'react';
import { BasicProfileInfo } from './profile/BasicProfileInfo';
import { BenefitsInfo } from './profile/BenefitsInfo';
import { CreatedByInfo } from './profile/CreatedByInfo';

const placeholderUserImage = '/images/placeholder-user.png';

interface UserProfile {
  userId: string;
  keycloakUserId: string;
  sdkUserId: string;
  username: string;
  firstName: string;
  lastName: string;
  pinfl: string;
  documentTypeId: string;
  documentNumber: string;
  dateOfBirth: string;
  socialNumber: string;
  identityProviderData: {
    personDataLatin: {
      socialNumber: string;
      genderName: string;
      nationalityName: string;
      citizenshipName: string;
      documentType: string;
      birthDateAsString: string | null;
      birthCountryId: number;
      birthPlace: string;
      birthCountryName: string;
      firstName: string;
      middleName: string;
      lastName: string;
      nationalityId: number;
      citizenshipId: number;
      documentTypeId: number;
      pinfl: string;
      docSeria: string;
      docNumber: string;
      birthOn: string;
      docIssueOn: string;
      docExpireOn: string;
      docIssueOrganization: string;
      genderId: number;
      isDeath: boolean;
      deathOn: string | null;
    };
    marriageData: {
      docNumber: string;
      docOn: string;
      branch: number;
      certSeries: string;
      certNumber: string;
      certDate: string;
      husbandFamily: string;
      husbandFamilyAfter: string;
      husbandFirstName: string;
      husbandPatronym: string;
      husbandBirthDay: string;
      husbandAddress: string | null;
      husbandCitizen: string;
      husbandPinfl: string;
      wifeFamily: string;
      wifeFamilyAfter: string;
      wifeFirstName: string;
      wifePatronym: string;
      wifeBirthDay: string;
      wifeAddress: string | null;
      wifeCitizen: string;
      wifePinfl: string;
    } | null;
    disabilityData: any | null;
  };
  benefits: Array<{
    id: number;
    externalId: string;
    pinfl: string;
    appointedPinfl: string;
    status: string;
    benefitType: {
      id: number;
      name: {
        qr: string;
        ru: string;
        'uz-cyrl': string;
        'uz-latn': string;
      };
      amount: {
        priceValue: number;
      };
      docOn: string;
    };
    amount: {
      priceValue: number;
    };
    deductionName: string | null;
    deductionAmount: {
      priceValue: number;
    };
    deductionPercentage: {
      priceValue: number;
    };
    deductionStart: string | null;
    deductionEnd: string | null;
    startedOn: string;
    endedOn: string;
    cancelledOn: string | null;
    monthOn: string | null;
  }>;
  createdAt: string;
  updatedAt: string;
  tosAgreementEmail: string | null;
  signupRequestId: string;
  createdBy: any | null;
  agentData: any | null;
  photoUrl: string;
}

interface UserProfileDisplayProps {
  userProfile: UserProfile;
}

export const UserProfileDisplay = ({ userProfile }: UserProfileDisplayProps) => {
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    { id: 'profile', label: 'Profile' },
    { id: 'benefits', label: 'Benefits' },
    { id: 'created', label: 'Created By' },
    // { id: 'transactions', label: 'Transactions' }, // Transactions tab hidden
  ];

  const fullName = `${userProfile.firstName} ${userProfile.lastName}`;

  return (
    <div className="border-2 mb-5 w-2/3 justify-center flex flex-col p-[40px] border-gray-200 rounded-lg space-y-6">
      {/* <div className="">
        <span className="text-[#0B0B22] font-medium mb-[50px] text-[24px] leading-none">
          Profile
        </span>
      </div> */}
      <div className="flex w-full items-center justify-between gap-6 border-b border-gray-200 p-6">
        <div>
          <h1 className="text-2xl font-semibold">
            {fullName}
          </h1>
        </div>
        <img
          src={userProfile.photoUrl || placeholderUserImage}
          alt={`${fullName}'s profile`}
          className="w-32 h-32 rounded-full border border-gray-300 object-cover"
          crossOrigin="anonymous"
        />
      </div>
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-6">
          {tabs?.map((tab) => (
            <button
              type="button"
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`whitespace-nowrap py-4 px-1 border-b-4 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-[#add9f4] text-[#add9f4]'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab?.label}
            </button>
          ))}
        </nav>
      </div>

      <div className='min-h-[430px]'>
        {activeTab === 'profile' && <BasicProfileInfo userProfile={userProfile} />}
        {activeTab === 'benefits' && <BenefitsInfo benefits={userProfile.benefits} />}
        {activeTab === 'created' && <CreatedByInfo createdBy={userProfile.createdBy} />}
        {/* {activeTab === 'transactions' && (
          <TransactionsInfo pinfl={userProfile.pinfl} />
        )} */}
      </div>
    </div>
  );
};
