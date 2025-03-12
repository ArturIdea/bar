import { useEffect, useState } from 'react';
import { diContainer } from '@/core/di/setup';
import { SignUpRequest } from '@/domain/signupRequests/entities/SignupRequest';
import { GetSignUpRequestsUseCase } from '@/domain/signupRequests/useCases/GetSignupRequests';

export const useSignUpRequests = (
  page: number,
  size: number,
  createdAtFrom?: string,
  createdAtTo?: string,
  pinflSearch?: string,
  statuses?: string,
  createdBy?: string
) => {
  const [requests, setRequests] = useState<SignUpRequest[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchRequests = async () => {
      setLoading(true);
      const useCase = diContainer.get<GetSignUpRequestsUseCase>('GetSignupRequests');
      try {
        const { content, totalElements } = await useCase.execute(
          page,
          size,
          createdAtFrom,
          createdAtTo,
          pinflSearch,
          statuses
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
  }, [page, size, createdAtFrom, createdAtTo, pinflSearch, statuses, createdBy]);

  return { requests, total, loading };
};
