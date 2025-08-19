'use client';

import { useFavorites } from '../providers/favorites-provider';

export default function FavoriteButton({ id, size = 'md' }: { id: number; size?: 'sm' | 'md' }) {
  const { isFavorite, toggle } = useFavorites();
  const active = isFavorite(id);

  const cls = size === 'sm' ? 'text-base' : 'text-xl';
  return (
    <button
      aria-pressed={active}
      aria-label={active ? 'Remove from favorites' : 'Add to favorites'}
      onClick={(e) => { e.preventDefault(); toggle(id); }}
      className={`select-none ${cls}`}
      title={active ? 'Unfavorite' : 'Favorite'}
    >
      {active ? '★' : '☆'}
    </button>
  );
}
