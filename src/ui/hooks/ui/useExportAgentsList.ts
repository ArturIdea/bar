import { useState } from 'react';
import { ApiClient } from '@/core/ApiClient';

export const useExportAgentsList = () => {
  const [loading, setLoading] = useState<'pdf' | 'excel' | null>(null);
  const [error, setError] = useState<string | null>(null);


  const exportAgentsList = async (params: Record<string, string>, format: 'pdf' | 'excel') => {
    setLoading(format);
    setError(null);
    try {
      const blob = await ApiClient.shared.exportAgentsListReport({
        ...params,
        format,
      });
      return blob;
    } catch (err: any) {
      setError(err.message || 'Export failed');
      throw err;
    } finally {
      setLoading(null);
    }
  };

  return { exportAgentsList, loading, error };
};
