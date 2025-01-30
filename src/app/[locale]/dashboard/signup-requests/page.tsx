'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import FilterLinesIcon from '@/../public/images/icons/dashboard/filterLines.svg';
import { SignupRequestsFilterModal } from '@/ui/components/Dashboard/SignupRequests/SignupRequestsFilterModal';
import { SignUpRequestsTable } from '@/ui/components/Dashboard/SignupRequests/SignupRequestsTable';

const SignUpRequestsPage = () => {
  const router = useRouter();
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [filters, setFilters] = useState<{
    createdAtFrom?: string;
    createdAtTo?: string;
    pinflSearch?: string;
    statuses?: string;
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
    pinflSearch?: string,
    statuses?: string
  ) => {
    setFilters({ createdAtFrom, createdAtTo, pinflSearch, statuses });
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
      <SignUpRequestsTable filters={filters} />

      {/* Filter Modal */}
      <SignupRequestsFilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        onApply={handleApplyFilters}
      />
    </div>
  );
};

export default SignUpRequestsPage;
