const router = require("express").Router();
require("dotenv").config();

// Requiring our models and passport as we've configured it
const db = require("../models");
const passport = require("../config/passport");

// Using the passport.authenticate middleware with our local strategy. If the
// user has valid login credentials, send them to the members page. Otherwise
// the user will be sent an error
router.post("/login", passport.authenticate("local"), function (req, res) {
  // Since we're doing a POST with javascript, we can't actually redirect that post into a GET request So we're sending the user back the route to the members page because the redirect will happen on the front end They won't get this or even be able to access this page if they aren't authorized

  console.log(req.user);
  res.json("/home");
});

/*
    Route for signing up a user and logging them in.
  */
router.post("/signup", function (req, res) {

  db
    .User
    .create({username: req.body.username, password: req.body.password, team: req.body.team})
    .then(function (userInfo) {
      // Upon successful signup, log user in
      req
        .login(userInfo, function (err) {
          if (err) {
            console.log(err)
            return res
              .status(422)
              .json(err);
          }
          console.log(req.user);
          return res.json("/home");
        });
    })
    .catch(function (err) {
      console.log(err);
      res
        .status(422)
        .json(err);
    });

});

// Route for getting some data about our user to be used client side
router.get("/user_data", function (req, res) {
  if (!req.user) {
    // The user is not logged in, send back an empty object
    res.json({});
  } else {
    // Otherwise send back the user's email and id Sending back a password, even a
    // hashed password, isn't a good idea
    res.json({email: req.user.email, id: req.user.id, photo: req.user.photo});
  }
});

router.get("/api/news/:team", function (req, res) {

 if (req.params.team === "all") {
   newsapi.v2.topHeadlines({
     sources: "nfl-news",
     sortBy: 'popularity',
     pageSize: 100,
     language: 'en'
   }).then((response, err) => {
     if (err) throw err;
     res.json(response)
   });
 } else {
   newsapi.v2.everything({
     q: req.params.team,
     pageSize: 100,
     sortBy: 'relevance',
     language: 'en'
   }).then((response, err) => {
     if (err) throw err;
     res.json(response)
   });
 }
})

router.get("/api/divisions", function (req, res) {

 const data = msf.getData('nfl', '2018-2019-regular', 'seasonal_standings', 'json', { force: "true" });

 fs.readFile('results/seasonal_standings-nfl-2018-2019-regular.json', 'utf8', function (err, data) {
   if (err) throw err;
   const filteredData = JSON.parse(data, null, 2);

   const standingsArray = [];

   filteredData.teams.forEach(squad => {

     standingsArray.push({
       "name": (squad.team.name === "49ers") ? (squad.team.name = "Niners") : (squad.team.name),
       "wins": squad.stats.standings.wins,
       "losses": squad.stats.standings.losses,
       "ties": squad.stats.standings.ties,
       "divisionName": squad.divisionRank.divisionName,
       "divisionRank": squad.divisionRank.rank,
     })

   })

   res.json(standingsArray);

 });
})

router.get("/api/matchups", function (req, res) {

 const data = msf.getData('nfl', '2018-2019-regular', 'weekly_games', 'json', { week: "13", sort: "game.starttime", rosterstatus: "assigned-to-roster", force: "true" });

 fs.readFile('results/weekly_games-nfl-2018-2019-regular.json', 'utf8', function (err, data) {

   if (err) throw err;
   const filteredData = JSON.parse(data, null, 2);

   const matchupArray = [];

   filteredData.games.forEach(matchup => {

     matchupArray.push(
       {
         "awayScore": matchup.score.awayScoreTotal,
         "homeScore": matchup.score.homeScoreTotal,
         "currentWeek": matchup.schedule.week,
         "startTime": matchup.schedule.startTime,
         "homeTeam": matchup.schedule.homeTeam.abbreviation,
         "awayTeam": matchup.schedule.awayTeam.abbreviation,
       }
     );
   })

   res.json(matchupArray);

 });

});

router.get("/api/roster/:team", function (req, res) {

 const data = msf.getData('nfl', '2018-2019-regular', 'players', 'json', {sort: "player.position"}, {rosterstatus: 'assigned-to-roster'});

 // Reads the file that gets created with the data called from the API
 fs.readFile('results/players-nfl-2018-2019-regular.json', 'utf8', function (err, data) {
   if (err) throw err;
   const filteredData = JSON.parse(data, null, 2).players.filter(athlete => {
     return (athlete.player.currentTeam != null) && (athlete.player.currentTeam.abbreviation === req.params.team);
   });
   const playerArray = [];
   filteredData.forEach(athlete => {
     playerArray.push(
       {
         "jerseyNumber": athlete.player.jerseyNumber,
         "firstName": athlete.player.firstName,
         "lastName": athlete.player.lastName,
         "primaryPosition": athlete.player.primaryPosition,
         "height": athlete.player.height,
         "weight": athlete.player.weight,
         "age": athlete.player.age
       }
     );
   });
   const nulledArray = replaceNull(playerArray);
   res.json(nulledArray);

     // Function to replace data in Roster Chart not put in by API with a '*'. Will have a note on the site for this
function replaceNull(data) {

 data.forEach(obj => {
   for (let key in obj) {
     (obj[key] === null) ? (obj[key] = '*') : (false);
   }
 })
 return data;
}
 })
})

module.exports = router;