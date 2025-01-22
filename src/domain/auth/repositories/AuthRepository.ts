import { Token } from '../entities/Token';

export interface AuthRepository {
  getToken: (code: string, codeVerifier: string, state: string) => Promise<Token>;
}
