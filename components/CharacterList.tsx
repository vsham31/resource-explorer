'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchCharacters } from '../lib/rickmorty';
import { useQueryParams } from '../lib/useQueryParams';
import { useMemo } from 'react';
import CharacterCard from './CharacterCard';
import SkeletonCard from './SkeletonCard';
import EmptyState from './EmptyState';
import ErrorState from './ErrorState';

function sortResults(results: any[], sort: string) {
  const [key, dir] = sort.split('-');
  const sgn = dir === 'desc' ? -1 : 1;
  return [...results].sort((a, b) => {
    let av: any = a[key];
    let bv: any = b[key];
    if (key === 'created') {
      av = new Date(av).getTime();
      bv = new Date(bv).getTime();
    } else {
      av = String(av).toLowerCase();
      bv = String(bv).toLowerCase();
    }
    if (av < bv) return -1 * sgn;
    if (av > bv) return 1 * sgn;
    return 0;
  });
}

export default function CharacterList() {
  const { get, setParams } = useQueryParams();
  const page = parseInt(get('page', '1')) || 1;
  const q = get('q', '');
  const status = get('status', '');
  const species = get('species', '');
  const gender = get('gender', '');
  const sort = get('sort', 'name-asc');

  const query = useQuery({
    queryKey: ['characters', { page, q, status, species, gender }],
    queryFn: ({ signal }) =>
      fetchCharacters(
        {
          page,
          name: q || undefined,
          status: (status as any) || undefined,
          species: species || undefined,
          gender: (gender as any) || undefined
        },
        signal
      ),
    placeholderData: (prev) => prev, // keep last page visible while loading
  });

  const sorted = useMemo(() => sortResults(query.data?.results ?? [], sort), [query.data, sort]);

  if (query.isPending) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)}
      </div>
    );
  }

  if (query.isError) {
    return <ErrorState onRetry={() => query.refetch()} />;
  }

  if (!sorted.length) {
    return <EmptyState title="No characters found" hint="Try different filters or search terms." />;
  }

  const pages = query.data?.info.pages ?? 1;

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        {sorted.map((c) => <CharacterCard key={c.id} c={c} />)}
      </div>

      <nav className="flex items-center justify-between gap-2">
        <button
          onClick={() => setParams({ page: Math.max(1, page - 1) })}
          disabled={page <= 1}
          className="rounded border px-3 py-1 disabled:opacity-50"
        >
          ← Prev
        </button>
        <span className="text-sm">Page {page} / {pages}</span>
        <button
          onClick={() => setParams({ page: Math.min(pages, page + 1) })}
          disabled={page >= pages}
          className="rounded border px-3 py-1 disabled:opacity-50"
        >
          Next →
        </button>
      </nav>
    </div>
  );
}
