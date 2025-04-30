import { Liveness } from '../entities/Liveness';

export interface LivenessRepository {
  getLiveness: () => Promise<Liveness[]>;
}
