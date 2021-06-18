import React from 'react'
import { Link } from 'react-router-dom'
import './Header.scss';
import Logo from '../assets/logo.png';
import SearchIcon from '../assets/search.png';
import ProfileIcon from '../assets/profile.png';
import BuyIcon from '../assets/buy.png';

const Header = () => {
  return (
    <header>
      <div className="nav" style={{ paddingLeft: `93px`, paddingRight: `93px` }}>
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

        {/* Menu */}
        <div className="menu-wrapper">
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

        {/* Quick Icon */}
        <div className="quick-icon">
          <div style={{ display: `inline-block`, position: `relative`, right: `94px` }}>
            <Link to="/">
              <img
                style={{ width: `25px`, height: `25px` }}
                src={ SearchIcon }
                alt="searchIcon"
              />
            </Link>
          </div>
          <div style={{ display: `inline-block`, position: `relative`, right: `47px` }}>
            <Link to="/login">
              <img
                style={{ width: `25px`, height: `25px` }}
                src={ ProfileIcon }
                alt="profileIcon"
              />
            </Link>
          </div>
          <div style={{ display: `inline-block`, position: `relative`, right: `0px` }}>
            <Link to="/">
              <img
                style={{ width: `25px`, height: `25px` }}
                src={ BuyIcon }
                alt="buyIcon"
              />
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header;