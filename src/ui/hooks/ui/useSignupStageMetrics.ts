import { useEffect, useState } from 'react';
import { diContainer } from '@/core/di/setup';
import {
  SignupStage,
  SignupStageMetric,
} from '@/domain/metrics/signupMetrics/entities/SignupStageMetric';
import { GetSignupStageMetrics } from '@/domain/metrics/signupMetrics/useCases/GetSignupStageMetrics';

export function useSignupStageMetrics(
  fromDate?: string,
  toDate?: string
): {
  metrics: SignupStageMetric[];
  loading: boolean;
  error: string | null;
} {
  const [metrics, setMetrics] = useState<SignupStageMetric[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMetrics = async () => {
      setLoading(true);
      setError(null);

      const useCase = diContainer.get<GetSignupStageMetrics>('GetSignupStageMetrics');

      try {
        const data = await useCase.execute(fromDate, toDate);

        const order: SignupStage[] = [
          SignupStage.OTP_SENT,
          SignupStage.MOBILE_VERIFIED,
          SignupStage.PERSONAL_INFO_VERIFIED,
          SignupStage.AGREEMENTS_ACCEPTED,
          SignupStage.BIOMETRIC_CAPTURE_IN_PROGRESS,
          SignupStage.BIOMETRIC_CAPTURE_COMPLETED,
          SignupStage.REGISTRATION_COMPLETED,
        ];
        const sorted = data.sort((a, b) => order.indexOf(a.stage) - order.indexOf(b.stage));

        setMetrics(sorted);
      } catch (err) {
        setError('Failed to fetch signup stage metrics');
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
  }, [fromDate, toDate]);

  return { metrics, loading, error };
}
