INSERT INTO
  users (username, PASSWORD, imageURL)
VALUES
  ('dev', 'password','https://ih1.redbubble.net/image.2269391147.8818/st,small,845x845-pad,1000x1000,f8f8f8.jpg'),
  ('user1', 'password',NULL),
  ('user2', 'password',NULL),
  ('user3', 'password',NULL);

INSERT INTO
  movies (name, genre, duration, thumbnail)
VALUES
  (
    'Ghostbusters',
    'Comedy',
    '90 min',
    'thumbnail.jpg'
  ),
  (
    'The Godfather',
    'Drama',
    '175 min',
    'thumbnail.jpg'
  ),
  (
    'Inception',
    'Action',
    '148 min',
    'thumbnail.jpg'
  );

INSERT INTO
  books (name, author, genre, published, pages)
VALUES
  (
    'The Lord of the Rings',
    'J.R.R. Tolkien',
    'Fantasy',
    '2001-12-19',
    1254
  ),
  (
    'The Hobbit',
    'J.R.R. Tolkien',
    'Fantasy',
    '2012-12-19',
    1254
  ),
  (
    'Macbeth',
    'William Shakespeare',
    'Drama',
    '1606-01-01',
    123
  ),
  (
    'Hamlet',
    'William Shakespeare',
    'Drama',
    '1606-01-01',
    35
  ),
  (
    'Fullmetal Alchemist',
    'Hiromu Arakawa',
    'Action',
    '2009-01-01',
    123
  );

INSERT INTO
  restaurants (name, TYPE, rating)
VALUES
  ('Tim Hortons', 'food', 4),
  ('Pizza Pizza', 'food', 1),
  ('The Keg', 'food', 3),
  ('Pizza Nova', 'food', 5),
  ('Subway', 'food', 4);

INSERT INTO
  products (TYPE, name, PRICE)
VALUES
  ('Work', 'Laptop', 3),
  ('Sports', 'Bike', 3),
  ('Supplies', 'Towels', 3);
INSERT INTO
  SESSION (
    user_id,
    book_id,
    product_id,
    restaurant_id,
    movie_id
  )
VALUES
  (1, 1, NULL, NULL, NULL),
  (1, 2, NULL, NULL, NULL),
  (1, 3, NULL, NULL, NULL),
  (1, NULL, 1, NULL, NULL),
  (1, NULL, 2, NULL, NULL),
  (1, NULL, 3, NULL, NULL),
  (1, NULL, NULL, 1, NULL),
  (1, NULL, NULL, 2, NULL),
  (1, NULL, NULL, 3, NULL),
  (1, NULL, NULL, NULL, 1),
  (1, NULL, NULL, NULL, 2),
  (1, NULL, NULL, NULL, 3),
  (2, 1, NULL, NULL, NULL);
