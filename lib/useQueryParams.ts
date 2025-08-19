'use client';

import { useCallback, useMemo } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export function useQueryParams() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const setParams = useCallback((params: Record<string, string | number | undefined | null>, opts: { scroll?: boolean } = {}) => {
    const sp = new URLSearchParams(searchParams?.toString());
    Object.entries(params).forEach(([k, v]) => {
      if (v === undefined || v === null || v === '') sp.delete(k);
      else sp.set(k, String(v));
    });
    router.replace(`${pathname}?${sp.toString()}`, { scroll: opts.scroll ?? false });
  }, [router, pathname]);

  const get = useCallback((key: string, fallback = '') => {
    return searchParams?.get(key) ?? fallback;
  }, [searchParams]);

  const all = useMemo(() => Object.fromEntries(searchParams?.entries() ?? []), [searchParams]);
  return { get, setParams, all };
}
