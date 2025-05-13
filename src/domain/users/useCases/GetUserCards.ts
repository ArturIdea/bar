import { UserCard } from '../entities/UserCard';
import { UserCardRepository } from '../repositories/UserCardRepository';

export class GetUserCardsUseCase {
  constructor(private userRepository: UserCardRepository) {}

  async execute(uri: string): Promise<UserCard> {
    return this.userRepository.getUserCards(uri);
  }
}
