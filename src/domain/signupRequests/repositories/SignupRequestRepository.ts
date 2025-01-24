import { SignUpRequest } from '../entities/SignupRequest';

export interface SignUpRequestsRepository {
  getSignUpRequests: (page: number, size: number) => Promise<SignUpRequest[]>;
}
