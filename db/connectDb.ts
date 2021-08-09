require('dotenv').config();
import * as pgLib from 'pg-promise';

export function createSingleton<T>(name: string, create: () => T): T {
  const s = Symbol.for(name);
  let scope = (global as any)[s];
  if (!scope) {
    scope = { ...create() };
    (global as any)[s] = scope;
  }
  return scope;
}

const pgp = require('pg-promise')();

interface IDatabaseScope {
  db: pgLib.IDatabase<any>;
  pgp: pgLib.IMain;
}

const connectionString =
  process.env.DATABASE_URL ||
  `postgresql://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}?sslmode=disable`;

export function getDB(): IDatabaseScope {
  return createSingleton<IDatabaseScope>('my-app-db-space', () => {
    return {
      db: pgp(connectionString),
      pgp,
    };
  });
}
