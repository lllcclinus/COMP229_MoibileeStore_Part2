import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import HomeIcon from '@material-ui/icons/Home'
import Button from '@material-ui/core/Button'
import auth from '../lib/auth-helper'
import { Link, useNavigate, useLocation } from 'react-router-dom';
import backgroundimg from './../assets/images/backgound.png';


const isActive = (location, path) => {
  return location.pathname === path ? { color: '#ff4081' } : { color: '#ffffff' };
};
export default function Menu(){ 
  const navigate = useNavigate();
  const location = useLocation();

  return (
    //<AppBar position="static" style={{ backgroundColor: '#3F3F40',color: '#D6DF59' }}>
    <AppBar position="static" style={{ backgroundImage: `url(${backgroundimg})`, color: '#D6DF59' }}>
    <Toolbar>
      <Typography variant="h6" color="inherit">
        MOIBILEE STORE
      </Typography>
      <Link to="/">
        <IconButton aria-label="Home" style={isActive(location, "/")}>
          <HomeIcon/>
        </IconButton>
      </Link>
      <Link to="/users">
        <Button style={isActive(location, "/users")}>Users</Button>
      </Link>
      <Link to="/products">
        <Button style={isActive(location, "/products")}>Products</Button>
      </Link>
      
      {
        auth.isAuthenticated() && (<span>
        <Link to="/cart">
        <Button style={isActive(location, "/cart")}>Cart</Button>
        </Link>
        </span>)
      }
      {
        auth.isAuthenticated() && (<span>
        <Link to="/createproduct">
        <Button style={isActive(location, "/createproduct")}>Create_Product</Button>
        </Link>
        </span>)
      }



      {
        !auth.isAuthenticated() && (<span>
          <Link to="/signup">
            <Button style={isActive(location, "/signup")}>Sign up
            </Button>
          </Link>
          <Link to="/signin">
            <Button style={isActive(location, "/signin")}>Sign In
            </Button>
          </Link>
        </span>)
      }
      
      {
        auth.isAuthenticated() && (<span>
          <Link to={"/user/" + auth.isAuthenticated().user._id}>
            <Button style={isActive(location, "/user/" + auth.isAuthenticated().user._id)}>My Profile</Button>
          </Link>
          <Button color="inherit" onClick={() => {
               auth.clearJWT(() => navigate('/'));
            }}>Sign out</Button>
        </span>)
      }
    </Toolbar>
  </AppBar>
);
};


