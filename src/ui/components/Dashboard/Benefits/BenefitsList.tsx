'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
// import { ArrowLeft } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Cookies from 'universal-cookie';
import { assignDotColors } from '@/core/utils/dotColors';
import { truncate } from '@/core/utils/truncate';
// import { Link } from '@/i18n/routing';
import { useBenefits } from '@/ui/hooks/ui/useBenefits';
import BenefitsChart from '../Charts/BenefitsChart/BenefitsChart';
import BenefitsSkeleton from './BenefitsSkeleton';

export default function BenefitsList() {
  const t = useTranslations();
  const [page] = useState(0);
  const [pageSize] = useState(16);
  const { benefits, loading } = useBenefits(page, pageSize);
  const cookies = new Cookies();
  const locale = cookies.get('NEXT_LOCALE') || 'en';
  const [activeTab, setActiveTab] = useState<'ACTIVE' | 'EXPIRED'>('ACTIVE');
  const router = useRouter();

  const colors = useMemo(() => assignDotColors(benefits), [benefits]);

  const getBenefitName = (benefitType: any, locale: string) => {
    if (!benefitType || !benefitType.name) {
      return 'N/A';
    }
    // Try to get the name by locale or fallback
    const name =
      benefitType.name[locale] ||
      benefitType.name.uzLatn ||
      benefitType.name.uzCyrl ||
      benefitType.name.ru ||
      'N/A';
    // If name is 'N/A', but uzCyrl exists, show uzCyrl
    if (name === 'N/A' && benefitType.name.uzCyrl) {
      return benefitType.name.uzCyrl;
    }
    return name;
  };

  // Filter benefits by selected tab (status)
  const filteredBenefits = useMemo(() => {
    return benefits.filter((b) => b.statuses?.[activeTab]);
  }, [benefits, activeTab]);

  return (
    <div>
      {/* <div className="flex items-center py-8 px-6 justify-between border-b">
        <Link href="/dashboard" className="flex items-center gap-2 cursor-pointer">
          <ArrowLeft /> {t('Buttons.back')}
        </Link>
      </div> */}
      {/* Graph */}
      <div className="m-3 ml-5 mt-5">
        <BenefitsChart />
      </div>
      {/* Tabs */}
      <div className="flex gap-8 px-6 pt-6 border-b">
        <button
          type="button"
          className={`pb-2 border-b-2 text-lg font-medium transition-colors duration-150 ${activeTab === 'ACTIVE' ? 'border-primary text-primary' : 'border-transparent text-gray-400'}`}
          onClick={() => setActiveTab('ACTIVE')}
        >
          {t('StatisticsDashboard.Active')}
        </button>
        <button
          type="button"
          className={`pb-2 border-b-2 text-lg font-medium transition-colors duration-150 ${activeTab === 'EXPIRED' ? 'border-primary text-primary' : 'border-transparent text-gray-400'}`}
          onClick={() => setActiveTab('EXPIRED')}
        >
          {t('StatisticsDashboard.Expired')}
        </button>
      </div>
      <div className="relative p-6">
        {loading ? (
          <BenefitsSkeleton />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBenefits.map((benefit, index) => {
              const fullTitle = getBenefitName(benefit.benefitType, locale);
              const shortTitle = truncate(fullTitle, 90);
              const status = benefit.statuses?.[activeTab];
              return (
                <div
                  key={benefit.benefitType.id}
                  className="bg-white rounded-2xl p-6 flex flex-col gap-4 min-h-[260px]"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`w-3 h-3 rounded-full ${colors?.[index] ?? ''}`} />
                    <span
                      className="font-semibold text-base text-gray-900 line-clamp-2"
                      title={fullTitle}
                    >
                      {shortTitle}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-x-6 gap-y-2 mb-4">
                    <div>
                      <div className="text-xl font-semibold text-gray-900">
                        {benefit?.statuses?.[activeTab]?.userCount}
                      </div>
                      <div className="text-xs text-gray-500">{t('Statistics.totalUsers')}</div>
                    </div>
                    <div>
                      <div className="text-xl font-semibold text-gray-900">
                        {status?.totalAmount?.priceValue ?? '-'}
                      </div>
                      <div className="text-xs text-gray-500">
                        {t('UserManagement.benefits.fundsAllocated')}
                      </div>
                    </div>
                    <div>
                      <div className="text-xl font-semibold text-gray-900">0</div>
                      <div className="text-xs text-gray-500">
                        {t('UserManagement.benefits.usedFund')}
                      </div>
                    </div>
                    <div>
                      <div className="text-xl font-semibold text-gray-900">
                        {status?.averageAmountPerUser?.priceValue ?? '-'}
                      </div>
                      <div className="text-xs text-gray-500">
                        {t('UserManagement.benefits.avgUsage')}
                      </div>
                    </div>
                  </div>
                  {activeTab === 'ACTIVE' && (
                    <button
                      type="button"
                      className="mt-auto border border-primary text-primary rounded-xl py-2 font-medium hover:bg-primary hover:text-white transition-colors duration-150"
                      onClick={() =>
                        router.push(
                          `/${locale}/dashboard/benefits/users?benefitTypeId=${benefit.benefitType.id}`
                        )
                      }
                    >
                      {t('UserProfile.users')}
                    </button>
                  )}
                </div>
              );
            })}
            {filteredBenefits.length === 0 && (
              <div className="col-span-full text-center text-gray-400 py-12">
                {t('StatisticsDashboard.Nobenefitsfoundstatus')}.
              </div>
            )}
          </div>
        )}
        {/* Pagination (optional, if needed) */}
        {/*
        {pathname === '/dashboard/benefits' && (filteredBenefits?.length || 0) > pageSize && (
          <Pagination
            page={page}
            pageSize={pageSize}
            total={total}
            onPageChange={handlePageChange}
            onPageSizeChange={handlePageSizeChange}
          />
        )}
        */}
      </div>
    </div>
  );
}
