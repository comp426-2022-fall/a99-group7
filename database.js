var sqlite3 = require('sqlite3').verbose()

const DBSOURCE = "db.sqlite"

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
      console.error(err.message)
      throw err
    }else{
        db.run(`CREATE TABLE users (id INTEGER PRIMARY KEY AUTOINCREMENT, username text UNIQUE, email text UNIQUE, password text)`,
        (err) => {
            if (err) {
                // Table already created
            }else{
                // Table just created, creating some rows
                var insert = 'INSERT INTO users (username, email, password) VALUES (?,?,?)'
                db.run(insert, ["admin","admin@example.com","admin123456"])
                db.run(insert, ["user","user@example.com","user123456"])
            }
        });
        
        db.run(`CREATE TABLE logs (id INTEGER PRIMARY KEY AUTOINCREMENT, email text, datetime text, event text)`, 
        (err) => {
            if (err) {
                // Table already created
            } else {
                var insert = 'INSERT INTO logs (email, datetime, event) VALUES (?,?,?)'
                db.run(insert, ["test","test","test"])
            }
        });
    }
});


module.exports = db
