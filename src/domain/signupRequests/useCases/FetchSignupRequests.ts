import { SignUpRequest } from '../entities/SignupRequest';
import { SignUpRequestsRepository } from '../repositories/SignupRequestRepository';

export class GetSignUpRequests {
  constructor(private repository: SignUpRequestsRepository) {}

  async execute(page: number, size: number): Promise<SignUpRequest[]> {
    return this.repository.getSignUpRequests(page, size);
  }
}
