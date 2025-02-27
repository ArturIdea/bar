import { useEffect, useState } from 'react';
import { SignupMetric } from '@/domain/signupRequests/entities/SignupMetric';
import { GetSignupMetrics } from '@/domain/signupRequests/useCases/GetSignupMetric';
import { SignupRequestMetricsRepositoryAPI } from '@/infrastructure/api/SignupMetricsRepositoryAPI';

export const useSignupMetrics = (fromDate?: string, toDate?: string) => {
  const [metrics, setMetrics] = useState<SignupMetric[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMetrics = async () => {
      setLoading(true);
      setError(null);

      try {
        const repository = new SignupRequestMetricsRepositoryAPI();
        const getSignupMetrics = new GetSignupMetrics(repository);
        const data = await getSignupMetrics.execute(fromDate, toDate);
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
