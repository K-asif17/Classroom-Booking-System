import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './components/landingpage/landingpage';
import ClassroomBooking from './components/classbooking/ClassBooking';
import ClassroomDetails from './components/classroomdetails/ClassroomDetails';
import Login from './components/Login/login';
import SignUp from './components/Signup/signup';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* Route for Landing Page */}
        <Route path="/" element={<LandingPage />} />

        {/* Route for Login Page */}
        <Route path="/login" element={<Login />} />

        {/* Route for Sign Up Page */}
        <Route path="/signup" element={<SignUp />} />

        {/* Route for Classroom Booking */}
        <Route path="/classroom-booking" element={<ClassroomBooking />} />

        {/* Route for Classroom Details */}
        <Route path="/classroomdetails/:id" element={<ClassroomDetails />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
