import React, { useEffect, useState } from "react";
import "./signuprequest.css";

const SignupRequests = ({ onApprove }) => {
  const [requests, setRequests] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRequests = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("http://localhost:5000/get-signup-requests");
        if (!response.ok) throw new Error("Failed to fetch requests");
        
        const data = await response.json();
        if (data.success) {
          const grouped = {};
          data.requests.forEach((req) => {
            const year = req.year.toUpperCase();
            if (!grouped[year]) grouped[year] = [];
            grouped[year].push({ ...req, phone: req.phone || "", batch: year });
          });
          setRequests(grouped);
        } else {
          setError(data.message);
        }
      } catch (err) {
        setError(err.message);
        console.error("Error fetching signup requests:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRequests();
  }, []);

  const handleApprove = async (year, index) => {
    const selected = requests[year][index];
    let phone = selected.phone;

    if (!phone || phone.trim() === "") {
      phone = prompt(`Enter phone number for ${selected.name}:`);
      if (!phone) return;
    }

    try {
      const response = await fetch("http://localhost:5000/approve-cr", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: selected.id,
          phone,
          batch: selected.batch,
        }),
      });

      const data = await response.json();
      alert(data.message || "Approved successfully");
      
      if (data.success) {
        const updated = { ...requests };
        updated[year].splice(index, 1);
        setRequests(updated);
        onApprove(); // Trigger refresh in parent component
      }
    } catch (err) {
      console.error("Error approving CR:", err);
      alert("Failed to approve CR");
    }
  };

  const handleReject = async (year, index) => {
    const selected = requests[year][index];
    if (!window.confirm(`Reject ${selected.name}'s request?`)) return;

    try {
      const response = await fetch("http://localhost:5000/reject-cr", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: selected.id }),
      });

      const data = await response.json();
      alert(data.message || "Rejected successfully");

      const updated = { ...requests };
      updated[year].splice(index, 1);
      setRequests(updated);
    } catch (err) {
      console.error("Error rejecting CR:", err);
      alert("Failed to reject CR");
    }
  };

  if (isLoading) return <p>Loading requests...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="signup-request-container">
      <h2>Signup Requests</h2>
      {Object.keys(requests).length === 0 ||
      Object.values(requests).every((list) => list.length === 0) ? (
        <p>No pending requests.</p>
      ) : (
        Object.entries(requests).map(([year, crs]) =>
          crs.length > 0 ? (
            <div key={year} className="batch-block">
              <h3 className="batch-title">Year: {year}</h3>
              <div className="request-row">
                {crs.map((req, index) => (
                  <div className="request-card-horizontal" key={index}>
                    <p><strong>Name:</strong> {req.name}</p>
                    <p><strong>Email:</strong> {req.email}</p>
                    <p><strong>Year:</strong> {req.year}</p>
                    <p><strong>Section:</strong> {req.section}</p>
                    <p><strong>Phone:</strong> {req.phone || "Not provided"}</p>
                    <p><strong>ID:</strong> {req.id}</p>
                    <div className="request-actions-horizontal">
                      <button className="approve-btn" onClick={() => handleApprove(year, index)}>Approve</button>
                      <button className="reject-btn" onClick={() => handleReject(year, index)}>Reject</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : null
        )
      )}
    </div>
  );
};

export default SignupRequests;