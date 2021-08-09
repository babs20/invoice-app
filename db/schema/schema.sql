DROP TYPE IF EXISTS invoice_status CASCADE;
CREATE TYPE "invoice_status" AS ENUM (
  'pending',
  'draft',
  'paid'
);

DROP TABLE IF EXISTS invoices CASCADE;
CREATE TABLE "invoices" (
  "id" serial PRIMARY KEY,
  "invoice_id" varchar(255) NOT NULL,
  "created_at" varchar(255) NOT NULL,
  "payment_due" varchar(255) NOT NULL,
  "status" invoice_status NOT NULL,
  "total" integer NOT NULL,
  "client_id" integer NOT NULL,
  "user_id" integer NOT NULL
);

DROP TABLE IF EXISTS clients CASCADE;
CREATE TABLE "clients" (
  "id" serial PRIMARY KEY,
  "name" varchar(255) NOT NULL,
  "email" varchar(255),
  "street" varchar(255),
  "city" varchar(255),
  "post_code" varchar(255),
  "country" varchar(255)
);

DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE "users" (
  "id" serial PRIMARY KEY,
  "name" varchar(255) NOT NULL,
  "email" varchar(255) NOT NULL,
  "street" varchar(255) NOT NULL,
  "city" varchar(255) NOT NULL,
  "post_code" varchar(255) NOT NULL,
  "country" varchar(255) NOT NULL
);

DROP TABLE IF EXISTS items CASCADE;
CREATE TABLE "items" (
  "id" serial PRIMARY KEY,
  "name" varchar(255) NOT NULL,
  "quantity" integer NOT NULL,
  "price" money NOT NULL,
  "total" money NOT NULL,
  "invoice_id" integer NOT NULL
);

ALTER TABLE "invoices" ADD FOREIGN KEY ("client_id") REFERENCES "clients" ("id");

ALTER TABLE "invoices" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "items" ADD FOREIGN KEY ("invoice_id") REFERENCES "invoices" ("id");
