import { Database } from 'bun:sqlite'

declare global {
  var db: Database
}

export const db: Database =
  globalThis.db ||
  (globalThis.db = new Database(process.env.DB_PATH ?? 'patwoz.db', { create: true }))

export const formatDateLikeDb = (date: Date): string => {
  const dateStr = date
    .toISOString()
    .replace(/T/, ' ') // replace T with a space
    .replace(/\..+/, '') // delete the dot and everything after
  return dateStr
}
