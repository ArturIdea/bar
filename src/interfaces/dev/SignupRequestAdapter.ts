import { SignUpRequest } from '@/domain/signupRequests/dev/entities/SignupRequest';

export const SignUpRequestAdapter = {
  toDomain(raw: any): SignUpRequest {
    return new SignUpRequest(
      raw.id ? raw.id : 'N/A',
      raw.firstName ? raw.firstName : 'N/A',
      raw.lastName === null ? '' : raw.lastName,
      raw.email === null ? 'N/A' : raw.email,
      raw.pinfl === null ? 'N/A' : raw.pinfl,
      raw.phoneCode && raw.phoneNumber ? `${raw.phoneCode}${raw.phoneNumber}` : 'N/A',
      new Date(raw.createdAt),
      raw.status === null ? 'N/A' : raw.status
    );
  },
};
