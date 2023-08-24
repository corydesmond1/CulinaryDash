import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Tab, Tabs, InputBase } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';
import { yelpBusinessSearch } from '../../utilities/yelp-api'; // Make sure to import yelpBusinessSearch

const Navbar = ({ user }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    if (searchTerm.trim() === '') {
      setSearchResults([]);
      return;
    }

    try {
      const res = await yelpBusinessSearch(searchTerm, location);
      setSearchResults(res.businesses);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            "Culinary Dash"
          </Typography>
          <Tabs>
            <Tab label={<Link className="link" to="/restaurants">Restaurants</Link>} />
            <Tab label={<Link className="link" to="/orders">Order</Link>} />
          </Tabs>
          <div>
            <div>
              <SearchIcon onClick={handleSearch} style={{ cursor: 'pointer' }} />
            </div>
            <InputBase
              placeholder="Search term"
              inputProps={{ 'aria-label': 'search' }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <InputBase
              placeholder="Location"
              inputProps={{ 'aria-label': 'location' }}
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>
          </div>
          <span className="hello">Hello, {user.name}</span>
        </Toolbar>
      </AppBar>

      {/* Render search results */}
      <div className="results-container">
        {searchResults.map((business) => (
          <Link to={business.id} key={business.id}>
            <div className="result-item">
              <img className="result-image" src={business.image_url} alt={business.name} />
              <div className="result-name">{business.name}</div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default Navbar;
