import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import API_URL from '../config';
import './BookingsPage.css';

function BookingsPage() {
  let [bookings, setBookings] = useState([]);

  useEffect(function() {
    var token = localStorage.getItem('token');
    if (token) {
      axios.get(API_URL + '/bookings', {
        headers: { Authorization: 'Bearer ' + token }
      })
        .then(function(res) {
          setBookings(res.data);
        })
        .catch(function(err) {
          console.log('could not get bookings', err);
        });
    }
  }, []);

  // build booking cards with a for loop
  let bookingCards = [];
  for (let i = 0; i < bookings.length; i++) {
    let booking = bookings[i];
    let placeTitle = 'Place';
    let placePhoto = null;

    if (booking.place) {
      placeTitle = booking.place.title;
      if (booking.place.photos && booking.place.photos.length > 0) {
        placePhoto = booking.place.photos[0];
      }
    }

    let checkInDate = new Date(booking.checkIn).toLocaleDateString();
    let checkOutDate = new Date(booking.checkOut).toLocaleDateString();

    let imagePart = null;
    if (placePhoto) {
      imagePart = <img src={placePhoto} alt={placeTitle} />;
    } else {
      imagePart = <div className="placeholder">No Image</div>;
    }

    bookingCards.push(
      <Link to={'/account/bookings/' + booking._id} key={booking._id} className="booking-card">
        <div className="booking-image">
          {imagePart}
        </div>
        <div className="booking-info">
          <h3>{placeTitle}</h3>
          <p className="booking-dates">
            {checkInDate} - {checkOutDate}
          </p>
          <p className="booking-guests">{booking.numOfGuests} guests</p>
          <p className="booking-price">R{booking.price} total</p>
          <p className="booking-status">{booking.status}</p>
        </div>
      </Link>
    );
  }

  let mainContent = null;
  if (bookings.length > 0) {
    mainContent = (
      <div className="bookings-list">
        {bookingCards}
      </div>
    );
  } else {
    mainContent = (
      <div className="no-bookings">
        <h2>No trips yet</h2>
        <p>When you're ready to plan your next trip, your reservations will appear here.</p>
        <Link to="/" className="start-exploring">Start exploring</Link>
      </div>
    );
  }

  return (
    <div className="bookings-page">
      <div className="bookings-container">
        <div className="bookings-header">
          <h1>Trips</h1>
          <p>Upcoming reservations</p>
        </div>
        {mainContent}
      </div>
    </div>
  );
}

export default BookingsPage;
