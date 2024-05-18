CREATE TABLE "users" (
  "id" SERIAL PRIMARY KEY,
  "pw_hash" varchar(128) NOT NULL,
  "pw_salt" varchar(64) NOT NULL,
  "email" varchar(50) UNIQUE NOT NULL,
  "first_name" varchar(35),
  "last_name" varchar(35),
  "created" timestamp NOT NULL DEFAULT (now()),
  "modified" timestamp NOT NULL DEFAULT (now())
);
CREATE TABLE "products" (
  "id" SERIAL PRIMARY KEY,
  "name" varchar NOT NULL,
  "price" numeric NOT NULL,
  "description" text NOT NULL,
  "quantity" int NOT NULL DEFAULT 0,
  "created" timestamp NOT NULL DEFAULT (now()),
  "modified" timestamp NOT NULL DEFAULT (now())
);