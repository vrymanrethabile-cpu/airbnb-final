import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import API_URL from '../config';
import './HomePage.css';
import CardsCarousel from '../components/CardsCarousel';

function HomePage() {
  let [places, setPlaces] = useState([]);

  // remove duplicates - learned this from stackoverflow
  function dedupeById(arr) {
    var seen = {};
    var result = [];
    if (!arr) {
      return result;
    }
    for (var i = 0; i < arr.length; i++) {
      var item = arr[i];
      var key = null;
      if (item) {
        if (item._id) {
          key = item._id;
        } else if (item.id) {
          key = item.id;
        }
      }
      if (!key) {
        continue;
      }
      if (seen[key]) {
        continue;
      }
      seen[key] = true;
      result.push(item);
    }
    return result;
  }

  // get all places when page loads
  useEffect(function() {
    axios.get(API_URL + '/allPlaces')
      .then(function(response) {
        var data = response.data;
        if (!Array.isArray(data)) {
          data = [];
        }
        setPlaces(dedupeById(data));
      })
      .catch(function(err) {
        console.log('error getting places', err);
        setPlaces([]);
      });
  }, []);

  // build place cards with for loop
  var placeCards = [];
  for (var p = 0; p < places.length; p++) {
    var place = places[p];

    var imagePart = null;
    if (place.photos && place.photos.length > 0) {
      imagePart = <img src={place.photos[0]} alt={place.title} />;
    } else {
      imagePart = <div className="placeholder-image">No Image</div>;
    }

    placeCards.push(
      <Link to={'/place/' + place._id} key={place._id} className="place-card">
        <div className="place-image">
          {imagePart}
          <button className="favorite-btn">
            <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style={{display: 'block', fill: 'none', height: '24px', width: '24px', stroke: 'currentColor', strokeWidth: '2', overflow: 'visible'}}>
              <path d="M16 28c7-4.73 14-10 14-17a6.98 6.98 0 0 0-7-7c-1.8 0-3.58.68-4.95 2.05L16 8.1l-2.05-2.05a6.98 6.98 0 0 0-9.9 0A6.98 6.98 0 0 0 2 11c0 7 7 12.27 14 17z"></path>
            </svg>
          </button>
        </div>
        <div className="place-info">
          <div className="place-location">{place.title}</div>
          <div className="place-distance">{place.address}</div>
          <div className="place-dates">Available for 5 days</div>
          <div className="place-price">R{place.price} <span>night</span></div>
          <div className="place-rating">★ 4.95</div>
        </div>
      </Link>
    );
  }

  return (
    <div className="homepage">
      <CardsCarousel />

      <div className="places-grid">
        {placeCards}
      </div>
    </div>
  );
}

export default HomePage;
