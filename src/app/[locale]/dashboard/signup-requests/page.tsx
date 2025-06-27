'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';
import { useTranslations } from 'use-intl';
import FilterLinesIcon from '@/../public/images/icons/dashboard/filterLines.svg';
import { Link, usePathname } from '@/i18n/routing';
import { SignupErrorCategoriesBarChart } from '@/ui/components/Dashboard/Charts/SignupErrors/SignupErrorCategoriesBarChart';
import { SignupRequestsFilterModal } from '@/ui/components/Dashboard/SignupRequests/SignupRequestsFilterModal';
import { SignUpRequestsTable } from '@/ui/components/Dashboard/SignupRequests/SignupRequestsTable';
import { useDateRangeStore } from '@/ui/stores/useDateRangeStore';

const SignUpRequests: React.FC = () => {
  const fromDate = useDateRangeStore((s) => s.fromDate);
  const toDate = useDateRangeStore((s) => s.toDate);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [filters, setFilters] = useState<{
    fromDate?: string;
    toDate?: string;
    pinflSearch?: string;
    statuses?: string;
  }>({ fromDate, toDate });
  const t = useTranslations();
  const pathname = usePathname();

  // Sync with global date range if not overridden by filter modal
  React.useEffect(() => {
    setFilters((prev) => ({ ...prev, fromDate, toDate }));
  }, [fromDate, toDate]);

  const mergedFilters = filters;

  const toggleFilterModal = () => {
    setIsFilterModalOpen((prev) => !prev);
  };

  const handleApplyFilters = (
    fromDate?: string,
    toDate?: string,
    pinflSearch?: string,
    statuses?: string
  ) => {
    setFilters({ fromDate, toDate, pinflSearch, statuses });
    setIsFilterModalOpen(false);
  };

  return (
    <div className="flex flex-col ">
      {pathname === '/dashboard/signup-requests' && (
        <>
          <div className="p-6 justify-end items-center">
            <Link href="/dashboard" className="flex items-center gap-2 cursor-pointer">
              <ArrowLeft /> {t('Buttons.back')}
            </Link>
            <div>
              <button
                type="button"
                className="border hidden border-gray-300 rounded-full p-2 cursor-pointer"
                onClick={toggleFilterModal}
              >
                <Image src={FilterLinesIcon} alt="Filter lines" width={24} height={24} />
              </button>
            </div>
          </div>
          <SignupErrorCategoriesBarChart />
        </>
      )}
      <div className="pt-0 mt-0 m-3 p-3 bg-white rounded-[24px]">
        <SignUpRequestsTable filters={mergedFilters} />
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
