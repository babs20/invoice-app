INSERT INTO clients (name, email, street, city, post_code, country)
VALUES (${clientName}, ${clientEmail}, ${clientAddress.street}, ${clientAddress.city}, ${clientAddress.postCode}, ${clientAddress.country})
RETURNING id;