import React from 'react';
import { AppBar, Toolbar, Typography, Tab } from '@mui/material';
import { Link } from 'react-router-dom';
import UserLogOut from '../UserLogOut/UserLogOut';

const Navbar = ({ user, setUser }) => {
  const navbarStyles = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'brown',
    padding: '10px 20px',
  };

  const navbarButtonStyles = {
    display: 'flex',
    gap: '10px',
  };

  const helloTextStyles = {
    marginRight: '20px',
    color: 'white',
  };

  const buttonStyles = {
    backgroundColor: 'white',
    color: 'black',
    padding: '5px 10px',
    borderRadius: '5px',
    transition: 'background-color 0.3s, color 0.3s',
    textDecoration: 'none',
    fontSize: '14px',
  };

  const hoverStyles = {
    backgroundColor: 'white',
    color: 'red',
  };

return (
  <AppBar position="static" style={{ backgroundColor: 'brown' }}>
    <Toolbar>
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        Culinary Dash
      </Typography>
      <div style={navbarStyles}>
      {user ? (
          <>
            <span style={helloTextStyles}>Hello, {user.name}</span>
            <UserLogOut user={user} setUser={setUser} />
          </>
        ) : (
          <span style={helloTextStyles}>Hello, guest</span>
        )}
        <div style={navbarButtonStyles}>
          <Tab
            label="Search"
            component={Link}
            to="/restaurants"
            style={buttonStyles}
            activeStyle={hoverStyles}
          />
          <Tab
            label="History"
            component={Link}
            to="/orders"
            style={buttonStyles}
            activeStyle={hoverStyles}
          />
        </div>
      </div>
    </Toolbar>
  </AppBar>
);
};

export default Navbar;
