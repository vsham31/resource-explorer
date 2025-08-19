'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { setRootTheme } from '../lib/set-root-theme';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const next = theme === 'dark' ? 'light' : 'dark';
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (theme) {
      setRootTheme(theme as 'light' | 'dark')};
  }, [theme]);

  if (!mounted) return null;

  return (
    <button
      aria-label="Toggle theme"
      onClick={() => {setTheme(next);
        setRootTheme(next as 'light' | 'dark');}
      }
      className="rounded border px-2 py-1 text-sm hover:bg-gray-100 dark:hover:bg-neutral-800"
    >
      {theme === 'dark' ? '🌙 Dark' : '☀️ Light'}
    </button>
  );
}
