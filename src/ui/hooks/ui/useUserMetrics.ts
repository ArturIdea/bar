// src/ui/hooks/useUserMetrics.ts

import { useEffect, useState } from 'react';
import { format, startOfMonth, startOfWeek } from 'date-fns';
import { diContainer } from '@/core/di/setup';
import { UserMetric } from '@/domain/metrics/userMetrics/entities/UserMetric';
import { GetUserMetrics } from '@/domain/metrics/userMetrics/useCases/GetUserMetric';

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
      const useCase = diContainer.get<GetUserMetrics>('GetUserMetrics');

      try {
        const data = await useCase.execute(fromDate, toDate);
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

  return Object.entries(groupedData)
    .map(([date, users]) => ({ date, users }))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
}
