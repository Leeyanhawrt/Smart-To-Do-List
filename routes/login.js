const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    res.render("login");
  });

  router.post("/", (req, res) => {
    res.redirect("/home"); //should redirect to home page with login,not sure the urls yet
  });

  return router;
};