import { useEffect, useState } from 'react';
import { diContainer } from '@/core/di/setup';
import { SignUpRequest } from '@/domain/signupRequests/dev/entities/SignupRequest';
import { GetSignUpRequestsUseCase } from '@/domain/signupRequests/dev/useCases/GetSignupRequests';

export const useSignUpRequests = (
  page: number,
  size: number,
  signupRequestId?: string,
  documentTypeId?: string,
  pinflSearch?: string
) => {
  const [requests, setRequests] = useState<SignUpRequest[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchRequests = async () => {
      setLoading(true);
      const useCase = diContainer.get<GetSignUpRequestsUseCase>('GetDevSignupRequests');
      try {
        const { content, totalElements } = await useCase.execute(
          page,
          size,
          documentTypeId,
          signupRequestId,
          pinflSearch
        );
        setRequests(content);
        setTotal(totalElements);
      } catch (error) {
        console.error('Error fetching sign-up requests:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchRequests();
  }, [page, size, pinflSearch, documentTypeId, signupRequestId]);

  return { requests, total, loading };
};
