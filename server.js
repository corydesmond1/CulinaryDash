const express = require("express");
const path = require("path");
const favicon = require("serve-favicon");
const logger = require("morgan");
const cors = require("cors");
const port = process.env.PORT || 3001;
const { v4: uuidv4 } = require("uuid");
const { DoorDashClient } = require("@doordash/sdk");
// Always require and configure near the top
require("dotenv").config();
// Connect to the database
require("./config/database");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000", "https://culinarydash-1e778c071eab.herokuapp.com/"]
  })
);

// Configure both serve-favicon & static middleware
// to serve from the production 'build' folder
app.use(favicon(path.join(__dirname, "build", "favicon.ico")));
app.use(express.static(path.join(__dirname, "build")));

// Middleware to check and verify a JWT and
// assign the user object from the JWT to req.user
app.use(require("./config/checkToken"));



// Put API routes here, before the "catch all" route
app.use("/api/users", require("./routes/api/users"));
app.use("/api/yelp", require("./routes/api/yelp"));

// Protect all routes below from anonymous users
const ensureLoggedIn = require("./config/ensureLoggedIn");
app.use("/api/items", ensureLoggedIn, require("./routes/api/items"));
app.use("/api/orders", ensureLoggedIn, require("./routes/api/orders"));

// The following "catch all" route (note the *) is necessary
// to return the index.html on all non-AJAX/API requests
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(port, function () {
  console.log(`Express app running on port ${port}`);
});

app.post("/get-delivery-rate", async (req, res) => {
  const client = new DoorDashClient({
    developer_id: process.env.DEVELOPER_ID,
    key_id: process.env.KEY_ID,
    signing_secret: process.env.SIGNING_SECRET,
  });
  {
    const response = await client.deliveryQuote({
      external_delivery_id: uuidv4(),
      pickup_address: "1000 4th Ave, Seattle, WA, 98104",
      pickup_phone_number: "+1(650)5555555",
      dropoff_address: "1201 3rd Ave, Seattle, WA, 98101",
      dropoff_phone_number: "+1(650)5555555",
    });
    res.send(response);
    console.log("QUOTE", response);
  }
});

app.post("/create-delivery", async (req, res) => {
  const client = new DoorDashClient({
    developer_id: process.env.DEVELOPER_ID,
    key_id: process.env.KEY_ID,
    signing_secret: process.env.SIGNING_SECRET,
  });
  const response = await client.deliveryQuoteAccept(
    "975eff21-9289-409f-87c2-2e0a952bb406"
  );
  res.send(response);
  console.log("ACCEPT", response);
});
