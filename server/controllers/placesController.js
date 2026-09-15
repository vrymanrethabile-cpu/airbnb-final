const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const Location = require("../models/Locations");
const app = express();

app.use(cookieParser());

const postPlaces = function(req, res) {
  var token = req.cookies.token;
  var body = req.body;

  jwt.verify(token, process.env.SECRET, {}, function(err, user) {
    if (err) {
      res.status(401).json("not logged in");
      return;
    }
    Location.create({
      owner: user.id,
      title: body.title,
      address: body.address,
      photos: body.photos,
      photoLink: body.photoLink,
      description: body.description,
      perks: body.perks,
      extraInfo: body.extraInfo,
      checkIn: body.checkIn,
      checkOut: body.checkOut,
      guests: body.maxGuests,
      price: body.price,
    }).then(function(placeDoc) {
      res.json(placeDoc);
    }).catch(function(error) {
      console.log(error);
      res.status(500).json("something went wrong");
    });
  });
};

const getAllPlaces = function(req, res) {
  Location.find().then(function(allPlaces) {
    res.json(allPlaces);
  }).catch(function(err) {
    console.log('database error getting places', err);
    res.json([]);
  });
};

const getPlaces = function(req, res) {
  var token = req.cookies.token;
  jwt.verify(token, process.env.SECRET, {}, function(err, user) {
    if (err) {
      res.status(401).json("not logged in");
      return;
    }
    Location.find({ owner: user.id }).then(function(places) {
      res.json(places);
    });
  });
};

const getEachPlace = function(req, res) {
  var id = req.params.id;
  Location.findById(id).then(function(doc) {
    res.json(doc);
  }).catch(function(err) {
    console.log(err);
    res.status(404).json("place not found");
  });
};

const filteredPlace = function(req, res) {
  var location = req.query.place;
  var leastPrice = req.query.leastPrice;
  var highPrice = req.query.highPrice;

  if (!location && !leastPrice && !highPrice) {
    res.status(400).json("Please provide valid filter parameters.");
    return;
  }

  var query = {};

  if (location) {
    query.address = { $regex: location, $options: "i" };
  }

  if (leastPrice && highPrice) {
    query.price = { $gte: leastPrice, $lte: highPrice };
  }

  Location.find(query).then(function(filteredLocations) {
    if (filteredLocations.length === 0) {
      res.status(401).json("Sorry, no locations match your criteria.");
      return;
    }
    res.status(200).json(filteredLocations);
  }).catch(function(err) {
    console.log("Error:", err);
    res.status(500).json("Something went wrong!");
  });
};

const editPlace = function(req, res) {
  var id = req.params.id;
  Location.findOneAndUpdate(
    { _id: id },
    { $set: req.body }
  ).then(function(updatedItem) {
    if (!updatedItem) {
      res.status(400).json("Location not found!");
      return;
    }
    res.status(200).json("Location Updated Successfully!");
  }).catch(function(err) {
    console.log(err);
    res.status(500).json("Something went wrong!");
  });
};

const deletePlace = function(req, res) {
  var id = req.params.id;
  Location.findOneAndDelete({ _id: id }).then(function(deletedItem) {
    if (!deletedItem) {
      res.status(401).json("Location Not Found!");
      return;
    }
    res.status(201).json("Location successfully deleted!");
  }).catch(function(err) {
    res.status(503).json("Server Error!");
  });
};

module.exports = {
  postPlaces,
  getPlaces,
  getEachPlace,
  getAllPlaces,
  editPlace,
  deletePlace,
  filteredPlace,
};
