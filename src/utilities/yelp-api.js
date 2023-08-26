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
    `http://localhost:3001/restaurants?term=${term}&location=${location}`
  ).then((res) => res.json());
};

 export async function yelpBusinessDetail(businessId) {
   return await fetch(`http://localhost:3001/restaurants/${businessId}`).then((res) => res.json());
};