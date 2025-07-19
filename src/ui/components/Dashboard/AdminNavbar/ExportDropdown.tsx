/* eslint-disable no-console */
import React, { useState } from 'react';
import { ChevronDown, FileText, FileSpreadsheet } from 'lucide-react';
import { ApiClient } from '@/core/ApiClient';
import { useDateRangeStore } from '@/ui/stores/useDateRangeStore';
import { useBankFilterStore } from '@/ui/stores/useBankFilterStore';
import { useAppTypeFilterStore } from '@/ui/stores/useAppTypeFilterStore';
import { useTranslations } from 'next-intl';

export const ExportDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const t = useTranslations();
  const fromDate = useDateRangeStore((s) => s.fromDate);
  const toDate = useDateRangeStore((s) => s.toDate);
  const selectedBank = useBankFilterStore((s) => s.selectedBank);
  const selectedAppType = useAppTypeFilterStore((s) => s.selectedAppType);

  const getExportParams = () => {
    const params: Record<string, string> = {};
    if (fromDate) { params.fromDate = fromDate; }
    if (toDate) { params.toDate = toDate; }
    if (selectedBank) { params.bankType = selectedBank; }
    if (selectedAppType) { params.onboardingChannel = selectedAppType; }
    return params;
  };

  const handleExportPDF = async () => {
    setLoading(true);
    setError(null);
    try {
      const params = getExportParams();
      const pdfBlob = await ApiClient.shared.exportAgentsReportPDF(params);
      const url = window.URL.createObjectURL(pdfBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'agents_report.pdf';
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
      setIsOpen(false);
    } catch (error) {
      setError('Failed to export PDF');
      console.error('Failed to export PDF', error);
    } finally {
      setLoading(false);
    }
  };

  const handleExportExcel = async () => {
    setLoading(true);
    setError(null);
    try {
      const params = getExportParams();
      const excelBlob = await ApiClient.shared.exportAgentsReportExcel(params);
      const url = window.URL.createObjectURL(excelBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'agents_report.xlsx';
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
      setIsOpen(false);
    } catch (error) {
      setError('Failed to export Excel');
      console.error('Failed to export Excel', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        disabled={loading}
        className="bg-[#fff] text-[#0B0B22] px-3 py-2 rounded-full border text-sm flex items-center gap-2 hover:bg-gray-50 transition-colors"
      >
        {loading ? t('Navbar.Exporting') : t('Navbar.Export')}
        <ChevronDown size={16} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 shadow-lg rounded-lg py-1 z-50">
          <button
            type="button"
            onClick={handleExportPDF}
            disabled={loading}
            className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FileText size={16} className="text-red-500" />
            {t('Navbar.ExportPDF')}
          </button>
          <button
            type="button"
            onClick={handleExportExcel}
            disabled={loading}
            className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FileSpreadsheet size={16} className="text-green-500" />
            {t('Navbar.ExportExcel')}
          </button>
        </div>
      )}
      
      {error && (
        <div className="absolute top-full mt-1 text-red-500 text-xs">
          {error}
        </div>
      )}
    </div>
  );
}; 