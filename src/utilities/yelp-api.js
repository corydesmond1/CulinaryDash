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

export async function yelpBusinessSearch(term, location) {

  return await fetch(
    `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}`,
    options
  )
    .then((response) => response.json())
    
};

 export async function yelpBusinessDetail(businessId) {
  return await fetch(
    `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/${businessId}`,
    options
  ).then((response) => response.json());
};