SELECT
invoices.invoice_id as id,
created_at as "createdAt",
payment_due as "paymentDue",
description as "description",
payment_terms as "paymentTerms",
clients.name as "clientName",
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
array_agg
(
  json_build_object
  (
    'name', items.name, 
    'quantity', items.quantity,
    'price', items.price,
    'total', (items.price * items.quantity)
  )
) as "items",
invoices.total
FROM invoices
JOIN clients ON clients.id = invoices.client_id
JOIN users ON users.id = invoices.user_id
LEFT JOIN items ON items.invoice_id = invoices.id
WHERE invoices.user_id = 1
GROUP BY invoices.id, clients.id, users.id;
