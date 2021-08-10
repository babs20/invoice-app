require('dotenv').config();
import * as pgLib from 'pg-promise';
import createSingleton from '../utils/createSingleton';
interface IDatabaseScope {
  db: pgLib.IDatabase<any>;
  pgp: pgLib.IMain;
}

const pgp = require('pg-promise')();

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
