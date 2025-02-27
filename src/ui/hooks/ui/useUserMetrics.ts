// src/ui/hooks/useUserMetrics.ts

import { useEffect, useState } from 'react';
import { format, startOfMonth, startOfWeek } from 'date-fns';
import { UserMetric } from '@/domain/users/entities/UserMetric';
import { UserMetricsRepositoryAPI } from '@/infrastructure/api/UserMetricsRepositoryAPI';

export function useUserMetrics(
  fromDate?: string,
  toDate?: string,
  granularity: 'day' | 'week' | 'month' = 'month'
) {
  const [metrics, setMetrics] = useState<{ date: string; users: number }[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMetrics = async () => {
      setLoading(true);
      setError(null);
      const repository = new UserMetricsRepositoryAPI();

      try {
        const data = await repository.getUserMetrics(fromDate, toDate);

        const aggregatedData = aggregateMetrics(data, granularity);
        setMetrics(aggregatedData);
      } catch (err) {
        setError('Failed to fetch user metrics');
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
  }, [fromDate, toDate, granularity]);

  return { metrics, loading, error };
}

function aggregateMetrics(data: UserMetric[], granularity: 'day' | 'week' | 'month') {
  const groupedData: Record<string, number> = {};

  data.forEach((metric) => {
    let key: string;

    switch (granularity) {
      case 'day':
        key = format(new Date(metric.date), 'yyyy-MM-dd');
        break;
      case 'week':
        key = format(startOfWeek(new Date(metric.date)), 'yyyy-MM-dd');
        break;
      case 'month':
        key = format(startOfMonth(new Date(metric.date)), 'yyyy-MM');
        break;
    }

    if (!groupedData[key]) {
      groupedData[key] = 0;
    }
    groupedData[key] += metric.users;
  });

  return Object.entries(groupedData).map(([date, users]) => ({ date, users }));
}
