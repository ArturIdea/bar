export class UserPublicOfferAgreement {
  constructor(
    public s3Refs: Record<string, string>,
    public createdAt: string,
    public updatedAt: string,
    public htmlContent: Record<string, string>,
    public version: number,
    public active: boolean
  ) {}
}
