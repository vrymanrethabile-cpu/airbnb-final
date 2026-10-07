const mongoose = require('mongoose');
const Location = require('../models/Locations');
require('dotenv').config();

const samplePlaces = [
  // CAPE TOWN LISTINGS
  {
    title: 'Stunning Sea View Apartment',
    address: 'Camps Bay, Cape Town',
    photos: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800'
    ],
    description: 'Wake up to breathtaking ocean views in this modern 2-bedroom apartment. Steps from Camps Bay Beach, with a fully equipped kitchen, WiFi, and private balcony. Perfect for couples or small families.',
    perks: ['Wifi', 'Kitchen', 'Air conditioning', 'Free parking', 'Pool', 'Ocean view', 'Balcony', 'TV'],
    guests: 4,
    bedrooms: 2,
    beds: 2,
    baths: 2,
    type: 'Entire home',
    price: 2500,
    checkIn: '14:00',
    checkOut: '10:00'
  },
  {
    title: 'Cozy Studio in City Bowl',
    address: 'Gardens, Cape Town',
    photos: [
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800',
      'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800'
    ],
    description: 'Charming studio apartment in the heart of Cape Town. Walking distance to V&A Waterfront, Table Mountain cable car, and restaurants. Modern amenities, fast WiFi, and comfortable living space.',
    perks: ['Wifi', 'Kitchen', 'Air conditioning', 'TV', 'Workspace'],
    guests: 2,
    bedrooms: 1,
    beds: 1,
    baths: 1,
    type: 'Entire home',
    price: 1200,
    checkIn: '14:00',
    checkOut: '10:00'
  },
  {
    title: 'Luxury Villa with Pool',
    address: 'Constantia, Cape Town',
    photos: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800'
    ],
    description: 'Exclusive 4-bedroom villa in prestigious Constantia. Private pool, lush garden, mountain views. Perfect for families or groups. Close to wine estates and beaches.',
    perks: ['Wifi', 'Pool', 'Kitchen', 'Air conditioning', 'Free parking', 'Garden', 'BBQ', 'Washer', 'Dryer'],
    guests: 8,
    bedrooms: 4,
    beds: 5,
    baths: 3,
    type: 'Entire home',
    price: 5500,
    checkIn: '14:00',
    checkOut: '11:00'
  },

  // PRETORIA LISTINGS
  {
    title: 'Modern Loft in Hatfield',
    address: 'Hatfield, Pretoria',
    photos: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800'
    ],
    description: 'Trendy loft apartment near UP campus. Open-plan living, modern kitchen, rooftop pool access. Great for students or professionals. Walking distance to restaurants and shops.',
    perks: ['Wifi', 'Pool', 'Kitchen', 'Air conditioning', 'Gym', 'Workspace'],
    guests: 2,
    bedrooms: 1,
    beds: 1,
    baths: 1,
    type: 'Entire home',
    price: 950,
    checkIn: '14:00',
    checkOut: '10:00'
  },
  {
    title: 'Family Home in Waterkloof',
    address: 'Waterkloof, Pretoria',
    photos: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800'
    ],
    description: 'Spacious 3-bedroom family home in prestigious Waterkloof. Large garden, swimming pool, entertainment area. Close to embassies and schools. Perfect for families.',
    perks: ['Wifi', 'Pool', 'Kitchen', 'Free parking', 'Garden', 'BBQ', 'TV', 'Washer', 'Dryer'],
    guests: 6,
    bedrooms: 3,
    beds: 4,
    baths: 2,
    type: 'Entire home',
    price: 2800,
    checkIn: '14:00',
    checkOut: '11:00'
  },
  {
    title: 'Cozy Guest Suite',
    address: 'Brooklyn, Pretoria',
    photos: [
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800',
      'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800'
    ],
    description: 'Private guest suite with separate entrance. Comfortable bedroom, en-suite bathroom, kitchenette. Safe neighborhood, close to Brooklyn Mall and restaurants.',
    perks: ['Wifi', 'Kitchenette', 'Free parking', 'TV'],
    guests: 2,
    bedrooms: 1,
    beds: 1,
    baths: 1,
    type: 'Private room',
    price: 750,
    checkIn: '14:00',
    checkOut: '10:00'
  },

  // MIDRAND LISTINGS
  {
    title: 'Modern Apartment in Gallagher',
    address: 'Gallagher Estate, Midrand',
    photos: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800'
    ],
    description: 'Contemporary apartment in secure estate. 2 bedrooms, modern kitchen, balcony with views. Close to Mall of Africa and Gautrain station. Ideal for business travelers.',
    perks: ['Wifi', 'Pool', 'Kitchen', 'Air conditioning', 'Free parking', 'Gym', 'Security'],
    guests: 4,
    bedrooms: 2,
    beds: 2,
    baths: 2,
    type: 'Entire home',
    price: 1800,
    checkIn: '14:00',
    checkOut: '10:00'
  },
  {
    title: 'Townhouse in Vorna Valley',
    address: 'Vorna Valley, Midrand',
    photos: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800'
    ],
    description: 'Lovely 3-bedroom townhouse in family-friendly complex. Private garden, communal pool, playground. Close to schools and shopping centers. Perfect for families.',
    perks: ['Wifi', 'Pool', 'Kitchen', 'Free parking', 'Garden', 'TV', 'Washer'],
    guests: 6,
    bedrooms: 3,
    beds: 4,
    baths: 2,
    type: 'Entire home',
    price: 2200,
    checkIn: '14:00',
    checkOut: '11:00'
  },
  {
    title: 'Executive Suite',
    address: 'Carlswald, Midrand',
    photos: [
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800',
      'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800'
    ],
    description: 'Luxury executive suite in secure estate. King-size bed, modern bathroom, kitchenette, workspace. Close to corporate offices and conference centers.',
    perks: ['Wifi', 'Kitchenette', 'Air conditioning', 'Free parking', 'Workspace', 'TV'],
    guests: 2,
    bedrooms: 1,
    beds: 1,
    baths: 1,
    type: 'Private room',
    price: 1500,
    checkIn: '14:00',
    checkOut: '10:00'
  },

  // BLOEMFONTEIN LISTINGS
  {
    title: 'City Center Apartment',
    address: 'Bloemfontein Central',
    photos: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800'
    ],
    description: 'Modern apartment in the heart of Bloemfontein. Walking distance to shops, restaurants, and attractions. Fully equipped kitchen, WiFi, and secure parking.',
    perks: ['Wifi', 'Kitchen', 'Air conditioning', 'Free parking', 'TV'],
    guests: 2,
    bedrooms: 1,
    beds: 1,
    baths: 1,
    type: 'Entire home',
    price: 850,
    checkIn: '14:00',
    checkOut: '10:00'
  },
  {
    title: 'Family Home in Fichardt Park',
    address: 'Fichardt Park, Bloemfontein',
    photos: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800'
    ],
    description: 'Spacious 4-bedroom family home with large garden. Swimming pool, entertainment area, and secure parking. Close to schools and shopping centers.',
    perks: ['Wifi', 'Pool', 'Kitchen', 'Free parking', 'Garden', 'BBQ', 'TV', 'Washer', 'Dryer'],
    guests: 8,
    bedrooms: 4,
    beds: 5,
    baths: 2,
    type: 'Entire home',
    price: 2400,
    checkIn: '14:00',
    checkOut: '11:00'
  },
  {
    title: 'Cozy Guesthouse Room',
    address: 'Universitas, Bloemfontein',
    photos: [
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800',
      'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800'
    ],
    description: 'Comfortable guest room in family home. Private bathroom, WiFi, and breakfast included. Close to UFS campus and hospitals. Ideal for students or medical professionals.',
    perks: ['Wifi', 'Breakfast', 'Free parking', 'TV'],
    guests: 1,
    bedrooms: 1,
    beds: 1,
    baths: 1,
    type: 'Private room',
    price: 550,
    checkIn: '14:00',
    checkOut: '10:00'
  }
];

async function seedDatabase() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGOURL);
    console.log('Connected to MongoDB');

    // Clear existing places
    await Location.deleteMany({});
    console.log('Cleared existing places');

    // Insert sample places
    await Location.insertMany(samplePlaces);
    console.log('Inserted sample places');

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
