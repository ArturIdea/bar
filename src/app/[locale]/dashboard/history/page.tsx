'use client';

import { useSearchParams } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import HistoryTable from '@/ui/components/Dashboard/HistoryTable';

const History = () => {
  const searchParams = useSearchParams();
  const createdBy = searchParams.get('userId');
  const t = useTranslations();

  return (
    <div className="flex flex-col h-full">
      <div className="p-6 border-b">
        <Link
          href="/dashboard/user-management/baraka-users"
          className="flex items-center gap-2 cursor-pointer"
        >
          <ArrowLeft /> {t('Buttons.back')}
        </Link>
      </div>
      <div className="flex-1 overflow-hidden">
        {createdBy && <HistoryTable createdBy={createdBy} />}
      </div>
    </div>
  );
};

export default History;
