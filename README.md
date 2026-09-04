# Airbnb Clone - MERN Stack

A full-stack Airbnb clone application built with MongoDB, Express, React, and Node.js. This project mimics the look and feel of airbnb.co.za with a student-coded aesthetic.

## Features

- User authentication (login, register)
- Property listings with image galleries
- Property detail pages with booking interface
- User account management
- Booking management
- Responsive design similar to Airbnb
- Social authentication (Google, Facebook, Apple - UI only)

## Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB
- JWT Authentication
- Cloudinary for image storage
- Multer for file uploads
- Stripe for payments
- Nodemailer/Postmark for emails

### Frontend
- React.js
- React Router
- Axios for API calls
- CSS for styling

## Project Structure

```
/
├── server/                 # Backend API
│   ├── controllers/       # Route controllers
│   ├── models/           # MongoDB models
│   ├── routes/           # API routes
│   ├── views/            # EJS templates for email
│   ├── index.js          # Server entry point
│   └── package.json      # Backend dependencies
├── client/               # Frontend React App
│   ├── public/          # Static files
│   ├── src/
│   │   ├── components/  # Reusable components (Header, Footer)
│   │   ├── pages/       # Page components
│   │   ├── App.js       # Main app component
│   │   └── index.js     # React entry point
│   └── package.json    # Frontend dependencies
└── README.md           # This file
```

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Backend Setup

1. Navigate to the server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the server directory with the following variables:
```
MONGOURL=your_mongodb_connection_string
PORT=4000
SECRET=your_jwt_secret_key
POSTMARK=your_postmark_api_key
KEY=your_admin_key
```

4. Start the backend server:
```bash
npm start
```

The backend will run on `http://localhost:4000`

### Frontend Setup

1. Navigate to the client directory:
```bash
cd client
```

2. Install dependencies:
```bash
npm install
```

3. Start the React development server:
```bash
npm start
```

The frontend will run on `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /register` - Register a new user
- `POST /login` - Login user
- `GET /profile` - Get user profile
- `POST /logout` - Logout user

### Places
- `GET /allPlaces` - Get all places
- `GET /places/:id` - Get single place
- `POST /places` - Create new place
- `PUT /editPlace/:id` - Update place
- `DELETE /deletePlace/:id` - Delete place

### Bookings
- `GET /bookings` - Get all user bookings
- `GET /bookings/:id` - Get single booking
- `POST /bookings` - Create new booking

### Image Upload
- `POST /upload` - Upload images (multipart/form-data)
- `POST /uploadByLink` - Upload image from URL

## Pages

- `/` - Home page with property listings
- `/place/:id` - Property detail page
- `/login` - User login
- `/register` - User registration
- `/account` - User account/profile
- `/account/bookings` - User's bookings
- `/account/bookings/:id` - Single booking details

## Features Implemented

### Header
- Airbnb logo
- Search bar with location, dates, and guests
- Navigation links
- User menu with profile icon

### Footer
- Support section
- Hosting section
- Airbnb section
- Social media links
- Language and currency options

### Home Page
- Category filters (Icons, Pools, Beachfront, etc.)
- Property cards with images
- Location, distance, dates, and pricing
- Favorite button

### Place Page
- Image gallery
- Property details and amenities
- Booking form with date picker
- Price breakdown
- Features list

### Authentication Pages
- Social login buttons (UI)
- Email/password forms
- Link between login and register

### Account Pages
- User profile display
- Booking list
- Booking details
- Logout functionality

## Notes

- The frontend currently connects to `http://localhost:4000` for the API
- Images are stored on Cloudinary
- Authentication uses JWT tokens stored in localStorage
- The design follows Airbnb's visual style but with a student-coded aesthetic
- Some features (social auth, payments) have UI but may need backend integration

## Future Improvements

- Add real social authentication (Google, Facebook, Apple)
- Implement actual payment processing with Stripe
- Add search functionality
- Implement place creation/editing for hosts
- Add reviews and ratings
- Implement real-time chat
- Add map integration
- Improve error handling and loading states

## License

This is a student project for educational purposes.
