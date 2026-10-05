const express = require('express');
const router = express.Router();
const Location = require('../models/Locations');
const authMiddleware = require('../middleware/auth');

// get all accommodations (public)
router.get('/', function(req, res) {
  Location.find().then(function(accommodations) {
    res.json(accommodations);
  }).catch(function(err) {
    console.log('error getting accommodations', err);
    res.status(500).json({ message: 'Error fetching accommodations' });
  });
});

// get single accommodation (public)
router.get('/:id', function(req, res) {
  Location.findById(req.params.id).then(function(accommodation) {
    if (!accommodation) {
      return res.status(404).json({ message: 'Accommodation not found' });
    }
    res.json(accommodation);
  }).catch(function(err) {
    console.log('error getting accommodation', err);
    res.status(500).json({ message: 'Error fetching accommodation' });
  });
});

// create accommodation (protected)
router.post('/', authMiddleware, function(req, res) {
  var body = req.body;
  
  Location.create({
    owner: req.user.id,
    title: body.title,
    address: body.address,
    photos: body.photos,
    description: body.description,
    perks: body.perks,
    guests: body.guests,
    bedrooms: body.bedrooms,
    beds: body.beds,
    baths: body.baths,
    type: body.type,
    price: body.price,
    checkIn: body.checkIn,
    checkOut: body.checkOut
  }).then(function(accommodation) {
    res.json(accommodation);
  }).catch(function(err) {
    console.log('error creating accommodation', err);
    res.status(500).json({ message: 'Error creating accommodation' });
  });
});

// update accommodation (protected)
router.put('/:id', authMiddleware, function(req, res) {
  Location.findOneAndUpdate(
    { _id: req.params.id, owner: req.user.id },
    { $set: req.body },
    { new: true }
  ).then(function(accommodation) {
    if (!accommodation) {
      return res.status(404).json({ message: 'Accommodation not found or unauthorized' });
    }
    res.json(accommodation);
  }).catch(function(err) {
    console.log('error updating accommodation', err);
    res.status(500).json({ message: 'Error updating accommodation' });
  });
});

// delete accommodation (protected)
router.delete('/:id', authMiddleware, function(req, res) {
  Location.findOneAndDelete(
    { _id: req.params.id, owner: req.user.id }
  ).then(function(accommodation) {
    if (!accommodation) {
      return res.status(404).json({ message: 'Accommodation not found or unauthorized' });
    }
    res.json({ message: 'Accommodation deleted successfully' });
  }).catch(function(err) {
    console.log('error deleting accommodation', err);
    res.status(500).json({ message: 'Error deleting accommodation' });
  });
});

// get user's accommodations (protected)
router.get('/user/my-accommodations', authMiddleware, function(req, res) {
  Location.find({ owner: req.user.id }).then(function(accommodations) {
    res.json(accommodations);
  }).catch(function(err) {
    console.log('error getting user accommodations', err);
    res.status(500).json({ message: 'Error fetching accommodations' });
  });
});

module.exports = router;
