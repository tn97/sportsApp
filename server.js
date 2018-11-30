const session = require("express-session");
const passport = require("./config/passport");

const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('4064b95643d24a48a9b28a7ad95f81e4');


const MySportsFeeds = require("mysportsfeeds-node");
const msf = new MySportsFeeds("2.0", true);
msf.authenticate("3c05ee98-ad49-4e16-b24e-46c9b5", "MYSPORTSFEEDS");

const express = require("express");
const path = require("path");
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

const db = require("./models");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "./public")));

app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

users = [];
connections = [];


const server = require("http").createServer(app);
const io = require("socket.io").listen(server);
io.sockets.on('connection', function(socket){
  connections.push(socket);
  console.log('Connected: %s sockets connected', connections.length);

  // Disconnect
  socket.on('disconnect', function(data) {
    users.splice(users.indexOf(socket.username), 1);
    updateUsernames();
    connections.splice(connections.indexOf(socket), 1);
    console.log('Disconnected: %s sockets connected', connections.length);
  });

  // Send message
  socket.on('send message', function(data) {
    io.sockets.emit('new message', {msg: data, user: socket.username});
  });

  // New User
  socket.on('new user', function(data, callback) {
    callback(true);
    socket.username = data;
    users.push(socket.username);
    updateUsernames();
  });

  function updateUsernames() {
    io.sockets.emit('get users', users);
  }
});

app.use("/api", require("./routes/apiRoutes.js"));
app.use(require("./routes/htmlRoutes.js"));

db.sequelize.sync({force: false}).then(() => {
  app.listen(PORT, () => {
    console.log("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT);
  });
});

// server.listen(process.env.PORT || 3000);
// console.log("server running");

