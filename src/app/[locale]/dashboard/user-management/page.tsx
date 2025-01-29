'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import FilterLinesIcon from '@/../public/images/icons/dashboard/filterLines.svg';
import { FilterModal } from '@/ui/components/Dashboard/FilterModal';
import { UsersTable } from '@/ui/components/Dashboard/Users/UsersTable';

const SignUpRequestsPage = () => {
  const router = useRouter();
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  const toggleFilterModal = () => {
    setIsFilterModalOpen((prev) => !prev);
  };

  const handleGoBack = () => {
    router.push('/en/dashboard');
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
      <UsersTable />

      {/* Filter Modal */}
      <FilterModal isOpen={isFilterModalOpen} onClose={toggleFilterModal} />
    </div>
  );
};

export default SignUpRequestsPage;
