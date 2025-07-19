/* eslint-disable no-console */
import React from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import DotsVerticalIcon from '@/../public/images/icons/dashboard/dotsVertical.svg';
import { useExportUserRegistrations } from '@/ui/hooks/ui/useExportUserRegistrations';
import { useAgent } from '@/contexts/AgentContext';
import { useBankFilterStore } from '@/ui/stores/useBankFilterStore';
import { useAppTypeFilterStore } from '@/ui/stores/useAppTypeFilterStore';
import { useDateRangeStore } from '@/ui/stores/useDateRangeStore';

const ExportUserRegistrationsDropdown: React.FC<{ filters: any }> = ({ filters }) => {
  const [open, setOpen] = React.useState(false);
  const t = useTranslations();
  const { exportUserRegistrations, loading, error } = useExportUserRegistrations();
  const { selectedAgent } = useAgent();
  const selectedBank = useBankFilterStore((state) => state.selectedBank);
  const selectedAppType = useAppTypeFilterStore((state) => state.selectedAppType);
  const { fromDate, toDate } = useDateRangeStore();

  const handleExport = async (format: 'pdf' | 'excel') => {
    try {
      const params: Record<string, string> = {};
      
      params.fromDate = fromDate;
      params.toDate = toDate;
      
      if (filters.registrationChannel) { params.registrationChannel = filters.registrationChannel; }
      if (filters.pinflSearch) { params.pinflSearch = filters.pinflSearch; }
      if (filters.usernameSearch) { params.usernameSearch = filters.usernameSearch; }

      // Add optional parameters
      if (selectedAgent) { 
        params.userId = selectedAgent.id || selectedAgent.toString();
      }
      if (selectedBank) { params.selectedBank = selectedBank; }
      if (selectedAppType) { params.selectedAppType = selectedAppType; }

      await exportUserRegistrations(params, format);
      setOpen(false);
    } catch (err) {
      console.error('Export failed:', err);
    }
  };

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (open && !(event.target as Element).closest('.export-dropdown')) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  return (
    <div className="relative export-dropdown">
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
            onClick={() => handleExport('pdf')}
            disabled={loading !== null}
            className="w-full px-4 py-2 text-left hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading === 'pdf' ? t('Navbar.Exporting') : t('Buttons.exportToPDF')}
          </button>
          <button
            type="button"
            onClick={() => handleExport('excel')}
            disabled={loading !== null}
            className="w-full px-4 py-2 text-left hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading === 'excel' ? t('Navbar.Exporting') : t('Buttons.exportToExcel')}
          </button>
        </div>
      )}
      {error && (
        <div className="absolute right-0 mt-2 w-44 bg-red-50 border border-red-200 rounded-lg p-2 text-red-600 text-sm">
          {error}
        </div>
      )}
    </div>
  );
};

export default ExportUserRegistrationsDropdown; 