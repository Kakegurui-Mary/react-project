import React, { useContext } from "react";
import { Link } from 'react-router-dom';
import { AuthContext } from "../context/authContext";
import Logo from "../img/recipes_logo.jpg"

const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext);
  
  return (
    <div className='navbar'>
      <div className='container'>
        <div className='logo'>
          <Link to="/">
            <img src={Logo} alt=''/>
          </Link>
        </div>
        <div className='links'>
          <Link className='link' to="/?cat=apetizer">
            <h6>Apetizer</h6>
          </Link>
          <Link className='link' to="/?cat=dish">
            <h6>Dish</h6>
          </Link>
          <Link className='link' to="/?cat=dessert">
            <h6>Dessert</h6>
          </Link>
          <Link className='link' to="/?cat=drink">
            <h6>Drink</h6>
          </Link>
          <span>{currentUser?.username}</span>
          { currentUser ? (
            <span onClick={logout}>Logout</span>
          ) : (
            <Link className="link" to="/login">Login</Link>
          )}
          <span className='write'>
            <Link className='link' to="/write">Write</Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;