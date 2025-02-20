import { UserProfile } from '../entities/UserProfile';
import { UserProfileRepository } from '../repositories/UserProfileRepository';

export class GetUserProfileUseCase {
  constructor(private userProfileRepository: UserProfileRepository) {}

  async execute(): Promise<UserProfile> {
    return await this.userProfileRepository.getUserProfile();
  }
}
