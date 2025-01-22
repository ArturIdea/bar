import { useState } from 'react';
import { Token } from '@/domain/auth/entities/Token';
import { GetTokenUseCase } from '@/domain/auth/useCases/GetTokenUseCase';
import { AuthRepositoryAPI } from '@/infrastructure/api/AuthRepositoryAPI';

export const useToken = () => {
  const [token, setToken] = useState<Token | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const fetchToken = async (code: string, codeVerifier: string, state: string) => {
    const authRepository = new AuthRepositoryAPI();
    const getTokenUseCase = new GetTokenUseCase(authRepository);

    try {
      const result = await getTokenUseCase.execute(code, codeVerifier, state);
      setToken(result);
    } catch (err) {
      setError(err as Error);
    }
  };

  return { token, error, fetchToken };
};
