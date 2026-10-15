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
  let [loading, setLoading] = useState(true);
  
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
    console.log('Loading places...');
    
    try {
      // Use fallback data immediately since backend isn't running locally
      const fallbackData = [
            // CAPE TOWN LISTINGS
            {
              _id: '1',
              title: 'Stunning Sea View Apartment',
              address: 'Camps Bay, Cape Town',
              photos: ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800'],
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
              title: 'Cozy Studio in City Bowl',
              address: 'Gardens, Cape Town',
              photos: ['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800'],
              description: 'Charming studio apartment in the heart of Cape Town.',
              perks: ['Wifi', 'Kitchen', 'Air conditioning'],
              guests: 2,
              bedrooms: 1,
              beds: 1,
              baths: 1,
              type: 'Entire home',
              price: 1200
            },
            {
              _id: '3',
              title: 'Luxury Villa with Pool',
              address: 'Constantia, Cape Town',
              photos: ['https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800'],
              description: 'Exclusive 4-bedroom villa with private pool and mountain views.',
              perks: ['Wifi', 'Pool', 'Kitchen', 'Garden'],
              guests: 8,
              bedrooms: 4,
              beds: 5,
              baths: 3,
              type: 'Entire home',
              price: 5500
            },
            // PRETORIA LISTINGS
            {
              _id: '4',
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
              _id: '5',
              title: 'Family Home in Waterkloof',
              address: 'Waterkloof, Pretoria',
              photos: ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800'],
              description: 'Spacious 3-bedroom family home with swimming pool.',
              perks: ['Wifi', 'Pool', 'Kitchen', 'Garden'],
              guests: 6,
              bedrooms: 3,
              beds: 4,
              baths: 2,
              type: 'Entire home',
              price: 2800
            },
            {
              _id: '6',
              title: 'Cozy Guest Suite',
              address: 'Brooklyn, Pretoria',
              photos: ['https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800'],
              description: 'Private guest suite with separate entrance.',
              perks: ['Wifi', 'Kitchenette', 'Free parking'],
              guests: 2,
              bedrooms: 1,
              beds: 1,
              baths: 1,
              type: 'Private room',
              price: 750
            },
            // MIDRAND LISTINGS
            {
              _id: '7',
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
              _id: '8',
              title: 'Townhouse in Vorna Valley',
              address: 'Vorna Valley, Midrand',
              photos: ['https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800'],
              description: 'Lovely 3-bedroom townhouse in family-friendly complex.',
              perks: ['Wifi', 'Pool', 'Kitchen', 'Garden'],
              guests: 6,
              bedrooms: 3,
              beds: 4,
              baths: 2,
              type: 'Entire home',
              price: 2200
            },
            {
              _id: '9',
              title: 'Executive Suite',
              address: 'Carlswald, Midrand',
              photos: ['https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800'],
              description: 'Luxury executive suite in secure estate.',
              perks: ['Wifi', 'Kitchenette', 'Workspace'],
              guests: 2,
              bedrooms: 1,
              beds: 1,
              baths: 1,
              type: 'Private room',
              price: 1500
            },
            // BLOEMFONTEIN LISTINGS
            {
              _id: '10',
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
              _id: '11',
              title: 'Family Home in Fichardt Park',
              address: 'Fichardt Park, Bloemfontein',
              photos: ['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800'],
              description: 'Spacious 4-bedroom family home with large garden.',
              perks: ['Wifi', 'Pool', 'Kitchen', 'Garden'],
              guests: 8,
              bedrooms: 4,
              beds: 5,
              baths: 2,
              type: 'Entire home',
              price: 2400
            },
            {
              _id: '12',
              title: 'Cozy Guesthouse Room',
              address: 'Universitas, Bloemfontein',
              photos: ['https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800'],
              description: 'Comfortable guest room with breakfast included.',
              perks: ['Wifi', 'Breakfast', 'Free parking'],
              guests: 1,
              bedrooms: 1,
              beds: 1,
              baths: 1,
              type: 'Private room',
              price: 550
            },
            // DURBAN LISTINGS
            {
              _id: '13',
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
            },
            {
              _id: '14',
              title: 'Family Home in Umhlanga',
              address: 'Umhlanga, Durban',
              photos: ['https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800'],
              description: 'Spacious family home in secure estate near the beach.',
              perks: ['Wifi', 'Pool', 'Kitchen', 'Garden'],
              guests: 6,
              bedrooms: 3,
              beds: 4,
              baths: 2,
              type: 'Entire home',
              price: 3200
            },
            {
              _id: '15',
              title: 'Cozy Studio in Morningside',
              address: 'Morningside, Durban',
              photos: ['https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800'],
              description: 'Modern studio apartment in trendy Morningside.',
              perks: ['Wifi', 'Kitchen', 'Workspace'],
              guests: 2,
              bedrooms: 1,
              beds: 1,
              baths: 1,
              type: 'Entire home',
              price: 1100
            },
            {
              _id: '16',
              title: 'Ocean View House on the Garden Route',
              address: 'Garden Route, South Africa',
              photos: ['https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800'],
              description: 'Ocean-facing house with a relaxed coastal feel and beautiful garden views.',
              perks: ['Wifi', 'Kitchen', 'Air conditioning', 'Garden', 'Pool'],
              guests: 4,
              bedrooms: 2,
              beds: 2,
              baths: 2,
              type: 'Entire home',
              price: 2400
            },
            {
              _id: '17',
              title: 'Safari Villa near Kruger National Park',
              address: 'Kruger National Park, South Africa',
              photos: ['https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800'],
              description: 'Luxury safari villa with outdoor seating, wildlife views, and a private relaxing atmosphere.',
              perks: ['Wifi', 'Kitchen', 'Pool', 'Air conditioning', 'Garden'],
              guests: 5,
              bedrooms: 3,
              beds: 3,
              baths: 2,
              type: 'Entire home',
              price: 4400
            }
          ];
      
      setPlaces(fallbackData);
      setLoading(false);
      console.log('Places loaded successfully:', fallbackData.length);
    } catch (error) {
      console.error('Error loading places:', error);
      setLoading(false);
    }
  }, []);

  // set search term from URL parameter
  useEffect(function() {
    console.log('Location param from URL:', locationParam);
    if (locationParam) {
      setSearchTerm(locationParam);
      console.log('Search term set to:', locationParam);
    }
  }, [locationParam]);

  // filter places based on search term and filters
  useEffect(function() {
    console.log('Filtering places. Search term:', searchTerm, 'Total places:', places.length);
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
    
    console.log('Filtered results:', results.length);
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

      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
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
                Wifi
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
      )}
    </div>
  );
}

export default SearchPage;
