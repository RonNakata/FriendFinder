// Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");


// Express 
var app = express();
var PORT = process.env.PORT || 8080;

// Express data parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// static express route for custom css
app.use(express.static(path.join(__dirname, './app/public')));

// Routes statements
require("./app/routing/apiRoutes")(app);
require("./app/routing/htmlRoutes")(app);

// Runs the server
app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
  });