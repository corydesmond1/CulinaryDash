const { DoorDashClient } = require("@doordash/sdk");
require("dotenv").config();

const client = new DoorDashClient({
  developer_id: process.env.DEVELOPER_ID,
  key_id: process.env.KEY_ID,
  signing_secret: process.env.SIGNING_SECRET,
});

client
  .getDelivery("0953c0e9-4baa-4b3b-b3d8-b04a5ca9edd0")
  .then((response) => {
    console.log(response.data);
  })
  .catch((err) => {
    console.log(err);
  });