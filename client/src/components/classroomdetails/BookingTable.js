//bookingtable.js
import React from "react";

const BookingTable = ({ title, bookings }) => {
  return (
    <div className="booking-table">
      <h3 className="table-title">{title}</h3>
      <table>
        <thead>
          <tr>
            <th>Classroom Name</th>
            <th>Timing</th>
            <th>Subject</th>
            <th>Faculty</th>
            <th>CR Name</th>
          </tr>
        </thead>
        <tbody>
          {console.log(bookings)}
          {bookings.length > 0 ? (
            bookings.map((booking, index) => (
              <tr key={index}>
                <td>{booking.classroom_name}</td>
                <td>{booking.timing}</td>
                <td>{booking.subject}</td>
                <td>{booking.faculty}</td>
                <td>{booking.cr_name}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No bookings yet</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default BookingTable;
