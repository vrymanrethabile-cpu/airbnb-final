import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import API_URL from '../config';
import './CreateListingPage.css';

function CreateListingPage() {
  let navigate = useNavigate();
  
  let [formData, setFormData] = useState({
    title: '',
    address: '',
    description: '',
    guests: 1,
    bedrooms: 1,
    beds: 1,
    baths: 1,
    type: 'Entire home',
    price: '',
    perks: [],
    photos: []
  });

  let [photoLinks, setPhotoLinks] = useState('');
  let [perkInput, setPerkInput] = useState('');

  function handleInputChange(e) {
    let value = e.target.value;
    let name = e.target.name;
    
    if (name === 'guests' || name === 'bedrooms' || name === 'beds' || name === 'baths' || name === 'price') {
      value = parseInt(value) || 0;
    }
    
    setFormData(function(prev) {
      let newData = {...prev};
      newData[name] = value;
      return newData;
    });
  }

  function addPerk() {
    if (perkInput.trim()) {
      setFormData(function(prev) {
        let newData = {...prev};
        newData.perks = [...prev.perks, perkInput.trim()];
        return newData;
      });
      setPerkInput('');
    }
  }

  function removePerk(index) {
    setFormData(function(prev) {
      let newData = {...prev};
      newData.perks = prev.perks.filter(function(_, i) { return i !== index; });
      return newData;
    });
  }

  function addPhotos() {
    if (photoLinks.trim()) {
      let links = photoLinks.split('\n').filter(function(link) { return link.trim(); });
      setFormData(function(prev) {
        let newData = {...prev};
        newData.photos = [...prev.photos, ...links];
        return newData;
      });
      setPhotoLinks('');
    }
  }

  function removePhoto(index) {
    setFormData(function(prev) {
      let newData = {...prev};
      newData.photos = prev.photos.filter(function(_, i) { return i !== index; });
      return newData;
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    
    try {
      let token = localStorage.getItem('token');
      let res = await axios.post(API_URL + '/places', formData, {
        headers: { Authorization: 'Bearer ' + token }
      });
      console.log('listing created', res.data);
      navigate('/account');
    } catch (err) {
      console.log('error creating listing', err);
      alert('Failed to create listing');
    }
  }

  function handleCancel() {
    navigate('/account');
  }

  return (
    <div className="create-listing-page">
      <div className="create-listing-container">
        <h1>Create Listing</h1>
        
        <form onSubmit={handleSubmit} className="listing-form">
          <div className="form-section">
            <h2>Basic Information</h2>
            
            <div className="form-group">
              <label>Listing Name *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
                placeholder="Enter a descriptive title"
              />
            </div>

            <div className="form-group">
              <label>Location *</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                required
                placeholder="Enter the address"
              />
            </div>

            <div className="form-group">
              <label>Description *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
                placeholder="Describe your property"
 rows={4}
              />
            </div>
          </div>

          <div className="form-section">
            <h2>Property Details</h2>
            
            <div className="form-row">
              <div className="form-group">
                <label>Guests *</label>
                <input
                  type="number"
                  name="guests"
                  value={formData.guests}
                  onChange={handleInputChange}
                  required
                  min="1"
                />
              </div>

              <div className="form-group">
                <label>Bedrooms *</label>
                <input
                  type="number"
                  name="bedrooms"
                  value={formData.bedrooms}
                  onChange={handleInputChange}
                  required
                  min="1"
                />
              </div>

              <div className="form-group">
                <label>Beds *</label>
                <input
                  type="number"
                  name="beds"
                  value={formData.beds}
                  onChange={handleInputChange}
                  required
                  min="1"
                />
              </div>

              <div className="form-group">
                <label>Baths *</label>
                <input
                  type="number"
                  name="baths"
                  value={formData.baths}
                  onChange={handleInputChange}
                  required
                  min="1"
                />
              </div>
            </div>

            <div className="form-group">
              <label>Type of Place *</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                required
              >
                <option value="Entire home">Entire home</option>
                <option value="Private room">Private room</option>
                <option value="Shared room">Shared room</option>
              </select>
            </div>

            <div className="form-group">
              <label>Price per Night (R) *</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                required
                min="1"
                placeholder="500"
              />
            </div>
          </div>

          <div className="form-section">
            <h2>Amenities</h2>
            
            <div className="amenity-input">
              <input
                type="text"
                value={perkInput}
                onChange={function(e) { setPerkInput(e.target.value); }}
                placeholder="Add an amenity (e.g., Wifi, Kitchen)"
                onKeyPress={function(e) { if (e.key === 'Enter') { e.preventDefault(); addPerk(); }}}
              />
              <button type="button" onClick={addPerk}>Add</button>
            </div>

            <div className="amenities-list">
              {formData.perks.map(function(perk, index) {
                return (
                  <div key={index} className="amenity-tag">
                    <span>{perk}</span>
                    <button type="button" onClick={function() { removePerk(index); }}>×</button>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="form-section">
            <h2>Photos</h2>
            
            <div className="photo-input">
              <textarea
                value={photoLinks}
                onChange={function(e) { setPhotoLinks(e.target.value); }}
                placeholder="Enter photo URLs (one per line)"
                rows={4}
              />
              <button type="button" onClick={addPhotos}>Add Photos</button>
            </div>

            <div className="photos-preview">
              {formData.photos.map(function(photo, index) {
                return (
                  <div key={index} className="photo-preview-item">
                    <img src={photo} alt="Preview" />
                    <button type="button" onClick={function() { removePhoto(index); }}>×</button>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="cancel-btn" onClick={handleCancel}>Cancel</button>
            <button type="submit" className="create-btn">Create</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateListingPage;
