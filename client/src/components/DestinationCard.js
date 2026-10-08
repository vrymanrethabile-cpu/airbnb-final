import React from 'react';
import { Link } from 'react-router-dom';
import './DestinationCard.css';

// DestinationCard component - for Home page inspiration section
// Layout: image on top, pink/red bottom strip with destination name
function DestinationCard({ destination, image, subtitle }) {
  return (
    <Link to="/search" className="destination-card">
      <div className="destination-image">
        <img src={image} alt={destination} />
      </div>
      <div className="destination-info">
        <div className="destination-name">{destination}</div>
        {subtitle && <div className="destination-subtitle">{subtitle}</div>}
      </div>
    </Link>
  );
}

export default DestinationCard;
