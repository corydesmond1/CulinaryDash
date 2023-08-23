import React, { useState } from 'react';


const YelpSearch = () => {
  const [term, setTerm] = useState('');
  const [location, setLocation] = useState('');
  const [businesses, setBusinesses] = useState([]);

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: "Bearer " + process.env.REACT_APP_YELP,
    },
  };

  const yelpBusinessSearch = async (term, location) => {
    try {
      const response = await fetch(`https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}`, options);
      const data = await response.json();
      setBusinesses(data.businesses);
    } catch (error) {
      console.error("Error fetching data:", error);
      setBusinesses([]); // Clear businesses array in case of an error
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    yelpBusinessSearch(term, location);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search term"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
        />
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      <ul>
        {businesses.map((business) => (
          <li key={business.id}>{business.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default YelpSearch;



// export default function RestaurantSearchPage() {
//     return (
//       <>
//         <h1>Restaurant Search Page</h1>
//       </>
//     );
//   }