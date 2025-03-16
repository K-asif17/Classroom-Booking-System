import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './ClassBooking.css';

const rooms = [
  {
    id: 'GF1',
    title: 'GF1',
    description: 'Classroom for advanced learning',
    capacity: 60,
    projector: 'Available',
    mic: 'Not Available',
    image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'GF2',
    title: 'GF2',
    description: 'Tech-equipped classroom',
    capacity: 60,
    projector: 'Not Available',
    mic: 'Not Available',
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'GF3',
    title: 'GF3',
    description: 'Group discussion room',
    capacity: 60,
    projector: 'Available',
    mic: 'Available',
    image: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'GF4',
    title: 'GF4',
    description: 'Group discussion room',
    capacity: 60,
    projector: 'Not Available',
    mic: 'Available',
    image: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'GF9',
    title: 'GF9',
    description: 'Group discussion room',
    capacity: 80,
    projector: 'Available',
    mic: 'Available',
    image: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'GF10',
    title: 'GF10',
    description: 'Group discussion room',
    capacity: 70,
    projector: 'Available',
    mic: 'Available',
    image: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'small seminar hall',
    title: 'Small Seminar Hall',
    description: 'Group discussion room',
    capacity: 100,
    projector: 'Available',
    mic: 'Available',
    image: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'big seminar hall',
    title: 'Big Seminar Hall',
    description: 'Group discussion room',
    capacity: 180,
    projector: 'Available',
    mic: 'Available',
    image: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80',
  },
];

const ClassroomBooking = () => {
  const [showComplaintForm, setShowComplaintForm] = useState(false);
  const [issueName, setIssueName] = useState('');
  const [issueText, setIssueText] = useState('');

  const handleComplaintSubmit = (e) => {
    e.preventDefault();
    alert(`Complaint Submitted:\nIssue: ${issueName}\nDetails: ${issueText}`);
    setShowComplaintForm(false);
    setIssueName('');
    setIssueText('');
  };

  return (
    <div className="classroom-booking">
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-left">
          <img
            src="WhatsApp Image 2025-02-20 at 9.52.04 PM-modified.png"
            alt="Logo"
            className="navbar-logo"
          />
          <h1>Classroom Booking System</h1>
        </div>
        <div className="navbar-right">
          <button
            className="complaint-btn"
            onClick={() => setShowComplaintForm(true)}
          >
            Report Issue
          </button>
          <button
            className="logout-btn"
            onClick={() => alert('Logging out...')}
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Room Cards */}
      <div className="container">
        <div className="grid">
          {rooms.map((room) => (
            <div className="card" key={room.id}>
              <div className="card-image">
                <img src={room.image} alt={room.title} />
                <span className="room-badge">{room.id}</span>
              </div>
              <div className="card-content">
                <h3 className="card-title">{room.title}</h3>
                <p className="card-description">{room.description}</p>
                
                <div className="features">
                  <div className="feature-item">
                    <strong>Capacity:</strong>
                    <span> {room.capacity}</span>
                  </div>

                  <div className="feature-item">
                    <strong>Projector:</strong>
                    <span
                      className={`status-badge ${room.projector === 'Available' ? 'status-available' : 'status-unavailable'}`}
                    >
                      {room.projector}
                    </span>
                  </div>

                  <div className="feature-item">
                    <strong>Mic:</strong>
                    <span
                      className={`status-badge ${room.mic === 'Available' ? 'status-available' : 'status-unavailable'}`}
                    >
                      {room.mic}
                    </span>
                  </div>
                </div>

                <Link to={`/classroomdetails/${room.id}`} className="book-button">
                  Book Classroom
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Complaint Modal */}
      {showComplaintForm && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Report an Issue</h2>
              <button 
                className="close-modal-btn"
                onClick={() => setShowComplaintForm(false)}
              >
                ✖
              </button>
            </div>
            <form onSubmit={handleComplaintSubmit}>
              <div className="form-group">
                <label htmlFor="issueName">Issue Title</label>
                <input
                  id="issueName"
                  type="text"
                  placeholder="Enter issue title"
                  value={issueName}
                  onChange={(e) => setIssueName(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="issueText">Issue Description</label>
                <textarea
                  id="issueText"
                  placeholder="Describe the issue in detail"
                  value={issueText}
                  onChange={(e) => setIssueText(e.target.value)}
                  required
                  rows={4}
                />
              </div>
              <div className="modal-actions">
                <button type="submit" className="submit-btn">Submit Report</button>
                <button 
                  type="button" 
                  onClick={() => setShowComplaintForm(false)} 
                  className="cancel-btn"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="footer">
        <p>@cse department_rguktrkv</p>
      </footer>
    </div>
  );
};

export default ClassroomBooking;
