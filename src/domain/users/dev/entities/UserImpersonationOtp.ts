export class UserImpersonationOtp {
  constructor(
    public agentId: string,
    public otp: string,
    public createdAt: string,
    public expiresAt: string,
    public hasBeenUsedOrSkipped: boolean
  ) {}
}
