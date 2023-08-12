import { Database } from 'bun:sqlite';
import { z } from 'zod';

const DB_PATH = z
  .string()
  .default('file:cachedb?mode=memory&cache=shared')
  .parse(process.env.DB_PATH);

export const db: Database = new Database(DB_PATH, {
  create: true,
  readwrite: true,
});

export const formatDateLikeDb = (date: Date): string => {
  const dateStr = date
    .toISOString()
    .replace(/T/, ' ') // replace T with a space
    .replace(/\..+/, ''); // delete the dot and everything after
  return dateStr;
};
