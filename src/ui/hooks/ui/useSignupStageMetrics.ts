import { useEffect, useState } from 'react';
import { ApiClient } from '@/core/ApiClient';
import {
  SignupStage,
  SignupStageMetric,
} from '@/domain/metrics/signupMetrics/entities/SignupStageMetric';
import { useAgent } from '@/contexts/AgentContext';
import { useBankFilterStore } from '@/ui/stores/useBankFilterStore';
import { useAppTypeFilterStore } from '@/ui/stores/useAppTypeFilterStore';

interface StageMetricResponse {
  signupRequestsNumber: number;
  dropPercentage: number;
}

interface SignupStageMetricsResponse {
  stageMetrics: {
    [key in SignupStage]: StageMetricResponse;
  };
}

interface ExtendedSignupStageMetric extends SignupStageMetric {
  dropPercentage: number;
}

export function useSignupStageMetrics(
  fromDate?: string,
  toDate?: string
): {
  metrics: ExtendedSignupStageMetric[];
  totalRequests: number;
  loading: boolean;
  error: string | null;
} {
  const [metrics, setMetrics] = useState<ExtendedSignupStageMetric[]>([]);
  const [totalRequests, setTotalRequests] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { selectedAgent } = useAgent();
  const selectedBank = useBankFilterStore((state) => state.selectedBank);
  const selectedAppType = useAppTypeFilterStore((state) => state.selectedAppType);

  useEffect(() => {
    const fetchMetrics = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await ApiClient.shared.get<SignupStageMetricsResponse>(
          '/api/admin/metrics/signup-stage-metrics',
          {
            params: {
              fromDate,
              toDate,
              ...(selectedAgent?.id && { userId: selectedAgent.id }),
              ...(selectedBank && { bankType: selectedBank }),
              ...(selectedAppType && { onboardingChannel: selectedAppType })
            },
          }
        );

        const FUNNEL_STAGES: SignupStage[] = [
          SignupStage.CREATED,
          SignupStage.OTP_SENT,
          SignupStage.MOBILE_VERIFIED,
          SignupStage.PERSONAL_INFO_VERIFIED,
          SignupStage.AGREEMENTS_ACCEPTED,
          SignupStage.FACE_VERIFICATION_IN_PROGRESS,
          SignupStage.VERIFICATION_COMPLETED,
          SignupStage.COMPLETED,
        ];

        const metricsData = FUNNEL_STAGES.map((stage) => {
          const stageData = response.data.stageMetrics[stage];
          const baseMetric = new SignupStageMetric(stage, stageData.signupRequestsNumber);
          return {
            ...baseMetric,
            dropPercentage: stageData.dropPercentage,
          };
        });

        const total = metricsData[0]?.signupRequestsNumber || 0;
        setTotalRequests(total);
        setMetrics(metricsData);
      } catch (err) {
        setError('Failed to fetch signup stage metrics');
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
  }, [fromDate, toDate, selectedAgent?.id, selectedBank,selectedAppType]);

  return { metrics, totalRequests, loading, error };
}
