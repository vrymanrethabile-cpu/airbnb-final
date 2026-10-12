import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import API_URL, { ACCOMMODATIONS_URL } from '../config';
import ListingCard from '../components/ListingCard';
import DestinationCard from '../components/DestinationCard';
import './HomePage.css';

// HomePage component - displays hero section, inspiration, experiences, and place listings
function HomePage() {
  let navigate = useNavigate();
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
          <img src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1600" alt="Modern luxury house at dusk" />
        </div>
        <div className="hero-content">
          <h1>Not sure where to go? Perfect.</h1>
          <button className="hero-btn" onClick={function() { navigate('/search'); }}>I'm flexible</button>
        </div>
      </div>

      {/* Inspiration Section */}
      <div className="inspiration-section">
        <h2>Inspiration for your next trip</h2>
        <p>Discover popular destinations and unique stays</p>
        <div className="inspiration-grid">
          <DestinationCard 
            destination="Cape Town" 
            image="https://images.unsplash.com/photo-1580060839134-75a5edca2e27?w=400"
            subtitle="Table Mountain views"
          />
          <DestinationCard 
            destination="Pretoria" 
            image="https://images.unsplash.com/photo-1577493340884-3c9b5b3e0663?w=400"
            subtitle="Jacaranda City"
          />
          <DestinationCard 
            destination="Midrand" 
            image="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400"
            subtitle="Mall of Africa"
          />
          <DestinationCard 
            destination="Bloemfontein" 
            image="https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400"
            subtitle="City of Roses"
          />
          <DestinationCard 
            destination="Durban" 
            image="https://images.unsplash.com/photo-1582719508461-905c673771fd?w=400"
            subtitle="Golden Mile Beach"
          />
        </div>
      </div>

      {/* Experiences Section */}
      <div className="experiences-section">
        <h2>Discover Airbnb Experiences</h2>
        <p>Find activities led by local hosts</p>
        <div className="experiences-grid">
          <div className="experience-card">
            <img src="https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?w=800" alt="Things to do on your trip" />
            <div className="experience-overlay">
              <h3>Things to do<br />on your trip</h3>
              <button className="experience-btn">Explore</button>
            </div>
          </div>
          <div className="experience-card">
            <img src="https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=800" alt="Things to do from home" />
            <div className="experience-overlay">
              <h3>Things to do<br />from home</h3>
              <button className="experience-btn">Explore</button>
            </div>
          </div>
        </div>
      </div>

      {/* Gift Cards Section */}
      <div className="gift-cards-section">
        <div className="gift-cards-content">
          <div className="gift-cards-text">
            <h2>Shop Airbnb gift cards</h2>
            <p>Give the gift of travel with Airbnb gift cards</p>
            <button className="shop-btn">Shop now</button>
          </div>
          <div className="gift-cards-image">
            <img src="https://images.unsplash.com/photo-1549488344-1f9b8d2bd1f3?w=800" alt="Airbnb gift cards" />
          </div>
        </div>
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
        <div className="getaways-tabs">
          <button className="tab-btn active">Popular</button>
          <button className="tab-btn">Arts</button>
          <button className="tab-btn">Outdoors</button>
          <button className="tab-btn">Mountains</button>
          <button className="tab-btn">Beach</button>
          <button className="tab-btn">Unique stays</button>
          <button className="tab-btn">Categories</button>
          <button className="tab-btn">Amazing views</button>
        </div>
        <div className="getaways-grid">
          <Link to="/search?location=Cape Town" className="getaway-card">
            <img src="https://images.unsplash.com/photo-1580060839134-75a5edca2e27?w=400" alt="Cape Town" />
            <span>Cape Town</span>
          </Link>
          <Link to="/search?location=Durban" className="getaway-card">
            <img src="https://images.unsplash.com/photo-1582719508461-905c673771fd?w=400" alt="Durban" />
            <span>Durban</span>
          </Link>
          <Link to="/search?location=Garden Route" className="getaway-card">
            <img src="https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=400" alt="Garden Route" />
            <span>Garden Route</span>
          </Link>
          <Link to="/search?location=Kruger National Park" className="getaway-card">
            <img src="https://images.unsplash.com/photo-1516426122078-c23e76319801?w=400" alt="Kruger National Park" />
            <span>Kruger National Park</span>
          </Link>
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
