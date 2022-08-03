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
function getArrayForDatabase() {
  if (addItemToMoviesList) {
    console.log(addItemToMoviesList);
    console.log(apiResponseMoviesArray);
    console.log("This response is from function for movies insert into database");
    return apiResponseMoviesArray; //ONLY KEEP THIS WHEN WE ARE READY FOR INSERTION
  } else if (addItemToRestaurantsList) {
    console.log(addItemToRestaurantsList);
    console.log(apiResponseRestaurantsArray);
    console.log("This response is from function for restaurants insert into database");
    return apiResponseRestaurantsArray; //ONLY KEEP THIS WHEN WE ARE READY FOR INSERTION
  } else if (addItemToBooksList) {
    console.log(addItemToBooksList);
    console.log(apiResponseBooksArray);
    console.log("This response is from function for books insert into database");
    return apiResponseBooksArray; //ONLY KEEP THIS WHEN WE ARE READY FOR INSERTION
  } else if (addItemToProductsList) {
    console.log(addItemToProductsList);
    console.log(apiResponseProductsArray);
    console.log("This response is from function for products insert into database");
    return apiResponseProductsArray; //ONLY KEEP THIS WHEN WE ARE READY FOR INSERTION
  }
}

module.exports = (db) => {

  router.get("/", (req, res) => {
    console.log("before db query");
    console.log(db);
    return db.query(`SELECT title FROM books WHERE id IN (SELECT session.book_id FROM users JOIN session ON users.id = user_id WHERE users.id = 1);`)
      .then(data => {
        console.log("after db query");
        const tempVar = data.rows[0];
        console.log(tempVar);
        res.render("dashboard", tempVar);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
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

    if (apiResponseBooksJSON.items.length !== undefined) {
      // apiResponseBooksArray.push(apiResponseBooksJSON.items[0].volumeInfo.title)
      currentBookItemsLength = apiResponseBooksJSON.items.length;
    }

    // console.log(apiResponseMoviesJSON);
    // console.log(apiResponseRestaurantsJSON);
    // console.log(apiResponseBooksJSON);

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

    // console.log(apiResponseMoviesJSON);
    // console.log(apiResponseRestaurantsJSON);
    // console.log(apiResponseBooksJSON);
    // console.log(apiResponseMoviesArray);
    // console.log(apiResponseRestaurantsArray);
    // console.log(apiResponseBooksArray);
    // console.log(apiResponseProductsArray);

    // console.log(currentBookItemsLength);
    // console.log(addItemToMoviesList);
    // console.log(addItemToRestaurantsList);
    // console.log(addItemToBooksList);
    // console.log(addItemToProductsList);

    // console.log(sanitizeMovieQuery(req.body.movie));
    // console.log(sanitizeFoodBusinessQuery(req.body.movie));
    // console.log(sanitizeBookAndAuthorQuery(req.body.movie));

  })
  return router;
}
