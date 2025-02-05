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
  statuses?: string
) => {
  const [requests, setRequests] = useState<SignUpRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);

  useEffect(() => {
    const fetchRequests = async () => {
      const useCase = diContainer.get<GetSignUpRequestsUseCase>('GetSignupRequests');

      setLoading(true);
      try {
        const { content, totalPages, totalElements } = await useCase.execute(
          page,
          size,
          createdAtFrom,
          createdAtTo,
          pinflSearch,
          statuses
        );
        setRequests(content);
        setTotalPages(totalPages);
        setTotalElements(totalElements);
      } catch (error) {
        console.error('Error fetching sign-up requests', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, [page, size, createdAtFrom, createdAtTo, pinflSearch, statuses]);

  return { requests, loading, totalPages, totalElements };
};
