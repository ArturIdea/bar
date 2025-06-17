/* eslint-disable no-console */
import { useEffect, useState } from 'react';
import { diContainer } from '@/core/di/setup';
import { SignUpRequest } from '@/domain/signupRequests/entities/SignupRequest';
import { GetSignUpRequestsUseCase } from '@/domain/signupRequests/useCases/GetSignupRequests';
import { useAgent } from '@/contexts/AgentContext';
import { useBankFilterStore } from '@/ui/stores/useBankFilterStore';
import { useAppTypeFilterStore } from '@/ui/stores/useAppTypeFilterStore';

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
  const selectedBank = useBankFilterStore((state) => state.selectedBank);
  const selectedAppType = useAppTypeFilterStore((state) => state.selectedAppType);

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
          selectedAgent?.id,
          selectedBank,
          selectedAppType
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
  }, [page, size, createdAtFrom, createdAtTo, pinflSearch, statuses, createdBy, selectedAgent?.id, selectedBank, selectedAppType]);

  return { requests, total, loading };
};
