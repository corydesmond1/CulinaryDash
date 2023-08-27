const express = require("express");
const router = express.Router();
const { yelpBusinessSearch, yelpBusinessDetail } = require('../../controllers/api/yelp');


router.get("/restaurants/:id", async function (req, res) {
  const businessId = req.params.id;
  const data = await yelpBusinessDetail(businessId);
  res.send(data);
});

router.get("/restaurants", async function (req, res) {
  const term = req.query.term;
  const location = req.query.location;
  const data = await yelpBusinessSearch(term, location);
  res.send(data);
});

module.exports = router;
