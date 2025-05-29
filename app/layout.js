'use client';

import "./globals.css";
import ScrollToTop from './components/ScrollToTop';
import FloatingContactIcons from './components/FloatingContactIcons';
import LoadingScreen from './components/LoadingScreen';
import { usePathname } from 'next/navigation';

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const isAdminPage = pathname.startsWith('/admin');

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo.png" />
        <link rel="apple-touch-icon" href="/logo.png" />
      </head>
      <body className="antialiased">
        <main>
          <LoadingScreen />
          {children}
        </main>
        <ScrollToTop />
        {!isAdminPage && <FloatingContactIcons />}
      </body>
    </html>
  );
}
