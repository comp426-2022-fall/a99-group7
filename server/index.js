const express = require('express');
const path = require('path');
const request = require('request');
const cors = require("cors");
const fetch = require('node-fetch');

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


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

app.get("/profile-page", (req,res, next) => {
  username = req.query.username;
  email = req.query.email;
  datetime = new Date().toLocaleString();

  db.run("INSERT INTO logs (email, datetime, event) VALUES (?,?,'Success_ProfilePage')", [email, datetime]);

  res.sendStatus(200);
});

app.post("/add-song", (req,res, next) => {
  const email = req.body.email;
  const URL = (req.body.URL).split('/')[4].split('?')[0];
  datetime = new Date().toLocaleString();
  let client_id = '';
  let client_secret = '';
  var song, artist, album, url;

  var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: {
      'Authorization': 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64'))
    },
    form: {
      grant_type: 'client_credentials'
    },
    json: true
  };

  const spotify_track_url = 'https://api.spotify.com/v1/tracks/' + URL;

  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      var options = {
        url: spotify_track_url,
        headers: {
          Authorization: 'Bearer ' + body.access_token
        }
      };
      request.get(options, function(error, response, body) {
        body = JSON.parse(body);
        song = body.name;
        artist = body.artists[0].name;
        album = body.album.name;
        url = body.href;
        const sql = "INSERT INTO liked_songs (email, song, artist, album, url) VALUES (?,?,?,?,?)"
        db.run(sql, [email, song, artist, album, url], (err, rows) => {
          if (err) {
            db.run("INSERT INTO logs (email, datetime, event) VALUES (?,?,'Fail_AddSong')", [email, datetime]);
            res.status(400).json({"error": "Unable to add song!"});
          }
          else {
            db.run("INSERT INTO logs (email, datetime, event) VALUES (?,?,'Success_AddSong')", [email, datetime]);
            res.sendStatus(200);
          }
        });
      });
    }
  });
})

app.get("/get-liked-songs", (req, res, next) => {
  const email = req.query.email;
  const datetime = new Date().toLocaleString();

  const sql = "SELECT song, artist, album, url FROM liked_songs WHERE email = ?"
  db.all(sql, [email], (err, rows) => {
    if (err) {
      db.run("INSERT INTO logs (email, datetime, event) VALUES (?,?,'Fail_FetchSongs')", [email, datetime]);
      res.status(400).json({"error": "Something went wrong with fetching the songs!"});
    } else {
      db.run("INSERT INTO logs (email, datetime, event) VALUES (?,?,'Success_FetchSongs')", [email, datetime]);
      res.json({
        "data": rows
      })
    }
  });
});

app.post("/delete-song",  (req, res, next) => {
  const email = req.body.email;
  const URL = req.body.URL;
  const datetime = new Date().toLocaleString();

  const sql = "DELETE FROM liked_songs WHERE email = ? AND url = ?";
  db.run(sql, [email, URL], (err, rows) => {
    if (err) {
      db.run("INSERT INTO logs (email, datetime, event) VALUES (?,?,'Fail_DeleteLikedSong')", [email, datetime]);
      res.status(400).json({"error": err.message});
    } else {
      db.run("INSERT INTO logs (email, datetime, event) VALUES (?,?,'Success_DeleteLikedSong')", [email, datetime]);
      res.sendStatus(200);
    }
  });
})

//Set the port that you want the server to run on
const port = process.env.PORT || 3000;
app.listen(port);
console.log('App is listening on port ' + port);
