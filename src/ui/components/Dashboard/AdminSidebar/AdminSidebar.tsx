'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
// import ActivityHistoryIcon from '@/../public/images/icons/dashboard/sidebar/activityHistoryIcon.svg';
// import BenefitsIcon from '@/../public/images/icons/dashboard/sidebar/benefitsIcon.svg';
import InsightsIcon from '@/../public/images/icons/dashboard/sidebar/insightsIcon.svg';
// import MoreServicesIcon from '@/../public/images/icons/dashboard/sidebar/moreServicesIcon.svg';
// import SettingsIcon from '@/../public/images/icons/dashboard/sidebar/settingsIcon.svg';
// import UserManagementIcon from '@/../public/images/icons/dashboard/sidebar/userManagementIcon.svg';
import classes from './AdminSidebar.module.css';

const data = [
  { link: '/en/dashboard', label: 'Insights', icon: InsightsIcon },
  // { link: '', label: 'Benefits', icon: BenefitsIcon },
  // { link: '', label: 'User Management', icon: UserManagementIcon },
  // { link: '', label: 'More Services', icon: MoreServicesIcon },
  // { link: '', label: 'Activity History', icon: ActivityHistoryIcon },
  // { link: '', label: 'Settings', icon: SettingsIcon },
];

export function AdminSidebar() {
  const [active, setActive] = useState('Billing');

  const links = data.map((item) => (
    <Link
      className={classes.link}
      data-active={item.label === active || undefined}
      href={item.link}
      key={item.label}
      onClick={(event) => {
        event.preventDefault();
        setActive(item.label);
      }}
    >
      <Image alt="nav list icon" src={item.icon} className={classes.linkIcon} />
      <span>{item.label}</span>
    </Link>
  ));

  return (
    <nav className={`${classes.navbar}`}>
      <div className={classes.navbarMain}>{links}</div>
    </nav>
  );
}
