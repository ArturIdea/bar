import { SignUpRequest } from '@/domain/signupRequests/entities/SignupRequest';

export const SignUpRequestAdapter = {
  toDomain(raw: any): SignUpRequest {
    return new SignUpRequest(
      raw.id ? raw.id : 'No Data',
      raw.firstName ? raw.firstName : 'No Data',
      raw.lastName ? raw.lastName : 'No Data',
      raw.email === null ? 'No Data' : raw.email,
      raw.pinfl === null ? 'No Data' : raw.pinfl,
      raw.createdAt ? raw.createdAt : 'No Data',
      raw.status === null ? 'No Data' : raw.status,
      raw.bankType || 'No Data',
      raw.onboardingChannel || 'No Data'
    );
  },
};
