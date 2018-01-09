var express = require("express");
var bodyParser = require("body-parser");

// Set up express
var app = express();
var PORT = process.env.PORT || 3000;

// require models
const db = require("./models");

// Set up body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// serve static pages
app.use(express.static("public"));

//require my route
require("./routes/apiRoutes.js")(app);

// Sync sequelize and start express
db.sequelize.sync().then(function() {
  app.listen(PORT, function() {
    console.log(`App listening on PORT ${PORT}`);
  });
});