import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import API_URL from '../config';
import './PlacePage.css';

function PlacePage() {
  let params = useParams();
  let id = params.id;

  let [place, setPlace] = useState(null);
  let [checkIn, setCheckIn] = useState('');
  let [checkOut, setCheckOut] = useState('');
  let [guests, setGuests] = useState(1);

  useEffect(function() {
    axios.get(API_URL + '/places/' + id)
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

  // build gallery images with a loop instead of map
  let galleryItems = [];
  if (place.photos && place.photos.length > 1) {
    for (let i = 1; i < place.photos.length && i < 5; i++) {
      let photo = place.photos[i];
      galleryItems.push(
        <div key={i} className="gallery-item">
          <img src={photo} alt={place.title + ' photo ' + (i + 1)} />
        </div>
      );
    }
  }

  // perks list
  let perkList = [];
  if (place.perks) {
    for (let j = 0; j < place.perks.length; j++) {
      let perk = place.perks[j];
      perkList.push(
        <div key={j} className="amenity">
          <span>✓</span> {perk}
        </div>
      );
    }
  }

  let bedroomCount = 0;
  if (place.photos) {
    bedroomCount = place.photos.length;
  }

  let nightsTotal = place.price * 5;
  let serviceFee = Math.round(place.price * 5 * 0.14);
  let grandTotal = nightsTotal + 500 + serviceFee;

  return (
    <div className="place-page">
      <div className="place-header">
        <h1>{place.title}</h1>
        <div className="place-location-header">
          <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style={{display: 'block', fill: 'none', height: '16px', width: '16px', stroke: 'currentColor', strokeWidth: '2', overflow: 'visible'}}>
            <path d="M16 1c2.008 0 3.463.963 4.751 3.269l.533 1.025c1.954 3.83 6.114 12.54 7.1 14.836l.145.353c.667 1.591.91 2.472.96 3.396l.01.415.001.228c0 4.062-2.877 6.478-6.357 6.478-2.224 0-4.556-1.258-6.709-3.386l-.257-.26-.172-.179h-.212l-.172.179-.257.26c-2.153 2.128-4.486 3.386-6.71 3.386C5.377 31 2.5 28.584 2.5 24.522l.001-.228.01-.415c.05-.924.293-1.805.96-3.396l.145-.353c.986-2.296 5.146-11.006 7.1-14.836l.533-1.025C12.537 1.963 13.992 1 16 1z"></path>
          </svg>
          <span>{place.address}</span>
        </div>
      </div>

      <div className="place-gallery">
        {place.photos && place.photos.length > 0 && (
          <>
            <div className="gallery-main">
              <img src={place.photos[0]} alt={place.title} />
            </div>
            <div className="gallery-grid">
              {galleryItems}
            </div>
          </>
        )}
      </div>

      <div className="place-content">
        <div className="place-details">
          <div className="place-host">
            <h2>Entire home hosted by Host</h2>
            <p>{place.guests} guests · {bedroomCount} bedrooms · 1 bed · 1 bath</p>
          </div>

          <div className="place-features">
            <div className="feature">
              <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style={{display: 'block', fill: 'none', height: '24px', width: '24px', stroke: 'currentColor', strokeWidth: '2', overflow: 'visible'}}>
                <path d="M16 28a7 7 0 0 1-7-7c0-2.38 1.19-4.47 3-5.74V7a4 4 0 0 1 8 0v8.26c1.81 1.27 3 3.36 3 5.74a7 7 0 0 1-7 7z"></path>
              </svg>
              <div>
                <h3>Dedicated workspace</h3>
                <p>A dedicated workspace with wifi</p>
              </div>
            </div>
            <div className="feature">
              <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style={{display: 'block', fill: 'none', height: '24px', width: '24px', stroke: 'currentColor', strokeWidth: '2', overflow: 'visible'}}>
                <path d="M27 18v9a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-9"></path>
                <path d="M9 18V9a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v9"></path>
              </svg>
              <div>
                <h3>Self check-in</h3>
                <p>Check yourself in with the lockbox</p>
              </div>
            </div>
            <div className="feature">
              <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style={{display: 'block', fill: 'none', height: '24px', width: '24px', stroke: 'currentColor', strokeWidth: '2', overflow: 'visible'}}>
                <path d="M16 2a14 14 0 1 0 14 14A14 14 0 0 0 16 2zm0 26a12 12 0 1 1 12-12 12 12 0 0 1-12 12z"></path>
              </svg>
              <div>
                <h3>Free parking</h3>
                <p>Premises has 2 free parking spots</p>
              </div>
            </div>
          </div>

          <div className="place-description">
            <h2>About this place</h2>
            <p>{place.description}</p>
          </div>

          <div className="place-amenities">
            <h2>What this place offers</h2>
            <div className="amenities-grid">
              {perkList}
            </div>
          </div>
        </div>

        <div className="booking-sidebar">
          <div className="booking-card">
            <div className="booking-header">
              <div className="price">R{place.price} <span>night</span></div>
              <div className="rating">★ 4.95 · 128 reviews</div>
            </div>
            
            <div className="booking-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Check-in</label>
                  <input 
                    type="date" 
                    value={checkIn}
                    onChange={function(e) { setCheckIn(e.target.value); }}
                  />
                </div>
                <div className="form-group">
                  <label>Check-out</label>
                  <input 
                    type="date" 
                    value={checkOut}
                    onChange={function(e) { setCheckOut(e.target.value); }}
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Guests</label>
                <select 
                  value={guests}
                  onChange={function(e) { setGuests(parseInt(e.target.value)); }}
                >
                  <option value={1}>1 guest</option>
                  <option value={2}>2 guests</option>
                  <option value={3}>3 guests</option>
                  <option value={4}>4+ guests</option>
                </select>
              </div>
              <button className="reserve-btn">Reserve</button>
              <p className="no-charge">You won't be charged yet</p>
            </div>

            <div className="booking-total">
              <div className="total-row">
                <span>R{place.price} x 5 nights</span>
                <span>R{nightsTotal}</span>
              </div>
              <div className="total-row">
                <span>Cleaning fee</span>
                <span>R500</span>
              </div>
              <div className="total-row">
                <span>Service fee</span>
                <span>R{serviceFee}</span>
              </div>
              <div className="total-divider"></div>
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
