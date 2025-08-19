'use client';

import { useQueryParams } from '../lib/useQueryParams';

export default function SortSelect() {
  const { get, setParams } = useQueryParams();
  const sort = get('sort', 'name-asc');

  function update(value: string) {
    setParams({ sort: value });
  }

  return (
    <label className="text-sm">
      Sort:{' '}
      <select
        value={sort}
        onChange={(e) => update(e.target.value)}
        className="rounded border px-2 py-1"
      >
        <option value="name-asc">Name ↑</option>
        <option value="name-desc">Name ↓</option>
        <option value="created-desc">Newest</option>
        <option value="created-asc">Oldest</option>
      </select>
    </label>
  );
}
