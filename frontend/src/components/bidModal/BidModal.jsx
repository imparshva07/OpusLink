import React, { useState, useContext } from 'react';
import axios from 'axios';
import './BidModal.css';
import { UserContext } from '../../context/UserContext';

const BidModal = ({ showModal, handleClose, project, setBidSubmitted }) => {
  const [error, setError] = useState('');
  const { currentUser } = useContext(UserContext);

  const [formData, setFormData] = useState({
    bidAmount: "",
    proposal: ""
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.bidAmount || !formData.proposal) {
      setError('Both fields are required.');
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/api/bids", {
        projectId: project._id,
        clientId: project.userId,
        freelancerId: currentUser._id,
        bidAmount: formData.bidAmount,
        proposal: formData.proposal
      }, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setBidSubmitted(true);
    } catch (err) {
      console.error("Error submitting bid: ", error.response?.data || error.message);
      alert("Failed to submit bid. Please check your inputs and try again.");
    }
    handleClose();
  };

  if (!showModal) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <form onSubmit={handleSubmit}>
          <h1>Submit Your Bid</h1>

          <label htmlFor="bidAmount">Bid Amount</label>
          <input
            id="bidAmount"
            type="number"
            value={formData.bidAmount}
            onChange={handleChange}
            placeholder="Enter Your Bid Amount"
          />

          <label htmlFor="proposal">Bid Proposal</label>
          <textarea
            id="proposal"
            value={formData.proposal}
            onChange={handleChange}
            placeholder="Enter Your Proposal"
            rows="4"
          />

          <button type="submit">Submit Bid</button>

          {error && <div className="error-message">{error}</div>}

          <button type="button" className="close-btn" onClick={handleClose}>
            Close
          </button>
        </form>
      </div>
    </div>
  );
};

export default BidModal;
