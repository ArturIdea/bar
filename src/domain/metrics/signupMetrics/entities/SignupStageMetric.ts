export enum SignupStage {
  OTP_SENT = 'OTP_SENT',
  AGREEMENTS_ACCEPTED = 'AGREEMENTS_ACCEPTED',
  BIOMETRIC_CAPTURE_COMPLETED = 'BIOMETRIC_CAPTURE_COMPLETED',
  PERSONAL_INFO_VERIFIED = 'PERSONAL_INFO_VERIFIED',
  VERIFICATION_FAILED = 'VERIFICATION_FAILED',
  REGISTRATION_COMPLETED = 'REGISTRATION_COMPLETED',
  NASP_FAILED = 'NASP_FAILED',
}

export class SignupStageMetric {
  constructor(
    public stage: SignupStage,
    public signupRequestsNumber: number,
    public dropOffPercentage: number
  ) {}
}
