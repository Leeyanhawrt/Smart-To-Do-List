const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    res.render("profile");
  });

  router.post("/", (req, res) => {
    console.log(req.body.url);
    res.send(req.body);
  });

  return router;
};
