import { useEffect, useState } from 'react';
import { ApiClient } from '@/core/ApiClient';
import { useDateRangeStore } from '@/ui/stores/useDateRangeStore';

export const useUsersByBenefit = (page: number, size: number, benefitTypeId?: string) => {
  const [users, setUsers] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const fromDate = useDateRangeStore((s) => s.fromDate);
  const toDate = useDateRangeStore((s) => s.toDate);

  useEffect(() => {
    if (!benefitTypeId) {
      setUsers([]);
      setTotal(0);
      return;
    }
    setLoading(true);
    ApiClient.shared
      .get<{ content: any[]; totalElements: number }>(
        '/api/admin/users',
        {
          params: {
            fromDate,
            toDate,
            page,
            size,
            sort: 'createdAt,DESC',
            benefitTypeId,
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
  }, [page, size, benefitTypeId, fromDate, toDate]);

  return { users, total, loading, fromDate, toDate };
}; 