'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';
import { useTranslations } from 'next-intl';
import FilterLinesIcon from '@/../public/images/icons/dashboard/filterLines.svg';
import { Link } from '@/i18n/routing';
import { UserFilterModal } from '@/ui/components/Dashboard/Users/dev/UserFilterModal';
import { UsersTable } from '@/ui/components/Dashboard/Users/dev/UsersTable';

const UserManagement = () => {
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [filters, setFilters] = useState<{
    signUpRequestId?: string;
    documentTypeId?: string;
    pinflSearch?: string;
  }>({});
  const t = useTranslations();

  const toggleFilterModal = () => {
    setIsFilterModalOpen((prev) => !prev);
  };

  const handleApplyFilters = (
    signUpRequestId?: string,
    documentTypeId?: string,
    pinflSearch?: string
  ) => {
    setFilters({ signUpRequestId, documentTypeId, pinflSearch });
    setIsFilterModalOpen(false);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="p-6 flex justify-between items-center">
        <Link href="/dashboard" className="flex items-center gap-2 cursor-pointer">
          <ArrowLeft /> {t('Buttons.back')}
        </Link>
        <div>
          <button
            type="button"
            className="border border-gray-300 rounded-full p-2 cursor-pointer"
            onClick={toggleFilterModal}
          >
            <Image src={FilterLinesIcon} alt="Filter lines" width={24} height={24} />
          </button>
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

export default UserManagement;
