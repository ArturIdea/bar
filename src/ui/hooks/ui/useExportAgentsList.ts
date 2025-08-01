import { useState } from 'react';
import { ApiClient } from '@/core/ApiClient';

export const useExportAgentsList = () => {
  const [loading, setLoading] = useState<'pdf' | 'excel' | null>(null);
  const [error, setError] = useState<string | null>(null);



  /**
   * Export agents list with language detection from URL if not provided.
   * @param params - API params
   * @param format - 'pdf' | 'excel'
   * @param language - optional, if not provided will be detected from URL
   */
  const exportAgentsList = async (
    params: Record<string, string>,
    format: 'pdf' | 'excel',
    language?: string
  ) => {
    setLoading(format);
    setError(null);
    try {
      let lang = language;
      if (!lang) {
        // Try to detect language from URL: expects /en/ or /uz-latn/ etc. after host
        const match = window.location.pathname.match(/^\/?([a-zA-Z\-_]+)/);
        if (match && match[1]) {
          if (match[1].toLowerCase() === 'en') {
            lang = 'en';
          } else if (match[1].toLowerCase().replace(/_/g, '-').startsWith('uz-latn')) {
            lang = 'uz_Ltn';
          } else {
            lang = match[1];
          }
        } else {
          lang = 'en'; // fallback
        }
      }

      const blob = await ApiClient.shared.exportAgentsListReport({
        ...params,
        format,
        language: lang,
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
