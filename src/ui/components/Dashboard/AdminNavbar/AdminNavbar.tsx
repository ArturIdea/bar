'use client';

import { useState } from 'react';
import { LanguagesIcon, UserCircle2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Cookies from 'universal-cookie';
import { KEYCLOAK_URL } from '@/core/config';
import { Link, usePathname, useRouter } from '@/i18n/routing';
// import { useUserProfile } from '@/ui/hooks/ui/useUserProfile';
import { LocaleSwitcher } from '../../LocaleSwitcher/LocalSwitcher';

export default function AdminNavbar() {
  const cookies = new Cookies();
  const router = useRouter();
  const t = useTranslations();
  // const { userProfile, loading } = useUserProfile();
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const pathname = usePathname();

  const logoutUser = () => {
    const logoutURL = new URL(`${KEYCLOAK_URL}/realms/datawise/protocol/openid-connect/logout`);

    cookies.remove('accessToken');
    cookies.remove('refreshToken');

    router.push(logoutURL.toString());
  };

  // if (loading) {
  //   return (
  //     <div className="p-[18px] flex justify-between items-center border-b border-gray-200">
  //       <h1 className="font-semibold text-4xl text-[#08678E]">{t('Navbar.dashboard')}</h1>
  //       <LocaleSwitcher />
  //     </div>
  //   );
  // }

  const getTitle = () => {
    switch (pathname) {
      case '/dashboard/user-management':
        return t('UserManagement.navbarTitle');
      case '/dashboard/signup-requests':
        return t('SignupRequests.title2');
      case '/dashboard/profile':
        return t('Navbar.profile');
      default:
        return t('Navbar.dashboard');
    }
  };

  return (
    <div className="p-[18px] flex justify-between items-center border-b border-gray-200 relative">
      <h1 className="font-semibold text-4xl text-[#08678E]">{getTitle()}</h1>

      <div className="flex items-center gap-4">
        {/* User Profile Dropdown */}
        {/* {userProfile && ( */}
        <div className="relative">
          <div className="flex items-center">
            <button
              type="button"
              onClick={() => setDropdownOpen(!isDropdownOpen)}
              className="focus:outline-none cursor-pointer"
            >
              <img
                src="https://randomuser.me/api/portraits"
                alt="User Avatar"
                className="w-10 h-10 rounded-full border border-gray-300"
              />
            </button>
          </div>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-3 w-[412px]  bg-white border border-gray-200 shadow-lg rounded-2xl p-6 z-50">
              <div className="flex justify-between items-center ">
                <h1 className="font-semibold text-2xl text-[#08678E]">{t('Navbar.profile')}</h1>
                <div>
                  <button
                    type="button"
                    className="cursor-pointer  text-gray-500 hover:text-gray-700 transition"
                    onClick={() => setDropdownOpen(false)}
                    aria-label="Close modal"
                  >
                    ✕
                  </button>
                </div>
              </div>

              {/* User Info */}
              <div className="flex items-center gap-4 py-6">
                <img
                  src="https://randomuser.me/api/portraits"
                  alt="User Avatar"
                  className="w-12 h-12 rounded-full border border-gray-300"
                />
                <div>
                  <p className="font-semibold text-lg text-gray-800">
                    {/* {userProfile?.firstName} {userProfile?.lastName} */}
                    George Karountzos
                  </p>
                  <p className="text-sm text-gray-500">
                    Last login: {new Date().toLocaleDateString()}{' '}
                    {/* Replace with actual last login date */}
                  </p>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-gray-200 pb-4" />

              {/* Menu Items */}
              <div className="flex flex-col gap-3">
                <Link
                  href="/dashboard/profile"
                  onClick={() => setDropdownOpen(false)}
                  className="flex items-center gap-3 w-full px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                >
                  <UserCircle2 size={20} className="text-[#08678E]" />
                  <h1 className="">{t('Navbar.profile')}</h1>
                </Link>
                <div className="flex items-center gap-3 w-full px-4 py-2 rounded-lg">
                  <LanguagesIcon size={20} className="text-[#08678E]" />
                  <LocaleSwitcher />
                </div>
              </div>

              {/* Divider */}
              <div className="border-b border-gray-200 pt-4" />

              {/* Logout Button */}
              <div className="pt-6">
                <button
                  type="button"
                  onClick={() => {
                    logoutUser();
                  }}
                  className="w-full py-4 text-center bg-[#08678E] text-white font-semibold rounded-full hover:bg-[#065673] transition cursor-pointer"
                >
                  {t('Navbar.logout')}
                </button>
              </div>
            </div>
          )}
        </div>
        {/* )} */}
      </div>
    </div>
  );
}
