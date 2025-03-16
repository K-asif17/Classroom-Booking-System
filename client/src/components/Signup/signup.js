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
  const [signupSuccess, setSignupSuccess] = useState(false); // New state

  const validateEmail = (value) => {
    setEmail(value);
    if (!value.endsWith('@rguktrkv.ac.in')) {
      setEmailError('Please use your RGUKT email (@rguktrkv.ac.in)');
    } else {
      setEmailError('');
    }
  };

  const handleSignup = (e) => {
    e.preventDefault();
    if (!name || !email || !password || !confirmPassword || !year || !section) {
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

    // Simulate sending the signup request and receiving a success response
    // In a real application, this would involve an API call.
    setTimeout(() => {
      setSignupSuccess(true);  // set to true after a short delay (simulating API)
    }, 500); // Simulate a 0.5 second API call

  };

  return (
    <div className="modal-backdrop">
      <div className="modal-container">
        <button className="close-btn" onClick={() => onNavigate('landing')}>
          ×
        </button>

        {signupSuccess ? ( // Conditionally render success message OR signup form
          <div className="success-card">
            <p>Request sent for verification. After admin approval, an email will be sent to your mail.</p>
            <button onClick={() => onNavigate('login')} className="modal-btn">Go to Login</button>  {/* Button to redirect */}
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

              {/* Email */}
              <div className="input-group">
                <i className="bi bi-envelope-fill input-icon"></i>
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

              {/* Password */}
              <div className="input-group">
                <i className="bi bi-lock-fill input-icon"></i>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-control"
                  placeholder="Create a password"
                  required
                />
              </div>

              {/* Confirm Password */}
              <div className="input-group">
                <i className="bi bi-lock-fill input-icon"></i>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="form-control"
                  placeholder="Confirm password"
                  required
                />
              </div>

              {/* Submit Button */}
              <button type="submit" className="modal-btn">Create Account</button>

              {/* Google Sign Up */}
              <button className="google-btn" type="button">
                <img src="google-icon.png" alt="Google Icon" className="google-icon" />
                Sign up with Google
              </button>

              {/* Switch to Login */}
              <p className="switch-option">
                Already have an account?{' '}
                <span onClick={() => onNavigate('login')} className="link-btn">
                  Sign in
                </span>
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default SignupPage;