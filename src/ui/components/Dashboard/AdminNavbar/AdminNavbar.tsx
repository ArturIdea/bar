'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useUserProfile } from '@/ui/hooks/ui/useUserProfile';
import { LocaleSwitcher } from '../../LocaleSwitcher/LocalSwitcher';

export default function AdminNavbar() {
  const t = useTranslations();
  const { userProfile, loading } = useUserProfile();
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const router = useRouter();

  if (loading) {
    return (
      <div className="p-[18px] flex justify-between items-center border-b border-gray-200">
        <h1 className="font-semibold text-4xl text-[#08678E]">{t('Navbar.dashboard')}</h1>
        <LocaleSwitcher />
      </div>
    );
  }

  return (
    <div className="p-[18px] flex justify-between items-center border-b border-gray-200 relative">
      <h1 className="font-semibold text-4xl text-[#08678E]">{t('Navbar.dashboard')}</h1>

      <div className="flex items-center gap-4">
        <LocaleSwitcher />

        {/* User Profile Dropdown */}
        {userProfile && (
          <div className="relative">
            <button
              type="button"
              onClick={() => setDropdownOpen(!isDropdownOpen)}
              className="focus:outline-none"
            >
              <img
                src={userProfile.photoUrl || '/default-avatar.png'}
                alt="User Avatar"
                className="w-10 h-10 rounded-full border border-gray-300"
              />
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 shadow-md rounded-md overflow-hidden">
                <button
                  type="button"
                  onClick={() => router.push('/profile')}
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  {t('Navbar.profile')}
                </button>
                <button
                  type="button"
                  onClick={() => console.log('Logout logic here')}
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  {t('Navbar.logout')}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
