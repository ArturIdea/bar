import { User } from '@/domain/users/entities/User';
import { UserRepository } from '@/domain/users/repositories/UserRepository';

export class GetUsers {
  constructor(private userRepository: UserRepository) {}

  async execute(page: number, size: number): Promise<{ users: User[]; total: number }> {
    return this.userRepository.fetchUsers(page, size);
  }
}
