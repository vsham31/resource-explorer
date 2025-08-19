'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

// Simple scroll restoration per-URL using sessionStorage
export function useScrollRestoration() {
  const pathname = usePathname();
  const search = useSearchParams()?.toString() ?? '';

  useEffect(() => {
    const key = `scroll:${pathname}?${search}`;
    const y = sessionStorage.getItem(key);
    if (y) {
      requestAnimationFrame(() => window.scrollTo(0, parseFloat(y)));
    }
    const onBeforeUnload = () => sessionStorage.setItem(key, String(window.scrollY));
    const onScroll = () => sessionStorage.setItem(key, String(window.scrollY));
    window.addEventListener('beforeunload', onBeforeUnload);
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('beforeunload', onBeforeUnload);
      window.removeEventListener('scroll', onScroll);
      sessionStorage.setItem(key, String(window.scrollY));
    };
  }, [pathname, search]);
}
