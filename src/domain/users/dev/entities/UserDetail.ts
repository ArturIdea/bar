export class UserDetail {
  constructor(
    public userId: string,
    public keycloakUserId: string,
    public authApiUserId: string,
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
    public identityProviderData?: IdentityProviderData,
    public studentData?: StudentData,
    public agentData?: AgentData,
    public userPhoto?: UserPhoto,
    public userSignedData?: UserSignedData,
    public userCardFront?: UserCardFront
  ) {}
}

export class IdentityProviderData {
  constructor(
    public personDataLatin?: PersonDataLatin,
    public marriageData?: MarriageData,
    public disabilityData?: DisabilityData
  ) {}
}

export class PersonDataLatin {
  constructor(
    public socialNumber?: string,
    public genderName?: string,
    public nationalityName?: string,
    public citizenshipName?: string,
    public documentType?: string,
    public birthDateAsString?: string,
    public birthCountryId?: number,
    public birthPlace?: string,
    public birthCountryName?: string,
    public firstName?: string,
    public middleName?: string,
    public lastName?: string,
    public emailAddress?: string,
    public phoneNumber?: string,
    public nationalityId?: number,
    public citizenshipId?: number,
    public documentTypeId?: number,
    public pinfl?: string,
    public docSeria?: string,
    public docNumber?: string,
    public birthOn?: string,
    public docIssueOn?: string,
    public docExpireOn?: string,
    public docIssueOrganization?: string,
    public genderId?: number,
    public isDeath?: boolean,
    public deathOn?: string,
    public address?: Address
  ) {}
}

export class Address {
  constructor(
    public countryId: number,
    public country: string,
    public regionId: number,
    public region: string,
    public districtId: number,
    public district: string,
    public mfyId: number,
    public mfy: string,
    public address: string,
    public isTemporary: boolean,
    public temporaryResidenceTypeId: number,
    public temporaryResidenceType: string,
    public temporaryCountryId: number,
    public temporaryCountry: string,
    public temporaryRegionId: number,
    public temporaryRegion: string,
    public temporaryDistrictId: number,
    public temporaryDistrict: string,
    public temporaryMfyId: number,
    public temporaryMfy: string,
    public temporaryAddress: string,
    public temporaryCadastre: string,
    public temporaryDateFrom: string,
    public temporaryDateTill: string
  ) {}
}

export class MarriageData {
  constructor(
    public docNumber: string,
    public docOn: string,
    public branch: number,
    public certSeries: string,
    public certNumber: string,
    public certDate: string,
    public husbandFamily: string,
    public husbandFamilyAfter: string,
    public husbandFirstName: string,
    public husbandPatronym: string,
    public husbandBirthDay: string,
    public husbandAddress: string,
    public husbandCitizen: string,
    public husbandPinfl: string,
    public wifeFamily: string,
    public wifeFamilyAfter: string,
    public wifeFirstName: string,
    public wifePatronym: string,
    public wifeBirthDay: string,
    public wifeAddress: string,
    public wifeCitizen: string,
    public wifePinfl: string
  ) {}
}

export class DisabilityData {
  constructor(
    public pinfl: string,
    public surname: string,
    public name: string,
    public partonym: string,
    public passportNumber: string,
    public sex: number,
    public birthDate: string,
    public disabilityGroup: number,
    public nBlind: number,
    public disabilityReason: number,
    public disabilityPercentage: number,
    public disabilityDateStart: string,
    public disabilityDateEnd: string,
    public referenceNumber: string,
    public ekriteria1: number,
    public ekriteria2: number,
    public ekriteria3: number,
    public ekriteria4: number,
    public ekriteria5: number,
    public ekriteria6: number,
    public ekriteria7: number,
    public parasportRecom: string,
    public professionRecom: string,
    public icd10: string,
    public epdate: string
  ) {}
}

export class StudentData {
  constructor(
    public isStudent: boolean,
    public fullName: string,
    public universityName: string
  ) {}
}

export class AgentData {
  constructor(
    public firstName: string,
    public middleName: string,
    public lastName: string,
    public jobTitle: string,
    public dateOfBirth: string,
    public pinfl: AgentPinfl,
    public insonCenterDistrict: string,
    public insonCenterBranchCode: string,
    public personalPhone: PhoneNumber,
    public personalEmailAddress: string,
    public agreementEmailAddress: string,
    public address: string,
    public location: string,
    public responsiblePerson: string,
    public bankingSystemLogin: string,
    public branch: string,
    public mobilePhoneNumbers?: PhoneNumber[]
  ) {}
}

export class AgentPinfl {
  constructor(public id: string) {}
}

export class PhoneNumber {
  constructor(
    public phoneCode: string,
    public phoneNumber: string
  ) {}
}

export class UserPhoto {
  constructor(
    public id: string,
    public socialNumber: string,
    public photoUri: string,
    public createdAt: string,
    public updatedAt: string,
    public s3Photo?: S3Photo
  ) {}
}

export class S3Photo {
  constructor(
    public key: PhotoKey,
    public etag: Etag
  ) {}
}

export class PhotoKey {
  constructor(
    public key: string,
    public keyAsStr: string
  ) {}
}

export class Etag {
  constructor(public value: string) {}
}

export class UserSignedData {
  constructor(
    public id: string,
    public userId: string,
    public socialNumber: string,
    public version: string,
    public scheme: string
  ) {}
}

export class UserCardFront {
  constructor(
    public id: string,
    public s3Ref: S3Photo,
    public imageUri: string,
    public createdAt: string
  ) {}
}
