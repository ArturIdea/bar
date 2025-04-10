import { PaginatedResponse } from '@/infrastructure/api/SignupRequestRepositoryAPI';
import { SignUpRequest } from '../entities/SignupRequest';

export interface SignUpRequestsRepository {
  getSignUpRequests: (
    page: number,
    size: number,
    signupRequestId?: string,
    documentTypeId?: string,
    pinflSearch?: string
  ) => Promise<PaginatedResponse<SignUpRequest>>;
}
