const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: "Bearer " + process.env.REACT_APP_YELP,
  },
};

async function yelpBusinessSearch() {
  return await fetch("https://api.yelp.com/v3/businesses/search", options)
    .then((response) => response.json())
    .then((response) => console.log(response))
    .catch((err) => console.error(err));
}

async function yelpPhoneSearch() {
  fetch("https://api.yelp.com/v3/businesses/search/phone", options)
    .then((response) => response.json())
    .then((response) => console.log(response))
    .catch((err) => console.error(err));
}

export default function yelpBusinessSearch();
export default function yelpPhoneSearch();