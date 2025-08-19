'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode, useRef } from 'react';

export default function QueryProvider({ children }: { children: ReactNode }) {
  const clientRef = useRef<QueryClient | null>(null);
  if (!clientRef.current) {
    clientRef.current = new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 1000 * 30,
          gcTime: 1000 * 60 * 5,
          refetchOnWindowFocus: false
        }
      }
    });
  }
  return <QueryClientProvider client={clientRef.current!}>{children}</QueryClientProvider>;
}
