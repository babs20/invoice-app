UPDATE invoices
SET
created_at = ${createdAt},
payment_due = ${paymentDue}, 
description = ${description}, 
payment_terms = ${paymentTerms}, 
status = ${status}, 
total = ${total}
WHERE invoice_id = ${id}
RETURNING *;