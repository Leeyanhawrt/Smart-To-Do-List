const express = require('express');
const router  = express.Router();

module.exports = (db) => {

  console.log("aaa");
  router.get("/", (req, res) => {
    res.render("dashboard");
  });

  // router.post("/", (req, res) => {
  //   res.redirect("/home"); //should redirect to home page with login,not sure the urls yet
  // });

  return router;
};
