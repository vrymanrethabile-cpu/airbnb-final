import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import API_URL from '../config';
import './HomePage.css';

function HomePage() {
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

  // get all places when page loads
  useEffect(function() {
    axios.get(API_URL + '/allPlaces')
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

  // build place cards with for loop
  var placeCards = [];
  for (var p = 0; p < places.length; p++) {
    var place = places[p];

    var imagePart = null;
    if (place.photos && place.photos.length > 0) {
      imagePart = <img src={place.photos[0]} alt={place.title} />;
    } else {
      imagePart = <div className="placeholder-image">No Image</div>;
    }

    placeCards.push(
      <Link to={'/place/' + place._id} key={place._id} className="place-card">
        <div className="place-image">
          {imagePart}
          <button className="favorite-btn">
            <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style={{display: 'block', fill: 'none', height: '24px', width: '24px', stroke: 'currentColor', strokeWidth: '2', overflow: 'visible'}}>
              <path d="M16 28c7-4.73 14-10 14-17a6.98 6.98 0 0 0-7-7c-1.8 0-3.58.68-4.95 2.05L16 8.1l-2.05-2.05a6.98 6.98 0 0 0-9.9 0A6.98 6.98 0 0 0 2 11c0 7 7 12.27 14 17z"></path>
            </svg>
          </button>
        </div>
        <div className="place-info">
          <div className="place-location">{place.title}</div>
          <div className="place-distance">{place.address}</div>
          <div className="place-dates">Available for 5 days</div>
          <div className="place-price">R{place.price} <span>night</span></div>
          <div className="place-rating">★ 4.95</div>
        </div>
      </Link>
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
        <div className="inspiration-grid">
          <div className="inspiration-card">
            <img src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400" alt="Sandton City Hotel" />
            <h3>Sandton City Hotel</h3>
            <p>Johannesburg</p>
          </div>
          <div className="inspiration-card">
            <img src="https://images.unsplash.com/photo-1582719508461-905c673771fd?w=400" alt="Joburg City Hotel" />
            <h3>Joburg City Hotel</h3>
            <p>Johannesburg</p>
          </div>
          <div className="inspiration-card">
            <img src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400" alt="Woodmead Hotel" />
            <h3>Woodmead Hotel</h3>
            <p>Johannesburg</p>
          </div>
          <div className="inspiration-card">
            <img src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=400" alt="Hyde Park Hotel" />
            <h3>Hyde Park Hotel</h3>
            <p>Johannesburg</p>
          </div>
        </div>
      </div>

      {/* Experiences Section */}
      <div className="experiences-section">
        <h2>Discover Airbnb Experiences</h2>
        <div className="experiences-grid">
          <div className="experience-card">
            <img src="https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?w=400" alt="Things to do on your trip" />
            <h3>Things to do on your trip</h3>
          </div>
          <div className="experience-card">
            <img src="https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=400" alt="Things to do from home" />
            <h3>Things to do from home</h3>
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
        <h2>Questions about hosting?</h2>
        <p>Learn how to become a host and earn money sharing your space</p>
        <Link to="/account" className="learn-more-btn">Learn more</Link>
      </div>

      {/* Future Getaways Section */}
      <div className="getaways-section">
        <h2>Inspiration for future getaways</h2>
        <div className="getaways-grid">
          <Link to="/" className="getaway-link">Cape Town</Link>
          <Link to="/" className="getaway-link">Durban</Link>
          <Link to="/" className="getaway-link">Garden Route</Link>
          <Link to="/" className="getaway-link">Kruger National Park</Link>
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
