import { useState, useRef, useEffect } from 'react';
import { ChevronDown, X } from 'lucide-react';
import { useAppTypeFilterStore } from '@/ui/stores/useAppTypeFilterStore';

const appTypes = [
  { name: 'ALL', displayName: 'All Apps' },
  { name: 'AGENT_APP', displayName: 'Agent App' },
  { name: 'CITIZEN_APP', displayName: 'Citizen App' },
  // { name: 'AGENT_PORTAL', displayName: 'Agent Portal' },
  { name: 'XALQ_FILE', displayName: 'XALQ Pre Approved' },
  { name: 'HTTP_CLIENT', displayName: 'Manual addition' }
];

export const AppTypeFilter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { selectedAppType, setSelectedAppType } = useAppTypeFilterStore();

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
        className="flex items-center gap-2 border border-gray-300 rounded-full py-2.5 px-4 hover:border-gray-400 transition-colors"
      >
        <span className="text-sm text-gray-700">
          {selectedAppType ? appTypes.find(type => type.name === selectedAppType)?.displayName : 'All Apps'}
        </span>
        {selectedAppType && (
          <button
            type="button"
            onClick={handleClear}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={14} />
          </button>
        )}
        <ChevronDown size={14} className="text-gray-500" />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-full min-w-[160px] bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          {appTypes.map((appType) => (
            <button
              key={appType.name}
              type="button"
              onClick={() => handleSelect(appType.name)}
              className={`w-full px-4 py-2 text-[12px] text-left text-sm hover:bg-gray-100 ${
                (selectedAppType === appType.name || (!selectedAppType && appType.name === 'ALL')) 
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