import { ApiClient } from '@/core/ApiClient';

interface Agent {
  id: string;
  fullName: string;
}

export const agentService = {
  async searchAgentByPinfl(pinfl: string): Promise<Agent> {
    const response = await ApiClient.shared.get<Agent>(`/api/admin/check-pinfl?pinfl=${pinfl}`);
    return response.data;
  }
}; 