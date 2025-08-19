'use client';

const KEY = 'rm_notes_v1';

type NotesMap = Record<string, string>;

function read(): NotesMap {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return {};
    return JSON.parse(raw) as NotesMap;
  } catch {
    return {};
  }
}

export function getNoteFor(id: number) {
  if (typeof window === 'undefined') return '';
  const map = read();
  return map[String(id)] ?? '';
}

export function setNoteFor(id: number, value: string) {
  const map = read();
  map[String(id)] = value;
  localStorage.setItem(KEY, JSON.stringify(map));
}
