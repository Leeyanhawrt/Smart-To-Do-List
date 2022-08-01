const express = require('express');
const router  = express.Router();

module.exports = (db) => {

  router.get("/", (req, res) => {
    res.render("dashboard");
  });

  router.get("/confirmation", (req,res) => {
    res.render("confirmation")
  });

  router.post('/', (req,res) => {
    res.sendStatus(204);
    // res.redirect('/dashboard/confirmation')
  })

  return router;
};
