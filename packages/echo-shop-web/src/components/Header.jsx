import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import BurgerIcon from '../assets/burger.png';
import Logo from '../assets/logo.png';
import SearchIcon from '../assets/search.png';
import LoginIcon from '../assets/login.png';
import ProfileIcon from '../assets/profile.png';
import CartIcon from '../assets/cart.png';
import { useSelector, useDispatch } from 'react-redux';
import { listProducts } from '../actions/productActions';

import './Header.scss';

const Header = ({ device }) => {
  // User
  const userData = useSelector((state) => state.userData);
  const { userInfo } = userData;
  let userLink;
  if (userInfo) {
    userLink = <>
      <Link to="/profile">
        <img
          style={{ width: `28px`, height: `28px` }}
          src={ ProfileIcon }
          alt="profileIcon"
        />
      </Link>
    </>
  } else {
    userLink = <>
      <Link to="/login">
        <img
          style={{ width: `28px`, height: `28px` }}
          src={ LoginIcon }
          alt="login"
        />
      </Link>
    </>
  }

  // Search
  const category = "";
  const [searchKeyword, setSearchKeyword] = useState('');
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(listProducts(category, searchKeyword, ''));
  }

  return (
    <header>
      <div className={`nav ${device}`}>
        {/* Logo */}
        <div className="logo-wrapper">
          <Link to="/">
            <img
              style={{ width: `50px`, height: `50px` }}
              src={ Logo }
              alt="logo"
            />
          </Link>
        </div>

        {/* Search */}
        <div className="filter-wrapper">
          <form onSubmit={ submitHandler }>
            <div className="filter-serarch">
              <input type="text" name="searchKeyword" onChange={ (e) => setSearchKeyword(e.target.value) } />
              <button type="submit">
                <img
                  style={{ width: `18px`, height: `18px` }}
                  src={ SearchIcon }
                  alt="searchIcon"
                />
              </button>
            </div>
          </form>
        </div>

        {/* PC Web */}
        { device === "pc" && <>         
        {/* Quick Icon */}
        <div className="quick-icon">
          <div style={{ display: `inline-block`, position: `relative`, right: `47px` }}>
            { userLink }
          </div>
          <div style={{ display: `inline-block`, position: `relative`, right: `0px` }}>
            <Link to="/">
              <img
                style={{ width: `28px`, height: `28px` }}
                src={ CartIcon }
                alt="cartIcon"
              />
            </Link>
          </div>
        </div>        
        </> }

        {/* Mobile Web */}
        { device === "mobile" && <>
        <div className="mobile-menu">
          {/* <BurgerIcon /> */}
          <img
            style={{ width: `20px`, height: `15px` }}
            src={ BurgerIcon }
            alt="burger"
          />
        </div>
        </> }
      </div>
      
      {/* PC Web */}
      { device === "pc" && <>
      <div className={`category`}>
         {/* Menu */}
          <div className="menu-wrapper">
            <div className="menu-category">
              {/* <BurgerIcon /> */}
              <img
                style={{ width: `20px`, height: `15px` }}
                src={ BurgerIcon }
                alt="burger"
              />
            </div>
            <div className="menu-item">
              <Link to="/shirts">SHIRTS</Link>
            </div>
            <div className="menu-item">
              <Link to="/pants">PANTS</Link>
            </div>
            <div className="menu-item">
              <Link to="/dress">DRESS</Link>
            </div>
          </div>
      </div>
      </> }
    </header>
  )
}

export default Header;