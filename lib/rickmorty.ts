import { CharacterResponse, Character } from './types';

const API = 'https://rickandmortyapi.com/api';

export type CharacterQuery = {
  page?: number;
  name?: string;
  status?: 'alive' | 'dead' | 'unknown' | '';
  species?: string;
  gender?: 'female' | 'male' | 'genderless' | 'unknown' | '';
};

export async function fetchCharacters(params: CharacterQuery, signal?: AbortSignal): Promise<CharacterResponse> {
  const usp = new URLSearchParams();
  if (params.page) usp.set('page', String(params.page));
  if (params.name) usp.set('name', params.name);
  if (params.status) usp.set('status', params.status);
  if (params.species) usp.set('species', params.species);
  if (params.gender) usp.set('gender', params.gender);
  const url = `${API}/character?${usp.toString()}`;
  const res = await fetch(url, { signal });
  if (!res.ok) {
    // Normalize 404 for empty results
    if (res.status === 404) {
      return { info: { count: 0, pages: 0, next: null, prev: null }, results: [] };
    }
    throw new Error(`Failed to fetch: ${res.status}`);
  }
  return res.json() as Promise<CharacterResponse>;
}

export async function fetchCharacterById(id: number, signal?: AbortSignal): Promise<Character> {
  const res = await fetch(`${API}/character/${id}`, { signal });
  if (!res.ok) throw new Error(`Failed to fetch character ${id}: ${res.status}`);
  return res.json() as Promise<Character>;
}
