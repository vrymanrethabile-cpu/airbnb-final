import React from 'react';
import { Link } from 'react-router-dom';
import './ListingCard.css';

// Reusable ListingCard component - displays property card with image, heart button, and details
function ListingCard({ place }) {
  var imagePart = null;
  if (place.photos && place.photos.length > 0) {
    imagePart = <img src={place.photos[0]} alt={place.title} />;
  } else {
    imagePart = <div className="placeholder-image">No Image</div>;
  }

  return (
    <Link to={'/place/' + place._id} className="listing-card">
      <div className="listing-card-image">
        {imagePart}
        <button className="favorite-btn" aria-label="Add to favorites">
          <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false">
            <path d="M16 28c7-4.73 14-10 14-17a6.98 6.98 0 0 0-7-7c-1.8 0-3.58.68-4.95 2.05L16 8.1l-2.05-2.05a6.98 6.98 0 0 0-9.9 0A6.98 6.98 0 0 0 2 11c0 7 7 12.27 14 17z"></path>
          </svg>
        </button>
      </div>
      <div className="listing-card-info">
        <div className="listing-card-location">{place.title}</div>
        <div className="listing-card-address">{place.address}</div>
        <div className="listing-card-dates">Available for 5 days</div>
        <div className="listing-card-price">R{place.price} <span className="per-night">night</span></div>
        <div className="listing-card-rating">★ 4.95</div>
      </div>
    </Link>
  );
}

export default ListingCard;
