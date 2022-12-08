
# TuneIn: Your Digital Music Profile 

COMP 426 Final Project - Group 7

## Summary 

TuneIn is a web app that allows users to create their own music profile and share their favorite songs. Users can add and delete songs as their music taste evolves. Users can delete or update their account details at any time. 

## Demo 

A link to a demo of our project can be found [here](https://youtu.be/fmiu5iuj_QA). In this video, we discuss the main features of our web app, the challenges we faced, and future directions we see for TuneIn. 

## Setup Instructions 

1. Clone the respository
2. cd into the repo using ```cd a99-group7``` and run ```npm install``` to install the dependencies needed to run our project. More details about the dependencies we used can be found in the Dependencies section below
3. cd into the client directory using ```cd client``` and run ```npm install``` again
4. Return to the main project directory using ```cd ..```
5. Run ```npm start```. This should automatically open http://localhost:3001/. If not, you can navigate to this link in your browser.
6. When you are done running the program, hit '''CONTROL+C''' to end the session. 

## Dependencies 

- body-parser (1.20.1)
- concurrently (7.6.0)
- cors (2.8.5)
- express (4.18.2)
- install (0.13.0)
- md5 (2.3.0)
- node-fetch (2.6.7)
- npm (9.1.3)
- request (2.88.2)
- spotify-web-api-js (1.5.2)
- sqlite3 (5.1.2)

## User Interactions 

Information about the possible user interactions are detailed in this [file](/docs/user-interactions.md).

## API 

Information about the API user endpoints used are detailed in this [file](api.md).

## Planning 

We used Github's project board to create, assign, and keep track of the tasks needed to complete our roles. Further details and documentation about our planning process are found in this [file](planning.md).

## Team Management 

All team members contributed meaningfully to this project by bringing their best assets. We all learned a lot about building a website from the ground up and working collaboratively, in person and remotely, on a single product. A more detailed breakdown of our team management is included in this [file](roles.md).

## Future Extensions

In the future, we hope to add more features including letting users add their favorite artists and music genres. We also want to add a social aspect by developing a feature that allows users to meet other users with similar music tastes. Users can search for their friends or be matched with someone nearby who listens to similar music tastes. With matched profiles, users can chat with each other, view each other's profiles, and add their liked songs to their own list of liked songs. Eventually, we envision this web app to evolve into a dating/friend-making platform. Music reflects our souls and has the power to connect people. We hope to use the power music has to help people discover and create more meaningful relationships. Especially for new graduates, it can be daunting to meet people in a completely new environment. With conventional dating apps, it can be hard to make the first move and figure out what to say. With TuneIn, we hope to help eliminate this pressure and help create bonds, both romantic and platonic, over music.
