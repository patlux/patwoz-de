import { useMatches } from '@remix-run/react';
import type { RootLoaderData } from '~/root';

export const useRootLoaderData = (): RootLoaderData | null => {
  const matches = useMatches();
  const root = matches.find((m) => m.id === 'root');
  return (root?.data as any) ?? null;
};
