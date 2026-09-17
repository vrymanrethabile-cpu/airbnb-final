import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import PlacePage from './pages/PlacePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import BookingsPage from './pages/BookingsPage';
import BookingPage from './pages/BookingPage';
import AccountPage from './pages/AccountPage';
import SearchPage from './pages/SearchPage';
import CreateListingPage from './pages/CreateListingPage';
import HostDashboardPage from './pages/HostDashboardPage';
import HostReservationsPage from './pages/HostReservationsPage';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/place/:id" element={<PlacePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/account/bookings" element={<BookingsPage />} />
            <Route path="/account/bookings/:id" element={<BookingPage />} />
            <Route path="/account" element={<AccountPage />} />
            <Route path="/account/places" element={<HostDashboardPage />} />
            <Route path="/account/places/create" element={<CreateListingPage />} />
            <Route path="/account/reservations" element={<HostReservationsPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
