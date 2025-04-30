'use client';

import { useMemo, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Cookies from 'universal-cookie';
import { assignDotColors } from '@/core/utils/dotColors';
import { truncate } from '@/core/utils/truncate';
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

  const colors = useMemo(() => assignDotColors(benefits), [benefits]);

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
    <div>
      <div className="flex items-center py-8 px-6 justify-between border-b">
        <Link href="/dashboard" className="flex items-center gap-2 cursor-pointer">
          <ArrowLeft /> {t('Buttons.back')}
        </Link>
      </div>

      <div className="relative p-6">
        {loading ? (
          <BenefitsSkeleton />
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {benefits.map((benefit, index) => {
              const fullTitle = getBenefitName(benefit.benefitType, locale);
              const shortTitle = truncate(fullTitle, 90);
              return (
                <div
                  key={benefit.benefitType.id}
                  className="border rounded-xl p-4 flex justify-between bg-white overflow-hidden"
                >
                  <div className="flex gap-4 items-start">
                    <span className={`p-1 rounded-full ${colors[index]} mt-[6px]`} />
                    <div>
                      <h3
                        className="font-semibold text-base leading-snug max-h-[3rem] overflow-hidden line-clamp-2"
                        title={fullTitle}
                      >
                        {shortTitle}
                      </h3>
                      <div className="flex items-center gap-2">
                        <div className="border-r-2 h-3" />
                        <span className="text-green-500">
                          {benefit.benefitType.amount.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex flex-col justify-center items-center bg-primary/10 rounded-xl py-2 px-4 ">
                      <div className="text-center font-semibold text-[#0B0B22] text-[19px] w-[130px]">
                        {benefit.users || 0}
                      </div>
                      <div className="text-[#0B0B22]">
                        {t('UserManagement.benefits.totalUsers')}
                      </div>
                    </div>
                    <div className="flex flex-col justify-center items-center bg-primary/10 rounded-xl py-2 px-4 ">
                      <div className="text-center font-semibold text-[#0B0B22] w-[130px]">
                        <span className=" flex gap-2 justify-center items-center text-[19px] truncate max-w-[150px]">
                          {benefit.benefitType.amount.toFixed(2)}
                        </span>
                      </div>
                      <div className="text-[#0B0B22]">
                        {t('UserManagement.benefits.fundsAllocated')}
                      </div>
                    </div>
                    <div className="flex flex-col justify-center items-center bg-primary/10 rounded-xl py-2 px-4 ">
                      <div className="text-center font-semibold text-[#0B0B22] w-[130px]">-</div>
                      <div className="text-[#0B0B22]">{t('UserManagement.benefits.usedFund')}</div>
                    </div>
                    <div className="flex flex-col justify-center items-center bg-primary/10 rounded-xl py-2 px-4 ">
                      <div className="text-center font-semibold text-[#0B0B22] w-[130px]">-</div>
                      <div className="text-[#0B0B22]">{t('UserManagement.benefits.avgUsage')}</div>
                    </div>
                  </div>
                </div>
              );
            })}
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
