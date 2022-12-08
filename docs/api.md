
# API Endpoints

## (GET) /app/
This is the root endpoint for our backend.

## (GET) /app/login/
This endpoint logs the user into the website with the provided email and password. We validate the user's email and password with the database. It also keeps track of login event in the logs table.

## (POST) /app/sign-up/
This endpoint creates a new user account with the provided username, email, and password. If the username or email is already registered, it returns an error message; otherwise, a new user account is created in the users database. It also keeps track of the sign up event in the logs table.

## (POST) /app/delete-profile/
This endpoint deletes a user's profile from the database. It also keeps track of the user deleting their profile in the logs table.

## (POST) /app/username-update/
This endpoint updates the username to the desired username that the user has provided. If the username is already taken, an error message is returned; else, the database is updated. It also keeps track of the user updating their username in the logs table.

## (POST) /app/email-update/
This endpoint updates the email to the desired email that the user has provided. If the email is already taken, an error message is returned; else, the database is updated. It also keeps track of the user updating their email in the logs table.

## (POST) /app/password-update/
This endpoint updates the password to the desired password that the user has provided. It also keeps track of the user updating their password in the logs table.

## (GET) /app/sign-out/
This endpoint signs the logged in user out and keeps track of the sign out event in the logs table.

## (GET) /app/liked-songs/
This endpoint keeps track of when the user accessed the liked songs page in the logs table.

## (GET) /app/profile-page/
This endpoint keeps track of when the user accessed the profile page in the logs table.

## (POST) /app/add-song/
Given a URL, this endpoint uses the Spotify API to pull the song information such as the song name, artist, album, and Spotify URL and adds the song to the user's collection. If there is an error, an error message is returned. It also keeps track of the user adding a song to their collection in the logs table.

## (GET) /app/get-liked-songs/
This endpoint retrieves all the songs liked by a user. It also keeps track of whether the backend is successfully able to retrieve all the liked songs in the logs table.

## (POST) /app/delete-song/
This endpoint deletes a liked song from a user's collection. It also keeps track whether the song was successfully deleted from a user's collection in the logs table.

## (GET) /app/logs/
This endpoint retrieves all the information from the logs table.
