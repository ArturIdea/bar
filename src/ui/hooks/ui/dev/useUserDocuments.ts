import { useEffect, useState } from 'react';
import { diContainer } from '@/core/di/setup';
import { UserDocument } from '@/domain/users/dev/entities/UserDocument';
import { GetUserDocuments } from '@/domain/users/dev/useCases/GetUserDocuments';

export const useUserDocuments = (userId?: string) => {
  const [documents, setDocuments] = useState<UserDocument[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) {
      setDocuments(null);
      setLoading(false);
      return;
    }

    const fetchUserDocuments = async () => {
      setLoading(true);
      setError(null);
      const useCase = diContainer.get<GetUserDocuments>('GetDevUserDocuments');
      try {
        const userDocumentsData = await useCase.execute(userId);
        setDocuments(userDocumentsData);
      } catch (error) {
        setError('Error fetching documents');
        console.error('Error fetching documents:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDocuments();
  }, [userId]);

  return { documents, loading, error };
};
