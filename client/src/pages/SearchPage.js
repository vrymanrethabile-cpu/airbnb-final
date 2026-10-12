import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import API_URL, { ACCOMMODATIONS_URL } from '../config';
import SearchListingCard from '../components/SearchListingCard';
import './SearchPage.css';

function SearchPage() {
  let [searchParams, setSearchParams] = useSearchParams();
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

  // get URL parameters from header search
  let locationParam = searchParams.get('location');
  let checkInParam = searchParams.get('checkIn');
  let checkOutParam = searchParams.get('checkOut');
  let guestsParam = searchParams.get('guests');

  // fetch all places on component mount
  useEffect(function() {
    console.log('Fetching from:', ACCOMMODATIONS_URL);
    axios.get(ACCOMMODATIONS_URL)
      .then(function(res) {
        console.log('API response:', res.data);
        console.log('Number of places:', res.data.length);
        setPlaces(res.data);
      })
      .catch(function(err) {
        console.log('error fetching places', err);
        console.log('Error details:', err.response);
        // Fallback to sample data if API fails
        console.log('Using fallback sample data');
        setPlaces([
          {
            _id: '1',
            title: 'Stunning Sea View Apartment',
            address: 'Camps Bay, Cape Town',
            photos: ['https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800'],
            description: 'Wake up to breathtaking ocean views in this modern 2-bedroom apartment.',
            perks: ['Wifi', 'Kitchen', 'Air conditioning', 'Pool'],
            guests: 4,
            bedrooms: 2,
            beds: 2,
            baths: 2,
            type: 'Entire home',
            price: 2500
          },
          {
            _id: '2',
            title: 'Modern Loft in Hatfield',
            address: 'Hatfield, Pretoria',
            photos: ['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800'],
            description: 'Trendy loft apartment near UP campus with rooftop pool access.',
            perks: ['Wifi', 'Pool', 'Kitchen', 'Gym'],
            guests: 2,
            bedrooms: 1,
            beds: 1,
            baths: 1,
            type: 'Entire home',
            price: 950
          },
          {
            _id: '3',
            title: 'Modern Apartment in Gallagher',
            address: 'Gallagher Estate, Midrand',
            photos: ['https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800'],
            description: 'Contemporary apartment in secure estate close to Mall of Africa.',
            perks: ['Wifi', 'Pool', 'Kitchen', 'Gym'],
            guests: 4,
            bedrooms: 2,
            beds: 2,
            baths: 2,
            type: 'Entire home',
            price: 1800
          },
          {
            _id: '4',
            title: 'City Center Apartment',
            address: 'Bloemfontein Central',
            photos: ['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800'],
            description: 'Modern apartment in the heart of Bloemfontein.',
            perks: ['Wifi', 'Kitchen', 'Air conditioning'],
            guests: 2,
            bedrooms: 1,
            beds: 1,
            baths: 1,
            type: 'Entire home',
            price: 850
          },
          {
            _id: '5',
            title: 'Beachfront Apartment',
            address: 'Golden Mile, Durban',
            photos: ['https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800'],
            description: 'Stunning beachfront apartment with panoramic ocean views.',
            perks: ['Wifi', 'Kitchen', 'Ocean view', 'Balcony'],
            guests: 4,
            bedrooms: 2,
            beds: 2,
            baths: 2,
            type: 'Entire home',
            price: 2200
          }
        ]);
      });
  }, []);

  // set search term from URL parameter
  useEffect(function() {
    if (locationParam) {
      setSearchTerm(locationParam);
    }
  }, [locationParam]);

  // filter places based on search term and filters
  useEffect(function() {
    let results = [];
    for (var i = 0; i < places.length; i++) {
      var place = places[i];
      var include = true;

      // filter by search term
      if (searchTerm) {
        var searchLower = searchTerm.toLowerCase();
        var titleLower = place.title ? place.title.toLowerCase() : '';
        var addressLower = place.address ? place.address.toLowerCase() : '';
        if (!titleLower.includes(searchLower) && !addressLower.includes(searchLower)) {
          include = false;
        }
      }

      // filter by price range
      if (priceRange) {
        if (priceRange === 'low' && place.price > 1000) {
          include = false;
        }
        if (priceRange === 'medium' && (place.price <= 1000 || place.price > 3000)) {
          include = false;
        }
        if (priceRange === 'high' && place.price <= 3000) {
          include = false;
        }
      }

      // filter by place type
      if (placeType) {
        if (place.type !== placeType) {
          include = false;
        }
      }

      // filter by amenities
      if (freeCancellation) {
        if (!place.perks || !place.perks.includes('Free cancellation')) {
          include = false;
        }
      }
      if (wifi) {
        if (!place.perks || !place.perks.includes('Wifi')) {
          include = false;
        }
      }
      if (kitchen) {
        if (!place.perks || !place.perks.includes('Kitchen')) {
          include = false;
        }
      }
      if (airConditioning) {
        if (!place.perks || !place.perks.includes('Air conditioning')) {
          include = false;
        }
      }

      if (include) {
        results.push(place);
      }
    }
    setFilteredPlaces(results);
  }, [searchTerm, priceRange, placeType, freeCancellation, wifi, kitchen, airConditioning, places]);

  // build place cards using SearchListingCard component
  var placeCards = [];
  for (var p = 0; p < filteredPlaces.length; p++) {
    var place = filteredPlaces[p];
    placeCards.push(
      <SearchListingCard key={place._id} place={place} />
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
