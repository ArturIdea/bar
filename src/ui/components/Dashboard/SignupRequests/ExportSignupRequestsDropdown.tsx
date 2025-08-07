import React from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import DotsVerticalIcon from '@/../public/images/icons/dashboard/dotsVertical.svg';
import { useExportRegistrationRequests } from '@/ui/hooks/ui/useExportRegistrationRequests';
import { useAgent } from '@/contexts/AgentContext';
import { useBankFilterStore } from '@/ui/stores/useBankFilterStore';
import { useAppTypeFilterStore } from '@/ui/stores/useAppTypeFilterStore';
import { useDateRangeStore } from '@/ui/stores/useDateRangeStore';

const ExportSignupRequestsDropdown: React.FC<{ filters: any }> = ({ filters }) => {
  const [open, setOpen] = React.useState(false);
  const t = useTranslations();
  const { exportRegistrationRequests, loading, error } = useExportRegistrationRequests();
  const { selectedAgent } = useAgent();
  const selectedBank = useBankFilterStore((state) => state.selectedBank);
  const selectedAppType = useAppTypeFilterStore((state) => state.selectedAppType);
  const { fromDate, toDate } = useDateRangeStore();

  const handleExport = async (format: 'pdf' | 'excel') => {
    try {
      const params: Record<string, string> = {};
      
      params.fromDate = fromDate;
      params.toDate = toDate;
      
      if (filters.pinflSearch) { params.pinfl = filters.pinflSearch; }
      if (filters.statuses) { params.statuses = filters.statuses; }
      
      // Add optional parameters
      if (selectedAgent) { 
        params.userId = selectedAgent.id || selectedAgent.toString();
      }
      if (selectedBank) { params.selectedBank = selectedBank; }
      if (selectedAppType) { params.selectedAppType = selectedAppType; }
      
      const blob = await exportRegistrationRequests(params, format);
      const fileName = `${t('Statistics.requests')}_${Date.now()}.${format === 'pdf' ? 'pdf' : 'xlsx'}`;
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      // Optionally show error
      // eslint-disable-next-line no-console
      console.error('Export failed', err);
    } finally {
      setOpen(false);
    }
  };

  return (
    <div className="relative">
      <button
        type="button"
        className="text-gray-500 hover:text-gray-700 cursor-pointer flex items-center border rounded-full px-3 py-2 bg-white"
        onClick={() => setOpen((v) => !v)}
        disabled={loading !== null}
      >
        <Image src={DotsVerticalIcon} alt="vertical dots" className="h-5 w-5" />
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded-lg shadow-xl z-10">
          <button
            type="button"
            onClick={() => handleExport('excel')}
            className="block w-full px-4 py-2 text-left hover:bg-gray-100 cursor-pointer"
            disabled={loading === 'excel'}
          >
            {loading === 'excel' ? t('Navbar.Exporting') : t('Buttons.exportToExcel')}
          </button>
          <button
            type="button"
            onClick={() => handleExport('pdf')}
            className="block w-full px-4 py-2 text-left hover:bg-gray-100 cursor-pointer"
            disabled={loading === 'pdf'}
          >
            {loading === 'pdf' ? t('Navbar.Exporting') : t('Buttons.exportToPDF')}
          </button>
          {error && (
            <div className="px-4 py-2 text-red-500 text-xs">{error}</div>
          )}
        </div>
      )}
    </div>
  );
};

export default ExportSignupRequestsDropdown; 