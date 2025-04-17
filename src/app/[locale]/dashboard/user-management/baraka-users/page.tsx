'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ArrowLeft, Search } from 'lucide-react';
import { useTranslations } from 'next-intl';
import FilterLinesIcon from '@/../public/images/icons/dashboard/filterLines.svg';
import { Link } from '@/i18n/routing';
import { UserFilterModal } from '@/ui/components/Dashboard/Users/UserFilterModal';
import { UsersTable } from '@/ui/components/Dashboard/Users/UsersTable';

const BarakaUsersPage = () => {
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [filters, setFilters] = useState<{
    roles?: string;
    createdAtFrom?: string;
    createdAtTo?: string;
    pinflSearch?: string;
    usernameSearch?: string;
  }>({});
  const [quickSearch, setQuickSearch] = useState(filters.pinflSearch || '');
  const t = useTranslations();

  const toggleFilterModal = () => {
    setIsFilterModalOpen((prev) => !prev);
  };

  const handleApplyFilters = (
    roles?: string,
    createdAtFrom?: string,
    createdAtTo?: string,
    pinflSearch?: string,
    usernameSearch?: string
  ) => {
    setFilters({ roles, createdAtFrom, createdAtTo, pinflSearch, usernameSearch });
    setQuickSearch(pinflSearch || '');
    setIsFilterModalOpen(false);
  };

  const handleQuickSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuickSearch(event.target.value);
  };

  const handleQuickSearchKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      setFilters((prevFilters) => ({
        ...prevFilters,
        pinflSearch: quickSearch,
      }));
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="p-6 flex justify-between items-center">
        <Link href="/dashboard" className="flex items-center gap-2 cursor-pointer">
          <ArrowLeft /> {t('Buttons.back')}
        </Link>
        <div className="flex items-center gap-2 ">
          <div className="flex items-center gap-2 border border-gray-300 rounded-full py-2 px-4">
            <Search />
            <input
              type="text"
              placeholder={t('Filter.pinfl')}
              value={quickSearch}
              onChange={handleQuickSearchChange}
              onKeyDown={handleQuickSearchKeyDown}
              className="outline-none bg-transparent text-sm placeholder:text-gray-400"
            />
            <button type="button" className=" cursor-pointer" onClick={toggleFilterModal}>
              <Image src={FilterLinesIcon} alt="Filter lines" width={24} height={24} />
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-hidden">
        <UsersTable filters={filters} />
      </div>

      <UserFilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        onApply={handleApplyFilters}
      />
    </div>
  );
};

export default BarakaUsersPage;
