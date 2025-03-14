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

export default function BenefitsList() {
  const t = useTranslations();
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const { benefits, loading, total } = useBenefits(page, pageSize);
  const pathname = usePathname();
  const cookies = new Cookies();
  const locale = cookies.get('NEXT_LOCALE') || 'en';

  const getBenefitName = (benefitType: any, locale: string) => {
    if (!benefitType || !benefitType.name) {
      return 'N/A';
    }

    switch (locale) {
      case 'uz-latn':
        return benefitType.name['uz-latn'] || 'N/A';
      case 'uz-cyrl':
        return benefitType.name['uz-cyrl'] || 'N/A';
      case 'kaa':
        return benefitType.name.qr || 'N/A';
      case 'ru':
        return benefitType.name.ru || 'N/A';
      case 'en':
      default:
        return benefitType.name['uz-latn'] || 'N/A';
    }
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
      <div className="flex items-center py-4 px-6 justify-between border-b">
        <Link href="/dashboard" className="flex items-center gap-2 cursor-pointer">
          <ArrowLeft /> {t('Buttons.back')}
        </Link>
      </div>

      <div className="relative p-6">
        {loading ? (
          <div className="text-center py-8">Loading...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {benefits.map((benefit) => (
              <div
                key={benefit.benefitType.id}
                className="border rounded-xl p-4 flex items-center justify-between bg-white"
              >
                <div className="flex items-center">
                  <div className="flex items-center gap-4">
                    <div>
                      <Image src={hugIcon} alt="Hug Icon" />
                    </div>
                    <div>
                      <h3 className="font-semibold">
                        {getBenefitName(benefit.benefitType, locale)}
                      </h3>
                      <div className="flex items-center gap-2">
                        <p className="font-bold">лв</p>
                        <div className="border-r-2 h-3" />
                        <span className="text-green-500">
                          {benefit.benefitType.amount.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-center bg-gray-100 rounded-xl py-2">
                  <div className="font-bold text-gray-700 w-[87px] ">
                    {(benefit.users / 1000).toFixed(2)}k
                  </div>
                  <div className="text-gray-500">Users</div>
                </div>
              </div>
            ))}
          </div>
        )}
        {/* Pagination */}
        {pathname === '/dashboard/benefits' && (
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
