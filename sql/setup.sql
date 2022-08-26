-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS restaurants CASCADE;
DROP TABLE IF EXISTS reviews CASCADE;

CREATE TABLE users (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  password TEXT NOT NULL
);

INSERT INTO users (first_name, last_name, email, password) VALUES
  ('John', 'Doe', 'jdee@lol.com', '9b9a8scyvay98fga8yn7'),
  ('Jane', 'Doe', 'jaaanedoe@wiggle.com', '9b9aQIYUYOIQOUYXIOUAIHDjkf8yn7'),
  ('Woah', 'Big Sean', 'ididacollabwfob@gmail.com', 'whoooooo');

CREATE TABLE restaurants (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  location TEXT NOT NULL
  );

  INSERT INTO restaurants (name, type, location) VALUES
  ('Franks', 'American', 'New York'),
  ('McDonalds', 'Fast Food', 'New York'),
  ('Masala Cottage', 'Indian', 'San Diego'),
  ('South Beach Bar and Grill', 'Seafood', 'Ocean Beach');

  CREATE TABLE reviews (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id),
    restaurant_id BIGINT NOT NULL REFERENCES restaurants(id),
    detail VARCHAR,
    stars INT NOT NULL
  );

  INSERT into reviews(user_id, restaurant_id, detail, stars) VALUES
  (1, 1, 'Great za', 5),
  (1, 2, 'issa maccies', 2),
  (1, 3, 'Delicious samosas, get the garlic naan too', 5),
  (2, 1, 'Big za', 5),
  (2, 2, 'mcdoubles are the goat', 5),
  (2, 3, 'Chicken vindaloo ftw', 5),
  (3, 1, 'Great food', 5),
  (3, 2, 'Great service', 5),
  (3, 4, 'Oceanside tacos? Yes.', 5);