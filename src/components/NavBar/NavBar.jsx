import React from 'react';
import { AppBar, Toolbar, Typography, Tab, Tabs } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar = ({ user }) => {
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
          <span className="hello">Hello, {user ? user.name : 'guest'}</span>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
