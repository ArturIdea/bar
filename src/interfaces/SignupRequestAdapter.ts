import { SignUpRequest } from '@/domain/signupRequests/entities/SignupRequest';

export const SignUpRequestAdapter = {
  toDomain(raw: any): SignUpRequest {
    return new SignUpRequest(
      raw.id ? raw.id : '',
      raw.firstName ? raw.firstName : '',
      raw.lastName ? raw.lastName : '',
      raw.email === null ? '' : raw.email,
      raw.pinfl === null ? '' : raw.pinfl,
      raw.createdAt ? raw.createdAt : '',
      raw.status === null ? '' : raw.status,
      raw.bankType || '',
      raw.onboardingChannel || ''
    );
  },
};
