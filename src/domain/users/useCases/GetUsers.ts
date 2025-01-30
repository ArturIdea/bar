import { User } from '@/domain/users/entities/User';
import { UserRepository } from '@/domain/users/repositories/UserRepository';

export class GetUsers {
  constructor(private userRepository: UserRepository) {}

  async execute(
    page: number,
    size: number,
    createdAtFrom?: string,
    createdAtTo?: string,
    pinflSearch?: string,
    usernameSearch?: string
  ): Promise<{ users: User[]; total: number }> {
    return this.userRepository.fetchUsers(
      page,
      size,
      createdAtFrom,
      createdAtTo,
      pinflSearch,
      usernameSearch
    );
  }
}
