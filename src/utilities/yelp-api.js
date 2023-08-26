export async function yelpBusinessSearch(term, location) {
  return await fetch(
    `http://localhost:3001/api/yelp/restaurants?term=${term}&location=${location}`
  ).then((res) => res.json());
};

 export async function yelpBusinessDetail(businessId) {
   return await fetch(`http://localhost:3001/api/yelp/restaurants/${businessId}`).then((res) => res.json());
};