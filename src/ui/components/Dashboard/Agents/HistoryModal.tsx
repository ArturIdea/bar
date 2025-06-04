import { useEffect, useState } from 'react';
import { ApiClient } from '@/core/ApiClient';

interface UserHistory {
  id: string;
  fullName: string;
  email: string;
  pinfl: string;
  createdAt: string;
  dateOfBirth: string;
}

interface ApiResponse {
  content: UserHistory[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}

interface HistoryModalProps {
  createdById: string;
  onBack: () => void;
}

export const HistoryModal = ({ createdById }: HistoryModalProps) => {
  const [history, setHistory] = useState<UserHistory[]>([]);
  const [loading, setLoading] = useState(false);
  const apiClient = ApiClient.shared;

  useEffect(() => {
    if (createdById) {
      fetchHistory();
    }
  }, [createdById]);

  const fetchHistory = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get<ApiResponse>(
        `/api/agent/user/created-by?createdById=${createdById}`
      );
      setHistory(response.data.content);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error fetching history:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      {loading ? (
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#08678E]" />
        </div>
      ) : history?.length === 0 ? (
        <div className="flex justify-center items-center h-32">
          <p className="text-gray-500 text-lg">Data not found</p>
        </div>
      ) : (
        <div className="space-y-4">
          {history?.map((user) => (
            <div key={user.id} className="border rounded-lg p-4 hover:bg-gray-50">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-lg">{user?.fullName}</h3>
                  <p className="text-gray-600">PINFL: {user?.pinfl}</p>
                  <p className="text-gray-600">Email: {user?.email}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">
                    Created: {new Date(user?.createdAt).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-gray-500">
                    DOB: {new Date(user?.dateOfBirth).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
