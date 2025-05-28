interface BasicProfileInfoProps {
  userProfile: {
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
    };
    createdAt: string;
    createdBy: any | null;
  };
}

export const BasicProfileInfo = ({ userProfile }: BasicProfileInfoProps) => {
  const personData = userProfile.identityProviderData.personDataLatin;
  
  return (
    <>
      <div className="bg-white rounded-lg">
        {/* <h3 className="text-lg font-semibold mb-4">Basic Information</h3> */}
        <div className="grid grid-cols-2 gap-4">
          {/* Column 1 */}
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">Username</p>
              <p className="font-medium">{userProfile.username || '-'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Social Number</p>
              <p className="font-medium">{personData.socialNumber || '-'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Nationality</p>
              <p className="font-medium">{personData.nationalityName || '-'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Created Date</p>
              <p className="font-medium">{userProfile.createdAt || '-'}</p>
            </div>
          </div>

          {/* Column 2 */}
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">Citizenship</p>
              <p className="font-medium">{personData.citizenshipName || '-'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Date of birth</p>
              <p className="font-medium">{personData.birthOn || '-'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Birth Country</p>
              <p className="font-medium">{personData.birthCountryName || '-'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Document Type</p>
              <p className="font-medium">{personData.documentType || '-'}</p>
            </div>
          </div>
        </div>
        {/* <div className="flex items-center mt-16">
          <button
            type="button"
            className="flex h-[40px] cursor-pointer px-4 justify-center items-center gap-2 rounded-[40px] bg-[#08678E]"
          >
            <span className="text-white text-center font-medium text-[14px] leading-none font-['Inter']">
              History Logbook <span>→</span>
            </span>
          </button>
        </div> */}
      </div>
    </>
  );
};
