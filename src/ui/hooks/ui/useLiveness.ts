import { useEffect, useState } from 'react';
import { diContainer } from '@/core/di/setup';
import { Liveness } from '@/domain/liveness/entities/Liveness';
import { GetLivenessUseCase } from '@/domain/liveness/useCases/GetLiveness';

export const useLiveness = () => {
  const [liveness, setLiveness] = useState<Liveness[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    const useCase = diContainer.get<GetLivenessUseCase>('GetLiveness');

    const fetchLiveness = async () => {
      if (!isMounted) {
        return;
      }
      setLoading(true);
      setError(null);
      try {
        const data = await useCase.execute();
        if (isMounted) {
          setLiveness(data);
        }
      } catch (err) {
        if (isMounted) {
          setError('Failed to fetch liveness data');
        }
        console.error(err);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };
    fetchLiveness();

    const intervalId = setInterval(fetchLiveness, 30_000);

    return () => {
      isMounted = false;
      clearInterval(intervalId);
    };
  }, []);

  return { liveness, loading, error };
};
