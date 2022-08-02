const express = require('express');
const router = express.Router();

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

  router.post('/', (req, res) => {
    res.sendStatus(204);
    // res.redirect('/dashboard/confirmation')
  });

  return router;
};
