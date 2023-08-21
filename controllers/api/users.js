const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../../models/user');

module.exports = {
  create,
  login
};

async function create(req, res) {
  try {
    // Add the user to the db
    const user = await User.create(req.body);
    // token will be a string
    const token = createJWT(user);
    // Yes, we can serialize a string
    res.json(token);
  } catch (err) {
    // Probably a dup email
    res.status(400).json(err);
  }
}

async function login(req, res) {
  try {
    // Find the user by their email address
    const user = await User.findOne({email: req.body.email});
    if (!user) throw new Error();
    // Check if the password matches
    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) throw new Error();
    res.json( createJWT(user) );
  } catch {
    res.status(400).json('Bad Credentials');
  }
}


/* Helper Functions */

function createJWT(user) {
  return jwt.sign(
    // data payload
    { user },
    process.env.SECRET,
    { expiresIn: '24h' }
  );
}

const accessKey = {
  developer_id: "7cefe9da-5f8e-4af9-898f-f89834ef6664", // TODO: Update value with Developer ID
  key_id: "c7bf76c4-e6f1-40d1-9edb-451731121b63", // TODO: Update value with Key ID
  signing_secret: "c9a5C1repIE2TwLdxsXaw_VNuTii_k5WWVwj4iM6OWI", // TODO: Update value with Signing Secret
};

// Set JWT Payload data
const data = {
  aud: "doordash",
  iss: accessKey.developer_id,
  kid: accessKey.key_id,
  exp: Math.floor(Date.now() / 1000 + 1800),
  iat: Math.floor(Date.now() / 1000),
};

// Set JWT header, including DoorDash header used to identify DoorDash JWT version
const headers = { algorithm: "HS256", header: { "dd-ver": "DD-JWT-V1" } };

// Create signature, decoding signing secret when passing the parameter
const token = jwt.sign(
  data,
  Buffer.from(accessKey.signing_secret, "base64"),
  headers
);

// Write the DoorDash API JWT
console.log("DoorDash API JWT: \n" + token + "\n");

const crypto = require("crypto");

// Generate Unique ID for Delivery
const deliveryId = crypto.randomUUID(); // TODO: Replace with generated system ID

const axios = require("axios");

// Create data needed to create a new delivery
const body = JSON.stringify({
  external_delivery_id: deliveryId,
  pickup_address: "901 Market Street 6th Floor San Francisco, CA 94103",
  pickup_business_name: "Wells Fargo SF Downtown",
  pickup_phone_number: "+16505555555",
  pickup_instructions: "Enter gate code 1234 on the callbox.",
  dropoff_address: "901 Market Street 6th Floor San Francisco, CA 94103",
  dropoff_business_name: "Wells Fargo SF Downtown",
  dropoff_phone_number: "+16505555555",
  dropoff_instructions: "Enter gate code 1234 on the callbox.",
  order_value: 1999,
});

console.log("\n Create New Delivery Response: \n");

// Make API call, write response data with successful result, otherwise write error
axios
  .post("https://openapi.doordash.com/drive/v2/deliveries", body, {
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
  })
  .then(function (response) {
    console.log(response.data);
  })
  .catch(function (error) {
    console.log(error);
  });