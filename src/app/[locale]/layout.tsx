import '@mantine/core/styles.css';
import '../globals.css';

import React from 'react';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import { setupDependencies } from '@/core/di/setup';
import { routing } from '@/i18n/routing';
import Navbar from '@/ui/components/Navbar';
import { theme } from '../../core/theme';
import { Providers } from '../providers';

setupDependencies();

export const metadata = {
  title: 'Baraka',
  description: 'Baraka Social Wallet Official App',
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const locale = (await params).locale;

  setRequestLocale(locale);

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <ColorSchemeScript />
        <link rel="shortcut icon" href="/images/favicon.svg" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body style={{ minHeight: '100vh', overflow: 'auto' }}>
        <NextIntlClientProvider messages={messages}>
          <MantineProvider theme={theme}>
            <Navbar />
            <Providers>{children}</Providers>
          </MantineProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
