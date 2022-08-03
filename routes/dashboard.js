const express = require('express');
const router = express.Router();
const request = require('request')
const { sanitizeMovieQuery, sanitizeFoodBusinessQuery, sanitizeBookAndAuthorQuery } = require('../public/scripts/helpers')
const objdata = {}

let apiResponseMoviesRaw
let apiResponseRestaurantsRaw
let apiResponseBooksRaw

let addItemToMoviesList = false;
let addItemToBooksList = false;
let addItemToRestaurantsList = false;
let addItemToProductsList = false;

module.exports = (db) => {


  router.get("/", (req, res) => {
    res.render("dashboard");
  });

  //send data to each single url, so we can use those data in frontend
  router.get("/book", (req, res) => {
    return db.query(`SELECT title FROM books
    WHERE id IN (SELECT session.book_id FROM users
    JOIN session ON users.id = user_id WHERE users.id = 1);`)
      .then(data => {
        const results = data.rows;
        res.json({ results });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.get("/movie", (req, res) => {
    return db.query(`SELECT title FROM movies
    WHERE id IN (SELECT session.movie_id FROM users
    JOIN session ON users.id = user_id WHERE users.id = 1);`)
      .then(data => {
        const results = data.rows;
        res.json({ results });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.get("/product", (req, res) => {
    return db.query(`SELECT name FROM products
    WHERE id IN (SELECT session.product_id FROM users
    JOIN session ON users.id = user_id WHERE users.id = 1);`)
      .then(data => {
        const results = data.rows;
        console.log(results);
        res.json({ results });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.get("/restaurant", (req, res) => {
    return db.query(`SELECT name FROM restaurants
    WHERE id IN (SELECT session.restaurant_id FROM users
    JOIN session ON users.id = user_id WHERE users.id = 1);`)
      .then(data => {
        const results = data.rows;
        res.json({ results });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.post("/", async (req, res) => {
    function parseMovieData() {
      return new Promise((resolve, reject) => {
        request(`https://www.omdbapi.com/?t=${sanitizeMovieQuery(req.body.movie)}&apikey=a6b04247`, (error, response, body) => {
          if (error) {
            return reject(error)
          } else {
            return resolve(JSON.parse(body))
          }
        })
      })
    }
    apiResponseMoviesRaw = await parseMovieData();

    function parseFoodData() {
      return new Promise((resolve, reject) => {
        request({
          url: `https://api.brandfetch.io/v2/brands/${sanitizeFoodBusinessQuery(req.body.movie)}.com`,
          method: 'GET',
          headers: { 'Authorization': 'Bearer pAfXYuJYJLCanSk1voTNaoyqJxnYtyGybku75eSeKI0=' },
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

    apiResponseRestaurantsRaw = await parseFoodData();

    function parseBooksData() {
      return new Promise((resolve, reject) => {
        request(`https://www.googleapis.com/books/v1/volumes?q=${sanitizeBookAndAuthorQuery(req.body.movie)}&key=AIzaSyADHzbY7CBGfxvALFDuOC6R4OenddipLBM`, (error, response, body) => {
          if (error) {
            reject(error)
          } else {
            return resolve(JSON.parse(body))
          }
        })
      })
    }
    apiResponseBooksRaw = await parseBooksData();

    console.log(apiResponseMoviesRaw);
    // console.log(apiResponseRestaurantsRaw);
    console.log(apiResponseBooksRaw);
    console.log(sanitizeMovieQuery(req.body.movie))
    // console.log(sanitizeFoodBusinessQuery(req.body.movie))
    console.log(sanitizeBookAndAuthorQuery(req.body.movie))

  })
  return router;
}
