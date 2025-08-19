'use client';

import { useQueryParams } from '../lib/useQueryParams';

const statuses = ['', 'alive', 'dead', 'unknown'] as const;
const genders = ['', 'female', 'male', 'genderless', 'unknown'] as const;

export default function FiltersBar() {
  const { get, setParams } = useQueryParams();
  const status = (get('status', '') as typeof statuses[number]);
  const gender = (get('gender', '') as typeof genders[number]);
  const species = get('species', '');

  function update(key: string, value: string) {
    const v = value || null;
    // Reset to first page whenever filters change
    setParams({ [key]: v, page: 1 });
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      <label className="text-sm">
        Status:{' '}
        <select
          value={status}
          onChange={(e) => update('status', e.target.value)}
          className="rounded border px-2 py-1"
        >
          {statuses.map(s => <option key={s} value={s}>{s || 'Any'}</option>)}
        </select>
      </label>

      <label className="text-sm">
        Gender:{' '}
        <select
          value={gender}
          onChange={(e) => update('gender', e.target.value)}
          className="rounded border px-2 py-1"
        >
          {genders.map(g => <option key={g} value={g}>{g || 'Any'}</option>)}
        </select>
      </label>

      <label className="text-sm">
        Species:{' '}
        <input
          value={species}
          onChange={(e) => update('species', e.target.value)}
          placeholder="e.g., Human"
          className="rounded border px-2 py-1"
        />
      </label>
    </div>
  );
}
