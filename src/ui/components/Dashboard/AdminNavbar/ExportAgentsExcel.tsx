import React, { useState } from 'react';
import { ApiClient } from '@/core/ApiClient';
import { useDateRangeStore } from '@/ui/stores/useDateRangeStore';
import { useBankFilterStore } from '@/ui/stores/useBankFilterStore';
import { useAppTypeFilterStore } from '@/ui/stores/useAppTypeFilterStore';
import { useTranslations } from 'next-intl';

export const ExportAgentsExcel: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const t = useTranslations();
  const fromDate = useDateRangeStore((s) => s.fromDate);
  const toDate = useDateRangeStore((s) => s.toDate);
  const selectedBank = useBankFilterStore((s) => s.selectedBank);
  const selectedAppType = useAppTypeFilterStore((s) => s.selectedAppType);

  const handleExport = async () => {
    setLoading(true);
    setError(null);
    try {
      const params: Record<string, string> = {};
      if (fromDate) { params.fromDate = fromDate; }
      if (toDate) { params.toDate = toDate; }
      if (selectedBank) { params.bankType = selectedBank; }
      if (selectedAppType) { params.onboardingChannel = selectedAppType; }
      // If pinfl becomes available globally, add: params.pinfl = pinfl;
      const excelBlob = await ApiClient.shared.exportAgentsReportExcel(params);
      const url = window.URL.createObjectURL(excelBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'agents_report.xlsx';
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      setError('Failed to export Excel');
      // eslint-disable-next-line no-console
      console.error('Failed to export Excel', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={handleExport}
        disabled={loading}
        className="bg-[#fff] text-[#0B0B22] px-3 py-2 rounded-full border text-sm"
      >
        {loading ? t('Navbar.Exporting') : t('Navbar.ExportExcel')}
      </button>
      <div className="hidden">
        {error && <span className="text-red-500 text-xs ml-2">{error}</span>}
      </div>
    </div>
  );
}; 