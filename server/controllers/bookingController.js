const bookingModel = require("../models/Booking");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const makeBooking = function(req, res) {
  var token = req.cookies.token;
  var body = req.body;

  jwt.verify(token, process.env.SECRET, {}, function(err, user) {
    if (err) {
      res.status(401).json("not logged in");
      return;
    }

    bookingModel.create({
      place: body.place,
      checkIn: body.checkIn,
      checkOut: body.checkOut,
      numOfGuests: body.numOfGuests,
      fullName: body.fullName,
      mobile: body.mobile,
      price: body.price,
      user: user.id,
    }).then(function(doc) {
      res.status(201).json(doc);
    }).catch(function(err) {
      console.log({ error: err.message });
      res.status(500).json(err.message);
    });
  });
};

const getBooking = function(req, res) {
  var token = req.cookies.token;

  jwt.verify(token, process.env.SECRET, {}, function(err, user) {
    if (err) {
      res.status(401).json("not logged in");
      return;
    }

    bookingModel.find({ user: user.id }).populate("place").then(function(bookings) {
      res.json(bookings);
    }).catch(function(err) {
      console.log(err);
      res.status(500).json(err);
    });
  });
};

const deleteBooking = function(req, res) {
  var id = req.params.id;

  bookingModel.findOneAndDelete({ _id: id }).then(function(deletedItem) {
    if (!deletedItem) {
      res.status(401).json("Booking Not Found!");
      return;
    }
    res.status(201).json("Booking successfully deleted!");
  }).catch(function(err) {
    res.status(503).json("Server Error!");
  });
};

module.exports = { makeBooking, getBooking, deleteBooking };
