const express = require('express');
const router = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    res.render("login");
  });

  //when user submits login information and posts to back end
  //data format from front end { username: jQuery-username, password: jQuery-password }
  router.post("/", (req, res) => {
    console.log("user entered login information")
    console.log(req.body);
    console.log(req.body.username);  //username from front end
    console.log(req.body.password);  //password from front end

    let $userLoginEntered = req.body.username;
    let $userPasswordEntered = req.body.password

    console.log($userLoginEntered);
    console.log($userPasswordEntered);

    let passwordInDatabase;

    return db.query(`SELECT PASSWORD FROM users WHERE username = $1;`, [$userLoginEntered])
      .then(data => {
        passwordInDatabase = data.rows[0].password;
        if (passwordInDatabase === $userPasswordEntered) {
          console.log("LETSSS GOOOOOO");
          res.json({ user: "verified" });
        } else {
          res.json({ response_code: 200 });
        }
      })
      .catch(err => {
        res.json({ user: "noexist" });
        console.log(err);
      });


    // res.redirect("/login"); //should redirect to home page with login,not sure the urls yet


  });

  return router;
};
