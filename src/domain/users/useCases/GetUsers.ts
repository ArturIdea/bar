import { User } from '@/domain/users/entities/User';
import { UserRepository } from '@/domain/users/repositories/UserRepository';

export class GetUsersUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(
    page: number,
    size: number,
    registrationChannel?: string,
    fromDate?: string,
    toDate?: string,
    pinflSearch?: string,
    usernameSearch?: string,
    createdBy?: string,
    isCitizen?: boolean,
    userId?: string,
    bankType?: string,
    onboardingChannel?: string
  ): Promise<{ users: User[]; total: number }> {
    return this.userRepository.getUsers(
      page,
      size,
      registrationChannel,
      fromDate,
      toDate,
      pinflSearch,
      usernameSearch,
      createdBy,
      isCitizen,
      userId,
      bankType,
      onboardingChannel
    );
  }
}
