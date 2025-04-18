import React from 'react';
import { Link } from 'react-router-dom';
import './classroom.css';

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
    id: 'smallseminarhall',
    title: 'Small Seminar Hall',
    description: 'Group discussion room',
    capacity: 100,
    projector: 'Available',
    mic: 'Available',
    image: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'bigseminarhall',
    title: 'Big Seminar Hall',
    description: 'Group discussion room',
    capacity: 180,
    projector: 'Available',
    mic: 'Available',
    image: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80',
  },
];

const ClassroomPanel = () => {
  return (
    <div className="classroom-panel">
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
  );
};

export default ClassroomPanel;
