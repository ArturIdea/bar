export interface AgentOnboardingStatus {
  createdByUserId: string;
  totalCases: number;
  topErrorReason: string;
  distribution: {
    CREATED: number;
    OTP_SENT: number;
    NASP_FAILED: number;
    MOBILE_VERIFIED: number;
    PERSONAL_INFO_VERIFIED: number;
    AGREEMENTS_ACCEPTED: number;
    FACE_VERIFICATION_IN_PROGRESS: number;
    VERIFICATION_COMPLETED: number;
    VERIFICATION_FAILED: number;
    FAILED_FINALIZATION: number;
    NOT_ELIGIBLE: number;
    COMPLETED: number;
  };
}

export interface OnboardingStep {
  step: string;
  status: 'CREATED' | 'OTP_SENT' | 'NASP_FAILED' | 'MOBILE_VERIFIED' | 'PERSONAL_INFO_VERIFIED' | 'AGREEMENTS_ACCEPTED' | 'FACE_VERIFICATION_IN_PROGRESS' | 'VERIFICATION_COMPLETED' | 'VERIFICATION_FAILED' | 'FAILED_FINALIZATION' | 'NOT_ELIGIBLE' | 'COMPLETED';
  count: number;
  percentage: number;
} 