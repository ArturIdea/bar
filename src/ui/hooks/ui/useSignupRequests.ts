/* eslint-disable no-console */
import { useEffect, useState } from 'react';
import { diContainer } from '@/core/di/setup';
import { SignUpRequest } from '@/domain/signupRequests/entities/SignupRequest';
import { GetSignUpRequestsUseCase } from '@/domain/signupRequests/useCases/GetSignupRequests';
import { useAgent } from '@/contexts/AgentContext';

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
  const { selectedAgent } = useAgent();

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
          statuses,
          selectedAgent?.id
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
  }, [page, size, createdAtFrom, createdAtTo, pinflSearch, statuses, createdBy, selectedAgent?.id]);

  return { requests, total, loading };
};
