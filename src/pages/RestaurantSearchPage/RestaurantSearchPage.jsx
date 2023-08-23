import React, { useState } from 'react';
import yelpBusinessSearch from '../../utilities/yelp-api';
import './RestaurantSearchPage.css';


const YelpSearch = () => {
  const [term, setTerm] = useState('');
  const [location, setLocation] = useState('');
  const [businesses, setBusinesses] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    yelpBusinessSearch(term, location).then(res => {
      setBusinesses(res.businesses)
    }).catch(e => console.error(e));
  };
  console.log(businesses);
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
      <div className="results-container">
        {businesses.map((business) => (
          <div key={business.id} className="result-item">
            <img className="result-image" src={business.image_url} alt={business.name} />
            <div className="result-name">{business.name}</div>
          </div>
        ))}
        </div>
    </div>
  );
};

export default YelpSearch;



{/* export default function RestaurantSearchPage() {
//     return (
//       <>
//         <h1>Restaurant Search Page</h1>
//       </>
//     );
//   } */}