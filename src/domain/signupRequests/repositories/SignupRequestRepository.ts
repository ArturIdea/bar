import { PaginatedResponse } from '@/infrastructure/api/SignupRequestRepositoryAPI';
import { SignUpRequest } from '../entities/SignupRequest';

export interface SignUpRequestsRepository {
  getSignUpRequests: (
    page: number,
    size: number,
    createdAtFrom?: string,
    createdAtTo?: string
  ) => Promise<PaginatedResponse<SignUpRequest>>;
}
