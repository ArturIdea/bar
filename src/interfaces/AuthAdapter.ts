import { Token } from '@/domain/auth/entities/Token';

export const AuthAdapter = {
  toDomain(raw: any): Token {
    return new Token(raw.access_token, raw.refresh_token);
  },
};
