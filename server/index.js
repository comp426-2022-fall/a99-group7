const express = require('express');
const path = require('path');
const request = require('request');
const cors = require("cors");
const fetch = require('node-fetch');

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Loads database
var db = require("../database.js")

// Root Endpoint
app.get("/app/", (req,res, next) => {
  console.log('ROOT ENDPOINT');
});

// Login Endpoint: Used to log user in; if no user with email exists, returns error; if email correct and password incorrect, 
// returns error; otherwise, logs user in and forwards credential information to front-end; inserts respective event into logs table
app.get("/app/login/", (req,res, next) => {
  email = req.query.email;
  password = req.query.password;
  datetime = new Date().toLocaleString();
  var sql = "select username, email, password from users where email = ?";
  db.all(sql, [email], (err, rows) => {
    if (err) {
      res.status(400).json({"error": "Something went wrong with the login!"});
    }
    else if (rows.length == 0) {
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

// Sign Up Endpoint: Used to create a new account; if username or email taken, returns error; otherwise, creates new account; 
// inserts respective event into logs table
app.post("/app/sign-up/", (req, res, next) => {
  username = req.body.username;
  password = req.body.password;
  email = req.body.email;
  datetime = new Date().toLocaleString();

  const sql = "INSERT INTO users (username, email, password) VALUES (?,?,?)"
  db.run(sql, [username, email, password], (err, rows) => {
    if (err) {
      if (err.code == 'SQLITE_CONSTRAINT') {
        res.status(400).json({"error": "Username or email already registered!"});
      } else {
        res.status(400).json({"error":err.message});
      }
    }
    else {
      db.run("INSERT INTO logs (email, datetime, event) VALUES (?,?,'Success_SignUp')", [email, datetime]);
      res.sendStatus(200);
    }
  });
});

// Delete Profile Endpoint: Deletes a user profile; inserts respective event into logs table
app.post("/app/delete-profile/", (req, res, next) => {
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

// Username Update Endpoint: Updates username for a given user; inserts respective event into logs table
app.post("/app/username-update/", (req, res, next) => {
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

// Email Update Endpoint: Updates email for a given user; inserts respective event into logs table
app.post("/app/email-update/", (req, res, next) => {
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

// Password Update Endpoint: Updates password for a given user; inserts respective event into logs table
app.post("/app/password-update/", (req, res, next) => {
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

// Sign Out Endpoint: Records sign out event in logs table
app.get("/app/sign-out/", (req,res, next) => {
  username = req.query.username;
  email = req.query.email;
  datetime = new Date().toLocaleString();

  db.run("INSERT INTO logs (email, datetime, event) VALUES (?,?,'Success_SignOut')", [email, datetime]);

  res.sendStatus(200);
});

// Liked Songs Endpoint: Records access to liked songs page by user in logs table
app.get("/app/liked-songs/", (req,res, next) => {
  username = req.query.username;
  email = req.query.email;
  datetime = new Date().toLocaleString();

  db.run("INSERT INTO logs (email, datetime, event) VALUES (?,?,'Success_LikedSongs')", [email, datetime]);

  res.sendStatus(200);
});

// Profile Page Endpoint: Records access to profile page by user in logs table
app.get("/app/profile-page/", (req,res, next) => {
  username = req.query.username;
  email = req.query.email;
  datetime = new Date().toLocaleString();

  db.run("INSERT INTO logs (email, datetime, event) VALUES (?,?,'Success_ProfilePage')", [email, datetime]);

  res.sendStatus(200);
});

// Add Song Endpoint: Uses Spotify API to add song to user's list of liked songs
app.post("/app/add-song/", (req,res, next) => {
  const email = req.body.email;
  const URL = (req.body.URL).split('/')[4].split('?')[0];
  datetime = new Date().toLocaleString();
  let client_id = 'e4d510659ab244f2be9e75fb3a8706ef';
  let client_secret = 'eb8f6205cc8140a9bd3c9c2b07a04c8b';
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
        url = body.external_urls.spotify;
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

// Get Liked Songs Endpoint: Retrieves all liked songs by user
app.get("/app/get-liked-songs/", (req, res, next) => {
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

// Delete Song Endpoint: Deletes liked song from user's list of liked songs
app.post("/app/delete-song/",  (req, res, next) => {
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

// Logs Endpoint: Retrieves all logs 
app.get("/app/logs/",  (req, res, next) => {
  const sql = "SELECT * FROM logs";
  db.all(sql, [], (err, rows) => {
    if (err) {
      res.status(400).json({"error": err.message});
    } else {
      res.json({
        "data": rows
      })
    }
  });
})


const port = process.env.PORT || 3000;
app.listen(port);
console.log('Backend listening on port ' + port);
