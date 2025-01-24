import { SignUpRequest } from '@/domain/signupRequests/entities/SignupRequest';

export const SignUpRequestAdapter = {
  toDomain(raw: any): SignUpRequest {
    return new SignUpRequest(
      raw.id === null ? 'N/A' : raw.id,
      raw.firstName === null ? 'N/A' : raw.firstName,
      raw.lastName === null ? '' : raw.lastName,
      raw.email === null ? 'N/A' : raw.email,
      raw.pinfl === null ? 'N/A' : raw.pinfl,
      raw.phoneCode === null && raw.phoneNumber === null
        ? 'N/A'
        : `${raw.phoneCode}${raw.phoneNumber}`,
      new Date(raw.createdAt)
    );
  },
};
