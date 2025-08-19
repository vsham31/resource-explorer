'use client';

import { useDebouncedValue } from '../lib/debounce';
import { useQueryParams } from '../lib/useQueryParams';
import { useEffect, useState } from 'react';

export default function SearchInput() {
  const { get, setParams } = useQueryParams();
  const [value, setValue] = useState(get('q', ''));
  const debounced = useDebouncedValue(value, 400);

  useEffect(() => {
    setParams({ q: debounced || null});
  }, [debounced, setParams]);

  useEffect(() => {
    // keep input in sync with URL when back/forward pressed
    setValue(get('q', ''));
  }, [get]);

  return (
    <input
      aria-label="Search by name"
      placeholder="Search by name…"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className="w-full rounded border px-3 py-2"
    />
  );
}
