import { NextApiRequest, NextApiResponse } from 'next';
import { getDB } from '../../db/connectDb';
import createSingleton from '../../utils/createSingleton';
import pgPromise from 'pg-promise';
const { join: joinPath } = require('path');
const { db, pgp } = getDB();
interface ISqlQuery {
  query: pgPromise.QueryFile;
}

type Item = {
  name: string;
  quantity: number;
  price: number;
  invoiceId: number;
};

type ItemsType = Item[];

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
          res.status(500);
          console.log('QUERY FILE ISSUE: ', e);
        }
        res.status(500);
        console.log(e);
      }
      break;
    case 'POST':
      try {
        const { query: createClient } = sql(
          '../../../../db/queries/createClient.sql'
        );
        const { query: putInvoice } = sql(
          '../../../../db/queries/putInvoice.sql'
        );

        await db
          .tx(async (t) => {
            const client = await t.any(createClient, { ...body });
            const invoice = await t.any(putInvoice, {
              ...body,
              clientId: client[0].id,
            });

            const itemsFromInvoice: ItemsType = body.items.map((item: Item) => {
              return {
                ...item,
                price: item.price * 100, // convert to pennies
                invoice_id: invoice[0].id,
              };
            });

            const itemsQuery =
              pgp.helpers.insert(
                itemsFromInvoice,
                ['name', 'quantity', 'price', 'invoice_id'],
                'items'
              ) + ' RETURNING name, quantity, price';

            await t.any(itemsQuery);

            return t.batch(invoice);
          })
          .then((data) => {
            console.log(data);
            res.status(200).json(data);
          })
          .catch((e) => {
            res.status(500);
            console.log(e);
          });
      } catch (e) {
        if (e instanceof pgp.errors.QueryFileError) {
          console.log('QUERY FILE ISSUE: ', e);
        } else {
          console.log(e);
        }
        res.status(500);
      }
  }
};

export default handler;
