
module.exports = {
  yelpBusinessDetail,
  yelpBusinessSearch
}

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
async function yelpBusinessSearch(term, location) {
  return await fetch(
    `https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}`,
    options
  ).then((response) => response.json());
}
