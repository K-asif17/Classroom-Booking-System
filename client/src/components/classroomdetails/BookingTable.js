//bookingtable.js
import React from "react";

const BookingTable = ({ title, bookings }) => {
  return (
    <div className="booking-table">
      <h3 className="table-title">{title}</h3>
      <table>
        <thead>
          <tr>
            <th>Timing</th>
            <th>Subject</th>
            <th>Faculty</th>
            <th>CR Name</th>
          </tr>
        </thead>
        <tbody>
          {bookings.length > 0 ? (
            bookings.map((booking, index) => (
              <tr key={index}>
                <td>{booking.timing}</td>
                <td>{booking.subject}</td>
                <td>{booking.faculty}</td>
                <td>{booking.crName}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No bookings yet</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default BookingTable;
