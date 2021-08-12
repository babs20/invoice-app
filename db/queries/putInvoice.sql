INSERT INTO invoices 
(invoice_id, created_at, payment_due, description, payment_terms, status, total, client_id, user_id)
VALUES 
(${id}, ${createdAt}, ${paymentDue}, ${description}, ${paymentTerms}, ${status}, ${total}, ${clientId}, 1)
RETURNING id, invoice_id, created_at, payment_due, description, payment_terms, status, total, client_id, user_id;