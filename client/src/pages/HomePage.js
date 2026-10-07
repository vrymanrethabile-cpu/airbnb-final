import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import API_URL, { ACCOMMODATIONS_URL } from '../config';
import ListingCard from '../components/ListingCard';
import './HomePage.css';

// HomePage component - displays hero section, inspiration, experiences, and place listings
function HomePage() {
  // state for storing all places from the API
  let [places, setPlaces] = useState([]);

  // remove duplicates - learned this from stackoverflow
  function dedupeById(arr) {
    var seen = {};
    var result = [];
    if (!arr) {
      return result;
    }
    for (var i = 0; i < arr.length; i++) {
      var item = arr[i];
      var key = null;
      if (item) {
        if (item._id) {
          key = item._id;
        } else if (item.id) {
          key = item.id;
        }
      }
      if (!key) {
        continue;
      }
      if (seen[key]) {
        continue;
      }
      seen[key] = true;
      result.push(item);
    }
    return result;
  }

  // fetch all places from API when component mounts
  useEffect(function() {
    axios.get(ACCOMMODATIONS_URL)
      .then(function(response) {
        var data = response.data;
        if (!Array.isArray(data)) {
          data = [];
        }
        setPlaces(dedupeById(data));
      })
      .catch(function(err) {
        console.log('error getting places', err);
        setPlaces([]);
      });
  }, []);

  // build place cards using ListingCard component
  var placeCards = [];
  for (var p = 0; p < places.length; p++) {
    var place = places[p];
    placeCards.push(
      <ListingCard key={place._id} place={place} />
    );
  }

  return (
    <div className="homepage">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-image">
          <img src="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1600" alt="Modern house" />
        </div>
        <div className="hero-content">
          <div className="hero-search">
            <h1>Not sure where to go? Perfect.</h1>
            <div className="search-bar-hero">
              <input type="text" placeholder="Search destinations..." />
              <button className="search-btn-hero">I'm flexible</button>
            </div>
          </div>
        </div>
      </div>

      {/* Inspiration Section */}
      <div className="inspiration-section">
        <h2>Inspiration for your next trip</h2>
        <p>Discover popular destinations and unique stays</p>
        <div className="inspiration-grid">
          <div className="inspiration-card">
            <img src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400" alt="Cape Town" />
            <h3>Cape Town</h3>
            <p>Table Mountain views</p>
          </div>
          <div className="inspiration-card">
            <img src="https://images.unsplash.com/photo-1582719508461-905c673771fd?w=400" alt="Durban" />
            <h3>Durban</h3>
            <p>Golden Mile Beach</p>
          </div>
          <div className="inspiration-card">
            <img src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400" alt="Kruger National Park" />
            <h3>Kruger National Park</h3>
            <p>Wildlife Safari</p>
          </div>
          <div className="inspiration-card">
            <img src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=400" alt="Garden Route" />
            <h3>Garden Route</h3>
            <p>Scenic Coastal Drive</p>
          </div>
        </div>
      </div>

      {/* Experiences Section */}
      <div className="experiences-section">
        <h2>Discover Airbnb Experiences</h2>
        <p>Find activities led by local hosts</p>
        <div className="experiences-grid">
          <div className="experience-card">
            <img src="https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?w=400" alt="Things to do on your trip" />
            <h3>Things to do on your trip</h3>
            <p>Explore local activities</p>
          </div>
          <div className="experience-card">
            <img src="https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=400" alt="Things to do from home" />
            <h3>Things to do from home</h3>
            <p>Online experiences</p>
          </div>
        </div>
      </div>

      {/* Gift Cards Section */}
      <div className="gift-cards-section">
        <h2>Shop Airbnb gift cards</h2>
        <p>Give the gift of travel with Airbnb gift cards</p>
        <button className="shop-btn">Shop now</button>
      </div>

      {/* Hosting Promo Section */}
      <div className="hosting-promo">
        <h2>Become a Host</h2>
        <p>Learn how to become a host and earn money sharing your space</p>
        <Link to="/account/places/create" className="learn-more-btn">Get started</Link>
      </div>

      {/* Future Getaways Section */}
      <div className="getaways-section">
        <h2>Inspiration for future getaways</h2>
        <div className="getaways-grid">
          <Link to="/search" className="getaway-link">Cape Town</Link>
          <Link to="/search" className="getaway-link">Durban</Link>
          <Link to="/search" className="getaway-link">Garden Route</Link>
          <Link to="/search" className="getaway-link">Kruger National Park</Link>
        </div>
      </div>

      {/* Places Grid */}
      <div className="places-section">
        <h2>Places to stay</h2>
        <div className="places-grid">
          {placeCards}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
