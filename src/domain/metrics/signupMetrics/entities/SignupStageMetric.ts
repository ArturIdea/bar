export enum SignupStage {
  OTP_SENT = 'OTP_SENT',
  PERSONAL_INFO_VERIFIED = 'PERSONAL_INFO_VERIFIED',
  AGREEMENTS_ACCEPTED = 'AGREEMENTS_ACCEPTED',
  BIOMETRIC_CAPTURE_IN_PROGRESS = 'BIOMETRIC_CAPTURE_IN_PROGRESS',
  BIOMETRIC_CAPTURE_COMPLETED = 'BIOMETRIC_CAPTURE_COMPLETED',
  REGISTRATION_COMPLETED = 'REGISTRATION_COMPLETED',
}

export class SignupStageMetric {
  constructor(
    public stage: SignupStage,
    public signupRequestsNumber: number,
    public dropOffPercentage: number
  ) {}
}
