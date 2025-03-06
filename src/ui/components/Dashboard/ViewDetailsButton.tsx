import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/routing';

export default function ViewDetailsButton({ href }: { href: string }) {
  const t = useTranslations();
  const pathname = usePathname();

  return (
    <>
      {pathname === '/dashboard' && (
        <Link
          href={`/dashboard/${href}`}
          className="border border-gray-300 py-2 px-3 rounded-full cursor-pointer"
        >
          {t('Buttons.viewDetails')}
        </Link>
      )}
    </>
  );
}
