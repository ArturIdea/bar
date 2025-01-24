import { useEffect, useState } from 'react';
import { SignUpRequest } from '@/domain/signupRequests/entities/SignupRequest';
import { GetSignUpRequests } from '@/domain/signupRequests/useCases/FetchSignupRequests';
import { SignUpRequestsRepositoryAPI } from '@/infrastructure/api/SignupRequestRepositoryAPI';

export const useSignUpRequests = (page: number, size: number) => {
  const [requests, setRequests] = useState<SignUpRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      const api = new SignUpRequestsRepositoryAPI();
      const useCase = new GetSignUpRequests(api);

      setLoading(true);
      try {
        const data = await useCase.execute(page, size);
        setRequests(data);
      } catch (error) {
        console.error('Error fetching sign-up requests', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, [page, size]);

  return { requests, loading };
};
