import { PaginatedResponse } from '@/infrastructure/api/SignupRequestRepositoryAPI';
import { SignUpRequest } from '../entities/SignupRequest';

export interface SignUpRequestsRepository {
  getSignUpRequests: (
    page: number,
    size: number,
    fromDate?: string,
    toDate?: string,
    pinflSearch?: string,
    statuses?: string,
    userId?: string,
    bankType?: string | null,
    onboardingChannel?: string | null
  ) => Promise<PaginatedResponse<SignUpRequest>>;
}
