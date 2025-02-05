import { UserDetail } from '../entities/UserDetail';
import { UserDetailRepository } from '../repositories/UserDetailRepository';

export class GetUserDetailUseCase {
  constructor(private userRepository: UserDetailRepository) {}

  async execute(userId: string): Promise<UserDetail> {
    return await this.userRepository.getUserDetails(userId);
  }
}
