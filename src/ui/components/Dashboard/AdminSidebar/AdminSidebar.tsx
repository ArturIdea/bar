'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import BenefitsIcon from '@/../public/images/icons/dashboard/sidebar/benefitsIcon.svg';
import InsightsIcon from '@/../public/images/icons/dashboard/sidebar/insightsIcon.svg';
import signupRequestsIcon from '@/../public/images/icons/dashboard/sidebar/signupRequestsIcon.svg';
import UserManagementIcon from '@/../public/images/icons/dashboard/sidebar/userManagementIcon.svg';
import { Link, usePathname } from '@/i18n/routing';
import { useUserRoles } from '@/ui/hooks/ui/useUserRoles';

export function AdminSidebar() {
  const pathname = usePathname();
  const t = useTranslations();
  const { isAdmin, isDeveloper } = useUserRoles();
  const [showUserManagementPopover, setShowUserManagementPopover] = useState(false);

  const regularNavItems = [
    { link: '/dashboard', label: t('Sidebar.insights'), icon: InsightsIcon },
    {
      link: '/dashboard/benefits',
      label: t('Sidebar.benefits'),
      icon: BenefitsIcon,
    },

    ...(isAdmin
      ? [
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
        ]
      : []),
  ];

  const developerNavItems = isDeveloper
    ? [
        {
          link: '/dashboard/dev/user-management',
          label: `Dev ${t('Sidebar.userManagement')}`,
          icon: UserManagementIcon,
        },
        {
          link: '/dashboard/dev/signup-requests',
          label: `Dev ${t('Sidebar.signupRequests')}`,
          icon: signupRequestsIcon,
        },
      ]
    : [];

  const renderNavItem = (item: { link: string; label: string; icon: any }) => {
    if (item.link === '/dashboard/user-management') {
      return (
        <div key={item.label} className="relative w-full">
          <button
            type="button"
            onClick={() => setShowUserManagementPopover(!showUserManagementPopover)}
            className={`w-full flex justify-between items-center p-4 font-medium transition-colors ${
              pathname === item.link
                ? 'bg-gray-100 text-[#08678e]'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <div className="flex">
              <Image alt="nav list icon" src={item.icon} className="h-5 w-5 mr-2" />
              <span className="text-sm font-medium">{item.label}</span>
            </div>
            <ChevronRight />
          </button>
          {showUserManagementPopover && (
            <div className="absolute w-32 top-0 left-full mt-0 ml-2 bg-white shadow-md border border-gray-200 rounded-md z-[1000]">
              <ul>
                {/* <Link
                  href="/dashboard/user-management/baraka-users"
                  className="block px-4 py-2
                    text-sm text-gray-600 hover:bg-gray-100"
                >
                  <li>{t('Sidebar.naspAgents')}</li>
                </Link>
                <Link
                  href="/dashboard/user-management/baraka-users"
                  className="block px-4 py-2
                    text-sm text-gray-600 hover:bg-gray-100"
                >
                  <li>{t('Sidebar.bankAgents')}</li>
                </Link> */}
                <Link
                  href="/dashboard/user-management/baraka-users"
                  onClick={() => setShowUserManagementPopover(false)}
                  className="block px-4 py-2
                    text-sm text-gray-600 hover:bg-gray-100"
                >
                  <li>{t('Sidebar.barakaUsers')}</li>
                </Link>
              </ul>
            </div>
          )}
        </div>
      );
    }

    return (
      <Link
        key={item.label}
        href={item.link}
        className={`flex items-center p-4 text-sm font-medium transition-colors ${
          pathname === item.link ? 'bg-gray-100 text-[#08678e]' : 'text-gray-600 hover:bg-gray-50'
        }`}
      >
        <Image alt="nav list icon" src={item.icon} className="h-5 w-5 mr-2" />
        <span>{item.label}</span>
      </Link>
    );
  };

  return (
    <nav className="sticky top-0 lg:w-64 md:w-52 w-48 h-auto bg-white border-r border-gray-200">
      <Link href="/dashboard">
        <div className="p-6 border-b border-gray-200">
          <Image src="/images/logos/baraka_main_logo.svg" width={107} height={28} alt="logo" />
        </div>
      </Link>
      <div className="flex flex-col">
        {regularNavItems.map((item) => renderNavItem(item))}

        {/* Divider before developer links */}
        {isDeveloper && <div className="border-b border-gray-300" />}

        {developerNavItems.map((item) => (
          <Link
            key={item.label}
            href={item.link}
            className={`flex items-center p-4 text-sm font-medium transition-colors ${
              pathname === item.link
                ? 'bg-gray-100 text-[#08678e]'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Image alt="nav list icon" src={item.icon} className="h-5 w-5 mr-2" />
            <span>{item.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
