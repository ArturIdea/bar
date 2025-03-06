'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import DotsVerticalIcon from '@/../public/images/icons/dashboard/dotsVertical.svg';
import { exportToExcel } from '@/core/utils/exportToExcel';
import { exportToPDF } from '@/core/utils/exportToPdf';
import { useClickOutside } from '@/ui/hooks/ui/useClickOutside';

interface ExportDropdownProps {
  chartData: any[];
  fileName: string;
  keysToExclude?: string[];
  labelMapping?: Record<string, string>;
}

export function ExportDropdown({
  chartData,
  fileName,
  keysToExclude = ['fill'],
  labelMapping = {},
}: ExportDropdownProps) {
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useClickOutside<HTMLDivElement>(() => {
    setDropdownOpen(false);
  });
  const t = useTranslations();

  // function to filter out unwanted keys
  const prepareDataForExport = (data: any[]) => {
    return data.map((item) => {
      const filteredItem: Record<string, any> = {};

      Object.keys(item).forEach((key) => {
        if (!keysToExclude.includes(key)) {
          const label = labelMapping[key];
          filteredItem[label] = item[key];
        }
      });

      return filteredItem;
    });
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const exportToExcelHandler = () => {
    const exportData = prepareDataForExport(chartData);
    exportToExcel(exportData, fileName);
    setDropdownOpen(false);
  };

  const exportToPDFHandler = () => {
    const exportData = prepareDataForExport(chartData);
    exportToPDF(exportData, fileName);
    setDropdownOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        className="text-gray-500 hover:text-gray-700 cursor-pointer"
        onClick={toggleDropdown}
      >
        <Image src={DotsVerticalIcon} alt="vertical dots" className="h-5 w-5" />
      </button>
      {dropdownOpen && (
        <div className="absolute right-0 mt-3 w-48 bg-white border border-gray-200 rounded-lg shadow-xl z-10">
          <button
            type="button"
            onClick={exportToExcelHandler}
            className="block w-full px-4 py-2 text-left hover:bg-gray-100 cursor-pointer"
          >
            {t('Buttons.exportToExcel')}
          </button>
          <button
            type="button"
            onClick={exportToPDFHandler}
            className="block w-full px-4 py-2 text-left hover:bg-gray-100 cursor-pointer"
          >
            {t('Buttons.exportToPDF')}
          </button>
        </div>
      )}
    </div>
  );
}
