const express = require('express');
const router = express.Router();

module.exports = (db) => {

  router.get("/", (req, res) => {
    console.log("before db query");
    db.query(`SELECT * FROM users;`)
      .then(data => {
        console.log("after db query");
        const users = data.rows;
        console.log(users);
        res.json({ users });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });

    // console.log("here");
    // res.render("dashboard");
  });

  router.get("/confirmation", (req, res) => {
    res.render("confirmation");
  });

  router.post('/', (req, res) => {
    res.sendStatus(204);
    // res.redirect('/dashboard/confirmation')
  });

  return router;
};
