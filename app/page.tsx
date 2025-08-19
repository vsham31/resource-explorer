'use client';

import SearchInput from '../components/SearchInput';
import FiltersBar from '../components/FiltersBar';
import SortSelect from '../components/SortSelect';
import CharacterList from '../components/CharacterList';
import { useFavorites } from '../providers/favorites-provider';
import { useQueryParams } from '../lib/useQueryParams';
import { useEffect, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchCharacters } from '../lib/rickmorty';
import CharacterCard from '../components/CharacterCard';
import SkeletonCard from '../components/SkeletonCard';
import EmptyState from '../components/EmptyState';
import ErrorState from '../components/ErrorState';
import ThemeToggle from '../components/ThemeToggle';
import { useScrollRestoration } from '../lib/useScrollRestoration';

export default function HomePage() {
  useScrollRestoration();
  const { get, setParams } = useQueryParams();
  const favoritesOnly = get('favorites', '') === '1';
  const sort = get('sort', 'name-asc');
  const page = parseInt(get('page', '1')) || 1;
  const q = get('q', '');
  const status = get('status', '');
  const species = get('species', '');
  const gender = get('gender', '');

  const { favorites } = useFavorites();

  // When switching to favorites view, force page to 1 (client-side pagination would be overkill)
  useEffect(() => {
    if (favoritesOnly && page !== 1) setParams({ page: 1 });
  }, [favoritesOnly, page, setParams]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <SortSelect />
        </div>
        <div className="flex-1 min-w-[280px]">
          <SearchInput />
        </div>
      </div>

      <FiltersBar />

      {favoritesOnly ? (
        <FavoritesList sort={sort} ids={Array.from(favorites)} />
      ) : (
        <CharacterList />
      )}
    </div>
  );
}

function FavoritesList({ ids, sort }: { ids: number[]; sort: string }) {
  const { isLoading, isError, data, refetch } = useQuery({
    queryKey: ['favorites', ids],
    // Fetch the characters in chunks to avoid a single huge request.
    // The API supports multiple IDs like /character/1,2,3
    queryFn: async ({ signal }) => {
      if (!ids.length) return [];
      const chunks: number[][] = [];
      for (let i = 0; i < ids.length; i += 20) chunks.push(ids.slice(i, i + 20));
      const all: any[] = [];
      for (const chunk of chunks) {
        const res = await fetch(`https://rickandmortyapi.com/api/character/${chunk.join(',')}`, { signal });
        if (!res.ok) throw new Error('Failed to fetch favorites');
        const json = await res.json();
        all.push(...(Array.isArray(json) ? json : [json]));
      }
      return all;
    },
    enabled: ids.length > 0,
  });

  if (!ids.length) {
    return <EmptyState title="No favorites yet" hint="Tap the ☆ on any character to save it here." />;
  }
  if (isLoading) {
    return <div className="space-y-3">{Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}</div>;
  }
  if (isError) {
    return <ErrorState onRetry={() => refetch()} />;
  }

  const [key, dir] = sort.split('-');
  const sgn = dir === 'desc' ? -1 : 1;
  const sorted = [...(data ?? [])].sort((a: any, b: any) => {
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

  return (
    <div className="space-y-3">
      {sorted.map((c: any) => <CharacterCard key={c.id} c={c} />)}
    </div>
  );
}
