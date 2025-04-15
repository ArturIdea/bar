import { useEffect, useState } from 'react';
import { diContainer } from '@/core/di/setup';
import { UserBenefitBankAccount } from '@/domain/users/dev/entities/UserBenefitBankAccount';
import { GetUserBenefitBankAccounts } from '@/domain/users/dev/useCases/GetUserBenefitBankAccounts';

export const useUserBenefitBankAccount = (userId: string) => {
  const [bankAccounts, setBankAccounts] = useState<UserBenefitBankAccount[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUserBenefitBankAccount() {
      setLoading(true);
      const useCase = diContainer.get<GetUserBenefitBankAccounts>('GetDevUserBenefitBankAccount');
      try {
        const userBenefitBankData = await useCase.execute(userId);
        setBankAccounts(userBenefitBankData);
      } catch (error) {
        setError('Error fetching benefits');
        console.error('Error fetching benefits:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchUserBenefitBankAccount();
  }, [userId]);

  return { bankAccounts, loading, error };
};
