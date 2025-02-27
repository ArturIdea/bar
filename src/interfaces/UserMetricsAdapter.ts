import { UserMetric } from '@/domain/users/entities/UserMetric';

export const UserMetricsAdapter = {
  toDomain(raw: any): UserMetric {
    return new UserMetric(raw.id, raw.date, raw.users);
  },

  toDomainList(rawList: any[]): UserMetric[] {
    return rawList.map((raw) => new UserMetric(raw.id, raw.date, raw.users));
  },
};
