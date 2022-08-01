const express = require('express');
const router  = express.Router();

module.exports = (db) => {

  router.get("/", (req, res) => {
    res.render("dashboard");
  });

  router.get("/confirmation", (req,res) => {
    const templateVars = currentMovieObject
    res.render("confirmation", currentMovieObject)
  });

  router.post('/', (req,res) => {
    res.redirect('/dashboard/confirmation')
  });

  return router;
};
