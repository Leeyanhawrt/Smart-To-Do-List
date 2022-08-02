const express = require('express');
const router = express.Router();
const request = require('request')
const { sanitizeMovieQuery, sanitizeFoodBusinessQuery } = require('../public/scripts/helpers')



module.exports = (db) => {
  router.get("/", (req, res) => {
    res.render("dashboard");
  });

  router.post("/", (req, res) => {
    function parseData() {
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
        if (body.Response === 'False') {
          return request({
            url: `https://api.brandfetch.io/v2/brands/${sanitizeFoodBusinessQuery(req.body.movie)}.com`,
            method: 'GET',
            headers: { 'Authorization': 'Bearer pAfXYuJYJLCanSk1voTNaoyqJxnYtyGybku75eSeKI0=' },
          },
            (error, response, body) => {
              return JSON.parse(body)
            })
        } else {
          return res.send(body)
        }
      })
      .catch(error => {
        res.send('didnt work')
      })
  })

  return router;
};
