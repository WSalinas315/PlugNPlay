# Plug N' Play
### Abdirahman Farah , August McAllister, Billy Salinas, Tracey Treat, Victor Llapa
February 2023 | Shawl Cohort | Prime Digital Academy


## Application Overview
Discovering new video games and navigating online storefronts full of jargon can be an overwhelming and frustrating experience for people who have little to no experience with gaming. Plug n' Play is a web application designed to help users who are new to the video game atmosphere view game recommendations that are tailored to their personal interests. Plug n Play will provide the ability to personalize recommendations appropriately based on a questionnaire taken upon registering.

## Installation
1. Clone this repo
2. Navigate to the repo directory in the terminal
3. `npm install`
4. Obtain a RAWG.io API key from https://rawg.io/apidocs
5. Create a .env file in the root of the project and enter the following: 
    `SERVER_SESSION_SECRET=superDuperSecret`
    `RAWG_API_KEY=YourAPIKey`
6. Replace superDuperSecret with your own random string and YourAPIKey with the key obtained in step 4
7. Create the database according to the database.sql file.

## Usage
1. Start postgres if it isn’t started already
2. In your terminal, `npm run server`
3. In a separate terminal tab/window, `npm run client`. This should open the app in your browser.
4. Create a new account, or login with an existing account.
5. Answer all survey questions and then click ’Submit’ at the end.
6. You will be taken to the recommendations view. 
    1. Swipe up on a game to view details. 
    2. Swipe right on games you might like. 
    3. Swipe left on games you are not interested in. 
    4. Your left and right swipes will influence the algorithm next time you load the page.
7. To view game details, swipe up and click the Details button.
    1. On this page, you can add a game to your wishlist, played list, and/or ignore list.
8. View your wishlist, played games, and glossary in the Collections tab.
	
## Technologies Used
 - HTML/CSS/JS
 - React
 - Redux
 - Node
 - Postgres/PostgreSQL
 - Express
 - RAWG API
 - Material UI
 - Passport

## Acknowledgments
Thank you to our client, Maxine, for allowing us to bring her idea to life. We also want to thank Prime Digital Academy, the Shawl cohort, our instructors Dane, Liz, Kris, and Key, and our family and friends for all of the help and support. 

