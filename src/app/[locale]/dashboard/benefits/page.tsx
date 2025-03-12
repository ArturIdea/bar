import { ArrowLeft } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

export default function Benefits() {
  const t = useTranslations();

  return (
    <div>
      <div className="p-6 flex justify-between items-center">
        <Link href="/dashboard" className="flex items-center gap-2 cursor-pointer">
          <ArrowLeft /> {t('Buttons.back')}
        </Link>
      </div>
    </div>
  );
}
