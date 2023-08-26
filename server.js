const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cors = require("cors");
// Always require and configure near the top
require('dotenv').config();
// Connect to the database
require('./config/database');

const app = express();


app.use(logger('dev'));
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);


// Configure both serve-favicon & static middleware
// to serve from the production 'build' folder
app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'build')));

// Middleware to check and verify a JWT and
// assign the user object from the JWT to req.user
app.use(require('./config/checkToken'));

const port = process.env.PORT || 3001;

// Put API routes here, before the "catch all" route
app.use('/api/users', require('./routes/api/users'));

// Protect all routes below from anonymous users
const ensureLoggedIn = require('./config/ensureLoggedIn');
app.use('/api/items', ensureLoggedIn, require('./routes/api/items'));
app.use('/api/orders', ensureLoggedIn, require('./routes/api/orders'));


const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    "x-requested-with": "xmlhttprequest",
    "Access-Control-Allow-Origin": "*",
    Authorization: "Bearer " + process.env.REACT_APP_YELP,
  },
};

async function yelpBusinessDetail(businessId) {
  return await fetch(
    `https://api.yelp.com/v3/businesses/${businessId}`,
    options
  ).then((response) => response.json());
}

app.get("/restaurants/:id", async function (req, res) {
  const businessId = req.params.id;
  const data = await yelpBusinessDetail(businessId);
  res.send(data);
});

async function yelpBusinessSearch(term, location) {
  return await fetch(
    `https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}`,
    options
  ).then((response) => response.json());
}

app.get("/restaurants", async function (req, res) {
  const term = req.query.term;
  const location = req.query.location;
  console.log(term, location);
  const data = await yelpBusinessSearch(term, location);
  res.send(data);
});

// The following "catch all" route (note the *) is necessary
// to return the index.html on all non-AJAX/API requests
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, function() {
  console.log(`Express app running on port ${port}`);
});
