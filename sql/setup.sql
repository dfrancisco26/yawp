-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS restaurants;

CREATE TABLE users (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  password_hash TEXT NOT NULL
);

CREATE TABLE restaurants (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  location TEXT NOT NULL
  );

  INSERT INTO restaurants (name, type, location) VALUES
  ('McDonalds', 'Fast Food', 'New York'),
  ('Franks', 'American', 'New York'),
  ('Masala Cottage', 'Indian', 'San Diego'),
  ('South Beach Bar and Grill', 'Seafood', 'Ocean Beach')