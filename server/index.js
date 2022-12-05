const express = require('express');
const path = require('path');
var cors = require("cors");

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var Spotify = require('spotify-web-api-js');
var s = new Spotify();

var db = require("../database.js")

app.get("/login", (req,res, next) => {
  email = req.query.email;
  password = req.query.password;
  datetime = new Date().toLocaleString();
  var sql = "select username, email, password from users where email = ?";
  db.all(sql, [email], (err, rows) => {
    if (err) {
      db.run("INSERT INTO logs (email, datetime, event) VALUES (?,?,'Fail_Login')", [email, datetime]);
      res.status(400).json({"error": "Something went wrong with the login!"});
    }
    else if (rows.length == 0) {
      db.run("INSERT INTO logs (email, datetime, event) VALUES (?,?,'Fail_Credential_Login')", [email, datetime]);
      res.status(400).json({"error": "Please enter valid credentials!"})
    } 
    else {
      check_password = rows[0].password;
      if (check_password != password) {
        db.run("INSERT INTO logs (email, datetime, event) VALUES (?,?,'Fail_Credential_Login')", [email, datetime]);
        res.status(400).json({"error": "Please enter valid credentials!"})
      } else {
        db.run("INSERT INTO logs (email, datetime, event) VALUES (?,?,'Success_Login')", [email, datetime]);
        res.json({
          "username": rows[0].username,
          "email": rows[0].email
        })
      }
    }
  });
});

app.post("/sign-up", (req, res, next) => {
  username = req.body.username;
  password = req.body.password;
  email = req.body.email;
  datetime = new Date().toLocaleString();

  const sql = "INSERT INTO users (username, email, password) VALUES (?,?,?)"
  db.run(sql, [username, email, password], (err, rows) => {
    if (err) {
      if (err.code == 'SQLITE_CONSTRAINT') {
        db.run("INSERT INTO logs (email, datetime, event) VALUES (?,?,'Fail_Credential_SignUp')", [email, datetime]);
        res.status(400).json({"error": "Username or email already registered!"});
      } else {
        db.run("INSERT INTO logs (email, datetime, event) VALUES (?,?,'Fail_SignUp')", [email, datetime]);
        res.status(400).json({"error":err.message});
      }
    }
    else {
      db.run("INSERT INTO logs (email, datetime, event) VALUES (?,?,'Success_SignUp')", [email, datetime]);
      res.sendStatus(200);
    }
  });
});

app.post("/delete-profile", (req, res, next) => {
  username = req.body.username;
  email = req.body.email;
  datetime = new Date().toLocaleString();

  const sql = "DELETE FROM users where username = ? AND email = ?";
  db.run(sql, [username, email], (err, rows) => {
    if (err) {
      db.run("INSERT INTO logs (email, datetime, event) VALUES (?,?,'Fail_DeleteProfile')", [email, datetime]);
      res.status(400).json({"error": err.message});
    } else {
      db.run("INSERT INTO logs (email, datetime, event) VALUES (?,?,'Success_DeleteProfile')", [email, datetime]);
      res.sendStatus(200);
    }
  });
});

app.post("/username-update", (req, res, next) => {
  username = req.body.username;
  email = req.body.email;
  update = req.body.update;
  datetime = new Date().toLocaleString();

  const sql = "UPDATE users SET username = ? WHERE username = ? AND email = ?";
  db.run(sql, [update, username, email], (err, rows) => {
    if (err) {
      if (err.code == 'SQLITE_CONSTRAINT') {
        db.run("INSERT INTO logs (email, datetime, event) VALUES (?,?,'Fail_Credential_UsernameUpdate')", [email, datetime]);
        res.status(400).json({"error": "Username or email already registered!"});
      } else {
        db.run("INSERT INTO logs (email, datetime, event) VALUES (?,?,'Fail_UsernameUpdate')", [email, datetime]);
        res.status(400).json({"error":err.message});
      }
    } else {
      db.run("INSERT INTO logs (email, datetime, event) VALUES (?,?,'Success_UsernameUpdate')", [email, datetime]);
      res.sendStatus(200);
    }
  });
});

app.post("/email-update", (req, res, next) => {
  username = req.body.username;
  email = req.body.email;
  update = req.body.update;
  datetime = new Date().toLocaleString();

  const sql = "UPDATE users SET email = ? WHERE username = ? AND email = ?";
  db.run(sql, [update, username, email], (err, rows) => {
    if (err) {
      if (err.code == 'SQLITE_CONSTRAINT') {
        db.run("INSERT INTO logs (email, datetime, event) VALUES (?,?,'Fail_Credential_EmailUpdate')", [email, datetime]);
        res.status(400).json({"error": "Username or email already registered!"});
      } else {
        db.run("INSERT INTO logs (email, datetime, event) VALUES (?,?,'Fail_EmailUpdate')", [email, datetime]);
        res.status(400).json({"error":err.message});
      }
    } else {
      db.run("INSERT INTO logs (email, datetime, event) VALUES (?,?,'Success_EmailUpdate')", [email, datetime]);
      res.sendStatus(200);
    }
  });
});

app.post("/password-update", (req, res, next) => {
  username = req.body.username;
  email = req.body.email;
  update = req.body.update;
  datetime = new Date().toLocaleString();

  const sql = "UPDATE users SET password = ? WHERE username = ? AND email = ?";
  db.run(sql, [update, username, email], (err, rows) => {
    if (err) {
      if (err.code == 'SQLITE_CONSTRAINT') {
        db.run("INSERT INTO logs (email, datetime, event) VALUES (?,?,'Fail_Credential_PasswordUpdate')", [email, datetime]);
        res.status(400).json({"error": "Username or email already registered!"});
      } else {
        db.run("INSERT INTO logs (email, datetime, event) VALUES (?,?,'Fail_PasswordUpdate')", [email, datetime]);
        res.status(400).json({"error":err.message});
      }
    } else {
      db.run("INSERT INTO logs (email, datetime, event) VALUES (?,?,'Success_PasswordUpdate')", [email, datetime]);
      res.sendStatus(200);
    }
  });
});

app.get("/sign-out", (req,res, next) => {
  username = req.query.username;
  email = req.query.email;
  datetime = new Date().toLocaleString();

  db.run("INSERT INTO logs (email, datetime, event) VALUES (?,?,'Success_SignOut')", [email, datetime]);

  res.sendStatus(200);
});

app.get("/liked-songs", (req,res, next) => {
  username = req.query.username;
  email = req.query.email;
  datetime = new Date().toLocaleString();

  db.run("INSERT INTO logs (email, datetime, event) VALUES (?,?,'Success_LikedSongs')", [email, datetime]);

  res.sendStatus(200);
});

//Set the port that you want the server to run on
const port = process.env.PORT || 3000;
app.listen(port);
console.log('App is listening on port ' + port);
