import { UserDetail } from '../entities/UserDetail';
import { UserDetailRepository } from '../repositories/UserDetailsRepository';

export class GetUserDetailsById {
  constructor(private userRepository: UserDetailRepository) {}

  async execute(userId: string): Promise<UserDetail> {
    return this.userRepository.getUserDetailById(userId);
  }
}
