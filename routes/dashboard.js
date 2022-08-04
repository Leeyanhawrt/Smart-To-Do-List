const express = require('express');
const router = express.Router();
const request = require('request');
const { sanitizeMovieQuery, sanitizeFoodBusinessQuery, sanitizeBookAndAuthorQuery } = require('../public/scripts/helpers');

//API KEYS from .env file
//Keys are KEY1 for movie API, KEY2 for restaurants API and KEY3 for Books API

//temp variables that hold the respective api response in JSON format
let apiResponseMoviesJSON;
let apiResponseRestaurantsJSON;
let apiResponseBooksJSON;

//temp variables that are pushged the movie title/restaurant name/book title from parsing api response
let apiResponseMoviesArray = [];
let apiResponseRestaurantsArray = [];
let apiResponseBooksArray = [];
let apiResponseProductsArray = [];


//temp boolean variables that are assigned based on filtering conditional that determines category of queried item
let addItemToMoviesList;
let addItemToRestaurantsList;
let addItemToBooksList;
let addItemToProductsList;

//function to insert into db based on type of insertion

module.exports = (db) => {

  function getArrayForDatabase() {
    if (addItemToMoviesList) {
      console.log(apiResponseMoviesArray);
      console.log("This response is from function for movies insert into database");
      return db.query(`INSERT INTO movies (title) VALUES ($1) returning *;`, apiResponseMoviesArray)
        .then(data => {
          // console.log("+++++++", data.rows);
          const movie = data.rows[0];
          return db.query(`INSERT INTO session (user_id, movie_id) VALUES ($1,$2) returning *;`, [1, movie.id])
            .then(data => {
              // console.log("-----------", data.rows);
            })
        })
        .catch(err => {
          console.log(err);
        });
      // return apiResponseMoviesArray; //ONLY KEEP THIS WHEN WE ARE READY FOR INSERTION
    } else if (addItemToRestaurantsList) {
      // console.log(addItemToRestaurantsList);
      console.log(apiResponseRestaurantsArray);
      console.log("This response is from function for restaurant insert into database");
      return db.query(`INSERT INTO restaurants (name) VALUES ($1) returning *;`, apiResponseRestaurantsArray)
        .then(data => {
          // console.log("+++++++", data.rows);
          const restaurant = data.rows[0];
          return db.query(`INSERT INTO session (user_id, restaurant_id) VALUES ($1,$2) returning *;`, [1, restaurant.id])
            .then(data => {
              // console.log("-----------", data.rows);
            })
        })
        .catch(err => {
          console.log(err);
        });
      // return apiResponseRestaurantsArray; //ONLY KEEP THIS WHEN WE ARE READY FOR INSERTION
    } else if (addItemToBooksList) {
      // console.log(addItemToBooksList);
      console.log(apiResponseBooksArray);
      console.log("This response is from function for books insert into database");
      return db.query(`INSERT INTO books (title) VALUES ($1) returning *;`, apiResponseBooksArray)
        .then(data => {
          // console.log("+++++++", data.rows);
          const book = data.rows[0];
          return db.query(`INSERT INTO session (user_id, book_id) VALUES ($1,$2) returning *;`, [1, book.id])
            .then(data => {
              // console.log("-----------", data.rows);
            })
        })
        .catch(err => {
          console.log(err);
        });
      // return apiResponseBooksArray; //ONLY KEEP THIS WHEN WE ARE READY FOR INSERTION
    } else if (addItemToProductsList) {
      // console.log(addItemToProductsList);
      console.log(apiResponseProductsArray);
      console.log("This response is from function for products insert into database");
      return db.query(`INSERT INTO products (name) VALUES ($1) returning *;`, apiResponseProductsArray)
        .then(data => {
          // console.log("+++++++", data.rows);
          const product = data.rows[0];
          return db.query(`INSERT INTO session (user_id, product_id) VALUES ($1,$2) returning *;`, [1, product.id])
            .then(data => {
              // console.log("-----------", data.rows);
            })
        })
        .catch(err => {
          console.log(err);
        });
      // return apiResponseProductsArray; //ONLY KEEP THIS WHEN WE ARE READY FOR INSERTION
    }
  }

  router.get("/", (req, res) => {
    res.render("dashboard");
  });

  console.log("Before router POST and running API GET calls");
  router.post("/", async (req, res) => {
    function parseMovieData() {
      return new Promise((resolve, reject) => {
        request(`https://www.omdbapi.com/?t=${sanitizeMovieQuery(req.body.movie)}&apikey=${process.env.DB_KEY1}`, (error, response, body) => {
          if (error) {
            return reject(error)
          } else {
            return resolve(JSON.parse(body))
          }
        })
      })
    }
    apiResponseMoviesJSON = await parseMovieData();

    function parseFoodData() {
      return new Promise((resolve, reject) => {
        request({
          url: `https://api.brandfetch.io/v2/brands/${sanitizeFoodBusinessQuery(req.body.movie)}.com`,
          method: 'GET',
          headers: { 'Authorization': `Bearer ${process.env.DB_KEY2}` },
        },
          (error, response, body) => {
            if (error) {
              reject(error)
            } else {
              return resolve(JSON.parse(body))
            }
          })
      })
    }

    apiResponseRestaurantsJSON = await parseFoodData();

    function parseBooksData() {
      return new Promise((resolve, reject) => {
        request(`https://www.googleapis.com/books/v1/volumes?q=${sanitizeBookAndAuthorQuery(req.body.movie)}&key=${process.env.DB_KEY3}`, (error, response, body) => {
          if (error) {
            reject(error)
          } else {
            return resolve(JSON.parse(body))
          }
        })
      })
    }

    apiResponseBooksJSON = await parseBooksData();

    //temp variable to monitor the number of books in JSON api response (max 10)
    let currentBookItemsLength;

    if (apiResponseBooksJSON.items !== undefined) {
      // apiResponseBooksArray.push(apiResponseBooksJSON.items[0].volumeInfo.title)
      currentBookItemsLength = apiResponseBooksJSON.items.length;
    }

    console.log(apiResponseMoviesJSON);
    console.log(apiResponseRestaurantsJSON);
    console.log(apiResponseBooksJSON);

    //Logic notes for how to filter API data and determine category that needs insertion for database
    //if api body for restaurant search does not have logos/links or the name/desciprion is null/undefined then its not a company
    //if api body for books has an items length less than 0 (not many books) then it is not a real book
    //if movie api returns an error saying movie not found or response is false, it is not a movie
    //if all criteria above is somehow not met, then it is a product (can default to product since user can change category

    //logic for when its most likely that user has entered a movie as their todo item
    if ((apiResponseMoviesJSON.Response === 'True' && apiResponseMoviesJSON.Director !== 'N/A') && (apiResponseRestaurantsJSON.message === 'Not Found' || apiResponseRestaurantsJSON.links.length === 0)) {
      apiResponseMoviesArray = [];
      addItemToMoviesList = true;
      apiResponseMoviesArray.push(req.body.movie.toString());
    } else {
      apiResponseMoviesArray = [];
      addItemToMoviesList = false;
    }

    //logic for when its most likely that user has entered a product as their todo item
    if (apiResponseMoviesJSON.Response === 'True' && apiResponseRestaurantsJSON.message && (currentBookItemsLength === undefined || currentBookItemsLength <= 10)) {
      apiResponseProductsArray = [];
      addItemToProductsList = true;
      apiResponseProductsArray.push(req.body.movie.toString());
    } else {
      apiResponseProductsArray = [];
      addItemToProductsList = false;
    }

    //logic for when its most likely that user has entered a restaurant/food business as their todo item
    if (apiResponseMoviesJSON.Response === 'True' && (!apiResponseRestaurantsJSON.message || apiResponseRestaurantsJSON.links) && (currentBookItemsLength === undefined || currentBookItemsLength <= 10)) {
      apiResponseRestaurantsArray = [];
      addItemToRestaurantsList = true;
      apiResponseRestaurantsArray.push(req.body.movie.toString());
    } else {
      apiResponseRestaurantsArray = [];
      addItemToRestaurantsList = false;
    }

    //logic for checking for when all other booleans for todo item types are false and not true, then setting books todo boolean to true
    if (addItemToMoviesList === false && addItemToProductsList === false && addItemToRestaurantsList === false) {
      apiResponseBooksArray = [];
      addItemToBooksList = true;
      apiResponseBooksArray.push(req.body.movie.toString());
    } else {
      apiResponseBooksArray = [];
      addItemToBooksList = false;
    }

    //Calling function that determines which category user's todo item needs to be and returns an array with the user query for database insertion
    getArrayForDatabase();
    res.redirect('/dashboard');
  })



  router.post("/edit/movie", (req, res) => {
    // console.log(req.body);
    // console.log(req.body.id);  //4
    // console.log(req.body.type);  //product OR book OR restaurant
    let tableInto;
    let tableInSession;
    let itemInfo;

    if (req.body.type == "product") {
      tableInto = "products";
      tableInSession = "product_id";
      itemInfo = "name"
    } else if (req.body.type == "book") {
      tableInto = "books";
      tableInSession = "book_id";
      itemInfo = "name"
    } else if (req.body.type == "restaurant") {
      tableInto = "restaurants";
      tableInSession = "restaurant_id";
      itemInfo = "name"
    }

    return db.query(`
    INSERT INTO ${tableInto} (${itemInfo})
    SELECT name FROM movies
    WHERE id = $1 RETURNING *;`, [req.body.id])
      .then(data => {
        // console.log(data.rows[0].id);
        return db.query(`
        UPDATE session SET ${tableInSession} = $1, movie_id = NULL
        WHERE movie_id = $2 RETURNING *;`, [data.rows[0].id, req.body.id])
          .then(data => {
            const results = data.rows;
            // console.log(results);
            res.json({ response_code: 200 });
          })
          .catch(err => {
            console.log(err);
          });
      })
      .catch(err => {
        console.log(err);
      });
  });

  router.post("/delete/movie", (req, res) => {
    // console.log(req.body);
    // console.log(req.body.id);
    return db.query(`DELETE FROM session WHERE movie_id = $1`, [req.body.id])
      .then(data => {
        const results = data.rows;
        res.json({ response_code: 200 });
      })
      .catch(err => {
        console.log(err);
      });
  });

  router.post("/edit/restaurant", (req, res) => {
    // console.log(req.body);
    // console.log(req.body.id);  //4
    // console.log(req.body.type);  //movie OR product OR book
    let tableInto;
    let tableInSession;
    let itemInfo;

    if (req.body.type == "movie") {
      tableInto = "movies";
      tableInSession = "movie_id";
      itemInfo = "name"
    } else if (req.body.type == "product") {
      tableInto = "products";
      tableInSession = "product_id";
      itemInfo = "name"
    } else if (req.body.type == "book") {
      tableInto = "books";
      tableInSession = "book_id";
      itemInfo = "name"
    }

    return db.query(`
    INSERT INTO ${tableInto} (${itemInfo})
    SELECT name FROM restaurants
    WHERE id = $1 RETURNING *;`, [req.body.id])
      .then(data => {
        // console.log(data.rows[0].id);
        return db.query(`
        UPDATE session SET ${tableInSession} = $1, restaurant_id = NULL
        WHERE restaurant_id = $2 RETURNING *;`, [data.rows[0].id, req.body.id])
          .then(data => {
            const results = data.rows;
            // console.log(results);
            res.json({ response_code: 200 });
          })
          .catch(err => {
            console.log(err);
          });
      })
      .catch(err => {
        console.log(err);
      });
  });

  router.post("/delete/restaurant", (req, res) => {
    // console.log(req.body);
    // console.log(req.body.id);
    return db.query(`DELETE FROM session WHERE restaurant_id = $1`, [req.body.id])
      .then(data => {
        const results = data.rows;
        res.json({ response_code: 200 });
      })
      .catch(err => {
        console.log(err);
      });
  });

  router.post("/edit/product", (req, res) => {
    // console.log(req.body);
    // console.log(req.body.id);  //4
    // console.log(req.body.type);  //movie OR restaurant OR book
    let tableInto;
    let tableInSession;
    let itemInfo;

    if (req.body.type == "movie") {
      tableInto = "movies";
      tableInSession = "movie_id";
      itemInfo = "name"
    } else if (req.body.type == "restaurant") {
      tableInto = "restaurants";
      tableInSession = "restaurant_id";
      itemInfo = "name"
    } else if (req.body.type == "book") {
      tableInto = "books";
      tableInSession = "book_id";
      itemInfo = "name"
    }

    return db.query(`
    INSERT INTO ${tableInto} (${itemInfo})
    SELECT name FROM products
    WHERE id = $1 RETURNING *;`, [req.body.id])
      .then(data => {
        console.log(data.rows[0].id);
        return db.query(`
        UPDATE session SET ${tableInSession} = $1, product_id = NULL
        WHERE product_id = $2 RETURNING *;`, [data.rows[0].id, req.body.id])
          .then(data => {
            const results = data.rows;
            // console.log(results);
            res.json({ response_code: 200 });
          })
          .catch(err => {
            console.log(err);
          });
      })
      .catch(err => {
        console.log(err);
      });
  });

  router.post("/delete/product", (req, res) => {
    // console.log(req.body);
    // console.log(req.body.id);
    return db.query(`DELETE FROM session WHERE product_id = $1`, [req.body.id])
      .then(data => {
        const results = data.rows;
        res.json({ response_code: 200 });
      })
      .catch(err => {
        console.log(err);
      });
  });

  router.post("/edit/book", (req, res) => {
    // console.log(req.body);
    // console.log(req.body.id);  //4
    // console.log(req.body.type);  //movie OR restaurant OR product
    let tableInto;
    let tableInSession;
    let itemInfo;

    if (req.body.type == "movie") {
      tableInto = "movies";
      tableInSession = "movie_id";
      itemInfo = "name"
    } else if (req.body.type == "restaurant") {
      tableInto = "restaurants";
      tableInSession = "restaurant_id";
      itemInfo = "name"
    } else if (req.body.type == "product") {
      tableInto = "products";
      tableInSession = "product_id";
      itemInfo = "name"
    }

    return db.query(`
    INSERT INTO ${tableInto} (${itemInfo})
    SELECT name FROM books
    WHERE id = $1 RETURNING *;`, [req.body.id])
      .then(data => {
        console.log(data.rows[0].id);
        return db.query(`
        UPDATE session SET ${tableInSession} = $1, book_id = NULL
        WHERE book_id = $2 RETURNING *;`, [data.rows[0].id, req.body.id])
          .then(data => {
            const results = data.rows;
            // console.log(results);
            res.json({ response_code: 200 });
          })
          .catch(err => {
            console.log(err);
          });
      })
      .catch(err => {
        console.log(err);
      });
  });

  router.post("/delete/book", (req, res) => {
    // console.log(req.body);
    // console.log(req.body.id);
    return db.query(`DELETE FROM session WHERE book_id = $1`, [req.body.id])
      .then(data => {
        const results = data.rows;
        res.json({ response_code: 200 });
      })
      .catch(err => {
        console.log(err);
      });
  });

  //Get title from table -> books where user_id = 1, then send results as json to frontend (dev user)
  router.get("/book", (req, res) => {
    return db.query(`SELECT name, id FROM books
  WHERE id IN (SELECT session.book_id FROM users
  JOIN session ON users.id = user_id WHERE users.id = 1);`)
      .then(data => {
        const results = data.rows;
        res.json({ results });
      })
      .catch(err => {
        console.log(err);
      });
  });

  //Get title from table -> movie where user_id = 1, then send results as json to frontend (dev user)
  router.get("/movie", (req, res) => {
    return db.query(`SELECT name, id FROM movies
  WHERE id IN (SELECT session.movie_id FROM users
  JOIN session ON users.id = user_id WHERE users.id = 1);`)
      .then(data => {
        const results = data.rows;
        res.json({ results });
      })
      .catch(err => {
        console.log(err);
      });
  });

  //Get product name from table -> products where user_id = 1, then send results as json to frontend (dev user)
  router.get("/product", (req, res) => {
    return db.query(`SELECT name, id FROM products
  WHERE id IN (SELECT session.product_id FROM users
  JOIN session ON users.id = user_id WHERE users.id = 1);`)
      .then(data => {
        const results = data.rows;
        console.log(results);
        res.json({ results });
      })
      .catch(err => {
        console.log(err);
      });
  });

  //Get restaurant name from table -> restaurants where user_id = 1, then send results as json to frontend (dev user)
  router.get("/restaurant", (req, res) => {
    return db.query(`SELECT name, id FROM restaurants
  WHERE id IN (SELECT session.restaurant_id FROM users
  JOIN session ON users.id = user_id WHERE users.id = 1);`)
      .then(data => {
        const results = data.rows;
        res.json({ results });
      })
      .catch(err => {
        console.log(err);
      });
  });
  return router;
}
