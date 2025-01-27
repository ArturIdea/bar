'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
// import ActivityHistoryIcon from '@/../public/images/icons/dashboard/sidebar/activityHistoryIcon.svg';
// import BenefitsIcon from '@/../public/images/icons/dashboard/sidebar/benefitsIcon.svg';
import InsightsIcon from '@/../public/images/icons/dashboard/sidebar/insightsIcon.svg';
// import MoreServicesIcon from '@/../public/images/icons/dashboard/sidebar/moreServicesIcon.svg';
// import SettingsIcon from '@/../public/images/icons/dashboard/sidebar/settingsIcon.svg';
import UserManagementIcon from '@/../public/images/icons/dashboard/sidebar/userManagementIcon.svg';

const data = [
  { link: '/en/dashboard', label: 'Insights', icon: InsightsIcon },
  // { link: '', label: 'Benefits', icon: BenefitsIcon },
  { link: '/en/dashboard/user-management', label: 'User Management', icon: UserManagementIcon },
  { link: '/en/dashboard/signup-requests', label: 'Sign up Requests', icon: UserManagementIcon },
  // { link: '', label: 'More Services', icon: MoreServicesIcon },
  // { link: '', label: 'Activity History', icon: ActivityHistoryIcon },
  // { link: '', label: 'Settings', icon: SettingsIcon },
];

export function AdminSidebar() {
  const pathname = usePathname();

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
    <nav className="sticky top-0 w-64 h-auto bg-white border-r border-gray-200">
      <div className="flex flex-col">{links}</div>
    </nav>
  );
}
