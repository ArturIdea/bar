import { useEffect, useState } from 'react';
import { ApiClient } from '@/core/ApiClient';
import { useDateRangeStore } from '@/ui/stores/useDateRangeStore';

export interface SignupErrorCategory {
  name: string;
  count: number;
  subcategories: { name: string; count: number }[];
}

export function useSignupErrorCategories() {
  const fromDate = useDateRangeStore((s) => s.fromDate);
  const toDate = useDateRangeStore((s) => s.toDate);
  const [data, setData] = useState<SignupErrorCategory[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!fromDate || !toDate) {
      return;
    }
    setLoading(true);
    setError(null);
    ApiClient.shared
      .get<{ errorCategories: SignupErrorCategory[] }>(
        `/api/admin/signup-errors?fromDate=${fromDate}&toDate=${toDate}`
      )
      .then((res) => setData(res.data.errorCategories))
      .catch((err) => setError(err.message || 'Failed to fetch error categories'))
      .finally(() => setLoading(false));
  }, [fromDate, toDate]);

  return { data, loading, error };
} 