UPDATE clients 
SET
name = ${clientName}, 
email = ${clientEmail}, 
street = ${clientAddress.street}, 
city = ${clientAddress.city}, 
post_code = ${clientAddress.postCode}, 
country = ${clientAddress.country}
WHERE id = ${clientId};