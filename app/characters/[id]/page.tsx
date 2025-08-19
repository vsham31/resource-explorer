'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchCharacterById } from '../../../lib/rickmorty';
import { useParams, useRouter } from 'next/navigation';
import FavoriteButton from '../../../components/FavoriteButton';
import { getNoteFor, setNoteFor } from '../../../lib/notes';
import { useEffect, useState } from 'react';

export default function CharacterDetailPage() {
  const params = useParams<{ id: string }>();
  const id = Number(params.id);
  const router = useRouter();

  const { data, isPending, isError, refetch } = useQuery({
    queryKey: ['character', id],
    queryFn: ({ signal }) => fetchCharacterById(id, signal)
  });

  const [note, setNote] = useState('');

  useEffect(() => {
    setNote(getNoteFor(id));
  }, [id]);

  function saveNote() {
    setNoteFor(id, note.trim());
  }

  if (isPending) {
    return <div className="space-y-3">
      <div className="h-6 w-32 rounded bg-gray-200 dark:bg-neutral-800 animate-pulse" />
      <div className="h-40 w-full rounded bg-gray-200 dark:bg-neutral-800 animate-pulse" />
    </div>;
  }
  if (isError || !data) {
    return (
      <div className="space-y-3">
        <p>Failed to load character.</p>
        <button onClick={() => refetch()} className="rounded border px-3 py-1">Retry</button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <button onClick={() => router.back()} className="rounded border px-3 py-1">← Back</button>
      <div className="flex items-start gap-4">
        <img src={data.image} alt={data.name} width={200} height={200} className="h-40 w-40 rounded object-cover" />
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold">{data.name}</h1>
            <FavoriteButton id={data.id} />
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">{data.status} • {data.species} • {data.gender}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Origin: {data.origin.name}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Last known: {data.location.name}</p>
        </div>
      </div>

      <section className="space-y-2">
        <h2 className="text-lg font-semibold">Personal note</h2>
        <form
          onSubmit={(e) => { e.preventDefault(); saveNote(); }}
          className="space-y-2"
        >
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Add a note about this character…"
            className="h-28 w-full rounded border p-2"
            maxLength={500}
          />
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>{note.length}/500</span>
            <button type="submit" className="rounded border px-3 py-1 hover:bg-gray-100 dark:hover:bg-neutral-800">Save</button>
          </div>
        </form>
      </section>

      <section className="space-y-2">
        <h2 className="text-lg font-semibold">Episodes</h2>
        <ul className="list-disc pl-6">
          {data.episode.slice(0, 20).map((ep) => (
            <li key={ep}><a href={ep} className="underline">{ep}</a></li>
          ))}
        </ul>
        {data.episode.length > 20 && <p className="text-sm text-gray-500">Showing first 20 episode links.</p>}
      </section>
    </div>
  );
}
