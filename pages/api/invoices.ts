import { NextApiRequest, NextApiResponse } from 'next';
import { getDB } from '../../db/connectDb';
const { db, pgp } = getDB();

export const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const invoices = await db.any(
      `SELECT
      invoice_id as id,
      created_at as "createdAt",
      payment_due as "paymentDue",
      description as "description",
      payment_terms as "paymentTerms",
      users.name as "clientName",
      users.email as "clientEmail",
      invoices.status as "status",
      json_build_object
        (
          'street', users.street, 
          'city', users.city,
          'postCode', users.post_code,
          'country', users.country
        ) as "senderAddress",
      json_build_object
        (
          'street', clients.street, 
          'city', clients.city,
          'postCode', clients.post_code,
          'country', clients.country
        ) as "clientAddress",
      invoices.total
      FROM invoices
      JOIN clients ON clients.id = invoices.client_id
      JOIN users ON users.id = invoices.user_id
      WHERE invoices.user_id = 1
      GROUP BY invoices.id, clients.id, users.id;
      `
    );

    res.status(200).json(invoices);
  } catch (e) {
    console.log(e);
  }
};

export default handler;
