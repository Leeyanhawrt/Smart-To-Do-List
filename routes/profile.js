const express = require('express');
const router = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    let templateVar;
    return db.query(`
        SELECT imageURL FROM users WHERE id = 1;`)
      .then(data => {
        console.log(data.rows)
        templateVar = { imageURL: data.rows[0].imageurl };
        console.log(templateVar);
        res.render("profile", templateVar);
      })
      .catch(err => {
        console.log(err);
      });

  });

  router.post("/", (req, res) => {
    console.log(req.body.url);
    const urlUserInput = req.body.url;
    return db.query(`
        UPDATE users SET imageURL = $1
        WHERE id = 1 RETURNING *;`, [urlUserInput])
      .then(data => {
        const results = data.rows;
        res.redirect('/profile');
      })
      .catch(err => {
        console.log(err);
      });
  });

  return router;
};
