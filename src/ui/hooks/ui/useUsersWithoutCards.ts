/* eslint-disable no-console */
import { useEffect, useState } from 'react';
import { ApiClient } from '../../../core/ApiClient';
import { useAgent } from '@/contexts/AgentContext';
import { useBankFilterStore } from '@/ui/stores/useBankFilterStore';
import { useAppTypeFilterStore } from '@/ui/stores/useAppTypeFilterStore';

interface UserWithoutCard {
  userId: string;
  keycloakUserId: string;
  username: string;
  firstName: string;
  lastName: string;
  pinfl: string;
  email: string | null;
  socialNumber: string;
  createdAt: string;
  bankType: string | null;
  channel: string;
}

interface UsersWithoutCardsResponse {
  content: UserWithoutCard[];
  pageable: {
    pageNumber: number;
    pageSize: number;
    sort: any[];
    offset: number;
    paged: boolean;
    unpaged: boolean;
  };
  totalElements: number;
  totalPages: number;
  last: boolean;
  size: number;
  number: number;
  sort: any[];
  numberOfElements: number;
  first: boolean;
  empty: boolean;
}

interface UseUsersWithoutCardsParams {
  fromDate?: string;
  toDate?: string;
  page: number;
  size: number;
  search?: string;
}

export const useUsersWithoutCards = ({
  fromDate,
  toDate,
  page,
  size,
  search,
}: UseUsersWithoutCardsParams) => {
  const [data, setData] = useState<UsersWithoutCardsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { selectedAgent } = useAgent();
  const selectedBank = useBankFilterStore((state) => state.selectedBank);
  const selectedAppType = useAppTypeFilterStore((state) => state.selectedAppType);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError(null);

      try {
        let baseUrl = `/api/admin/users-without-cards?fromDate=${fromDate}&toDate=${toDate}&page=${page}&size=${size}`;
        
        if (search) {
          baseUrl += `&search=${encodeURIComponent(search)}`;
        }
        
        let url = selectedAgent?.id 
          ? `${baseUrl}&userId=${selectedAgent.id}`
          : baseUrl;
        
        url = selectedBank ? `${url}&bankType=${selectedBank}` : url;
        url = selectedAppType ? `${url}&onboardingChannel=${selectedAppType}` : url;
        
        const response = await ApiClient.shared.get<UsersWithoutCardsResponse>(url);
        
        if (!response.data) {
          throw new Error('No data received from the API');
        }

        setData(response.data);
      } catch (err) {
        console.error('Error fetching users without cards:', err);
        setError('Failed to fetch users without cards');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [fromDate, toDate, page, size, search, selectedAgent?.id, selectedBank, selectedAppType]);

  return { data, loading, error };
};
