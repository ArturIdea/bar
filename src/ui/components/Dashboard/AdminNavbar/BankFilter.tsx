import { useEffect, useRef, useState } from 'react';
import { ChevronDown, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useBankFilterStore } from '@/ui/stores/useBankFilterStore';

export const BankFilter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const t = useTranslations();
  const { selectedBank, setSelectedBank } = useBankFilterStore();

  const banks = [
    { name: 'ALL', label: t('Navbar.All') },
    { name: 'XALQ', label: t('Navbar.XALQ') },
    { name: 'ALOQA', label: t('Navbar.ALOQA') },
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

  const handleSelect = (bankName: string) => {
    if (bankName === 'ALL') {
      setSelectedBank(null);
    } else {
      setSelectedBank(bankName);
    }
    setIsOpen(false);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedBank(null);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-[#fff] text-[#0B0B22] border border-gray-300 rounded-full py-2.5 px-4 hover:border-gray-400 transition-colors"
      >
        <span className="text-sm">
          {selectedBank
            ? banks.find((bank) => bank.name === selectedBank)?.label
            : t('Navbar.AllBanks')}
        </span>
        {selectedBank && (
          <button
            type="button"
            onClick={handleClear}
            className="bg-[#fff] text-[#0B0B22] hover:text-gray-700"
          >
            <X size={14} />
          </button>
        )}
        <ChevronDown size={14} className="bg-[#fff] text-[#0B0B22]" />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          {banks.map((bank) => (
            <button
              key={bank.name}
              type="button"
              onClick={() => handleSelect(bank.name)}
              className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-100 ${
                selectedBank === bank.name || (!selectedBank && bank.name === 'ALL')
                  ? 'bg-gray-50 text-primary'
                  : 'text-gray-700'
              }`}
            >
              {bank.name === 'ALL' ? t('Navbar.AllBanks') : bank.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
