import { useEffect, useState } from 'react';
import { ApiClient } from '@/core/ApiClient';

export function useCitizensCount() {
  const [count, setCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);
    ApiClient.shared
      .get<{ count: number }>('/api/admin/metrics/citizens-count')
      .then((response) => {
        if (isMounted) {
          setCount(response.data.count);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err.message || 'Failed to fetch citizens count');
        }
      })
      .finally(() => {
        if (isMounted) {
          setLoading(false);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  return { count, loading, error };
} 