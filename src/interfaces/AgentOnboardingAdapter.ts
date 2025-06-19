import { AgentOnboardingStatus, OnboardingStep } from '@/domain/agentOnboarding/entities/AgentOnboardingStatus';

export interface AgentOnboardingAdapter {
  transformOnboardingData: (data: AgentOnboardingStatus) => OnboardingStep[];
  getCompletionPercentage: (data: AgentOnboardingStatus) => number;
  getTopErrorReason: (data: AgentOnboardingStatus) => string;
} 