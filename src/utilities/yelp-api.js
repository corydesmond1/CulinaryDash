// import yelp from 'yelp-fusion';
// const client = yelp.client(process.env.REACT_APP_YELP);

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    "x-requested-with": "xmlhttprequest",
    "Access-Control-Allow-Origin": "*",
    Authorization: "Bearer " + process.env.REACT_APP_YELP,
  },
   success: function(result){
        console.log(result);
    }
 };

async function yelpBusinessSearch(term, location) {

  return await fetch(
    `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}`,
    options
  )
    .then((response) => response.json())
    
};

async function yelpPhoneSearch() {
  fetch("https://api.yelp.com/v3/businesses/search/phone", options)
    .then((response) => response.json())
    .then((response) => console.log(response))
    .catch((err) => console.error(err));
}

export default yelpBusinessSearch;