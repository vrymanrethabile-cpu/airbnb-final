const mongoose = require('mongoose');
const Location = require('../models/Locations');
require('dotenv').config();

const samplePlaces = [
  {
    title: 'Modern Apartment in Cape Town',
    address: 'Cape Town, South Africa',
    photos: ['https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800'],
    description: 'Beautiful modern apartment in the heart of Cape Town with stunning city views.',
    perks: ['Wifi', 'Kitchen', 'Air conditioning', 'Free parking', 'Pool'],
    guests: 4,
    price: 1628,
    checkIn: '14:00',
    checkOut: '11:00'
  },
  {
    title: 'Cozy Guesthouse in Hout Bay',
    address: 'Hout Bay, Cape Town',
    photos: ['https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800'],
    description: 'Peaceful guesthouse near the beach, perfect for a relaxing getaway.',
    perks: ['Wifi', 'Parking', 'Garden', 'TV'],
    guests: 2,
    price: 1000,
    checkIn: '15:00',
    checkOut: '10:00'
  },
  {
    title: 'Luxury Villa in Durban',
    address: 'Durban, South Africa',
    photos: ['https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800'],
    description: 'Stunning villa with ocean views and private pool.',
    perks: ['Wifi', 'Pool', 'Kitchen', 'Air conditioning', 'Beach access'],
    guests: 8,
    price: 4778,
    checkIn: '14:00',
    checkOut: '11:00'
  },
  {
    title: 'City Center Apartment in Bloemfontein',
    address: 'Bloemfontein, South Africa',
    photos: ['https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800'],
    description: 'Modern apartment in the city center, close to all amenities.',
    perks: ['Wifi', 'Kitchen', 'TV', 'Free parking'],
    guests: 3,
    price: 1950,
    checkIn: '14:00',
    checkOut: '10:00'
  },
  {
    title: 'Private Room in Langenhovenpark',
    address: 'Langenhovenpark, Bloemfontein',
    photos: ['https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800'],
    description: 'Comfortable private room in a shared family home.',
    perks: ['Wifi', 'Kitchen access'],
    guests: 1,
    price: 1265,
    checkIn: '14:00',
    checkOut: '10:00'
  },
  {
    title: 'Spacious Condo in Durban North',
    address: 'Durban North, South Africa',
    photos: ['https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800'],
    description: 'Spacious condo with great amenities and close to the beach.',
    perks: ['Wifi', 'Pool', 'Kitchen', 'Air conditioning', 'Gym'],
    guests: 4,
    price: 1976,
    checkIn: '14:00',
    checkOut: '11:00'
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
