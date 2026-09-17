import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import API_URL from '../config';
import './HostReservationsPage.css';

function HostReservationsPage() {
  let [bookings, setBookings] = useState([]);
  let [user, setUser] = useState(null);

  useEffect(function() {
    var userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

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
          console.log('error getting bookings', err);
        });
    }
  }, []);

  async function handleDelete(bookingId) {
    if (!confirm('Are you sure you want to delete this reservation?')) {
      return;
    }

    try {
      var token = localStorage.getItem('token');
      await axios.delete(API_URL + '/bookings/' + bookingId, {
        headers: { Authorization: 'Bearer ' + token }
      });
      setBookings(bookings.filter(function(b) { return b._id !== bookingId; }));
    } catch (err) {
      console.log('error deleting booking', err);
      alert('Failed to delete reservation');
    }
  }

  // build table rows
  var tableRows = [];
  for (var i = 0; i < bookings.length; i++) {
    var booking = bookings[i];
    var placeTitle = 'Property ' + (i + 1);
    var guestName = 'Guest';

    if (booking.place) {
      placeTitle = booking.place.title;
    }
    if (booking.user) {
      guestName = booking.user.name;
    }

    var checkInDate = new Date(booking.checkIn).toLocaleDateString();
    var checkOutDate = new Date(booking.checkOut).toLocaleDateString();

    tableRows.push(
      <tr key={booking._id}>
        <td>{guestName}</td>
        <td>{placeTitle}</td>
        <td>{checkInDate}</td>
        <td>{checkOutDate}</td>
        <td>
          <button 
            className="delete-action-btn"
            onClick={function() { handleDelete(booking._id); }}
          >
            Delete
          </button>
        </td>
      </tr>
    );
  }

  return (
    <div className="host-reservations-page">
      <div className="reservations-container">
        <div className="reservations-header">
          <div className="user-info">
            <div className="user-avatar">
              {user ? user.name.charAt(0) : 'U'}
            </div>
            <div>
              <h1>My Reservations</h1>
              <p>{user ? user.name : 'User'}</p>
            </div>
          </div>
          <div className="dashboard-nav">
            <Link to="/account/bookings" className="nav-btn active">View Reservations</Link>
            <Link to="/account/places" className="nav-btn">View Listings</Link>
            <Link to="/account/places/create" className="nav-btn create-btn">Create Listing</Link>
          </div>
        </div>

        <div className="reservations-table-container">
          <table className="reservations-table">
            <thead>
              <tr>
                <th>Booked by</th>
                <th>Property</th>
                <th>Check-in</th>
                <th>Check-out</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tableRows}
            </tbody>
          </table>
        </div>

        {bookings.length === 0 && (
          <div className="no-reservations">
            <h2>No reservations yet</h2>
            <p>When guests book your properties, they will appear here.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default HostReservationsPage;
