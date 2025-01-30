export class UserDetail {
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
    public nationalityName?: string,
    public citizenshipName?: string,
    public birthCountryName?: string,
    public country?: string,
    public region?: string,
    public district?: string,
    public address?: string,
    public authorities: string[] = [],
    public createdAt: string,
    public agentData?: {
      firstName?: string;
      lastName?: string;
      jobTitle?: string;
      dateOfBirth?: string;
      pinfl?: string;
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
    },
    public photoUrl?: string
  ) {}
}
