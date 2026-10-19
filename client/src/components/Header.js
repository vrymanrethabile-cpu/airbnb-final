import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';

// TODO: Maybe add a search suggestions feature
// TODO: The search bar could use better validation

// Header component - this shows at the top of every page
// It has the logo, search bar, navigation links, and user menu
function Header() {
  // useNavigate lets us navigate to different pages
  let navigate = useNavigate();
  
  // State for the search bar fields
  let [search, setSearch] = useState('');
  let [location, setLocation] = useState('');
  let [checkIn, setCheckIn] = useState('');
  let [checkOut, setCheckOut] = useState('');
  let [guests, setGuests] = useState(1);
  
  // State for user authentication
  let [user, setUser] = useState(null);
  
  // State for the dropdown menu
  let [showDropdown, setShowDropdown] = useState(false);
  
  // State for which search field is currently active
  let [activeSearchField, setActiveSearchField] = useState(null);

  // This useEffect runs when the component mounts
  // It checks if there's a user logged in by looking at localStorage
  useEffect(function() {
    console.log('Header mounted, checking for logged in user...');
    var userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
      console.log('User is logged in:', JSON.parse(userData).name);
    } else {
      console.log('No user logged in');
    }
  }, []);

  // This function handles user logout
  // It clears the localStorage and redirects to home
  function handleLogout() {
    console.log('User logging out...');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setShowDropdown(false);
    window.location.href = '/';
  }

  // This toggles the dropdown menu on/off
  function toggleDropdown() {
    setShowDropdown(!showDropdown);
    console.log('Dropdown toggled:', !showDropdown);
  }

  // This is called when a user clicks on a search field
  // It activates that field so they can type in it
  function handleSearchClick(field) {
    console.log('Search field clicked:', field);
    setActiveSearchField(field);
  }

  // This handles the actual search
  // It takes all the search parameters and navigates to the search page
  function handleSearch() {
    console.log('Searching with params:', { location, checkIn, checkOut, guests });
    let params = new URLSearchParams();
    if (location) params.append('location', location);
    if (checkIn) params.append('checkIn', checkIn);
    if (checkOut) params.append('checkOut', checkOut);
    if (guests) params.append('guests', guests);
    
    navigate('/search?' + params.toString());
  }

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          <i className="fa-brands fa-airbnb" style={{fontSize: '32px', color: '#FF5A5F'}}></i>
          <span style={{fontFamily: 'Circular, -apple-system, BlinkMacSystemFont, Roboto, Helvetica Neue, sans-serif', fontWeight: '700', fontSize: '22px', letterSpacing: '-0.5px', color: '#FF5A5F'}}>airbnb</span>
        </Link>

        <div className="search-bar">
          <div className="search-field">
            {activeSearchField === 'location' ? (
              <input 
                type="text" 
                placeholder="Where are you going?" 
                value={location}
                onChange={function(e) { setLocation(e.target.value); }}
                onBlur={function() { setActiveSearchField(null); }}
                autoFocus
              />
            ) : (
              <button className="search-btn" onClick={function() { handleSearchClick('location'); }}>
                {location || 'Location'}
              </button>
            )}
          </div>
          <div className="search-field">
            {activeSearchField === 'checkIn' ? (
              <input 
                type="date" 
                value={checkIn}
                onChange={function(e) { setCheckIn(e.target.value); }}
                onBlur={function() { setActiveSearchField(null); }}
                autoFocus
              />
            ) : (
              <button className="search-btn" onClick={function() { handleSearchClick('checkIn'); }}>
                {checkIn || 'Check in'}
              </button>
            )}
          </div>
          <div className="search-field">
            {activeSearchField === 'checkOut' ? (
              <input 
                type="date" 
                value={checkOut}
                onChange={function(e) { setCheckOut(e.target.value); }}
                onBlur={function() { setActiveSearchField(null); }}
                autoFocus
              />
            ) : (
              <button className="search-btn" onClick={function() { handleSearchClick('checkOut'); }}>
                {checkOut || 'Check out'}
              </button>
            )}
          </div>
          <div className="search-field">
            {activeSearchField === 'guests' ? (
              <select 
                value={guests}
                onChange={function(e) { setGuests(e.target.value); }}
                onBlur={function() { setActiveSearchField(null); }}
                autoFocus
              >
                <option value={1}>1 guest</option>
                <option value={2}>2 guests</option>
                <option value={3}>3 guests</option>
                <option value={4}>4 guests</option>
                <option value={5}>5+ guests</option>
              </select>
            ) : (
              <button className="search-btn search-btn-add" onClick={function() { handleSearchClick('guests'); }}>
                {guests === 1 ? 'Add guests' : guests + ' guests'}
              </button>
            )}
          </div>
          <button className="search-icon" onClick={handleSearch}>
            <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style={{display: 'block', fill: 'none', height: '16px', width: '16px', stroke: 'currentColor', strokeWidth: '4', overflow: 'visible'}}>
              <g fill="none">
                <path d="m13 24c6.0751322 0 11-4.9248678 11-11 0-6.07513225-4.9248678-11-11-11-6.07513225 0-11 4.92486775-11 11 0 6.0751322 4.92486775 11 11 11zm8-3 9 9"></path>
              </g>
            </svg>
          </button>
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

          <div className="user-menu-container">
            <button className="user-menu" onClick={toggleDropdown}>
              <i className="fa-solid fa-circle-user"></i>
              {user && <span className="user-name">{user.name.charAt(0)}</span>}
            </button>
            
            {showDropdown && (
              <div className="dropdown-menu">
                {user ? (
                  <>
                    <div className="dropdown-header">
                      <span>Hello, {user.name}</span>
                    </div>
                    <Link to="/account" className="dropdown-item" onClick={function() { setShowDropdown(false); }}>
                      Account
                    </Link>
                    <Link to="/account/bookings" className="dropdown-item" onClick={function() { setShowDropdown(false); }}>
                      My Reservations
                    </Link>
                    <Link to="/account/places" className="dropdown-item" onClick={function() { setShowDropdown(false); }}>
                      My Listings
                    </Link>
                    <Link to="/account/places/create" className="dropdown-item" onClick={function() { setShowDropdown(false); }}>
                      Create Listing
                    </Link>
                    <button className="dropdown-item logout-btn" onClick={handleLogout}>
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link to="/login" className="dropdown-item" onClick={function() { setShowDropdown(false); }}>
                      Login
                    </Link>
                    <Link to="/register" className="dropdown-item" onClick={function() { setShowDropdown(false); }}>
                      Register
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Header;
