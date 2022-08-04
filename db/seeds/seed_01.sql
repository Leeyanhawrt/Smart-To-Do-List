INSERT INTO
  users (username, PASSWORD, imageURL)
VALUES
  ('user1', 'password','https://www.nicepng.com/png/detail/875-8759926_coolcat-sticker-mlg-cat-with-glasses.png'),
  ('user2', 'password',NULL),
  ('user3', 'password',NULL),
  ('user4', 'password',NULL);

INSERT INTO
  movies (name, genre, duration, thumbnail)
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
  books (name, author, genre, published, pages)
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
    'book5',
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
