import { Liveness } from '@/domain/liveness/entities/Liveness';

export const LivenessAdapter = {
  toDomain(raw: any): Liveness {
    return new Liveness(raw.instanceName, new Date(raw.lastCheckedAt), raw.status);
  },

  toDomainList(rawList: any[]): Liveness[] {
    return rawList.map((raw) => LivenessAdapter.toDomain(raw));
  },
};
