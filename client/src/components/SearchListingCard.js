import React from 'react';
import { Link } from 'react-router-dom';
import './SearchListingCard.css';

// SearchListingCard component - horizontal card for search results
// Layout: image left, property info middle, price right
function SearchListingCard({ place }) {
  var imagePart = null;
  if (place.photos && place.photos.length > 0) {
    imagePart = <img src={place.photos[0]} alt={place.title} />;
  } else {
    imagePart = <div className="placeholder-image">No Image</div>;
  }

  return (
    <Link to={'/place/' + place._id} className="search-listing-card">
      <div className="search-card-image">
        {imagePart}
      </div>
      <div className="search-card-info">
        <div className="search-card-title">{place.title}</div>
        <div className="search-card-address">{place.address}</div>
        <div className="search-card-details">
          {place.guests ? place.guests + ' guests' : ''} · 
          {place.type ? ' ' + place.type : ''} · 
          {place.bedrooms ? ' ' + place.bedrooms + ' bedrooms' : ''} · 
          {place.beds ? ' ' + place.beds + ' beds' : ''} · 
          {place.baths ? ' ' + place.baths + ' baths' : ''}
        </div>
        <div className="search-card-rating">★ 4.95 ({Math.floor(Math.random() * 100) + 50} reviews)</div>
      </div>
      <div className="search-card-price">
        <div className="price-amount">R{place.price}</div>
        <div className="per-night">/ night</div>
      </div>
    </Link>
  );
}

export default SearchListingCard;
