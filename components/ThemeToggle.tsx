'use client';

import { useTheme } from 'next-themes';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const next = theme === 'dark' ? 'light' : 'dark';
  return (
    <button
      aria-label="Toggle theme"
      onClick={() => setTheme(next)}
      className="rounded border px-2 py-1 text-sm hover:bg-gray-100 dark:hover:bg-neutral-800"
    >
      {theme === 'dark' ? '🌙 Dark' : '☀️ Light'}
    </button>
  );
}
