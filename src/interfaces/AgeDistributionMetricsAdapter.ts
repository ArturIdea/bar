import { AgeDistributionMetric } from '@/domain/metrics/ageDistributionMetrics/entities/AgeDistributionMetric';

export const AgeDistributionAdapter = {
  toDomain(raw: any): AgeDistributionMetric {
    return new AgeDistributionMetric(
      raw.ageDistribution?.R14_19 ?? 0,
      raw.ageDistribution?.R20_29 ?? 0,
      raw.ageDistribution?.R30_49 ?? 0,
      raw.ageDistribution?.R50_69 ?? 0,
      raw.ageDistribution?.R70_PLUS ?? 0
    );
  },
};
