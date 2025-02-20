'use client';

import { useParams } from 'next/navigation';
import { useLocale } from 'next-intl';
import { Select } from '@mantine/core';
import { Locale, LOCALES, usePathname, useRouter } from '@/i18n/routing';

export const LocaleSwitcher = () => {
  const currentLocale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

  const onSelectChange = (locale: Locale) => {
    // @ts-expect-error -- TypeScript will validate that only known `params`
    // are used in combination with a given `pathname`. Since the two will
    // always match for the current route, we can skip runtime checks.
    router.replace({ pathname, params }, { locale });
  };

  return (
    <Select
      w={150}
      radius="xl"
      data={LOCALES.map((locale) => ({
        value: locale.code,
        label: locale.label,
      }))}
      value={currentLocale}
      onChange={(locale) => locale && onSelectChange(locale)}
    />
  );
};
