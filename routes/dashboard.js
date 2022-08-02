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
    // console.log("before db query");
    // console.log(db);
    return db.query(`SELECT title FROM books WHERE id IN (SELECT session.book_id FROM users JOIN session ON users.id = user_id WHERE users.id = 1);`)
    .then(data => {
      // console.log("after db query");
      const tempVar = data.rows;
      console.log(tempVar);
      res.render("dashboard",tempVar);
        // res.json({ users });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });

    // console.log("here");
  });

  router.get("/confirmation", (req, res) => {
    res.render("confirmation");
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
    console.log(apiResponseRestaurantsRaw);
    console.log(apiResponseBooksRaw);
    console.log(sanitizeMovieQuery(req.body.movie))
    console.log(sanitizeFoodBusinessQuery(req.body.movie))
    console.log(sanitizeBookAndAuthorQuery(req.body.movie))

  })
  return router;
}
