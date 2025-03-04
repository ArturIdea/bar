import { useEffect, useState } from 'react';
import { diContainer } from '@/core/di/setup';
import { SignupMetric } from '@/domain/metrics/signupMetrics/entities/SignupMetric';
import { GetSignupMetrics } from '@/domain/metrics/signupMetrics/useCases/GetSignupMetric';

export const useSignupMetrics = (fromDate?: string, toDate?: string) => {
  const [metrics, setMetrics] = useState<SignupMetric[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMetrics = async () => {
      setLoading(true);
      setError(null);

      const useCase = diContainer.get<GetSignupMetrics>('GetSignupMetrics');

      try {
        const data = await useCase.execute(fromDate, toDate);
        setMetrics(data);
      } catch (err) {
        setError('Failed to fetch metrics');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
  }, [fromDate, toDate]);

  return { metrics, loading, error };
};
