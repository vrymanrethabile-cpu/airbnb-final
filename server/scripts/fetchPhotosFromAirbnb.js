require('dotenv').config();
const axios = require('axios');
const cheerio = require('cheerio');
const mongoose = require('mongoose');
const Location = require('../models/Locations');

async function fetchImagesFromListing(url) {
  try {
    const { data } = await axios.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
    const $ = cheerio.load(data);
    // Try common metadata: og:image
    const images = [];
    const ogImage = $('meta[property="og:image"]').attr('content');
    if (ogImage) images.push(ogImage);

    // Airbnb pages often include JSON-LD with photos; try to extract any image URLs from script[type="application/ld+json"]
    $('script[type="application/ld+json"]').each((i, el) => {
      try {
        const json = JSON.parse($(el).contents().text());
        const extractImages = obj => {
          if (!obj) return;
          if (typeof obj === 'string' && obj.startsWith('http')) return images.push(obj);
          if (Array.isArray(obj)) return obj.forEach(extractImages);
          if (typeof obj === 'object') {
            for (const k of Object.keys(obj)) extractImages(obj[k]);
          }
        };
        extractImages(json);
      } catch (err) {
        // ignore JSON parse errors
      }
    });

    // As a fallback, collect image tags inside the page (this may include thumbnails)
    $('img').each((i, el) => {
      const src = $(el).attr('src') || $(el).attr('data-src');
      if (src && src.startsWith('http')) images.push(src);
    });

    // Deduplicate and return
    return Array.from(new Set(images)).slice(0, 12);
  } catch (err) {
    console.error('Failed to fetch images from', url, err.message);
    return [];
  }
}

async function run(mapping) {
  try {
    await mongoose.connect(process.env.MONGOURL);
    for (const item of mapping) {
      const { filter, listingUrl } = item;
      const imgs = await fetchImagesFromListing(listingUrl);
      if (imgs.length > 0) {
        const updated = await Location.findOneAndUpdate(filter, { $set: { photos: imgs } }, { new: true });
        console.log(`Updated ${filter.title || filter.address}: ${imgs.length} images`);
      } else {
        console.log(`No images found for ${listingUrl}`);
      }
    }
    process.exit(0);
  } catch (err) {
    console.error('Error fetching photos', err);
    process.exit(1);
  }
}

// Example usage: node fetchPhotosFromAirbnb.js
// The mapping must be provided by editing the `mapping` array below with { filter: { title, address }, listingUrl }
const mapping = [
  // Replace these with actual Airbnb listing URLs and matching filters to identify the DB document
  // { filter: { title: 'Apartment in Cape Town', address: 'Cape Town' }, listingUrl: 'https://www.airbnb.co.za/rooms/XXXXXXXX' },
];

if (mapping.length === 0) {
  console.log('No mapping provided. Edit this file and add listing mappings.');
  process.exit(0);
}

run(mapping);
