import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './BookingPage.css';

function BookingPage() {
  let params = useParams();
  let id = params.id;

  let [booking, setBooking] = useState(null);

  useEffect(function() {
    var token = localStorage.getItem('token');
    if (token) {
      axios.get('http://localhost:4000/bookings/' + id, {
        headers: { Authorization: 'Bearer ' + token }
      })
        .then(function(res) {
          setBooking(res.data);
        })
        .catch(function(err) {
          console.log('error', err);
        });
    }
  }, [id]);

  if (booking == null) {
    return <div className="loading">Loading...</div>;
  }

  let placeTitle = 'Place';
  let placeAddress = 'Address';
  let placePhoto = null;

  if (booking.place) {
    placeTitle = booking.place.title;
    placeAddress = booking.place.address;
    if (booking.place.photos && booking.place.photos.length > 0) {
      placePhoto = booking.place.photos[0];
    }
  }

  let checkInDate = new Date(booking.checkIn).toLocaleDateString();
  let checkOutDate = new Date(booking.checkOut).toLocaleDateString();
  let statusClass = 'status ' + booking.status.toLowerCase();

  return (
    <div className="booking-page">
      <div className="booking-container">
        <div className="booking-header">
          <Link to="/account/bookings" className="back-link">← Back to trips</Link>
          <h1>Trip details</h1>
        </div>

        <div className="booking-details">
          <div className="booking-place">
            {placePhoto && (
              <div className="place-gallery">
               <img src={placePhoto} alt={placeTitle} />
              </div>
            )}
            <div className="place-info">
              <h2>{placeTitle}</h2>
              <p>{placeAddress}</p>
            </div>
          </div>

          <div className="booking-info-card">
            <div className="info-section">
              <h3>Your booking</h3>
              <div className="info-row">
                <span>Dates</span>
                <span>{checkInDate} - {checkOutDate}</span>
              </div>
              <div className="info-row">
                <span>Guests</span>
                <span>{booking.numOfGuests} guests</span>
              </div>
              <div className="info-row">
                <span>Price</span>
                <span>R{booking.price}</span>
              </div>
              <div className="info-row">
                <span>Status</span>
                <span className={statusClass}>{booking.status}</span>
              </div>
            </div>

            <div className="info-section">
              <h3>Contact information</h3>
              <div className="info-row">
                <span>Name</span>
                <span>{booking.fullName}</span>
              </div>
              <div className="info-row">
                <span>Mobile</span>
                <span>{booking.mobile}</span>
              </div>
            </div>

            <button className="cancel-btn">Cancel reservation</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookingPage;
