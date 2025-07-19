import React from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import DotsVerticalIcon from '@/../public/images/icons/dashboard/dotsVertical.svg';
import { useExportAgentsList } from '@/ui/hooks/ui/useExportAgentsList';
import { useAgent } from '@/contexts/AgentContext';
import { useBankFilterStore } from '@/ui/stores/useBankFilterStore';
import { useAppTypeFilterStore } from '@/ui/stores/useAppTypeFilterStore';
import { useDateRangeStore } from '@/ui/stores/useDateRangeStore';

const ExportAgentsListDropdown: React.FC<{ filters: any }> = ({ filters }) => {
  const [open, setOpen] = React.useState(false);
  const t = useTranslations();
  const { exportAgentsList, loading, error } = useExportAgentsList();
  const { selectedAgent } = useAgent();
  const selectedBank = useBankFilterStore((state) => state.selectedBank);
  const selectedAppType = useAppTypeFilterStore((state) => state.selectedAppType);
  const { fromDate, toDate } = useDateRangeStore();

  const handleExport = async (format: 'pdf' | 'excel') => {
    try {
      const params: Record<string, string> = {};
      
      // Use date range from the store
      params.fromDate = fromDate;
      params.toDate = toDate;
      
      if (filters.search) { params.search = filters.search; }
      if (filters.excludeZeroUsers !== undefined) { params.excludeZeroUsers = filters.excludeZeroUsers.toString(); }
      if (filters.bankType) { params.bankType = filters.bankType; }
      if (filters.onboardingChannel) { params.onboardingChannel = filters.onboardingChannel; }
      
      // Add optional parameters
      if (selectedAgent) { 
        params.userId = selectedAgent.id || selectedAgent.toString();
      }
      if (selectedBank) { params.selectedBank = selectedBank; }
      if (selectedAppType) { params.selectedAppType = selectedAppType; }
      
      const blob = await exportAgentsList(params, format);
      const fileName = `agents_list_${Date.now()}.${format === 'pdf' ? 'pdf' : 'xlsx'}`;
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

export default ExportAgentsListDropdown; 