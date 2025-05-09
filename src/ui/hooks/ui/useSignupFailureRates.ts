import { useEffect, useState } from 'react';
import { diContainer } from '@/core/di/setup';
import { SignupFailureRate } from '@/domain/metrics/signupMetrics/entities/SignupFailureRate';
import { GetSignupFailureRates } from '@/domain/metrics/signupMetrics/useCases/GetSignupFailureRates';

export const useSignupFailureRates = (fromDate?: string, toDate?: string) => {
  const [failureRates, setFailureRates] = useState<SignupFailureRate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMetrics = async () => {
      setLoading(true);
      setError(null);

      const useCase = diContainer.get<GetSignupFailureRates>('GetSignupFailureRates');

      try {
        const data = await useCase.execute(fromDate, toDate);
        setFailureRates(data);
      } catch (err) {
        setError('Failed to fetch metrics');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
  }, [fromDate, toDate]);

  return { failureRates, loading, error };
};
