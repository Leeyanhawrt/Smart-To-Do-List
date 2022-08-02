INSERT INTO
  users (username, PASSWORD)
VALUES
  ('user1', 'password'),
  ('user2', 'password'),
  ('user3', 'password'),
  ('user4', 'password');

INSERT INTO
  movies (title, genre, duration, thumbnail)
VALUES
  (
    'movie1',
    'comedy',
    '25 mins',
    'link of thumbnail'
  ),
  (
    'movie2',
    'comedy',
    '25 mins',
    'link of thumbnail'
  ),
  (
    'movie3',
    'comedy',
    '25 mins',
    'link of thumbnail'
  );

INSERT INTO
  books (title, author, genre, published, pages)
VALUES
  (
    'book1',
    'some author',
    'some genre',
    '2012-02-06',
    35
  ),
  (
    'book2',
    'some author',
    'some genre',
    '2012-08-06',
    35
  ),
  (
    'book3',
    'some author',
    'some genre',
    '2012-03-06',
    35
  ),
  (
    'book4',
    'some author',
    'some genre',
    '2012-05-06',
    35
  ),
  (
    'book1',
    'some author',
    'some genre',
    '2012-02-06',
    35
  );

INSERT INTO
  restaurants (name, TYPE, rating)
VALUES
  ('Tim Hortons', 'food', 4),
  ('Pizza Pizza', 'food', 1),
  ('Mcdonals', 'food', 3),
  ('Tim Hortons', 'food', 5),
  ('Tim Hortons', 'food', 4);

INSERT INTO
  products (TYPE, name, PRICE)
VALUES
  ('sport', 'bike', 3),
  ('cloth', 'T-shirt', 3),
  ('home', 'light', 3);

INSERT INTO
  SESSION (
    user_id,
    book_id,
    product_id,
    restaurant_id,
    movie_id
  )
VALUES
  (1, 1, NULL, 1, 1),
  (1, 2, 2, 3, 1),
  (1, 3, 1, 1, 3),
  (1, NULL, 2, 2, 2),
  (1, NULL, 3, NULL, 3),
  (2, 1, NULL, NULL, NULL);
