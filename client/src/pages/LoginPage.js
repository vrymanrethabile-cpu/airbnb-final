import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import API_URL from '../config';
import './LoginPage.css';

function LoginPage() {
  let [email, setEmail] = useState('');
  let [password, setPassword] = useState('');
  let [error, setError] = useState('');
  let [loading, setLoading] = useState(false);
  let navigate = useNavigate();

  // validate email format
  function validateEmail(email) {
    var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  // when user clicks continue we send login request
  function handleLogin(e) {
    e.preventDefault();
    setError('');

    // validate inputs
    if (!email) {
      setError('Please enter your email');
      return;
    }
    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }
    if (!password) {
      setError('Please enter your password');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    axios.post(API_URL + '/login', {
      email: email,
      password: password
    })
      .then(function(res) {
        setLoading(false);
        // store user info in localStorage so we stay logged in
        if (res.data.token) {
          localStorage.setItem('token', res.data.token);
        }
        if (res.data.user) {
          localStorage.setItem('user', JSON.stringify(res.data.user));
        } else {
          // backend sometimes just sends the user object directly
          localStorage.setItem('user', JSON.stringify(res.data));
        }
        navigate('/');
      })
      .catch(function(err) {
        setLoading(false);
        console.log('login error', err);
        if (err.response && err.response.data) {
          setError(err.response.data.message || 'Login failed. Please check your email and password.');
        } else {
          setError('Login failed. Please check your email and password.');
        }
      });
  }

  function onEmailChange(e) {
    setEmail(e.target.value);
    setError('');
  }

  function onPasswordChange(e) {
    setPassword(e.target.value);
    setError('');
  }

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-header">
          <h1>Log in or sign up</h1>
        </div>

        <form className="auth-form" onSubmit={handleLogin}>
          <div className="social-login">
            <button type="button" className="social-btn">
              <i className="fa-brands fa-facebook"></i>
              Continue with Facebook
            </button>
            <button type="button" className="social-btn">
              <i className="fa-brands fa-google"></i>
              Continue with Google
            </button>
            <button type="button" className="social-btn">
              <i className="fa-brands fa-apple"></i>
              Continue with Apple
            </button>
          </div>

          <div className="divider">
            <span>or</span>
          </div>

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <div className="form-group">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={onEmailChange}
              required
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={onPasswordChange}
              required
            />
          </div>

          <button type="submit" className="auth-submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Continue'}
          </button>
        </form>

        <div className="auth-footer">
          <p>Don't have an account? <Link to="/register">Sign up</Link></p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
