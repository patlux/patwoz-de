import { type LoaderFunction } from '@remix-run/node';
import { z } from 'zod';
import { db } from '~/utils/db.server';

export const loader: LoaderFunction = () => {
  z.object({
    name: z.union([z.literal('page_views'), z.literal('page_views_history')]),
  })
    .array()
    .parse(
      db
        .query(
          `SELECT name FROM sqlite_schema WHERE type ='table' AND name NOT LIKE 'sqlite_%';`,
        )
        .all(),
    );
  return 'OK';
};
