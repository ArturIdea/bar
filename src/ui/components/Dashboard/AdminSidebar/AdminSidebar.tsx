'use client';

import { useEffect, useState } from 'react';
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
  const { isAdmin, isDeveloper, isAgent, isSuperAdmin } = useUserRoles();
  const [showUserManagementPopover, setShowUserManagementPopover] = useState(false);
  const [navItems, setNavItems] = useState<Array<{ link: string; label: string; icon: any }>>([]);

  useEffect(() => {
    const superAdminNavItems = isSuperAdmin
      ? [
          { link: '/dashboard', label: t('Sidebar.insights'), icon: InsightsIcon },
          { link: '/dashboard/benefits', label: t('Sidebar.benefits'), icon: BenefitsIcon },
          {
            link: '/dashboard/user-management',
            label: t('Sidebar.userManagement'),
            icon: UserManagementIcon,
          },
          { link: '/agent-dashboard', label: t('Sidebar.agentDashboard'), icon: InsightsIcon },
        ]
      : [];

    const adminNavItems = isAdmin
      ? [
          { link: '/dashboard', label: t('Sidebar.insights'), icon: InsightsIcon },
          { link: '/dashboard/benefits', label: t('Sidebar.benefits'), icon: BenefitsIcon },
          {
            link: '/dashboard/user-management',
            label: t('Sidebar.userManagement'),
            icon: UserManagementIcon,
          },
        ]
      : [];

    const agentNavItems = isAgent
      ? [{ link: '/agent-dashboard', label: t('Sidebar.agentDashboard'), icon: InsightsIcon }]
      : [];

    const regularNavItems = [...superAdminNavItems, ...adminNavItems, ...agentNavItems];

    const developerNavItems = isDeveloper
      ? [
          {
            link: '/dashboard/dev/user-management/baraka-users',
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

    setNavItems([...regularNavItems, ...developerNavItems]);
  }, [isAdmin, isAgent, isDeveloper, isSuperAdmin, t]);

  const renderNavItem = (item: { link: string; label: string; icon: any }) => {
    if (item.link === '/dashboard/user-management') {
      return (
        <div key={item.label} className="relative w-full">
          <button
            type="button"
            onClick={() => setShowUserManagementPopover(!showUserManagementPopover)}
            className={`w-full flex justify-between items-center p-4 font-medium transition-colors ${
              pathname === item.link ? 'bg-gray-100 text-primary border-l-8 border-l-[#253A60]' : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <div className="flex">
              {/* <Image alt="nav list icon" src={item.icon} className="h-5 w-5 mr-2" /> */}
              <span className="text-sm font-medium">{item.label}</span>
            </div>
            <ChevronRight className={`${showUserManagementPopover ? 'rotate-90 transition-transform' : ''}`} />
          </button>
          {showUserManagementPopover && (
            <div className="w-full">
              <ul className="pl-2">
                {isSuperAdmin && (
                  <Link
                    href="/dashboard/user-management/admin-list"
                    className={`block px-4 py-2 text-sm transition-colors ${
                      pathname === '/dashboard/user-management/admin-list'
                        ? 'bg-[#FAFAFA] text-primary border-l-8 border-l-[#253A60]'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <li>{t('Sidebar.adminList')}</li>
                  </Link>
                )}
                <Link
                  href="/dashboard/user-management/baraka-agents"
                  className={`block px-4 py-2 text-sm transition-colors ${
                    pathname === '/dashboard/user-management/baraka-agents'
                      ? 'bg-[#FAFAFA] text-primary border-l-8 border-l-[#253A60]'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <li>{t('Sidebar.agentList')}</li>
                </Link>
                <Link
                  href="/dashboard/user-management/baraka-users"
                  className={`block px-4 py-2 text-sm transition-colors ${
                    pathname === '/dashboard/user-management/baraka-users'
                      ? 'bg-[#FAFAFA] text-primary border-l-8 border-l-[#253A60]'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <li>{t('Sidebar.barakaUsers')}</li>
                </Link>
              </ul>
            </div>
          )}
        </div>
      );
    }

    if (item.link === '/dashboard/user-management/baraka-agents') {
      return null;
    }

    return (
      <Link
        key={item.label}
        href={item.link}
        className={`flex items-center p-4 text-sm font-medium transition-colors ${
          pathname === item.link ? 'bg-[#FAFAFA] text-primary border-l-8 border-l-[#253A60]' : 'text-gray-600 hover:bg-gray-50'
        }`}
      >
        {/* <Image alt="nav list icon" src={item.icon} className="h-5 w-5 mr-2" /> */}
        <span>{item.label}</span>
      </Link>
    );
  };

  return (
    <nav className="sticky z-20 top-0 lg:w-64 md:w-52 w-48 h-auto bg-white border-gray-200">
      <Link href={isAdmin ? '/dashboard' : isAgent ? '/agent-dashboard' : '/'}>
        <div className="p-6 border-b border-gray-200">
          <Image src="/images/logos/baraka_main_logo.svg" width={107} height={28} alt="logo" />
        </div>
      </Link>
      <div className="flex flex-col">{navItems.map((item) => renderNavItem(item))}</div>
    </nav>
  );
}
