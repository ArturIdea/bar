import { useEffect, useState } from 'react';
import { ApiClient } from '@/core/ApiClient';
import { useUserRoles } from '@/ui/hooks/ui/useUserRoles';

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

export const HistoryModal = ({ createdById, onBack }: HistoryModalProps) => {
  const [history, setHistory] = useState<UserHistory[]>([]);
  const [loading, setLoading] = useState(false);
  const apiClient = ApiClient.shared;
  const { isSuperAdmin } = useUserRoles();

  useEffect(() => {
    if (createdById) {
      fetchHistory();
    }
  }, [createdById, isSuperAdmin]);

  const fetchHistory = async () => {
    try {
      setLoading(true);
      const basePath = isSuperAdmin ? '/api/superadmin' : '/api/agent';
      const response = await apiClient.get<ApiResponse>(
        `${basePath}/user/created-by?createdById=${createdById}`
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
      <div className="flex justify-between items-center gap-4 mb-6">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center justify-between gap-2 text-[#08678E] hover:text-[#064d66]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M15 4L7 12L15 20" />
          </svg>
          <span>Back</span>
        </button>
        <h2 className="text-xl font-semibold">Agent User History</h2>
      </div>

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
