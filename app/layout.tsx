import type { Metadata } from 'next';
import './globals.css';
import QueryProvider from '../providers/query-provider';
import AppThemeProvider from '../providers/theme-provider';
import { FavoritesProvider } from '../providers/favorites-provider';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Resource Explorer — Rick & Morty',
  description: 'Search, filter, sort, and favorite characters.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <AppThemeProvider>
          <QueryProvider>
            <FavoritesProvider>
              <header className="sticky top-0 z-10 border-b bg-white/80 px-4 py-3 backdrop-blur dark:bg-neutral-950/80">
                <div className="mx-auto flex max-w-4xl items-center justify-between">
                  <Link href="/" className="font-semibold">Resource Explorer</Link>
                  <nav className="flex items-center gap-3 text-sm">
                    <Link href="/?favorites=1" className="rounded border px-2 py-1 hover:bg-gray-100 dark:hover:bg-neutral-800">★ Favorites</Link>
                    <Link href="/" className="rounded border px-2 py-1 hover:bg-gray-100 dark:hover:bg-neutral-800">All</Link>
                  </nav>
                </div>
              </header>
              <main className="mx-auto max-w-4xl p-4">{children}</main>
            </FavoritesProvider>
          </QueryProvider>
        </AppThemeProvider>
      </body>
    </html>
  );
}
