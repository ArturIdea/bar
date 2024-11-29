import '@mantine/core/styles.css';

import React from 'react';
import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import Navbar from '@/ui/components/Navbar';
import { theme } from '../core/theme';

export const metadata = {
  title: 'Baraka',
  description: 'Baraka Social Wallet Official App',
};

export default function RootLayout({ children }: { children: any }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ColorSchemeScript />
        <link rel="shortcut icon" href="/images/favicon.svg" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body style={{ minHeight: '100vh', overflow: 'auto' }}>
        <MantineProvider theme={theme}>
          <Navbar />
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}
