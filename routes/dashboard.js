const express = require('express');
const router  = express.Router();
const request = require('request')
const { sanitizeMovieQuery } = require('../public/scripts/helpers')



module.exports = (db) => {
  router.get("/", (req, res) => {
    res.render("dashboard");
  });

  router.post("/", (req, res) => {
    function parseData () {
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
  parseData()
  .then(body => {
    res.send(body.Title)
  })
  .catch(error => {
    res.send(error)
  })
 })

  return router;
};
