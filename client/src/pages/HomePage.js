import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import API_URL, { ACCOMMODATIONS_URL } from '../config';
import ListingCard from '../components/ListingCard';
import DestinationCard from '../components/DestinationCard';
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
          <img src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1600" alt="Modern luxury house at dusk" />
        </div>
        <div className="hero-content">
          <h1>Not sure where to go? Perfect.</h1>
          <button className="hero-btn">I'm flexible</button>
        </div>
      </div>

      {/* Inspiration Section */}
      <div className="inspiration-section">
        <h2>Inspiration for your next trip</h2>
        <p>Discover popular destinations and unique stays</p>
        <div className="inspiration-grid">
          <DestinationCard 
            destination="Cape Town" 
            image="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400"
            subtitle="Table Mountain views"
          />
          <DestinationCard 
            destination="Pretoria" 
            image="https://images.unsplash.com/photo-1582719508461-905c673771fd?w=400"
            subtitle="Jacaranda City"
          />
          <DestinationCard 
            destination="Midrand" 
            image="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400"
            subtitle="Mall of Africa"
          />
          <DestinationCard 
            destination="Bloemfontein" 
            image="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=400"
            subtitle="City of Roses"
          />
          <DestinationCard 
            destination="Durban" 
            image="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400"
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
