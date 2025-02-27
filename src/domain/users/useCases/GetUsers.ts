import { User } from '@/domain/users/entities/User';
import { UserRepository } from '@/domain/users/repositories/UserRepository';

export class GetUsersUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(
    page: number,
    size: number,
    createdAtFrom?: string,
    createdAtTo?: string,
    pinflSearch?: string,
    usernameSearch?: string,
    createdBy?: string
  ): Promise<{ users: User[]; total: number }> {
    return this.userRepository.getUsers(
      page,
      size,
      createdAtFrom,
      createdAtTo,
      pinflSearch,
      usernameSearch,
      createdBy
    );
  }
}
