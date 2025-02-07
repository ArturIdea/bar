import { useEffect, useState } from 'react';
import { diContainer } from '@/core/di/setup';
import { Statistics } from '@/domain/statistics/entities/Statistics';
import { GetStatisticsUseCase } from '@/domain/statistics/useCases/GetStatistics';

const getFirstDayOfMonth = (date: Date) => {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-01`;
};

export const useStatistics = () => {
  const [currentStats, setCurrentStats] = useState<Statistics | null>(null);
  const [previousStats, setPreviousStats] = useState<Statistics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStatistics = async () => {
      const useCase = diContainer.get<GetStatisticsUseCase>('GetStatistics');

      const now = new Date();
      const currentMonth = getFirstDayOfMonth(now);

      const previousMonth = getFirstDayOfMonth(new Date(now.getFullYear(), now.getMonth() - 1, 1));

      try {
        const [currentResult, previousResult] = await Promise.all([
          useCase.execute(currentMonth, currentMonth, currentMonth),
          useCase.execute(previousMonth, previousMonth, previousMonth),
        ]);

        setCurrentStats(currentResult);
        setPreviousStats(previousResult);
      } catch (err) {
        setError('Failed to fetch statistics');
      } finally {
        setLoading(false);
      }
    };

    fetchStatistics();
  }, []);

  return { currentStats, previousStats, loading, error };
};
