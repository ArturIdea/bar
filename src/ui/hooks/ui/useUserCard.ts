import { useEffect, useState } from 'react';
import { diContainer } from '@/core/di/setup';
import { UserCard } from '@/domain/users/entities/UserCard';
import { GetUserCardsUseCase } from '@/domain/users/useCases/GetUserCards';

export const useUserCard = (userId?: string) => {
  const [userCard, setUserCard] = useState<UserCard | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) {
      return;
    }

    const fetchUserCard = async () => {
      setLoading(true);
      setError(null);
      const useCase = diContainer.get<GetUserCardsUseCase>('GetUserCard');

      try {
        const userCardData = await useCase.execute(userId);
        setUserCard(userCardData);
      } catch (err) {
        setError('Failed to fetch user data');
      } finally {
        setLoading(false);
      }
    };

    fetchUserCard();
  }, [userId]);

  return { userCard, loading, error };
};
