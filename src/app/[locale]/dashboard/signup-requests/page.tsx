'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';
import { useTranslations } from 'use-intl';
import FilterLinesIcon from '@/../public/images/icons/dashboard/filterLines.svg';
import { Link } from '@/i18n/routing';
import { SignupRequestsFilterModal } from '@/ui/components/Dashboard/SignupRequests/SignupRequestsFilterModal';
import { SignUpRequestsTable } from '@/ui/components/Dashboard/SignupRequests/SignupRequestsTable';

const SignUpRequests = () => {
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [filters, setFilters] = useState<{
    createdAtFrom?: string;
    createdAtTo?: string;
    pinflSearch?: string;
    statuses?: string;
  }>({});
  const t = useTranslations();

  const toggleFilterModal = () => {
    setIsFilterModalOpen((prev) => !prev);
  };

  const handleApplyFilters = (
    createdAtFrom?: string,
    createdAtTo?: string,
    pinflSearch?: string,
    statuses?: string
  ) => {
    setFilters({ createdAtFrom, createdAtTo, pinflSearch, statuses });
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
        <SignUpRequestsTable filters={filters} />
      </div>

      {/* Filter Modal */}
      <SignupRequestsFilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        onApply={handleApplyFilters}
      />
    </div>
  );
};

export default SignUpRequests;
