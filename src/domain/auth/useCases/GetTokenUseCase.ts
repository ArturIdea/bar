import { Token } from '../entities/Token';
import { AuthRepository } from '../repositories/AuthRepository';

export class GetTokenUseCase {
  constructor(private authRepository: AuthRepository) {}

  async execute(code: string, codeVerifier: string, state: string): Promise<Token> {
    return this.authRepository.getToken(code, codeVerifier, state);
  }
}
