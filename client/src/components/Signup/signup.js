import React, { useState } from 'react';
import './signup.css';

const SignupPage = ({ onNavigate }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [year, setYear] = useState('');
  const [section, setSection] = useState('');
  const [phone, setPhone] = useState(''); // Add state for phone number
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [phoneError, setPhoneError] = useState(''); // Add state for phone error

  const validateEmail = (value) => {
    setEmail(value);
    if (!value.endsWith('@rguktrkv.ac.in')) {
      setEmailError('Please use your RGUKT email (@rguktrkv.ac.in)');
    } else {
      setEmailError('');
    }
  };

  const validatePhone = (value) => {
    // Simple validation: check if phone number is 10 digits long
    if (!/^\d{10}$/.test(value)) {
      setPhoneError('Please enter a valid 10-digit phone number');
    } else {
      setPhoneError('');
    }
    setPhone(value);
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword || !year || !section || !phone) {
      alert('Please fill in all fields');
      return;
    }
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    if (emailError) {
      alert(emailError);
      return;
    }
    if (phoneError) {
      alert(phoneError);
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password, year, section, phone }),
      });

      const data = await response.json();
      if (data.success) {
        alert('Signup request sent for admin approval. You will receive an email once approved.');
        setSignupSuccess(true);
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert('An error occurred during signup.');
      console.error(error);
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-container">
        <button className="close-btn" onClick={() => onNavigate('landing')}>
          ×
        </button>

        {signupSuccess ? (
          <div className="success-card">
            <p>Request sent for verification. After admin approval, an email will be sent to your mail.</p>
            <button onClick={() => onNavigate('login')} className="modal-btn">
              Go to Login
            </button>
          </div>
        ) : (
          <>
            <h2 className="modal-title">Create an Account</h2>
            <p className="modal-description">Please fill in your details to sign up</p>

            <form onSubmit={handleSignup} className="modal-form">
              {/* Name */}
              <div className="input-group">
                <i className="bi bi-person-fill input-icon"></i>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="form-control"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              {/* Year and Section */}
              <div className="dropdown-group">
                <select
                  className="form-control"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  required
                >
                  <option value="" disabled>Select Year</option>
                  <option value="E1">E1</option>
                  <option value="E2">E2</option>
                  <option value="E3">E3</option>
                  <option value="E4">E4</option>
                </select>

                <select
                  className="form-control"
                  value={section}
                  onChange={(e) => setSection(e.target.value)}
                  required
                >
                  <option value="" disabled>Select Section</option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                  <option value="D">D</option>
                  <option value="E">E</option>
                </select>
              </div>

              {/* Phone */}
              <div className="input-group">
                <i className="bi bi-phone-fill input-icon"></i>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => validatePhone(e.target.value)}
                  className="form-control"
                  placeholder="Enter your phone number"
                  required
                />
                {phoneError && <span className="error-text">{phoneError}</span>}
              </div>

              {/* Email */}
              <div className="input-group">
                <i className="bi bi-envelope-fill input-icon"></i>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => validateEmail(e.target.value)}
                  className="form-control"
                  placeholder="Enter your email"
                  required
                />
                {emailError && <span className="error-text">{emailError}</span>}
              </div>

              {/* Password */}
              <div className="input-group">
                <i className="bi bi-key-fill input-icon"></i>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-control"
                  placeholder="Enter your password"
                  required
                />
              </div>

              {/* Confirm Password */}
              <div className="input-group">
                <i className="bi bi-key-fill input-icon"></i>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="form-control"
                  placeholder="Confirm your password"
                  required
                />
              </div>

              <button type="submit" className="modal-btn">Sign Up</button>
            </form>

            {/* Login Redirect Link */}
            <div className="login-redirect">
              <p>Already have an account? <button onClick={() => onNavigate('login')} className="link-btn">Login</button></p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SignupPage;
