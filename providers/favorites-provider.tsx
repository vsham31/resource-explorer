'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

type FavoritesContextType = {
  favorites: Set<number>;
  toggle: (id: number) => void;
  isFavorite: (id: number) => boolean;
  clearAll: () => void;
};

const FavoritesContext = createContext<FavoritesContextType | null>(null);
const KEY = 'rm_favorites_v1';

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<Set<number>>(new Set());

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const raw = localStorage.getItem(KEY);
    if (raw) {
      try {
        const arr = JSON.parse(raw) as number[];
        setFavorites(new Set(arr));
      } catch {}
    }
  }, []);

  // Only update localStorage when user changes favorites
  const toggle = useCallback((id: number) => {
    setFavorites(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      localStorage.setItem(KEY, JSON.stringify(Array.from(next)));
      return next;
    });
  }, []);

  const clearAll = useCallback(() => {
    setFavorites(() => {
      localStorage.setItem(KEY, JSON.stringify([]));
      return new Set();
    });
  }, []);

  const isFavorite = useCallback((id: number) => favorites.has(id), [favorites]);

  const value = useMemo(() => ({ favorites, toggle, isFavorite, clearAll }), [favorites, toggle, isFavorite, clearAll]);
  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error('useFavorites must be used within FavoritesProvider');
  return ctx;
}