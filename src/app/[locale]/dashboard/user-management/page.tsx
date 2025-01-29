'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import FilterLinesIcon from '@/../public/images/icons/dashboard/filterLines.svg';
import { FilterModal } from '@/ui/components/Dashboard/FilterModal';
import { UsersTable } from '@/ui/components/Dashboard/Users/UsersTable';

const UserManagementPage = () => {
  const router = useRouter();
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [filters, setFilters] = useState<{
    createdAtFrom?: string;
    createdAtTo?: string;
    pinflSearch?: string;
  }>({});

  const toggleFilterModal = () => {
    setIsFilterModalOpen((prev) => !prev);
  };

  const handleGoBack = () => {
    router.push('/en/dashboard');
  };

  const handleApplyFilters = (
    createdAtFrom?: string,
    createdAtTo?: string,
    pinflSearch?: string
  ) => {
    setFilters({ createdAtFrom, createdAtTo, pinflSearch });
    setIsFilterModalOpen(false);
  };

  return (
    <div className="min-h-screen">
      <div className="p-6 flex justify-between items-center">
        <button
          type="button"
          className="flex items-center gap-2 cursor-pointer"
          onClick={handleGoBack}
        >
          <ArrowLeft /> Back
        </button>
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
      <UsersTable filters={filters} />

      {/* Filter Modal */}
      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={toggleFilterModal}
        onApply={handleApplyFilters}
      />
    </div>
  );
};

export default UserManagementPage;
