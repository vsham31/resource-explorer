'use client';

import Link from 'next/link';
import FavoriteButton from './FavoriteButton';
import { Character } from '../lib/types';

export default function CharacterCard({ c }: { c: Character }) {
  return (
    <Link
      href={`/characters/${c.id}`}
      className="flex gap-3 rounded border p-3 hover:bg-gray-50 dark:hover:bg-neutral-900 focus:outline-none focus:ring-2 ring-blue-500"
    >
      <img
        src={c.image}
        alt={c.name}
        width={80}
        height={80}
        className="h-20 w-20 flex-none rounded object-cover"
      />
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-3">
          <p className="truncate text-lg font-semibold">{c.name}</p>
          <FavoriteButton id={c.id} size="sm" />
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {c.status} • {c.species} • {c.gender}
        </p>
        <p className="truncate text-sm text-gray-500 dark:text-gray-400">
          Last known: {c.location.name}
        </p>
      </div>
    </Link>
  );
}
