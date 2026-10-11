import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import API_URL, { ACCOMMODATIONS_URL } from '../config';
import './PlacePage.css';

function PlacePage() {
  let params = useParams();
  let navigate = useNavigate();
  let id = params.id;

  let [place, setPlace] = useState(null);
  let [checkIn, setCheckIn] = useState('');
  let [checkOut, setCheckOut] = useState('');
  let [guests, setGuests] = useState(1);
  let [showAllPhotos, setShowAllPhotos] = useState(false);
  let [showFullDescription, setShowFullDescription] = useState(false);
  let [showAllAmenities, setShowAllAmenities] = useState(false);
  let [bookingError, setBookingError] = useState('');
  let [bookingLoading, setBookingLoading] = useState(false);

  useEffect(function() {
    axios.get(ACCOMMODATIONS_URL + '/' + id)
      .then(function(res) {
        setPlace(res.data);
      })
      .catch(function(err) {
        console.log('error loading place', err);
      });
  }, [id]);

  if (place == null) {
    return <div className="loading">Loading...</div>;
  }

  // build gallery images - large left image + 4 small right images (2x2 grid)
  var mainImage = null;
  var smallImages = [];
  var allImages = [];
  
  if (place.photos && place.photos.length > 0) {
    // first image is the large main image
    mainImage = (
      <div key="main" className="gallery-main">
        <img src={place.photos[0]} alt={place.title} />
      </div>
    );
    
    // next 4 images are the small images in 2x2 grid
    for (var i = 1; i < Math.min(place.photos.length, 5); i++) {
      smallImages.push(
        <div key={i} className="gallery-small">
          <img src={place.photos[i]} alt={place.title + ' photo ' + (i + 1)} />
        </div>
      );
    }

    // build all images for show all photos view
    for (var j = 0; j < place.photos.length; j++) {
      allImages.push(
        <div key={j} className="gallery-all-item">
          <img src={place.photos[j]} alt={place.title + ' photo ' + (j + 1)} />
        </div>
      );
    }
  }

  // handle reserve button click
  async function handleReserve() {
    setBookingError('');
    
    // validate dates
    if (!checkIn || !checkOut) {
      setBookingError('Please select check-in and check-out dates');
      return;
    }
    
    if (new Date(checkIn) >= new Date(checkOut)) {
      setBookingError('Check-out date must be after check-in date');
      return;
    }

    // check if user is logged in
    let token = localStorage.getItem('token');
    if (!token) {
      setBookingError('Please log in to make a reservation');
      navigate('/login');
      return;
    }

    setBookingLoading(true);

    try {
      let response = await axios.post(API_URL + '/bookings', {
        place: id,
        checkIn: checkIn,
        checkOut: checkOut,
        numOfGuests: guests,
        price: place.price * nights
      }, {
        headers: { Authorization: 'Bearer ' + token }
      });

      setBookingLoading(false);
      alert('Reservation successful!');
      navigate('/account/bookings');
    } catch (err) {
      setBookingLoading(false);
      console.log('booking error', err);
      setBookingError('Failed to make reservation. Please try again.');
    }
  }

  // build features list
  var featuresList = [];
  if (place.perks && place.perks.length > 0) {
    for (var f = 0; f < place.perks.length; f++) {
      featuresList.push(
        <div key={f} className="feature-item">
          <span className="feature-icon">✓</span>
          <span>{place.perks[f]}</span>
        </div>
      );
    }
  }


  // perks list with icons
  let perkList = [];
  let amenityIcons = {
    'Wifi': '📶',
    'Kitchen': '🍳',
    'Air conditioning': '❄️',
    'Free parking': '🅿️',
    'Pool': '🏊',
    'Garden': '🌳',
    'Washer': '🧺',
    'Dryer': '👕',
    'TV': '📺',
    'Wifi': '📶'
  };
  
  if (place.perks) {
    for (let j = 0; j < place.perks.length; j++) {
      let perk = place.perks[j];
      let icon = amenityIcons[perk] || '✓';
      perkList.push(
        <div key={j} className="amenity">
          <span className="amenity-icon">{icon}</span> {perk}
        </div>
      );
    }
  }

  let bedroomCount = 0;
  if (place.photos) {
    bedroomCount = place.photos.length;
  }

  // calculate nights based on selected dates
  let nights = 5; // default
  if (checkIn && checkOut) {
    let checkInDate = new Date(checkIn);
    let checkOutDate = new Date(checkOut);
    let diffTime = Math.abs(checkOutDate - checkInDate);
    nights = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  let nightsTotal = place.price * nights;
  let cleaningFee = 500;
  let serviceFee = Math.round(nightsTotal * 0.14);
  let weeklyDiscount = 0;
  if (nights >= 7) {
    weeklyDiscount = Math.round(nightsTotal * 0.1);
  }
  let taxes = Math.round((nightsTotal - weeklyDiscount) * 0.05);
  let grandTotal = nightsTotal - weeklyDiscount + cleaningFee + serviceFee + taxes;

  // sample reviews
  let reviews = [
    { name: 'John D.', date: 'September 2024', rating: 5, text: 'Amazing place! Very clean and well-maintained.' },
    { name: 'Sarah M.', date: 'August 2024', rating: 5, text: 'Great location and wonderful host.' },
    { name: 'Mike T.', date: 'July 2024', rating: 4, text: 'Good value for money. Would recommend.' }
  ];

  let reviewCards = [];
  for (let r = 0; r < reviews.length; r++) {
    let review = reviews[r];
    let stars = '';
    for (let s = 0; s < review.rating; s++) {
      stars += '★';
    }
    reviewCards.push(
      <div key={r} className="review-card">
        <div className="review-header">
          <div className="review-avatar">{review.name.charAt(0)}</div>
          <div className="review-info">
            <div className="review-name">{review.name}</div>
            <div className="review-date">{review.date}</div>
          </div>
        </div>
        <div className="review-rating">{stars}</div>
        <p className="review-text">{review.text}</p>
      </div>
    );
  }

  return (
    <div className="place-page">
      <div className="place-content">
        <div className="place-main">
          <div className="place-header">
            <h1>{place.title}</h1>
            <div className="place-subheader">
              <span className="place-rating">★ 4.95 · 128 reviews</span>
              <span className="place-location">{place.address}</span>
              <span className="place-superhost">Superhost</span>
            </div>
          </div>

          <div className="gallery">
            {showAllPhotos ? (
              <div className="gallery-all">
                {allImages}
                <button className="close-gallery-btn" onClick={function() { setShowAllPhotos(false); }}>
                  Close
                </button>
              </div>
            ) : (
              <>
                {mainImage}
                <div className="gallery-small-grid">
                  {smallImages}
                </div>
                {place.photos && place.photos.length > 5 && (
                  <button className="show-all-photos-btn" onClick={function() { setShowAllPhotos(true); }}>
                    Show all photos
                  </button>
                )}
              </>
            )}
          </div>

          <div className="place-details-section">
            <div className="place-info">
              <div className="host-info">
                <h2>Entire home hosted by {place.owner ? place.owner.name : 'Host'}</h2>
                <div className="host-details">
                  <p>{place.guests} guests</p>
                  <p>{place.bedrooms || 2} bedrooms</p>
                  <p>{place.beds || 3} beds</p>
                  <p>{place.baths || 2} baths</p>
                </div>
              </div>

              <div className="description">
                <h2>About this space</h2>
                <p className={showFullDescription ? '' : 'description-truncated'}>
                  {place.description}
                </p>
                {place.description && place.description.length > 200 && (
                  <button className="show-more-btn" onClick={function() { setShowFullDescription(!showFullDescription); }}>
                    {showFullDescription ? 'Show less' : 'Show more'}
                  </button>
                )}
              </div>

              <div className="amenities">
                <h2>What this place offers</h2>
                <div className={showAllAmenities ? 'amenities-list-all' : 'amenities-list'}>
                  {showAllAmenities ? perkList : perkList.slice(0, 6)}
                </div>
                {place.perks && place.perks.length > 6 && (
                  <button className="show-all-amenities-btn" onClick={function() { setShowAllAmenities(!showAllAmenities); }}>
                    {showAllAmenities ? 'Show less' : 'Show all ' + place.perks.length + ' amenities'}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="booking-sidebar">
          <div className="booking-card">
            <div className="booking-header">
              <div className="booking-price">
                <span className="price">R{place.price}</span>
                <span className="per-night">night</span>
              </div>
              <div className="booking-rating">★ 4.95 · 128 reviews</div>
            </div>
            <div className="booking-dates">
              <div className="form-row">
                <div className="form-group">
                  <label>Check-in</label>
                  <input type="date" value={checkIn} onChange={function(e) { setCheckIn(e.target.value); }} />
                </div>
                <div className="form-group">
                  <label>Check-out</label>
                  <input type="date" value={checkOut} onChange={function(e) { setCheckOut(e.target.value); }} />
                </div>
              </div>
              <div className="form-group">
                <label>Guests</label>
                <select value={guests} onChange={function(e) { setGuests(e.target.value); }}>
                  <option value={1}>1 guest</option>
                  <option value={2}>2 guests</option>
                  <option value={3}>3 guests</option>
                  <option value={4}>4+ guests</option>
                </select>
              </div>
            </div>
            {bookingError && (
              <div className="booking-error">
                {bookingError}
              </div>
            )}
            <button className="reserve-btn" onClick={handleReserve} disabled={bookingLoading}>
              {bookingLoading ? 'Reserving...' : 'Reserve'}
            </button>
            <p className="no-charge">You won't be charged yet</p>

            <div className="booking-total">
              <div className="total-row">
                    <span>R{place.price} x {nights} nights</span>
                    <span>R{nightsTotal}</span>
                  </div>
                  {weeklyDiscount > 0 && (
                    <div className="total-row">
                      <span>Weekly discount</span>
                      <span>-R{weeklyDiscount}</span>
                    </div>
                  )}
                  <div className="total-row">
                    <span>Cleaning fee</span>
                    <span>R{cleaningFee}</span>
                  </div>
                  <div className="total-row">
                    <span>Service fee</span>
                    <span>R{serviceFee}</span>
                  </div>
                  <div className="total-row">
                    <span>Taxes</span>
                    <span>R{taxes}</span>
                  </div>
                  <div className="total-row total">
                    <span>Total</span>
                    <span>R{grandTotal}</span>
                  </div>
                </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlacePage;
