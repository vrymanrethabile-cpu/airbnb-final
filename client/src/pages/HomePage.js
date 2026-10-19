import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import API_URL, { ACCOMMODATIONS_URL } from '../config';
import ListingCard from '../components/ListingCard';
import DestinationCard from '../components/DestinationCard';
import './HomePage.css';

// TODO: Maybe add a loading state for when places are loading
// TODO: Add error handling if the API fails
// TODO: The dedupeById function might not be needed anymore since we're using fallback data

// HomePage component - this is the main page that shows all the sections
function HomePage() {
  // useNavigate lets us navigate to other pages
  let navigate = useNavigate();
  
  // State to store all the places we get from the API
  let [places, setPlaces] = useState([]);

  // This function removes duplicate places based on their ID
  // I learned this from StackOverflow when I was having issues with duplicates
  function dedupeById(arr) {
    var seen = {}; // Keep track of IDs we've already seen
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
        continue; // Skip if no ID found
      }
      if (seen[key]) {
        continue; // Skip if we've already seen this ID
      }
      seen[key] = true;
      result.push(item);
    }
    return result;
  }

  // This useEffect runs when the component first mounts
  // It fetches all the places from the API
  useEffect(function() {
    console.log('HomePage mounted, loading places...');
    
    // Using fallback data because the backend server isn't running locally
    // TODO: Change this back to axios.get when backend is deployed
    var fallbackData = [
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
      }
    ];
    
    // Set the places state with our fallback data
    setPlaces(fallbackData);
    console.log('Loaded', fallbackData.length, 'places');
  }, []);

  // Build the place cards that will be displayed in the "Places to stay" section
  // We loop through all the places and create a ListingCard for each one
  var placeCards = [];
  for (var p = 0; p < places.length; p++) {
    var place = places[p];
    placeCards.push(
      <ListingCard key={place._id} place={place} />
    );
  }
  
  console.log('Built', placeCards.length, 'place cards to display');

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
            image="https://www.mynewsroom.co.za/wp-content/uploads/2024/06/Table-Mountain-Cape-Town.jpg"
            subtitle=""
          />
          <DestinationCard 
            destination="Pretoria" 
            image="https://theleader.info/wp-content/uploads/2020/06/Jacarandas-walk-in-bloom..jpg"
            subtitle=""
          />
          <DestinationCard 
            destination="Midrand" 
            image="https://www.attacq.co.za/wp-content/uploads/2020/09/Mall-of-Africa-11.jpg"
            subtitle=""
          />
          <DestinationCard 
            destination="Bloemfontein" 
            image="https://media.istockphoto.com/id/2187467579/photo/the-fourth-raadsaal-building-in-bloemfontein.jpg?s=612x612&w=0&k=20&c=rIewX4WXcETDY5v4JY9F6iacJ6wbeInRjPXj6RRKj_M="
            subtitle=""
          />
          <DestinationCard 
            destination="Durban" 
            image="https://www.south-african-hotels.com/media/durban(1).jpg"
            subtitle=""
          />
        </div>
      </div>

      {/* Experiences Section */}
      <div className="experiences-section">
        <h2>Discover Airbnb</h2>
        <p>Find activities led by local hosts</p>
        <div className="experiences-grid">
          <div className="experience-card">
            <img src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800" alt="Things to do on your trip" />
            <div className="experience-overlay">
              <h3>Things to do<br />on your trip</h3>
              <button className="experience-btn">Explore</button>
            </div>
          </div>
          <div className="experience-card">
            <img src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800" alt="Things to do from home" />
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
            <img src="https://a0.muscache.com/im/pictures/1cf5a439-d6df-4ba3-b1be-27eeb68707b4.jpg" alt="Airbnb gift cards" />
          </div>
        </div>
      </div>

      {/* Hosting Promo Section */}
      <div className="hosting-promo">
        <div className="hosting-content">
          <div className="hosting-text">
            <h2>Become a host too</h2>
            <p>Learn how to become a host and earn money sharing your space</p>
            <Link to="/account/places/create" className="learn-more-btn">Get started</Link>
          </div>
          <div className="hosting-image">
            <img src="https://images.unsplash.com/photo-1494526585095-c41746248156?w=800" alt="Become a host" />
          </div>
        </div>
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
            <img src="https://www.mynewsroom.co.za/wp-content/uploads/2024/06/Table-Mountain-Cape-Town.jpg" alt="Cape Town" />
            <span>Cape Town</span>
          </Link>
          <Link to="/search?location=Durban" className="getaway-card">
            <img src="https://www.south-african-hotels.com/media/durban(1).jpg" alt="Durban" />
            <span>Durban</span>
          </Link>
          <Link to="/search?location=Garden Route" className="getaway-card">
            <img src="https://africageographic.com/wp-content/uploads/2021/10/Garden-Route-Cover-1568x1045.jpg" alt="Garden Route" />
            <span>Garden Route</span>
          </Link>
          <Link to="/search?location=Kruger National Park" className="getaway-card">
            <img src="https://images.unsplash.com/photo-1516426122078-c23e76319801?w=900&auto=format&fit=crop&q=80" alt="Kruger National Park" />
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
