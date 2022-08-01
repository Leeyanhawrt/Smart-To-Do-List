INSERT INTO users (username, password)
VALUES ("user1","password"),
("user2","password"),
("user3","password"),
("user4","password");

INSERT INTO session (user_id, book_id, product_id, resaurant_id,movie_id)
VALUES (1,1,1,1,1),
(2,2,2,2,2),
(3,3,3,3,3);

INSERT INTO movies (title, genre,duration,thumbnail,session_id)
VALUES ("movie1", "comedy", "25 mins","link of thumbnail","1"),
("movie2", "comedy", "25 mins","link of thumbnail","2"),
("movie3", "comedy", "25 mins","link of thumbnail","3");

INSERT INTO books (title,author,genre,published,pages,session_id)
VALUES ("book1","some author","some genre","2012-02-06",35,1),
("book2","some author","some genre","2012-08-06",35,2),
("book3","some author","some genre","2012-03-06",35,3),
("book4","some author","some genre","2012-05-06",35,4),
("book1","some author","some genre","2012-02-06",35,2);

INSERT INTO restaurants (name,type,rating,session_id)
VALUES ("Tim Hortons", "food",4,1),
("Pizza Pizza", "food",1,2),
("Mcdonals", "food",3,3),
("Tim Hortons", "food",5,2),
("Tim Hortons", "food",4,1);

INSERT INTO products (type,name,PRICE,session_id)
VALUES ("sport","bike",3,1),
("cloth","T-shirt",3,2),
("home","light",3,3),

