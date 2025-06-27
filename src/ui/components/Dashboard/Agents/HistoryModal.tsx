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
        `/api/admin/user/created-by?createdById=${createdById}`
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
    <div className="p-3 pt-0">
      {loading ? (
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#08678E]" />
        </div>
      ) : history?.length === 0 ? (
        <div className="flex justify-center items-center h-32">
          <p className="text-gray-500 text-lg">Data not found</p>
        </div>
      ) : (
        <div className="">
          {history?.map((user) => (
            <div key={user.id} className="border-b-1 pt-3 pb-3 pr-1 pl-1 hover:bg-gray-50">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-[#0B0B22] text-[14px] font-medium leading-normal">{user?.fullName}</h3>
                  <p className="text-[#9D9DA7] text-[14px] font-normal leading-normal">PINFL: {user?.pinfl}</p>
                  <p className="text-[#9D9DA7] text-[14px] font-normal leading-normal">Email: {user?.email}</p>
                </div>
                <div className="text-right">
                  <p className="text-[#9D9DA7] text-[14px] font-normal leading-normal">
                    Created: {new Date(user?.createdAt).toLocaleDateString()}
                  </p>
                  <p className="text-[#9D9DA7] text-[14px] font-normal leading-normal">
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

