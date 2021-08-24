UPDATE invoices
SET status= $2
WHERE invoice_id = $1;