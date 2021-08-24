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
      console.log('IN GET');

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
      console.log('IN POST');

      try {
        const { query: createClient } = sql(
          '../../../../db/queries/createClient.sql'
        );
        const { query: insertInvoice } = sql(
          '../../../../db/queries/insertInvoice.sql'
        );

        await db
          .tx(async (t) => {
            const client = await t.any(createClient, { ...body });
            const invoice = await t.any(insertInvoice, {
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

            const items = await t.any(itemsQuery);

            return t.batch(items);
          })
          .then((data) => {
            res.status(200).json(JSON.stringify(data));
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
      break;
    case 'PUT':
      console.log('IN UPDATE');

      try {
        if (body.statusOnly === true) {
          const { query } = sql('../../../../db/queries/putInvoiceStatus.sql');

          await db.any(query, [body.invoice_id, body.status]);

          res.status(200).end();
        } else {
          const { query: putClient } = sql(
            '../../../../db/queries/putClient.sql'
          );
          const { query: putInvoice } = sql(
            '../../../../db/queries/putInvoice.sql'
          );
          const { query: putItems } = sql(
            '../../../../db/queries/putInvoice.sql'
          );

          await db.tx(async (t) => {
            const invoice = await t.any(putInvoice, {
              ...body,
            });

            await t.none(putClient, {
              ...body,
              clientId: invoice[0].client_id,
            });

            const itemsFromInvoice: ItemsType = body.items.map((item: Item) => {
              return {
                ...item,
                price: item.price,
                invoice_id: invoice[0].id,
              };
            });

            const itemsQuery =
              pgp.helpers.update(
                itemsFromInvoice,
                ['name', 'quantity', 'price', 'invoice_id'],
                'items'
              ) + `WHERE t.invoice_id = ${invoice[0].id};`;

            await t.none(itemsQuery);

            res.status(200).end();
          });

          res.status(200).end();
        }
      } catch (e) {
        if (e instanceof pgp.errors.QueryFileError) {
          console.log('QUERY FILE ISSUE: ', e);
        } else {
          console.log(e);
        }
        res.status(500);
      }
      break;
    case 'DELETE':
      try {
        console.log('IN DELETE');

        const { query } = sql('../../../../db/queries/deleteInvoice.sql');
        await db.none(query, [body.invoice_id]);

        res.status(200).end();
      } catch (e) {
        if (e instanceof pgp.errors.QueryFileError) {
          res.status(500);
          console.log('QUERY FILE ISSUE: ', e);
        }
        res.status(500);
        console.log(e);
      }
      break;
  }
};

export default handler;
