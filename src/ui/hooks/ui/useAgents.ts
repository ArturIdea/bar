/* eslint-disable no-console */
import { useEffect, useState, useCallback } from 'react';
import { ApiClient } from '@/core/ApiClient';
import { useAgent } from '@/contexts/AgentContext';

interface Agent {
  userId: string;
  firstName: string;
  lastName: string;
  pinfl: string;
  createdAt: string;
  totalRequests: number;
  successfulRequests: number;
  failedRequests: number;
  dailyAverageSuccessfulRequests: number;
  email: string | null;
  nationality: string;
  citizenship: string;
  birthCountry: string;
  dateOfBirth: string;
  socialNumber: string;
}

interface Pageable {
  pageNumber: number;
  pageSize: number;
  sort: {
    sorted: boolean;
    empty: boolean;
    unsorted: boolean;
  };
  offset: number;
  paged: boolean;
  unpaged: boolean;
}

interface AgentsResponse {
  content: Agent[];
  pageable: Pageable;
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  sort: {
    sorted: boolean;
    empty: boolean;
    unsorted: boolean;
  };
  first: boolean;
  numberOfElements: number;
  empty: boolean;
}

interface UseAgentsParams {
  search?: string;
  excludeZeroUsers?: boolean;
  page?: number;
  size?: number;
  sort?: string;
  fromDate?: string;
  toDate?: string;
}

export const useAgents = (params: UseAgentsParams = {}) => {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    totalElements: 0,
    totalPages: 0,
    currentPage: 0,
    pageSize: 10
  });
  const { selectedAgent } = useAgent();

  const fetchAgents = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const queryParams = new URLSearchParams({
        search: params.search || '',
        excludeZeroUsers: params.excludeZeroUsers?.toString() || 'true',
        page: params.page?.toString() || '0',
        size: params.size?.toString() || '10',
        sort: params.sort || 'firstName',
        ...(params.fromDate && { fromDate: params.fromDate }),
        ...(params.toDate && { toDate: params.toDate }),
        ...(selectedAgent?.id && { userId: selectedAgent.id })
      });

      const response = await ApiClient.shared.get<AgentsResponse>(
        `/api/admin/agents?${queryParams.toString()}`
      );

      if (!response.data) {
        throw new Error('No data received from the API');
      }

      setAgents(response.data.content);
      setPagination({
        totalElements: response.data.totalElements,
        totalPages: response.data.totalPages,
        currentPage: response.data.number,
        pageSize: response.data.size
      });
    } catch (err) {
      console.error('Error fetching agents:', err);
      setError('Failed to fetch agents');
    } finally {
      setLoading(false);
    }
  }, [
    params.search,
    params.excludeZeroUsers,
    params.page,
    params.size,
    params.sort,
    params.fromDate,
    params.toDate,
    selectedAgent?.id
  ]);

  useEffect(() => {
    fetchAgents();
  }, [fetchAgents]);

  return { agents, loading, error, pagination };
};
