import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import API_URL from '../config';
import './HostDashboardPage.css';

function HostDashboardPage() {
  let [places, setPlaces] = useState([]);
  let [user, setUser] = useState(null);

  useEffect(function() {
    var userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  useEffect(function() {
    var token = localStorage.getItem('token');
    if (token) {
      axios.get(API_URL + '/user-places', {
        headers: { Authorization: 'Bearer ' + token }
      })
        .then(function(res) {
          setPlaces(res.data);
        })
        .catch(function(err) {
          console.log('error getting places', err);
        });
    }
  }, []);

  async function handleDelete(placeId) {
    if (!confirm('Are you sure you want to delete this listing?')) {
      return;
    }

    try {
      var token = localStorage.getItem('token');
      await axios.delete(API_URL + '/places/' + placeId, {
        headers: { Authorization: 'Bearer ' + token }
      });
      setPlaces(places.filter(function(p) { return p._id !== placeId; }));
    } catch (err) {
      console.log('error deleting place', err);
      alert('Failed to delete listing');
    }
  }

  // build listing cards
  var listingCards = [];
  for (var i = 0; i < places.length; i++) {
    var place = places[i];

    var imagePart = null;
    if (place.photos && place.photos.length > 0) {
      imagePart = <img src={place.photos[0]} alt={place.title} />;
    } else {
      imagePart = <div className="placeholder-image">No Image</div>;
    }

    var perksDisplay = [];
    if (place.perks) {
      var maxPerks = Math.min(place.perks.length, 3);
      for (var p = 0; p < maxPerks; p++) {
        perksDisplay.push(<span key={p} className="perk-tag">{place.perks[p]}</span>);
      }
    }

    listingCards.push(
      <div key={place._id} className="listing-card">
        <div className="listing-image">
          {imagePart}
        </div>
        <div className="listing-details">
          <h3>{place.title}</h3>
          <p className="listing-location">{place.address}</p>
          <p className="listing-capacity">{place.guests} guests · {place.bedrooms} bedrooms · {place.baths} baths</p>
          <div className="listing-perks">
            {perksDisplay}
          </div>
          <p className="listing-rating">★ 4.95 · {Math.floor(Math.random() * 50) + 10} reviews</p>
          <p className="listing-price">R{place.price} <span>night</span></p>
          <div className="listing-actions">
            <Link to={'/account/places/' + place._id + '/edit'} className="update-btn">Update</Link>
            <button onClick={function() { handleDelete(place._id); }} className="delete-btn">Delete</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="host-dashboard-page">
      <div className="dashboard-container">
        <div className="dashboard-header">
          <div className="user-info">
            <div className="user-avatar">
              {user ? user.name.charAt(0) : 'U'}
            </div>
            <div>
              <h1>My Hotel List</h1>
              <p>{user ? user.name : 'User'}</p>
            </div>
          </div>
          <div className="dashboard-nav">
            <Link to="/account/bookings" className="nav-btn">View Reservations</Link>
            <Link to="/account/places" className="nav-btn active">View Listings</Link>
            <Link to="/account/places/create" className="nav-btn create-btn">Create Listing</Link>
          </div>
        </div>

        <div className="listings-grid">
          {listingCards}
        </div>

        {places.length === 0 && (
          <div className="no-listings">
            <h2>You haven't created any listings yet</h2>
            <p>Start by creating your first listing to host guests.</p>
            <Link to="/account/places/create" className="create-first-btn">Create your first listing</Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default HostDashboardPage;
