'use client';

import { useSearchParams } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { Link } from '@/i18n/routing';
import HistoryTable from '@/ui/components/Dashboard/HistoryTable';

const HistoryPage = () => {
  const searchParams = useSearchParams();
  const createdBy = searchParams.get('userId');

  return (
    <div>
      <div className="p-6">
        <Link href="/dashboard/user-management" className="flex items-center gap-2 cursor-pointer">
          <ArrowLeft /> Back
        </Link>
      </div>
      {createdBy && <HistoryTable createdBy={createdBy} />}
    </div>
  );
};

export default HistoryPage;
