import { useEffect, useState, useCallback } from 'react';
import { ApiClient } from '@/core/ApiClient';

export interface AgentAccessLog {
  agentName: string;
  agentPinfl: string;
  totalPinflAccessed: number;
  uniquePinflAccessed: number;
  transactionHistoryViewed: number;
  perPinflBenefitScreenViewed: number;
  dobMismatchCount: number;
}

interface Pageable {
  pageNumber: number;
  pageSize: number;
  sort: any[];
  offset: number;
  paged: boolean;
  unpaged: boolean;
}

interface AgentAccessLogsResponse {
  content: AgentAccessLog[];
  pageable: Pageable;
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  sort: any[];
  first: boolean;
  numberOfElements: number;
  empty: boolean;
}

interface UseAgentAccessLogsParams {
  search?: string;
  excludeZeroUsers?: boolean;
  page?: number;
  size?: number;
  sort?: string;
  fromDate?: string;
  toDate?: string;
}

export const useAgentAccessLogs = (params: UseAgentAccessLogsParams = {}) => {
  const [logs, setLogs] = useState<AgentAccessLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    totalElements: 0,
    totalPages: 0,
    currentPage: 0,
    pageSize: 10
  });

  const fetchLogs = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const queryParams = new URLSearchParams({
        page: params.page?.toString() || '0',
        size: params.size?.toString() || '10',
        sort: params.sort || 'agentName,DESC',
        ...(params.fromDate && { fromDate: params.fromDate }),
        ...(params.toDate && { toDate: params.toDate }),
      });
      // Optionally add search
      const response = await ApiClient.shared.get<AgentAccessLogsResponse>(
        `/api/admin/activity-logs?${queryParams.toString()}`
      );
      if (!response.data) {
        throw new Error('No data received from the API');
      }
      setLogs(response.data.content);
      setPagination({
        totalElements: response.data.totalElements,
        totalPages: response.data.totalPages,
        currentPage: response.data.number,
        pageSize: response.data.size
      });
    } catch (err) {
      setError('Failed to fetch agent access logs');
    } finally {
      setLoading(false);
    }
  }, [params.page, params.size, params.sort, params.fromDate, params.toDate]);

  useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);

  return { logs, loading, error, pagination };
}; 