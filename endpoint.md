
# List of Endpoints

## app.get("/login", (req,res, next)
Logins the user with the email and password and checks credentials to see if it is a valid email and password combination.  

## app.post("/sign-up", (req, res, next)
receives the username, email, and password from the login and then stores the values in the database. If the account is already registered, it gives an error message saying that the "Username or email already registered!". If the username, emai, and password are valid, then you can succesfully sign up.

## app.post("/username-update", (req, res, next)
Changes the username if the user wants to. It looks at whether or not the username exists already in the database to make sure that the new username is not a duplicate. While changing the username, if the user chooses a username that has previously been chosen, then an error message pops up saying "Username or email already registered". Otherwise, it succesfully updates and the new username is updated in the back end. 


## app.get("/sign-out", (req,res, next) 
Signs the logged in user out and stores the email, datetime, and event in a log into a database in the back end so that there is a list of who signs out at which time. 

## app.get("/liked-songs", (req,res, next)
Given a song url, it goes to the Spotify API, pulls the song information and pulls it and stores it with the corresponding username, time, and email


## app.get("/profile-page", (req,res, next)
Pulls up the profile page of the selected user. 

## app.post("/add-song", (req,res, next)
Given a URL, it goes to the Spotify API, pulls the song information(song, artist, url, and album) and stores it under the correspondig profile. If there is an error, it gives an error message saying "Unable to add song!". Otherwise it adds the song. 

## app.get("/get-liked-songs", (req, res, next)
Pulls up the liked songs

## app.post("/delete-song",  (req, res, next)
Deletes the song



## 
