import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './RegisterPage.css';

function RegisterPage() {
  let [name, setName] = useState('');
  let [email, setEmail] = useState('');
  let [password, setPassword] = useState('');
  let navigate = useNavigate();

  function handleRegister(e) {
    e.preventDefault();

    var userData = {
      name: name,
      email: email,
      password: password
    };

    axios.post('http://localhost:4000/register', userData)
      .then(function(res) {
        console.log('register worked', res.data);
        if (res.data.user) {
          localStorage.setItem('user', JSON.stringify(res.data.user));
        }
        navigate('/');
      })
      .catch(function(err) {
        console.log(err);
        alert('register failed');
      });
  }

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-header">
          <h1>Sign up</h1>
        </div>

        <form className="auth-form" onSubmit={handleRegister}>
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

          <div className="form-group">
            <input
              type="text"
              placeholder="Full name"
              value={name}
              onChange={function(e) { setName(e.target.value); }}
              required
            />
          </div>

          <div className="form-group">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={function(e) { setEmail(e.target.value); }}
              required
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={function(e) { setPassword(e.target.value); }}
              required
            />
          </div>

          <button type="submit" className="auth-submit">Sign up</button>
        </form>

        <div className="auth-footer">
          <p>Already have an account? <Link to="/login">Log in</Link></p>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
