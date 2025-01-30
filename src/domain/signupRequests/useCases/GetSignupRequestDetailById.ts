// src/domain/signupRequest/useCases/GetSignupRequestById.ts

import { SignupRequestDetail } from '../entities/SignupRequestDetail';
import { SignupRequestDetailRepository } from '../repositories/SignupRequestDetailRepository';

export class GetSignupRequestDetailById {
  constructor(private repository: SignupRequestDetailRepository) {}

  async execute(id: string): Promise<SignupRequestDetail> {
    return this.repository.getSignupRequestDetailById(id);
  }
}
