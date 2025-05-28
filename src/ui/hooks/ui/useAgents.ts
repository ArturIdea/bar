import { useEffect, useState } from 'react';
import { diContainer } from '@/core/di/setup';
import { Agent } from '@/domain/agents/entities/Agent';
import { GetAgentsUseCase } from '@/domain/agents/useCases/GetAgent';

export const useAgents = () => {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAgents = async () => {
      setLoading(true);
      setError(null);

      const useCase = diContainer.get<GetAgentsUseCase>('GetAgents');

      try {
        const data = await useCase.execute();
        setAgents(data);
      } catch (err) {
        setError('Failed to fetch agents');
        // eslint-disable-next-line no-console
        console.error(err);
        throw err;
      } finally {
        setLoading(false);
      }
    };

    fetchAgents();
  }, []);

  return { agents, loading, error };
};
