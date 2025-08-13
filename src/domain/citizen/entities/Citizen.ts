export class Citizen {
  constructor(
    public id: string,
    public socialNumber: string,
    public pinfl: string,
    public firstName: string,
    public lastName: string,
    public gender: string,
    public nationality: string,
    public dateOfIssue: string,
    public placeOfBirth: string,
    public enrolledAsStudent: boolean,
    public universityName: string | null,
    public hasDisabilities: boolean,
    public disabilityGroup: string | null,
    public disabilityReason: string | null,
    public version: string,
    public fingerprint: string | null,
    public image: string | null
  ) {}

  toJson() {
    return {
      id: this.id,
      socialNumber: this.socialNumber,
      pinfl: this.pinfl,
      firstName: this.firstName,
      lastName: this.lastName,
      gender: this.gender,
      nationality: this.nationality,
      dateOfIssue: this.dateOfIssue,
      placeOfBirth: this.placeOfBirth,
      enrolledAsStudent: this.enrolledAsStudent,
      universityName: this.universityName,
      hasDisabilities: this.hasDisabilities,
      disabilityGroup: this.disabilityGroup,
      disabilityReason: this.disabilityReason,
      version: this.version,
      fingerprint: this.fingerprint,
      image: this.image,
    } as Citizen;
  }
}
