import { NextApiRequest, NextApiResponse } from 'next';
import { getDB } from '../../db/connectDb';
import createSingleton from '../../utils/createSingleton';
import pgPromise from 'pg-promise';
const { join: joinPath } = require('path');
const { db, pgp } = getDB();
interface ISqlQuery {
  query: pgPromise.QueryFile;
}

// Helper for linking to external query files:
const sql = (file: string) => {
  return createSingleton<ISqlQuery>(file, () => {
    const fullPath = joinPath(__dirname, file);
    const query = new pgp.QueryFile(fullPath, { minify: true });
    return { query: query };
  });
};

export const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { body, method } = req;

  switch (method) {
    case 'GET':
      try {
        const { query } = sql('../../../../db/queries/getInvoices.sql');
        const invoices = await db.any(query);

        res.status(200).json(invoices);
      } catch (e) {
        if (e instanceof pgp.errors.QueryFileError) {
          res.status(404);
          console.log('QUERY FILE ISSUE: ', e);
        }
        res.status(404);
        console.log(e);
      }
      break;
    case 'POST':
      console.log(body);
      try {
        const { query } = sql('../../../../db/queries/putInvoice.sql');
        const invoice = await db.any(query, { ...body });
        res.json('test');
      } catch (e) {
        console.log(e);
      }
  }
};

export default handler;
