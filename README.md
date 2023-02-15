[![Contributors][contributors-shield]][contributors-url]
[![Issues][issues-shield]][issues-url]

<div align="center">
  <img src="documentation/images/plugnplay-logo.png" width="800px" style="border-radius: 10px;" />
</div>

# Plug N' Play

### [Abdirahman Farah][Abdi-LinkedIn], [August McAllister][August-LinkedIn], [Billy Salinas][Billy-LinkedIn], [Tracey Treat][Tracey-LinkedIn], [Victor Llapa][Victor-LinkedIn]

February 2023 | Shawl Cohort | Prime Digital Academy

## Application Overview

Discovering new video games and navigating online storefronts full of jargon can be an overwhelming and frustrating experience for people who have little to no experience with gaming. Plug n' Play is a web application designed to help users who are new to the video game atmosphere view game recommendations that are tailored to their personal interests. Plug n Play will provide the ability to personalize recommendations appropriately based on a questionnaire taken upon registering.

Plug N Play is powered by [Rawg.io](http://www.rawg.io/)'s API service, which allows us to search their database of over 800,000 games. Of their available 9,800 search tags, we have hand-picked a little over 200 tags to use as search terms and user scores to power our search algorithm. Upon registering for a new account, a new user will fill out a survey. For each question, the user is asked to rate their preferences on a 9-point spectrum. Upon completing the survey, these answers will be processed and turned into user scores, which will inform future recommendations. This survey should only be completed once, but the algorithm will continue to be adjusted when users rate games in their "played" list.

<!-- INSERT LINK TO WALKTHROUGH VIDEO HERE -->

## Installation

1. Clone this repo
2. Navigate to the repo directory in the terminal
3. `npm install`
4. Obtain a RAWG.io API key from https://rawg.io/apidocs
5. Create a .env file in the root of the project and enter:
  ```js
    `SERVER_SESSION_SECRET=[ enter a random string of numbers / letters ]`
    `RAWG_API_KEY=[ enter the API key you obtained from RAWG.io ]`
  ```
6. Create the database according to the database.sql file.

## Usage

1. Start your PostgreSQL server
2. In your terminal, `npm run server`
3. In a separate terminal tab/window, `npm run client`. This should open the app in your browser.
4. For the best user experience, right click and select Inspect, then click the Toggle Device Toolbar button and select iPhone 12 Pro for the dimensions. 
5. Create a new account, or login with an existing account.
6. If you're a new user, answer all your survey questions and then tap ’Submit’ at the end.
7. You will be taken to the recommendations view.
   1. Swipe up on a game to view details.
   2. Swipe right on games you might like.
   3. Swipe left on games you are not interested in.
8. To view game details, swipe up and tap the Details button.
   1. On this page, you can add a game to your wishlist, played list, and/or ignore list.
   2. Liking or disliking a game on your played list will influence the algorithm and adjust your recommendations.
9. Use the Collections tab to view the Glossary, your Wishlisted games, and your Played games.
10. Use the Search tab to search for games by name or by genre.

### Admin account
If you have an administrator account, you can use your account to update and maintain the glossary.

1. Log in to your administrator account, and navigate to the Profile page.
2. In the top left, tap the shield icon to open the Manage Glossary page.
3. From here you can add new glossary entries, as well as view, edit, and delete any existing entries.

## Known Issues

Please see the [Issues](https://github.com/WSalinas315/PlugNPlay/issues) page for a comprehensive list of issues.

## Technologies Used

[![React][React.js]][React-url]
[![Node][Node.js]][Node-url]
[![MUI]][MUI-url]
[![Postgresql]][Postgresql-url]
[![Redux]][Redux-url]
[![Redux-Saga]][Redux-saga-url]
[![Luxon.js]][Luxon-url]
[![React-Easy-Swipe]][React-Easy-Swipe-url]

## Acknowledgments

Thank you to:
- Our client, Maxine, for allowing us to bring her idea to life.
- Prime Digital Academy:
  - The Shawl cohort
  - Our instructors Dane, Liz, Kris, and Key
- Our family and friends, for all of the help and support


<!-- Shields & Links -->

[contributors-shield]: https://img.shields.io/github/contributors/WSalinas315/PlugNPlay.svg?style=for-the-badge
[contributors-url]: https://github.com/WSalinas315/PlugNPlay/graphs/contributors
[issues-shield]: https://img.shields.io/github/issues/WSalinas315/PlugNPlay.svg?style=for-the-badge
[issues-url]: https://github.com/WSalinas315/PlugNPlay/issues
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555

[Abdi-LinkedIn]: https://www.linkedin.com/in/abdirahman-farah-a98842255/
[August-LinkedIn]: https://www.linkedin.com/in/august-mcallister/
[Tracey-LinkedIn]: https://www.linkedin.com/in/traceystreat/
[Billy-LinkedIn]: https://www.linkedin.com/in/billy-salinas-64068b244/
[Victor-LinkedIn]: https://www.linkedin.com/in/victorllapa/

[Node.js]: https://img.shields.io/badge/Node.JS-20232A?style=for-the-badge&logo=node.js&logoColor=61DAFB
[Node-url]: https://nodejs.org/en/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Postgresql]: https://img.shields.io/badge/PostgreSQL-20232A?style=for-the-badge&logo=postgresql&logoColor=61DAFB
[Postgresql-url]: https://www.postgresql.org/
[Redux]: https://img.shields.io/badge/Redux-20232A?style=for-the-badge&logo=redux&logoColor=61DAFB
[Redux-url]: https://redux.js.org/
[Redux-Saga]: https://img.shields.io/badge/Redux/Saga-20232A?style=for-the-badge&logo=reduxsaga&logoColor=61DAFB
[Redux-saga-url]: https://redux-saga.js.org/
[MUI]: https://img.shields.io/badge/MUI%20&%20Material%20Design-20232A?style=for-the-badge&logo=materialdesign&logoColor=61DAFB
[MUI-url]: https://mui.com/core/
[Luxon.js]: https://img.shields.io/badge/Luxon.js-20232A?style=for-the-badge
[Luxon-url]: https://moment.github.io/luxon/#/
[React-Easy-Swipe-url]: https://www.npmjs.com/package/react-easy-swipe
[React-Easy-Swipe]: https://img.shields.io/badge/-React%20Easy%20Swipe-20232A?style=for-the-badge
