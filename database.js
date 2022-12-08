var sqlite3 = require('sqlite3').verbose()

const DBSOURCE = "db.sqlite"

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
      console.error(err.message)
      throw err
    }else{
        // Creates users table
        db.run(`CREATE TABLE users (id INTEGER PRIMARY KEY AUTOINCREMENT, username text UNIQUE, email text UNIQUE, password text)`,
        (err) => {
            if (err) {
                console.log(err);
            }
        });
        
        // Creates logs table
        db.run(`CREATE TABLE logs (id INTEGER PRIMARY KEY AUTOINCREMENT, email text, datetime text, event text)`, 
        (err) => {
            if (err) {
                console.log(err);
            } 
        });

        // Creates liked_songs table
        db.run(`CREATE TABLE liked_songs (id INTEGER PRIMARY KEY AUTOINCREMENT, email text, song text, artist text, album text, url text)`, 
        (err) => {
            if (err) {
                console.log(err);
            } 
        });
    }
});


module.exports = db
