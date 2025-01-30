import { UserDetail } from '../entities/UserDetail';
import { UserDetailRepository } from '../repositories/UserDetailRepository';

export class GetUserDetail {
  constructor(private userRepository: UserDetailRepository) {}

  async execute(userId: string): Promise<UserDetail> {
    return await this.userRepository.getUser(userId);
  }
}
