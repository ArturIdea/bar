import { useEffect, useState } from 'react';
import { diContainer } from '@/core/di/setup';
import { SignupRequestDetail } from '@/domain/signupRequests/entities/SignupRequestDetail';
import { GetSignupRequestDetailByIdUseCase } from '@/domain/signupRequests/useCases/GetSignupRequestDetailById';

export const useSignupRequestDetail = (id: string | null) => {
  const [signupRequest, setSignupRequest] = useState<SignupRequestDetail | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      return;
    }

    const fetchSignupRequest = async () => {
      setLoading(true);
      setError(null);

      const useCase = diContainer.get<GetSignupRequestDetailByIdUseCase>(
        'GetSignupRequestDetailById'
      );

      try {
        const result = await useCase.execute(id);
        setSignupRequest(result);
      } catch (error) {
        console.error('Error fetching signup request:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSignupRequest();
  }, [id]);

  return { signupRequest, loading, error };
};
