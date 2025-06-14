import { useEffect, useState } from 'react';
import { diContainer } from '@/core/di/setup';
import { Statistics } from '@/domain/statistics/entities/Statistics';
import { GetStatisticsUseCase } from '@/domain/statistics/useCases/GetStatistics';
import { useAppTypeFilterStore } from '@/ui/stores/useAppTypeFilterStore';
import { useBankFilterStore } from '@/ui/stores/useBankFilterStore';

const getDateString = (date: Date) => {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
};

const getStartOfWeek = (date: Date) => {
  const day = date.getDay();
  const diff = date.getDate() - day + (day === 0 ? -6 : 1);
  return getDateString(new Date(date.setDate(diff)));
};

export const useStatistics = () => {
  const [currentStats, setCurrentStats] = useState<Statistics | null>(null);
  const [previousStats, setPreviousStats] = useState<Statistics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const selectedAppType = useAppTypeFilterStore((state) => state.selectedAppType);
  const selectedBank = useBankFilterStore((state) => state.selectedBank);

  useEffect(() => {
    const fetchStatistics = async () => {
      const useCase = diContainer.get<GetStatisticsUseCase>('GetStatistics');
      const now = new Date();

      const currentWeek = getStartOfWeek(now);

      const lastWeek = new Date();
      lastWeek.setDate(lastWeek.getDate() - 7);
      const previousWeek = getStartOfWeek(lastWeek);

      try {
        const [currentResult, previousResult] = await Promise.all([
          useCase.execute(
            currentWeek,
            currentWeek,
            currentWeek,
            currentWeek,
            currentWeek,
            selectedAppType || undefined,
            selectedBank || undefined
          ),
          useCase.execute(
            previousWeek,
            previousWeek,
            previousWeek,
            previousWeek,
            previousWeek,
            selectedAppType || undefined,
            selectedBank || undefined
          ),
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
  }, [selectedAppType, selectedBank]);

  return { currentStats, previousStats, loading, error };
};
