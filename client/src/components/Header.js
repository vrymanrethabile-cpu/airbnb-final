import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
  let [search, setSearch] = useState('');
  // simple search state for now

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          <i className="fa-brands fa-airbnb" style={{fontSize: '32px', color: '#FF5A5F'}}></i>
          <span style={{fontFamily: 'Circular, -apple-system, BlinkMacSystemFont, Roboto, Helvetica Neue, sans-serif', fontWeight: '700', fontSize: '22px', letterSpacing: '-0.5px', color: '#FF5A5F'}}>airbnb</span>
        </Link>

        <div className="search-bar">
          <Link to="/search" className="search-btn">Anywhere</Link>
          <button className="search-btn">Any week</button>
          <button className="search-btn search-btn-add">Add guests</button>
          <Link to="/search" className="search-icon">
            <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style={{display: 'block', fill: 'none', height: '16px', width: '16px', stroke: 'currentColor', strokeWidth: '4', overflow: 'visible'}}>
              <g fill="none">
                <path d="m13 24c6.0751322 0 11-4.9248678 11-11 0-6.07513225-4.9248678-11-11-11-6.07513225 0-11 4.92486775-11 11 0 6.0751322 4.92486775 11 11 11zm8-3 9 9"></path>
              </g>
            </svg>
          </Link>
        </div>

        <nav className="nav">
          <Link to="/account/places/create" className="nav-link">Become a Host</Link>
          <button className="nav-link" aria-label="Change language and currency">
            <i className="fa-solid fa-globe"></i>
          </button>
          <button className="nav-link bars-btn" aria-label="Main menu">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" style={{display: 'block', height: '18px', width: '18px', fill: 'currentColor'}}>
              <rect x="3" y="6" width="18" height="2" rx="1" />
              <rect x="3" y="11" width="18" height="2" rx="1" />
              <rect x="3" y="16" width="18" height="2" rx="1" />
            </svg>
          </button>

          <Link to="/account" className="user-menu">
            <i className="fa-solid fa-circle-user"></i>
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
