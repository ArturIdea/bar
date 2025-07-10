import { useEffect, useRef, useState } from 'react';
import { ChevronDown, X } from 'lucide-react';
import { useAppTypeFilterStore } from '@/ui/stores/useAppTypeFilterStore';
import { useTranslations } from 'next-intl';

export const AppTypeFilter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { selectedAppType, setSelectedAppType } = useAppTypeFilterStore();
  const t = useTranslations();

  const appTypes = [
    { name: 'ALL', displayName: t('Navbar.AllApps') },
    { name: 'AGENT_APP', displayName: t('Charts.AGENT_APP') },
    { name: 'CITIZEN_APP', displayName: t('Charts.CITIZEN_APP') },
    // { name: 'AGENT_PORTAL', displayName: 'Agent Portal' },
    { name: 'XALQ_FILE', displayName: t('Charts.XALQ_PORTAL') },
    { name: 'HTTP_CLIENT', displayName: t('Charts.HTTP_CLIENT') },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (appTypeName: string) => {
    if (appTypeName === 'ALL') {
      setSelectedAppType(null);
    } else {
      setSelectedAppType(appTypeName);
    }
    setIsOpen(false);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedAppType(null);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 border bg-[#fff] text-[#0B0B22] border-gray-300 rounded-full py-2.5 px-4 hover:border-gray-400 transition-colors"
      >
        <span className="text-sm">
          {selectedAppType
            ? appTypes.find((type) => type.name === selectedAppType)?.displayName
            : t('Navbar.AllApps')}
        </span>
        {selectedAppType && (
          <button
            type="button"
            onClick={handleClear}
            className="tbg-[#fff] text-[#0B0B22] hover:text-gray-700"
          >
            <X size={14} />
          </button>
        )}
        <ChevronDown size={14} className="bg-[#fff] text-[#0B0B22]" />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-full min-w-[160px] bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          {appTypes.map((appType) => (
            <button
              key={appType.name}
              type="button"
              onClick={() => handleSelect(appType.name)}
              className={`w-full px-4 py-2 text-[12px] text-left text-sm hover:bg-gray-100 ${
                selectedAppType === appType.name || (!selectedAppType && appType.name === 'ALL')
                  ? 'bg-gray-50 text-primary'
                  : 'text-gray-700'
              }`}
            >
              {appType.displayName}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
