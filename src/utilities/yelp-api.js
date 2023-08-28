export async function yelpBusinessSearch(term, location) {
  return await fetch(
    `https://culinarydash-1e778c071eab.herokuapp.com/api/yelp/restaurants?term=${term}&location=${location}`
  ).then((res) => res.json());
};

 export async function yelpBusinessDetail(businessId) {
   return await fetch(`https://culinarydash-1e778c071eab.herokuapp.com/api/yelp/restaurants/${businessId}`).then((res) => res.json());
};