import { createNavigation } from 'next-intl/navigation';
import { defineRouting } from 'next-intl/routing';

export const LOCALES = [
  {
    code: 'en',
    label: 'English',
  },
  {
    code: 'uz-latn',
    label: "O'zbek (lotin)",
  },
  {
    code: 'uz-cyrl',
    label: 'Uzbek (cyrillic)',
  },
  {
    code: 'kaa',
    label: 'Qaraqalpaq',
  },
  {
    code: 'ru',
    label: 'Russian',
  },
];

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: LOCALES.map((l) => l.code),

  // Used when no locale matches
  defaultLocale: 'en',
});

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export type Locale = (typeof routing.locales)[number];
export const { Link, redirect, usePathname, useRouter } = createNavigation(routing);
