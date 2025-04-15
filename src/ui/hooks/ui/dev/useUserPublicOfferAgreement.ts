import { useEffect, useState } from 'react';
import { diContainer } from '@/core/di/setup';
import { UserPublicOfferAgreement } from '@/domain/users/dev/entities/UserPublicOfferAgreement';
import { GetUserPublicOfferAgreement } from '@/domain/users/dev/useCases/GetUserPublicOfferAgreement';

export const useUserPublicOfferAgreement = (userId?: string) => {
  const [agreement, setAgreement] = useState<UserPublicOfferAgreement | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) {
      setAgreement(null);
      setLoading(false);
      return;
    }
    const fetchUserVouchers = async () => {
      setLoading(true);
      setError(null);
      const useCase = diContainer.get<GetUserPublicOfferAgreement>(
        'GetDevUserPublicOfferAgreements'
      );
      try {
        const publicOfferAgreement = await useCase.execute(userId);
        setAgreement(publicOfferAgreement);
      } catch (error) {
        setError('Error fetching public offer agreement');
        console.error('Error fetching public offer agreement:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserVouchers();
  }, [userId]);

  return { agreement, loading, error };
};
