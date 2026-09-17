import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import API_URL from '../config';
import './SearchPage.css';

function SearchPage() {
  let [places, setPlaces] = useState([]);
  let [filteredPlaces, setFilteredPlaces] = useState([]);
  let [searchTerm, setSearchTerm] = useState('');
  
  // filter states
  let [priceRange, setPriceRange] = useState('');
  let [placeType, setPlaceType] = useState('');
  let [freeCancellation, setFreeCancellation] = useState(false);
  let [wifi, setWifi] = useState(false);
  let [kitchen, setKitchen] = useState(false);
  let [airConditioning, setAirConditioning] = useState(false);

  useEffect(function() {
    axios.get(API_URL + '/allPlaces')
      .then(function(response) {
        var data = response.data;
        if (!Array.isArray(data)) {
          data = [];
        }
        setPlaces(data);
        setFilteredPlaces(data);
      })
      .catch(function(err) {
        console.log('error getting places', err);
        setPlaces([]);
        setFilteredPlaces([]);
      });
  }, []);

  // apply filters
  useEffect(function() {
    var results = [];
    for (var i = 0; i < places.length; i++) {
      var place = places[i];
      var include = true;

      // search term filter
      if (searchTerm && place.title && place.title.toLowerCase().indexOf(searchTerm.toLowerCase()) === -1) {
        include = false;
      }

      // price filter
      if (priceRange && place.price) {
        if (priceRange === 'low' && place.price > 500) {
          include = false;
        } else if (priceRange === 'medium' && (place.price < 500 || place.price > 1500)) {
          include = false;
        } else if (priceRange === 'high' && place.price < 1500) {
          include = false;
        }
      }

      // place type filter
      if (placeType && place.type && place.type !== placeType) {
        include = false;
      }

      // amenities filters
      if (freeCancellation && (!place.perks || place.perks.indexOf('Free cancellation') === -1)) {
        include = false;
      }
      if (wifi && (!place.perks || place.perks.indexOf('Wifi') === -1)) {
        include = false;
      }
      if (kitchen && (!place.perks || place.perks.indexOf('Kitchen') === -1)) {
        include = false;
      }
      if (airConditioning && (!place.perks || place.perks.indexOf('Air conditioning') === -1)) {
        include = false;
      }

      if (include) {
        results.push(place);
      }
    }
    setFilteredPlaces(results);
  }, [searchTerm, priceRange, placeType, freeCancellation, wifi, kitchen, airConditioning, places]);

  // build place cards
  var placeCards = [];
  for (var p = 0; p < filteredPlaces.length; p++) {
    var place = filteredPlaces[p];

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
    <div className="search-page">
      <div className="search-header">
        <h1>Search Results</h1>
        <div className="search-bar">
          <input 
            type="text" 
            placeholder="Search places..." 
            value={searchTerm}
            onChange={function(e) { setSearchTerm(e.target.value); }}
          />
        </div>
      </div>

      <div className="search-content">
        <div className="filters-sidebar">
          <h2>Filters</h2>
          
          <div className="filter-section">
            <h3>Price</h3>
            <select value={priceRange} onChange={function(e) { setPriceRange(e.target.value); }}>
              <option value="">Any price</option>
              <option value="low">Under R500</option>
              <option value="medium">R500 - R1500</option>
              <option value="high">R1500+</option>
            </select>
          </div>

          <div className="filter-section">
            <h3>Type of place</h3>
            <select value={placeType} onChange={function(e) { setPlaceType(e.target.value); }}>
              <option value="">Any type</option>
              <option value="Entire home">Entire home</option>
              <option value="Private room">Private room</option>
              <option value="Shared room">Shared room</option>
            </select>
          </div>

          <div className="filter-section">
            <h3>Amenities</h3>
            <label className="checkbox-label">
              <input 
                type="checkbox" 
                checked={freeCancellation}
                onChange={function(e) { setFreeCancellation(e.target.checked); }}
              />
              Free cancellation
            </label>
            <label className="checkbox-label">
              <input 
                type="checkbox" 
                checked={wifi}
                onChange={function(e) { setWifi(e.target.checked); }}
              />
              Wi-Fi
            </label>
            <label className="checkbox-label">
              <input 
                type="checkbox" 
                checked={kitchen}
                onChange={function(e) { setKitchen(e.target.checked); }}
              />
              Kitchen
            </label>
            <label className="checkbox-label">
              <input 
                type="checkbox" 
                checked={airConditioning}
                onChange={function(e) { setAirConditioning(e.target.checked); }}
              />
              Air conditioning
            </label>
          </div>

          <button 
            className="clear-filters-btn"
            onClick={function() {
              setSearchTerm('');
              setPriceRange('');
              setPlaceType('');
              setFreeCancellation(false);
              setWifi(false);
              setKitchen(false);
              setAirConditioning(false);
            }}
          >
            Clear all filters
          </button>
        </div>

        <div className="results-section">
          <div className="results-count">
            {filteredPlaces.length} places
          </div>
          <div className="places-grid">
            {placeCards}
          </div>
          {filteredPlaces.length === 0 && (
            <div className="no-results">
              <h2>No places found</h2>
              <p>Try adjusting your filters or search term</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SearchPage;
