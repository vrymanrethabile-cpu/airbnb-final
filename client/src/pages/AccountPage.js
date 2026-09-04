import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './AccountPage.css';

function AccountPage() {
  let [user, setUser] = useState(null);

  useEffect(function() {
    var userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  function handleLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/';
  }

  if (user == null) {
    return (
      <div className="account-page">
        <div className="account-container">
          <div className="login-prompt">
            <h2>Please log in to view your account</h2>
            <Link to="/login" className="login-btn">Log in</Link>
          </div>
        </div>
      </div>
    );
  }

  // figure out what to show for avatar
  let avatarContent = null;
  if (user.photo) {
    avatarContent = <img src={user.photo} alt={user.name} />;
  } else {
    let firstLetter = 'U';
    if (user.name) {
      firstLetter = user.name.charAt(0);
    }
    avatarContent = <div className="avatar-placeholder">{firstLetter}</div>;
  }

  let userBadge = 'New';
  if (user.badge) {
    userBadge = user.badge;
  }

  let rewardPoints = 0;
  if (user.rewardPoint) {
    rewardPoints = user.rewardPoint;
  }

  return (
    <div className="account-page">
      <div className="account-container">
        <div className="account-header">
          <div className="user-avatar">
            {avatarContent}
          </div>
          <div className="user-info">
            <h1>{user.name}</h1>
            <p>{user.email}</p>
          </div>
          <button onClick={handleLogout} className="logout-btn">Log out</button>
        </div>

        <div className="account-nav">
          <Link to="/account/bookings" className="nav-item">
            <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style={{display: 'block', fill: 'none', height: '24px', width: '24px', stroke: 'currentColor', strokeWidth: '2', overflow: 'visible'}}>
              <path d="M16 1c2.008 0 3.463.963 4.751 3.269l.533 1.025c1.954 3.83 6.114 12.54 7.1 14.836l.145.353c.667 1.591.91 2.472.96 3.396l.01.415.001.228c0 4.062-2.877 6.478-6.357 6.478-2.224 0-4.556-1.258-6.709-3.386l-.257-.26-.172-.179h-.212l-.172.179-.257.26c-2.153 2.128-4.486 3.386-6.71 3.386C5.377 31 2.5 28.584 2.5 24.522l.001-.228.01-.415c.05-.924.293-1.805.96-3.396l.145-.353c.986-2.296 5.146-11.006 7.1-14.836l.533-1.025C12.537 1.963 13.992 1 16 1z"></path>
            </svg>
            <span>Trips</span>
          </Link>
          <Link to="/account" className="nav-item active">
            <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style={{display: 'block', fill: 'none', height: '24px', width: '24px', stroke: 'currentColor', strokeWidth: '2', overflow: 'visible'}}>
              <path d="M16 2a14 14 0 1 0 14 14A14 14 0 0 0 16 2zm0 26a12 12 0 1 1 12-12 12 12 0 0 1-12 12z"></path>
              <path d="M16 8a8 8 0 1 0 8 8 8 8 0 0 0-8-8zm0 14a6 6 0 1 1 6-6 6 6 0 0 1-6 6z"></path>
            </svg>
            <span>Profile</span>
          </Link>
        </div>

        <div className="account-content">
          <div className="profile-section">
            <h2>Personal info</h2>
            <div className="info-grid">
              <div className="info-item">
                <label>Name</label>
                <p>{user.name}</p>
              </div>
              <div className="info-item">
                <label>Email</label>
                <p>{user.email}</p>
              </div>
              <div className="info-item">
                <label>Badge</label>
                <p>{userBadge}</p>
              </div>
              <div className="info-item">
                <label>Reward Points</label>
                <p>{rewardPoints}</p>
              </div>
            </div>
          </div>

          <div className="account-actions">
            <Link to="/account/bookings" className="action-btn">
              View your trips
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccountPage;
