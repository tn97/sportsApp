$(document).ready(function() {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(function(data) {
    console.log(data);
    $(".member-name").text(data.email);
    $("#member-photo").attr("src", data.photo);
 
  });
 });

const teamData = {
 cardinals: {
  primary: "#97233F",
  secondary: "#000000",
  city: "arizona",
  name: "cardinals",
  abbr: "ARI"
 },

 falcons: {
  primary: "#A71930",
  secondary: "#000000",
  city: "atlanta",
  name: "falcons",
  abbr: "ATL"
 },

 ravens: {
  primary: "#241773",
  secondary: "#000000",
  city: "baltimore",
  name: "ravens",
  abbr: "BAL"
 },

 bills: {
  primary: "#00338D",
  secondary: "#C60C30",
  city: "buffalo",
  name: "bills",
  abbr: "BUF"
 },

 panthers: {
  primary: "#0085CA",
  secondary: "#101820",
  city: "carolina",
  name: "panthers",
  abbr: "CAR"
 },

 bears: {
  primary: "#0B162A",
  secondary: "#C83803",
  city: "chicago",
  name: "bears",
  abbr: "CHI"
 },

 bengals: {
  primary: "#FB4F14",
  secondary: "#000000",
  city: "cincinnati",
  name: "bengals",
  abbr: "CIN"
 },

 browns: {
  primary: "#311D00",
  secondary: "#FF3C00",
  city: "cleveland",
  name: "browns",
  abbr: "CLE"
 },

 cowboys: {
  primary: "#003594",
  secondary: "#041E42",
  city: "dallas",
  name: "cowboys",
  abbr: "DAL"
 },

 broncos: {
  primary: "#FB4F14",
  secondary: "#002244",
  city: "denver",
  name: "broncos",
  abbr: "DEN"
 },

 lions: {
  primary: "#0076B6",
  secondary: "#B0B7BC",
  city: "detroit",
  name: "lions",
  abbr: "DET"
 },

 packers: {
  primary: "#203731",
  secondary: "#FFB612",
  city: "green bay",
  name: "packers",
  abbr: "GB"
 },

 texans: {
  primary: "#03202F",
  secondary: "#A71930",
  city: "houston",
  name: "texans",
  abbr: "HOU"
 },

 colts: {
  primary: "#002C5F",
  secondary: "#A2AAAD",
  city: "indianapolis",
  name: "colts",
  abbr: "IND"
 },

 jaguars: {
  primary: "#101820",
  secondary: "#D7A22A",
  city: "jacksonville",
  name: "jaguars",
  abbr: "JAX"
 },

 chiefs: {
  primary: "#E31837",
  secondary: "#FFB81C",
  city: "kansas city",
  name: "chiefs",
  abbr: "KC"
 },

 chargers: {
  primary: "#002A5E",
  secondary: "#FFC20E",
  city: "los angeles",
  name: "chargers",
  abbr: "LAC"
 },

 rams: {
  primary: "#002244",
  secondary: "#866D4B",
  city: "los angeles",
  name: "rams",
  abbr: "LA"
 },

 dolphins: {
  primary: "#008E97",
  secondary: "#F26A24",
  city: "miami",
  name: "dolphins",
  abbr: "MIA"
 },

 vikings: {
  primary: "#4F2683",
  secondary: "#FFC62F",
  city: "minnesota",
  name: "vikings",
  abbr: "MIN"
 },

 patriots: {
  primary: "#002244",
  secondary: "#C60C30",
  city: "new england",
  name: "patriots",
  abbr: "NE"
 },

 saints: {
  primary: "#D3BC8D",
  secondary: "#101820",
  city: "new orleans",
  name: "saints",
  abbr: "NO"
 },

 giants: {
  primary: "#0B2265",
  secondary: "#A71930",
  city: "new york",
  name: "giants",
  abbr: "NYG"
 },

 jets: {
  primary: "#003F2D",
  secondary: "#FFFFFF",
  city: "new york",
  name: "jets",
  abbr: "NYJ"
 },

 raiders: {
  primary: "#000000",
  secondary: "#A5ACAF",
  city: "oakland",
  name: "raiders",
  abbr: "OAK"
 },

 eagles: {
  primary: "#004C54",
  secondary: "#A5ACAF",
  city: "philadelphia",
  name: "eagles",
  abbr: "PHI"
 },

 steelers: {
  primary: "#FFB612",
  secondary: "#101820",
  city: "pittsburgh",
  name: "steelers",
  abbr: "PIT"
 },

 niners: {
  primary: "#AA0000",
  secondary: "#B3995D",
  city: "san francisco",
  name: "niners",
  abbr: "SF"
 },

 seahawks: {
  primary: "#002244",
  secondary: "#69BE28",
  city: "seattle",
  name: "seahawks",
  abbr: "SEA"
 },

 buccaneers: {
  primary: "#D50A0A",
  secondary: "#FF7900",
  city: "tampa bay",
  name: "buccaneers",
  abbr: "TB"
 },

 titans: {
  primary: "#002A5C",
  secondary: "#4495D1",
  city: "tennessee",
  name: "titans",
  abbr: "TEN"
 },

 redskins: {
  primary: "#773141",
  secondary: "#FFB612",
  city: "washington",
  name: "redskins",
  abbr: "WAS"
 }
}

const teamNames = {};

for (let team in teamData) {
  for (let property in teamData[team]) {
   abbreviation = teamData[team].abbr;
   teamNames[abbreviation] = {
    full: titleCase(teamData[team].city + " " + teamData[team].name),
    part: teamData[team].name
   }
 }
}

// console.log(teamNames)



function titleCase(str) {
 str = str.toLowerCase().split(' ');
 for (var i = 0; i < str.length; i++) {
  str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
 }
 return str.join(' ');
}








const setRecords = () => {
 $.ajax({
  method: "GET",
  url: "/api/divisions"
 }).then((data) => {
  // console.log(data)

  data.forEach(team => {
   // console.log(data)
   let teamRef = team.name.toLowerCase();
   teamData[teamRef]["record"] = `${team.wins} - ${team.losses} - ${team.ties}`;
  })

 })
}

const setMatchups = () => {
 $.ajax({
  url: "/api/matchups",
  method: "GET"
 }).then(function (data) {
  // console.log(data);

  data.forEach(matchup => {
   // console.log(matchup)

   if (matchup.awayScore === null || matchup.homeScore === null) {
    matchup.awayScore = 0;
    matchup.homeScore = 0;
   }

   // console.log(teamNames[matchup.awayTeam].split(" ")[1]);

   let $matchup = `<div class='matchup mb-2'>
 <div class='matchup-row'>
  <div class='awayTeam'>
   <div class='record mb-2'>
    <p class='text-center' id='record'>${teamData[teamNames[matchup.awayTeam].part]["record"]}</p>
   </div>
   <div class='team mb-2'>
    <div class='team-logo mx-auto'>
     <img class='matchup-logo' src='./photos/${teamNames[matchup.awayTeam].part}.gif'>
    </div>
   </div>
   <div class='teamName mb-1'>
    <p class='text-center' id='team-name'>${teamNames[matchup.awayTeam].full}</p>
   </div>
   <div class='score'>
    <p class='text-center score' id=score>${matchup.awayScore}</p>
   </div>
  </div>
  <div class='at'>at</div>
  <div class='homeTeam'>
   <div class='record mb-2'>
    <p class='text-center' id='record'>${teamData[teamNames[matchup.homeTeam].part]["record"]}</p>
   </div>
   <div class='team mb-2'>
    <div class='team-logo mx-auto'>
     <img class='matchup-logo' src='./photos/${teamNames[matchup.homeTeam].part}.gif'>
    </div>
   </div>
   <div class='teamName mb-1'>
    <p class='text-center' id='team-name'>${teamNames[matchup.homeTeam].full}</p>
   </div>
   <div class='score'>
    <p class='text-center score' id=score>${matchup.homeScore}</p>
   </div>
  </div>
 </div>
</div>`

   // console.log(moment(matchup.startTime).format("h:mm"))

   if (moment(matchup.startTime).format("dddd") === "Thursday") {
    $("#tnf").append($matchup);
   } else if (moment(matchup.startTime).format("dddd") === "Monday") {
    $("#mnf").append($matchup);
   } else if (moment(matchup.startTime).format("h:mm") === "1:00") {
    $("#afternoon-games").append($matchup)
   } else if (moment(matchup.startTime).format("h:mm") === "4:05" || moment(matchup.startTime).format("h:mm") === "4:25") {
    $("#late-afternoon-games").append($matchup)
   } else {
    $("#snf").append($matchup)
   }



   // if (moment(matchup.startTime).format("MM/DD/YYYY h:mma")) {


   //   break;
   // }
   // console.log(moment(matchup.startTime).format("dddd"))
   // if thursday,  $("#tnf").append($matchup)
   // if 1:00 starts,    $("#tnf").append($matchup)
   //if 4:05 or 4:25
   // else

   // $("#afternoon-games").append($matchup)
   // $("#late-afternoon-games").append($matchup)
   // $("#snf").append($matchup)
   // $("#mnf").append($matchup)




  })

  // const start = moment(matchup.startTime).format("MM/DD/YYYY h:mma");
  // console.log(start)
 })
}
// console.log(teamData)



const setHomeNews = () => {
 $.ajax({
  url: "/api/news/all",
  method: "GET"
 }).then(function (data) {
console.log(data)

  const homeNewsArray = []

  data.articles.forEach(article => {
   homeNewsArray.push(
    {
     "title": article.title,
     "url": article.url,
     "urlToImage": article.urlToImage,
    });
   
  })

  for (let x = 0; x < $(".article-pic-left").length; x++) {
   $(".text")[x].innerText = homeNewsArray[x].title;
   $(".article-pic-left")[x].src = homeNewsArray[x].urlToImage;
 }

 $(".article-pic-left").on("error", function() {
   $(this).attr('src', `/photos/$${team}.png`);
 });

 })
}

setRecords()
setMatchups()
setHomeNews()