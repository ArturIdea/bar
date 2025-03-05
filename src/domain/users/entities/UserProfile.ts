export class UserProfile {
  constructor(
    public username: string,
    public firstName: string,
    public lastName: string,
    public phoneNumber: string,
    public pinfl: string,
    public email: string,
    public documentTypeId: string,
    public documentNumber: string,
    public dateOfBirth: string,
    public socialNumber: string,
    public createdAt: string,
    public authorities: string[] = [],
    public nationalityName?: string,
    public citizenshipName?: string,
    public birthCountryName?: string,
    public country?: string,
    public region?: string,
    public district?: string,
    public address?: string,
    public photoUrl?: string,
    public signupRequestId?: string,
    public identityProviderData?: {
      personDataLatin?: {
        socialNumber?: string;
        genderName?: string;
        nationalityName?: string;
        citizenshipName?: string;
        birthCountryName?: string;
        middleName?: string;
        address?: {
          country?: string;
          region?: string;
          district?: string;
          address?: string;
        };
      };
    },
    public agentData?: {
      firstName?: string;
      lastName?: string;
      jobTitle?: string;
      dateOfBirth?: string;
      pinfl?: {
        id?: string;
      };
      insonCenterDistrict?: string;
      insonCenterBranchCode?: string;
      personalPhone?: {
        phoneCode?: string;
        phoneNumber?: string;
      };
      personalEmailAddress?: string;
      agreementEmailAddress?: string;
      address?: string;
      location?: string;
      responsiblePerson?: string;
      mobilePhoneNumbers?: {
        phoneCode?: string;
        phoneNumber?: string;
      }[];
    }
  ) {}
}
