var sqlite3 = require('sqlite3').verbose()
var md5 = require('md5')

const DBSOURCE = "db.sqlite"

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
      console.error(err.message)
      throw err
    }else{
        console.log('Connected to the SQLite database.')
        db.run(`CREATE TABLE users (id INTEGER PRIMARY KEY AUTOINCREMENT, username text, email text UNIQUE, password text);
                CREATE TABLE artists (id INTEGER PRIMARY KEY AUTOINCREMENT, username text, artist text);
                CREATE TABLE genres (id INTEGER PRIMARY KEY AUTOINCREMENT, username text, genre text);
                CREATE TABLE liked_songs (id INTEGER PRIMARY KEY AUTOINCREMENT, username text, song text);
                CREATE TABLE friends (id INTEGER PRIMARY KEY AUTOINCREMENT, username text, friend text)`,
        (err) => {
            if (err) {
                // Table already created
            }else{
                // Table just created, creating some rows
                var insert = 'INSERT INTO users (username, email, password) VALUES (?,?,?)'
                db.run(insert, ["admin","admin@example.com",md5("admin123456")])
                db.run(insert, ["user","user@example.com",md5("user123456")])
            }
        });  
    }
});


module.exports = db
