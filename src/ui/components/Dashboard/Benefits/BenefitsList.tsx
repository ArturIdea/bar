'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Cookies from 'universal-cookie';
import hugIcon from '@/../public/images/icons/dashboard/hugIcon.svg';
import { Link, usePathname } from '@/i18n/routing';
import { useBenefits } from '@/ui/hooks/ui/useBenefits';
import { Pagination } from '../Pagination';
import BenefitsSkeleton from './BenefitsSkeleton';

export default function BenefitsList() {
  const t = useTranslations();
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(16);
  const { benefits, loading, total } = useBenefits(page, pageSize);
  const pathname = usePathname();
  const cookies = new Cookies();
  const locale = cookies.get('NEXT_LOCALE') || 'en';

  const getBenefitName = (benefitType: any, locale: string) => {
    if (!benefitType || !benefitType.name) {
      return 'N/A';
    }
    return benefitType.name[locale] || benefitType.name['uz-latn'] || 'N/A';
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handlePageSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPageSize(Number(event.target.value));
    setPage(0);
  };

  return (
    <div className="">
      <div className="flex items-center py-8 px-6 justify-between border-b">
        <Link href="/dashboard" className="flex items-center gap-2 cursor-pointer">
          <ArrowLeft /> {t('Buttons.back')}
        </Link>
      </div>

      <div className="relative p-6">
        {loading ? (
          <BenefitsSkeleton />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
            {benefits.map((benefit) => (
              <div
                key={benefit.benefitType.id}
                className="border rounded-xl p-4 flex justify-between bg-white"
              >
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 ">
                      <Image src={hugIcon} alt="Hug Icon" width={64} height={64} />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold">{getBenefitName(benefit.benefitType, locale)}</h3>
                    <div className="flex items-center gap-2">
                      <p className="font-bold">лв</p>
                      <div className="border-r-2 h-3" />
                      <span className="text-green-500">
                        {benefit.benefitType.amount.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col justify-center items-center bg-gray-100 rounded-xl py-2">
                  <div className="text-center font-bold text-gray-700 w-[87px]">
                    {benefit.users || 0}
                  </div>
                  <div className="text-gray-500">{t('UserProfile.users')}</div>
                </div>
              </div>
            ))}
          </div>
        )}
        {/* Pagination */}
        {pathname === '/dashboard/benefits' && (benefits?.length || 0) > pageSize && (
          <Pagination
            page={page}
            pageSize={pageSize}
            total={total}
            onPageChange={handlePageChange}
            onPageSizeChange={handlePageSizeChange}
          />
        )}
      </div>
    </div>
  );
}
