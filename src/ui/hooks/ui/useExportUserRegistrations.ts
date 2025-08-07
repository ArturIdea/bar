import { useState } from 'react';
import { ApiClient } from '@/core/ApiClient';
import { useTranslations } from 'next-intl';
import React from 'react';

export const useExportUserRegistrations = () => {
  const [loading, setLoading] = useState<'pdf' | 'excel' | null>(null);
  const [error, setError] = useState<string | null>(null);
   const t = useTranslations();

  /**
   * Export user registrations with language detection from URL if not provided.
   * @param params - API params
   * @param format - 'pdf' | 'excel'
   * @param language - optional, if not provided will be detected from URL
   */
  const exportUserRegistrations = async (
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
          // Normalize to API expected value
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

      const blob = await ApiClient.shared.exportUserRegistrationsReport({
        ...params,
        format,
        language: lang,
      });

      // Create download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${t('UserManagement.title2')}-${format}-${new Date().toISOString().split('T')[0]}.${format}`;
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