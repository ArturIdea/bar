import { useEffect, useState } from 'react';
import { ApiClient } from '@/core/ApiClient';
import { useDateRangeStore } from '@/ui/stores/useDateRangeStore';
import { useAgent } from '@/contexts/AgentContext';
import { useBankFilterStore } from '@/ui/stores/useBankFilterStore';
import { useAppTypeFilterStore } from '@/ui/stores/useAppTypeFilterStore';

export interface AgreementsAcceptedErrorCategory {
  name: string;
  count: number;
  subcategories: { name: string; count: number }[];
}

export function useAgreementsAcceptedErrorCategories() {
  const fromDate = useDateRangeStore((s) => s.fromDate);
  const toDate = useDateRangeStore((s) => s.toDate);
  const { selectedAgent } = useAgent();
  const selectedBank = useBankFilterStore((state) => state.selectedBank);
  const selectedAppType = useAppTypeFilterStore((state) => state.selectedAppType);
  const [data, setData] = useState<AgreementsAcceptedErrorCategory[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!fromDate || !toDate) {
      return;
    }
    setLoading(true);
    setError(null);

    const params = new URLSearchParams({
      status: 'AGREEMENTS_ACCEPTED',
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
      .get<{ errorCategories: AgreementsAcceptedErrorCategory[] }>(
        `/api/admin/signup-request-errors?${params.toString()}`
      )
      .then((res) => setData(res.data.errorCategories))
      .catch((err) => setError(err.message || 'Failed to fetch error categories'))
      .finally(() => setLoading(false));
  }, [fromDate, toDate, selectedAgent, selectedBank, selectedAppType]);

  return { data, loading, error };
} 