'use client';

import { useEffect, useState } from 'react';
import { diContainer } from '@/core/di/setup';
import { SignupStageHighestMetric } from '@/domain/metrics/signupMetrics/entities/SignupStageMetric';
import { GetSignupStageHighestMetrics } from '@/domain/metrics/signupMetrics/useCases/GetSignupStageMetrics';

export const useSignupStageHighestMetrics = (fromDate?: string, toDate?: string) => {
  const [metrics, setMetrics] = useState<SignupStageHighestMetric[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMetrics = async () => {
      setLoading(true);
      setError(null);

      const useCase = diContainer.get<GetSignupStageHighestMetrics>('GetSignupStageHighestMetrics');

      try {
        const data = await useCase.execute(fromDate, toDate);
        setMetrics(data);
      } catch (err) {
        setError('Failed to fetch highest metrics');
        // eslint-disable-next-line no-console
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
  }, [fromDate, toDate]);

  return { metrics, loading, error };
}; 