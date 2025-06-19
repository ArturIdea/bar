import { PaginatedResponse } from '@/infrastructure/api/SignupRequestRepositoryAPI';
import { SignUpRequest } from '../entities/SignupRequest';
import { SignUpRequestsRepository } from '../repositories/SignupRequestRepository';

export class GetSignUpRequestsUseCase {
  constructor(private repository: SignUpRequestsRepository) {}

  async execute(
    page: number,
    size: number,
    fromDate?: string,
    toDate?: string,
    pinflSearch?: string,
    statuses?: string,
    userId?: string,
    selectedBank?: string | null,
    onboardingChannel?: string | null
  ): Promise<PaginatedResponse<SignUpRequest>> {
    return this.repository.getSignUpRequests(
      page,
      size,
      fromDate,
      toDate,
      pinflSearch,
      statuses,
      userId,
      selectedBank,
      onboardingChannel
    );
  }
}
