import { User } from '../entities/User';
import { UserRepository } from '../repositories/UserRepository';

export class GetUsersUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(
    page: number,
    size: number,
    signUpRequestId?: string,
    documentTypeId?: string,
    pinflSearch?: string
  ): Promise<{ users: User[]; total: number }> {
    return this.userRepository.getUsers(page, size, signUpRequestId, documentTypeId, pinflSearch);
  }
}
