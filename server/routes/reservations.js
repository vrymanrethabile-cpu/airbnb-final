const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const Location = require('../models/Locations');
const authMiddleware = require('../middleware/auth');

// get all reservations for logged in user (protected)
router.get('/', authMiddleware, function(req, res) {
  Booking.find({ user: req.user.id })
    .populate('place')
    .then(function(reservations) {
      res.json(reservations);
    })
    .catch(function(err) {
      console.log('error getting reservations', err);
      res.status(500).json({ message: 'Error fetching reservations' });
    });
});

// get single reservation (protected)
router.get('/:id', authMiddleware, function(req, res) {
  Booking.findOne({ _id: req.params.id, user: req.user.id })
    .populate('place')
    .then(function(reservation) {
      if (!reservation) {
        return res.status(404).json({ message: 'Reservation not found' });
      }
      res.json(reservation);
    })
    .catch(function(err) {
      console.log('error getting reservation', err);
      res.status(500).json({ message: 'Error fetching reservation' });
    });
});

// create reservation (protected)
router.post('/', authMiddleware, function(req, res) {
  var body = req.body;
  
  Booking.create({
    user: req.user.id,
    place: body.place,
    checkIn: body.checkIn,
    checkOut: body.checkOut,
    numOfGuests: body.numOfGuests,
    price: body.price,
    status: 'confirmed'
  }).then(function(reservation) {
    res.json(reservation);
  }).catch(function(err) {
    console.log('error creating reservation', err);
    res.status(500).json({ message: 'Error creating reservation' });
  });
});

// delete reservation (protected)
router.delete('/:id', authMiddleware, function(req, res) {
  Booking.findOneAndDelete({ _id: req.params.id, user: req.user.id })
    .then(function(reservation) {
      if (!reservation) {
        return res.status(404).json({ message: 'Reservation not found' });
      }
      res.json({ message: 'Reservation deleted successfully' });
    })
    .catch(function(err) {
      console.log('error deleting reservation', err);
      res.status(500).json({ message: 'Error deleting reservation' });
    });
});

module.exports = router;
