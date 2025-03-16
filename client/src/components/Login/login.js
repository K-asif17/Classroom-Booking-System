import React, { useState } from 'react';
import './login.css';

const Login = ({ onClose, onNavigate }) => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');

  // Validate email
  const validateEmail = (value) => {
    setEmail(value);
    if (!value.endsWith('@rguktrkv.ac.in')) {
      setEmailError('Please use your RGUKT email (@rguktrkv.ac.in)');
    } else {
      setEmailError('');
    }
  };

  // Handle login
  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert('Please fill in all fields');
      return;
    }
    if (emailError) {
      alert(emailError);
      return;
    }
    alert('Login Successful');
    onClose(); // Close modal after login
  };

  return (
    <div className="modal-backdrop">
      <div className="card">
        {/* Close Button */}
        <button className="close-btn" onClick={onClose}>
          &times;
        </button>

        <h2 className="card-title">Welcome Back</h2>
        <p className="card-description">Please enter your details to log in</p>

        <form onSubmit={handleLogin} className="form">
          {/* Email Input */}
          <div className="input-group">
            <span className="input-icon">✉️</span>
            <input
              type="email"
              value={email}
              onChange={(e) => validateEmail(e.target.value)}
              className="form-control"
              placeholder="your.email@rguktrkv.ac.in"
              required
            />
          </div>
          {emailError && <p className="error-text">{emailError}</p>}

          {/* Password Input */}
          <div className="input-group">
            <span className="input-icon">🔑</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              placeholder="Enter your password"
              required
            />
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="form-options">
            <label className="checkbox-label">
              <input type="checkbox" className="checkbox" />
              Remember Me
            </label>
            <button
              type="button"
              className="link-btn"
              onClick={() => alert('Forgot Password Clicked')}
            >
              Forgot Password?
            </button>
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn">Log In</button>

          {/* Google Sign In */}
          <button 
            className="google-btn" 
            type="button" 
            onClick={() => alert('Sign in with Google clicked')}
          >
            <img 
              src="/google-icon.png" 
              alt="Google Icon" 
              className="google-icon" 
            />
            Sign in with Google
          </button>

          {/* Don't have an account? Sign up */}
          <p className="switch-option">
            Don’t have an account?{' '}
            <span 
              onClick={() => onNavigate('signup')} 
              className="link-btn"
            >
              Sign up here
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
