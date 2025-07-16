import { useEffect, useState } from 'react';
import { ApiClient } from '@/core/ApiClient';
import { useDateRangeStore } from '@/ui/stores/useDateRangeStore';

export const useUsersByBenefit = (page: number, size: number, benefitId?: string) => {
  const [users, setUsers] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const fromDate = useDateRangeStore((s) => s.fromDate);
  const toDate = useDateRangeStore((s) => s.toDate);

  useEffect(() => {
    if (!benefitId) {
      setUsers([]);
      setTotal(0);
      return;
    }
    setLoading(true);
    ApiClient.shared
      .get<{ content: any[]; totalElements: number }>(
        '/api/admin/benefits/active-users',
        {
          params: {
            fromDate,
            toDate,
            page,
            size,
            sort: 'createdAt,DESC',
            benefitId,
          },
        }
      )
      .then((res) => {
        setUsers(res.data.content || []);
        setTotal(res.data.totalElements || 0);
      })
      .catch((_err) => {
        setUsers([]);
        setTotal(0);
        // Optionally log error
      })
      .finally(() => setLoading(false));
  }, [page, size, benefitId, fromDate, toDate]);

  return { users, total, loading, fromDate, toDate };
}; 