import { Liveness } from '../entities/Liveness';
import { LivenessRepository } from '../repositories/LivenessRepository';

export class GetLivenessUseCase {
  constructor(private livenessRepository: LivenessRepository) {}

  async execute(): Promise<Liveness[]> {
    return this.livenessRepository.getLiveness();
  }
}
