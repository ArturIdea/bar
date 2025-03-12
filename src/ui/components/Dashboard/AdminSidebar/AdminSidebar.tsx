'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import BenefitsIcon from '@/../public/images/icons/dashboard/sidebar/benefitsIcon.svg';
import InsightsIcon from '@/../public/images/icons/dashboard/sidebar/insightsIcon.svg';
import signupRequestsIcon from '@/../public/images/icons/dashboard/sidebar/signupRequestsIcon.svg';
import UserManagementIcon from '@/../public/images/icons/dashboard/sidebar/userManagementIcon.svg';
import { Link, usePathname } from '@/i18n/routing';

export function AdminSidebar() {
  const pathname = usePathname();
  const t = useTranslations();

  const data = [
    { link: '/dashboard', label: t('Sidebar.insights'), icon: InsightsIcon },
    {
      link: '/dashboard/benefits',
      label: t('Sidebar.benefits'),
      icon: BenefitsIcon,
    },
    {
      link: '/dashboard/user-management',
      label: t('Sidebar.userManagement'),
      icon: UserManagementIcon,
    },
    {
      link: '/dashboard/signup-requests',
      label: t('Sidebar.signupRequests'),
      icon: signupRequestsIcon,
    },
  ];

  const links = data.map((item) => (
    <Link
      key={item.label}
      href={item.link}
      className={`flex items-center p-4 text-sm font-medium transition-colors 
        ${pathname === item.link ? 'bg-gray-100 text-[#08678e]' : 'text-gray-600 hover:bg-gray-100'}`}
    >
      <Image alt="nav list icon" src={item.icon} className="h-5 w-5 mr-2" />
      <span>{item.label}</span>
    </Link>
  ));

  return (
    <nav className="sticky top-0 xl:w-64 w-48 h-auto bg-white border-r border-gray-200">
      <Link href="/">
        <div className="p-6 border-b border-gray-200">
          <Image src="/images/logos/baraka_main_logo.svg" width={107} height={28} alt="logo" />
        </div>
      </Link>
      <div className="flex flex-col">{links}</div>
    </nav>
  );
}
