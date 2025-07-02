import { useEffect, useState } from 'react';
import { useAgent } from '@/contexts/AgentContext';
import { ApiClient } from '@/core/ApiClient';
import { useAppTypeFilterStore } from '@/ui/stores/useAppTypeFilterStore';
import { useBankFilterStore } from '@/ui/stores/useBankFilterStore';
import { useDateRangeStore } from '@/ui/stores/useDateRangeStore';

export interface BankAssociatedByStatus {
  [status: string]: {
    ALOQA: number;
    XALQ: number;
    NODATA: number;
  };
}

export function useBankAssociatedByStatus() {
  const fromDate = useDateRangeStore((s) => s.fromDate);
  const toDate = useDateRangeStore((s) => s.toDate);
  const { selectedAgent } = useAgent();
  const selectedBank = useBankFilterStore((state) => state.selectedBank);
  const selectedAppType = useAppTypeFilterStore((state) => state.selectedAppType);
  const [data, setData] = useState<BankAssociatedByStatus | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!fromDate || !toDate) {
      return;
    }
    setLoading(true);
    setError(null);

    // Build query params
    const params = new URLSearchParams({
      fromDate,
      toDate,
    });
    if (selectedAgent) {
      params.append('agentId', selectedAgent.id);
    }
    if (selectedBank) {
      params.append('bank', selectedBank);
    }
    if (selectedAppType) {
      params.append('appType', selectedAppType);
    }

    ApiClient.shared
      .get<{ banksByStatus: BankAssociatedByStatus }>(`/api/admin/bank-associated-by-status?${params.toString()}`)
      .then((res) => setData(res.data.banksByStatus))
      .catch((err) => setError(err.message || 'Failed to fetch onboarding status metrics'))
      .finally(() => setLoading(false));
  }, [fromDate, toDate, selectedAgent, selectedBank, selectedAppType]);

  return { data, loading, error };
}
