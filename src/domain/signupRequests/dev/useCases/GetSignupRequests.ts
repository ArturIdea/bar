import { PaginatedResponse } from '@/infrastructure/api/SignupRequestRepositoryAPI';
import { SignUpRequest } from '../entities/SignupRequest';
import { SignUpRequestsRepository } from '../repositories/SignupRequestRepository';

export class GetSignUpRequestsUseCase {
  constructor(private repository: SignUpRequestsRepository) {}

  async execute(
    page: number,
    size: number,
    signupRequestId?: string,
    documentTypeId?: string,
    pinflSearch?: string
  ): Promise<PaginatedResponse<SignUpRequest>> {
    return this.repository.getSignUpRequests(
      page,
      size,
      pinflSearch,
      documentTypeId,
      signupRequestId
    );
  }
}
