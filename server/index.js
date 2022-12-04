const express = require('express');
const path = require('path');
var cors = require("cors");

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var db = require("../database.js")

// a test route to make sure we can reach the backend
//this would normally go in a routes file
// app.get('/test', (req, res) => {
//     console.log('here');
//     res.send('Welcome to the backend!')
// })

app.get("/users", (req, res, next) => {
    var sql = "select * from users"
    var params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"success",
            "data":rows
        })
      });
});

app.get("/login", (req,res, next) => {
  username = req.query.username;
  password = req.query.password;
  var sql = "select password from users where username = ?";
  db.all(sql, [username], (err, rows) => {
    console.log(rows)
    if (err) {
      res.status(400).json({"error": "Something went wrong with the login!"});
    }
    else if (rows.length == 0) {
      res.status(400).json({"error": "Not a valid user!"})
    } 
    else {
      check_password = rows[0].password;
      if (check_password != password) {
        res.status(400).json({"error": "Not a valid password for the user!"})
      } else {
        res.json({
          "message": "success",
          "data": rows
        })
      }
    }
  });
});

app.post("/sign-up", (req,res, next) => {
  username = req.body.username;
  password = req.body.password;
  email = req.body.email;

  var sql = "INSERT INTO users (username, email, password) VALUES (?,?,?)"
  db.run(sql, [username, email, password], (err, rows) => {
    if (err) {
      res.status(400).json({"error":err.message});
    }
    else {
      res.json({
        "message": "success",
        "data": rows
      })
    }
  });
});

//Set the port that you want the server to run on
const port = process.env.PORT || 3000;
app.listen(port);
console.log('App is listening on port ' + port);
