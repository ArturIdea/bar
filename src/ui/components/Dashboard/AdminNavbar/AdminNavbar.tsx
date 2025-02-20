import { useTranslations } from 'next-intl';
import { LocaleSwitcher } from '../../LocaleSwitcher/LocalSwitcher';

export default function AdminNavbar() {
  const t = useTranslations();

  return (
    <div className="p-[18px] flex justify-between items-center border-b border-gray-200">
      <h1 className="font-semibold text-4xl text-[#08678E] ">{t('Navbar.dashboard')}</h1>
      <LocaleSwitcher />
    </div>
  );
}
