require('dotenv').config();
const mongoose = require('mongoose');
const Location = require('../models/Locations');

async function seed() {
  try {
    await mongoose.connect(process.env.MONGOURL);
    console.log('Connected to DB');

    const items = [
      // Popular homes in Cape Town
      { title: 'Apartment in Cape Town', address: 'Cape Town', price: 3388, photos: [], description: '', perks: [] },
      { title: 'Apartment in Green Point', address: 'Green Point, Cape Town', price: 1710, photos: [], description: '', perks: [] },
      { title: 'Guesthouse in Cape Town', address: 'Cape Town', price: 2050, photos: [], description: '', perks: [] },
      { title: 'Apartment in Cape Town', address: 'Cape Town', price: 7440, photos: [], description: '', perks: [] },
      { title: 'Home in Cape Town', address: 'Cape Town', price: 10400, photos: [], description: '', perks: [] },
      { title: 'Guesthouse in Cape Town', address: 'Cape Town', price: 1000, photos: [], description: '', perks: [] },
      { title: 'Villa in Cape Town', address: 'Cape Town', price: 14332, photos: [], description: '', perks: [] },
      { title: 'Condo in Cape Town', address: 'Cape Town', price: 1797, photos: [], description: '', perks: [] },

      // Available in Bloemfontein this weekend
      { title: 'Guesthouse in Dan Pienaar', address: 'Dan Pienaar, Bloemfontein', price: 1085, photos: [], description: '', perks: [] },
      { title: 'Guest suite in Bloemfontein', address: 'Bloemfontein', price: 1180, photos: [], description: '', perks: [] },
      { title: 'Apartment in Bloemfontein', address: 'Bloemfontein', price: 1950, photos: [], description: '', perks: [] },
      { title: 'Apartment in Bloemfontein', address: 'Bloemfontein', price: 1400, photos: [], description: '', perks: [] },
      { title: 'Guest suite in Dan Pienaar', address: 'Dan Pienaar, Bloemfontein', price: 1628, photos: [], description: '', perks: [] },
      { title: 'Condo in Dan Pienaar', address: 'Dan Pienaar, Bloemfontein', price: 1622, photos: [], description: '', perks: [] },
      { title: 'Apartment in Dan Pienaar', address: 'Dan Pienaar, Bloemfontein', price: 2046, photos: [], description: '', perks: [] },
      { title: 'Boutique hotel in Bloemfontein', address: 'Bloemfontein', price: 1528, photos: [], description: '', perks: [] },

      // Stay in Durban
      { title: 'Condo in Durban', address: 'Durban', price: 4778, photos: [], description: '', perks: [] },
      { title: 'Apartment in Durban', address: 'Durban', price: 1976, photos: [], description: '', perks: [] },
      { title: 'Apartment in Durban', address: 'Durban', price: 4360, photos: [], description: '', perks: [] },
      { title: 'Home in Durban North', address: 'Durban North', price: 7000, photos: [], description: '', perks: [] },
      { title: 'Room in eThekwini', address: 'eThekwini Metropolitan Municipality', price: 2594, photos: [], description: '', perks: [] },
      { title: 'Condo in Westville', address: 'Westville', price: 2294, photos: [], description: '', perks: [] },
      { title: 'Guest suite in Westville', address: 'Westville', price: 1876, photos: [], description: '', perks: [] },
      { title: 'Apartment in eThekwini', address: 'eThekwini Metropolitan Municipality', price: 6540, photos: [], description: '', perks: [] },
    ];

    // Upsert items (idempotent): match by title and address
    let insertedCount = 0;
    let updatedCount = 0;
    for (const item of items) {
      const filter = { title: item.title, address: item.address };
      const update = { $set: item };
      const result = await Location.findOneAndUpdate(filter, update, { upsert: true, new: true });
      if (result) {
        // Mongoose returns the doc; determine whether it was inserted or updated by checking createdAt if available
        // Simpler: check if there was an existing doc before update
        // We'll try to detect by searching for a pre-existing doc without modifying insertion semantics
        const existed = await Location.countDocuments(filter) > 0;
        if (existed) {
          updatedCount++;
        } else {
          insertedCount++;
        }
      }
    }
    console.log(`Upsert completed. Inserted: ${insertedCount}, Updated: ${updatedCount}`);
    process.exit(0);
  } catch (err) {
    console.error('Seed error', err);
    process.exit(1);
  }
}

seed();
