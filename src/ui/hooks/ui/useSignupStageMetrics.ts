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
  totalRequests: number;
  loading: boolean;
  error: string | null;
} {
  const [metrics, setMetrics] = useState<SignupStageMetric[]>([]);
  const [totalRequests, setTotalRequests] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMetrics = async () => {
      setLoading(true);
      setError(null);

      const useCase = diContainer.get<GetSignupStageMetrics>('GetSignupStageMetrics');

      try {
        const data = await useCase.execute(fromDate, toDate);

        const total = data.reduce((sum, m) => sum + m.signupRequestsNumber, 0);
        setTotalRequests(total);

        const FUNNEL_STAGES: SignupStage[] = [
          SignupStage.OTP_SENT,
          SignupStage.MOBILE_VERIFIED,
          SignupStage.PERSONAL_INFO_VERIFIED,
          SignupStage.AGREEMENTS_ACCEPTED,
          SignupStage.FACE_VERIFICATION_IN_PROGRESS,
          SignupStage.VERIFICATION_COMPLETED,
          SignupStage.COMPLETED,
        ];

        const filledAndOrdered = FUNNEL_STAGES.map((stage) => {
          const m = data.find((x) => x.stage === stage);
          return m ?? new SignupStageMetric(stage, 0);
        });

        setMetrics(filledAndOrdered);
      } catch (err) {
        setError('Failed to fetch signup stage metrics');
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
  }, [fromDate, toDate]);

  return { metrics, totalRequests, loading, error };
}
