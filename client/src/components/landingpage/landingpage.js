import background from '../../assets/background.jpeg';
import logo from '../../assets/WhatsApp Image 2025-02-20 at 9.52.04 PM-modified.png';
import React, { useEffect, useState } from 'react';
import './landingpage.css';
import Login from '../Login/login.js';
import SignUp from '../Signup/signup.js';

const LandingPage = () => {
  const [showText, setShowText] = useState(false);
  const [activeModal, setActiveModal] = useState(null);
 
  // ✅ Fix: Show text after 500ms
  useEffect(() => {
    const timer = setTimeout(() => setShowText(true), 500);
    return () => clearTimeout(timer);
  }, []);

  // ✅ Fix: Trigger button animation after typing finishes
  useEffect(() => {
    const timer = setTimeout(() => {
      document.querySelector('.buttons').classList.add('typing-done');
    }, 1600); // ✅ Increased delay to match animation end
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => setActiveModal(null);

  return (
    <div
      className="container"
      style={{ backgroundImage: `url(${background})` }}
    >
      {/* Header */}
      <div className="header">
        <div className="header-content">
          <img src={logo} alt="Logo" className="logo" />
          <h1>CSE Department</h1>
        </div>
      </div>

      {/* Content */}
      <div className="content">
        <h2 className={showText ? 'show-text' : ''}>
          Classroom Booking System
        </h2>

        {/* Buttons */}
        <div className="buttons">
          <button
            className="btn login"
            onClick={() => setActiveModal('login')}
          >
            Login
          </button>
          <button
            className="btn signup"
            onClick={() => setActiveModal('signup')}
          >
            Sign<span>_</span>Up
          </button>
        </div>
      </div>

      {/* Modals */}
      {activeModal === 'login' && (
        <Login onClose={handleClose} onNavigate={setActiveModal} />
      )}
      {activeModal === 'signup' && (
        <SignUp onClose={handleClose} onNavigate={setActiveModal} />
      )}
    </div>
  );
};

export default LandingPage;
