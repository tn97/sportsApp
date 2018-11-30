const router = require("express").Router();
const path = require("path");

router.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "../public/login.html"));
});

// Render .html at the "/signup" path
router.get("/signup", function(req, res) {
  res.sendFile(path.join(__dirname, "../public/signup.html"));
});



// Render .html at the "/login" path
router.get("/fanchat", function(req, res) {
  res.sendFile(path.join(__dirname, "../public/fanchat.html"));
});

router.get("/fanposts", function(req, res) {
  res.sendFile(path.join(__dirname, "../public/fanposts.html"));
});

router.get("/team", function(req, res) {
  res.sendFile(path.join(__dirname, "../public/team.html"));
});

router.get("/home", function(req, res) {
  res.sendFile(path.join(__dirname, "../public/home.html"));
});

// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");

router.get("/", function (req, res) {
  // If the user already has an account send them to the members page
  if (req.user) {
    return res.redirect("/home");
  }
  res.sendFile(path.join(__dirname, "../public/signup.html"));
});

router.get("/login", function (req, res) {
  // If the user already has an account send them to the members page
  if (req.user) {
    return res.redirect("/home");
  }
  res.sendFile(path.join(__dirname, "../public/login.html"));
});

// Here we've add our isAuthenticated middleware to this route. If a user who is
// not logged in tries to access this route they will be redirected to the
// signup page

// Route for logging user out (hit this with an <a> link)
router.get("/logout", function (req, res) {
  req.logout();
  res.redirect("/");
});


// All other paths serve the home.html page
router.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "../public/home.html"));
});



module.exports = router;