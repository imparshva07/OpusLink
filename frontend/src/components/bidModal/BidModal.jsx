import { useState, useContext } from "react";
import axios from "axios";
import "./BidModal.css";
import { UserContext } from "../../context/UserContext";

const BidModal = ({ showModal, handleClose, project, setBidSubmitted }) => {
  const [error, setError] = useState("");
  const { currentUser } = useContext(UserContext);

  const [formData, setFormData] = useState({
    bidAmount: "",
    proposal: "",
  });

  const [formErrors, setFormErrors] = useState({
    bidAmount: "",
    proposal: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));

    if (formErrors[id]) {
      setFormErrors((prevErrors) => {
        const updatedErrors = { ...prevErrors };
        delete updatedErrors[id];
        return updatedErrors;
      });
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.bidAmount) {
      errors.bidAmount = "Bid amount is required.";
    } else if (formData.bidAmount <= 0) {
      errors.bidAmount = "Bid amount must be greater than 0.";
    }

    if (!formData.proposal.trim()) {
      errors.proposal = "Proposal is required.";
    } else if (formData.proposal.length < 10) {
      errors.proposal = "Proposal must be at least 10 characters long.";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setError("");
      try {
        await axios.post(
          "http://localhost:3000/api/bids",
          {
            projectId: project._id,
            userId: project.userId,
            freelancerId: currentUser._id,
            bidAmount: formData.bidAmount,
            proposal: formData.proposal,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setBidSubmitted(true);
        handleClose();
      } catch (err) {
        console.error(
          "Error submitting bid: ",
          err.response?.data || err.message
        );
        setError(
          "Failed to submit bid. Please check your inputs and try again."
        );
      }
    }
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
          {formErrors.bidAmount && (
            <div className="error-message">{formErrors.bidAmount}</div>
          )}

          <label htmlFor="proposal">Bid Proposal</label>
          <textarea
            id="proposal"
            value={formData.proposal}
            onChange={handleChange}
            placeholder="Enter Your Proposal"
            rows="4"
          />
          {formErrors.proposal && (
            <div className="error-message">{formErrors.proposal}</div>
          )}

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
