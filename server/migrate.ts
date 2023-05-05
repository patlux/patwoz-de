import type { Database } from 'bun:sqlite'

export function assert(condition: any, message?: string | number): asserts condition {
  if (!condition) {
    throw new Error(`${message}`)
  }
}

export type Migration = {
  version: number
  up: string | ((db: Database) => void)
  down: string | ((db: Database) => void)
}

export const migrate = (
  db: Database,
  migrations: Migration[],
  targetVersion: number = getMaximumVersion(migrations)
): void => {
  const maxVersion = getMaximumVersion(migrations)

  const migrate = db.transaction((targetVersion: number, maxVersion: number) => {
    const currentVersion = getDatabaseVersion(db)
    if (maxVersion < currentVersion) {
      return true
    } else {
      if (currentVersion === targetVersion) {
        return true
      } else if (currentVersion < targetVersion) {
        upgrade()
        return false
      } else {
        downgrade()
        return false
      }
    }
  })

  while (true) {
    // @ts-expect-error
    const done: boolean = migrate.immediate(targetVersion, maxVersion)
    if (done) break
  }

  function upgrade() {
    const currentVersion = getDatabaseVersion(db)
    const targetVersion = currentVersion + 1

    const migration = migrations.find((x) => x.version === targetVersion)
    assert(migration, `Cannot find migration for version ${targetVersion}`)

    try {
      if (typeof migration.up === 'string') {
        db.exec(migration.up)
      } else {
        migration.up(db)
      }
    } catch (e) {
      console.error(`Upgrade from version ${currentVersion} to version ${targetVersion} failed.`)
      throw e
    }
    setDatabaseVersion(db, targetVersion)
  }

  function downgrade() {
    const currentVersion = getDatabaseVersion(db)
    const targetVersion = currentVersion - 1

    const migration = migrations.find((x) => x.version === currentVersion)
    assert(migration, `Cannot find migration for version ${targetVersion}`)

    try {
      if (typeof migration.down === 'string') {
        db.exec(migration.down)
      } else {
        migration.down(db)
      }
    } catch (e) {
      console.error(`Downgrade from version ${currentVersion} to version ${targetVersion} failed.`)
      throw e
    }
    setDatabaseVersion(db, targetVersion)
  }
}

export const getMaximumVersion = (migrations: Migration[]): number => {
  return migrations.reduce((max, cur) => Math.max(cur.version, max), 0)
}

export const getDatabaseVersion = (db: Database): number => {
  const result = db.prepare('PRAGMA user_version;').get()
  return result['user_version']
}

export const setDatabaseVersion = (db: Database, version: number): void => {
  db.exec(`PRAGMA user_version = ${version}`)
}
