
# Database

## users
This table's columns include id, username, email, and password. The id field is of type INTEGER and is the primary key of the table (it is autoincremented); the username and password fields are of type TEXT and have the UNIQUE constraint; and, the password field is of type TEXT.

<img width="821" alt="image" src="https://user-images.githubusercontent.com/59041434/206376240-3e898593-da49-4479-bd06-f8a85539c521.png">

## logs
This table's columns include id, email, datetime, and event. The id field is of type INTEGER and is the primary key of the table (it is autoincremented); the email, datetime, and event fields are of type TEXT.

<img width="947" alt="image" src="https://user-images.githubusercontent.com/59041434/206376498-df3739da-1a60-4e43-b021-e42730584ae6.png">

## liked_songs
This table's columns include id, email. song, artist, album, url. The id field is of type INTEGER and is the primary key of the table (it is autoincremented); the email, son, artist, album, and url are of type TEXT.

<img width="1061" alt="image" src="https://user-images.githubusercontent.com/59041434/206376736-4e8092c2-5d82-4657-895f-e43c7dbe67e1.png">
