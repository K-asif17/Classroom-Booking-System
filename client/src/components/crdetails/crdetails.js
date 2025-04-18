import React, { useEffect, useState } from 'react';
import './crdetails.css';
import axios from 'axios';

const CRDetails = () => {
  const [crsByBatch, setCrsByBatch] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApprovedCRs();
  }, []);

  const fetchApprovedCRs = async () => {
    try {
      const response = await axios.get('http://localhost:5000/approved-crs');
      if (response.data.success) {
        const grouped = response.data.crs.reduce((acc, cr) => {
          if (!acc[cr.batch]) acc[cr.batch] = [];
          acc[cr.batch].push(cr);
          return acc;
        }, {});
        setCrsByBatch(grouped);
      }
    } catch (err) {
      console.error("Error fetching CRs:", err);
    } finally {
      setLoading(false);
    }
  };

  const removeCR = async (id) => {
    try {
      await axios.post('http://localhost:5000/remove-cr', { id });
      fetchApprovedCRs(); // Refresh list after removal
    } catch (err) {
      console.error("Error removing CR:", err);
    }
  };

  return (
    <div className="cr-details-container">
      <h2>Approved Class Representatives</h2>
      {loading ? (
        <p>Loading CRs...</p>
      ) : (
        Object.keys(crsByBatch).map(batch => (
          <div key={batch} className="batch-section">
            <h3>Batch: {batch}</h3>
            <div className="cr-cards">
              {crsByBatch[batch].map(cr => (
                <div className="cr-card" key={cr.id}>
                  <p><strong>Name:</strong> {cr.name}</p>
                  <p><strong>Email:</strong> {cr.email}</p>
                  <p><strong>Phone:</strong> {cr.phone}</p>
                  <p><strong>Year:</strong> {cr.year}</p>
                  <p><strong>Section:</strong> {cr.section}</p>
                  <button onClick={() => removeCR(cr.id)} className="remove-btn">Remove Access</button>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default CRDetails;
