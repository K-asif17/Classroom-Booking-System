import React, { useState } from 'react';
import './login.css';
import googleIcon from '../../assets/google-icon.png';

const Login = ({ onClose, onNavigate }) => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');

  const validateEmail = (value) => {
    setEmail(value);
    if (!value.endsWith('@rguktrkv.ac.in')) {
      setEmailError('Please use your RGUKT email (@rguktrkv.ac.in)');
    } else {
      setEmailError('');
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert('Please fill in all fields');
      return;
    }

    if (emailError) {
      alert(emailError);
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const result = await response.json();

      if (result.success) {
        alert('Login Successful!');
        onClose();

        // Store login info in localStorage
        localStorage.setItem('userEmail', email);
        localStorage.setItem('userRole', result.role);
        localStorage.setItem('userId', result.user_id); // Optional if you return user_id

        if (result.role === 'admin') {
          window.location.href = '/Admin';
        } else if (result.role === 'cr') {
          localStorage.setItem('crEmail', email); // ✅ Storing CR email
          window.location.href = '/classroom-booking';
        } else {
          alert('Unknown role');
        }
      } else {
        alert(result.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Server error during login');
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="card">
        <button className="close-btn" onClick={onClose}>&times;</button>
        <h2 className="card-title">Welcome Back</h2>
        <p className="card-description">Please enter your details to log in</p>

        <form onSubmit={handleLogin} className="form">
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

          <div className="form-options">
            <label className="checkbox-label">
              <input type="checkbox" className="checkbox" />
              Remember Me
            </label>
            <button type="button" className="link-btn" onClick={() => alert('Forgot Password Clicked')}>
              Forgot Password?
            </button>
          </div>

          <button type="submit" className="btn">Log In</button>

          <button
            className="google-btn"
            type="button"
            onClick={() => alert('Sign in with Google clicked')}
          >
            <img src={googleIcon} alt="Google Icon" className="google-icon" />
            Sign in with Google
          </button>

          <p className="switch-option">
            Don’t have an account?{' '}
            <span onClick={() => onNavigate('signup')} className="link-btn">
              Sign up here
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
