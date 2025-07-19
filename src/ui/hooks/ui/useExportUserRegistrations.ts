import { useState } from 'react';
import { ApiClient } from '@/core/ApiClient';

export const useExportUserRegistrations = () => {
  const [loading, setLoading] = useState<'pdf' | 'excel' | null>(null);
  const [error, setError] = useState<string | null>(null);

  const exportUserRegistrations = async (
    params: Record<string, string>,
    format: 'pdf' | 'excel'
  ) => {
    setLoading(format);
    setError(null);
    try {
      const blob = await ApiClient.shared.exportUserRegistrationsReport({
        ...params,
        format,
      });
      
      // Create download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `user-registrations-${format}-${new Date().toISOString().split('T')[0]}.${format}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      
      return blob;
    } catch (err: any) {
      setError(err.message || 'Export failed');
      throw err;
    } finally {
      setLoading(null);
    }
  };

  return {
    exportUserRegistrations,
    loading,
    error,
  };
}; 