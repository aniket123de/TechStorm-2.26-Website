import React, { useState } from 'react';
import './Modal.css';

const EditRegistrationModal = ({ registration, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    fullName: registration.fullName,
    emailAddress: registration.emailAddress,
    contactNumber: registration.contactNumber,
    collegeName: registration.collegeName,
    year: registration.year || registration.yearOfStudy,
    paymentStatus: registration.paymentStatus,
    registrationStatus: registration.registrationStatus,
    transactionId: registration.transactionId || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(registration._id, formData);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Edit Registration</h2>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-section">
              <h3>Participant Information</h3>
              <div className="form-grid">
                <div className="form-field">
                  <label>Full Name *</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-field">
                  <label>Email Address *</label>
                  <input
                    type="email"
                    name="emailAddress"
                    value={formData.emailAddress}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-field">
                  <label>Contact Number *</label>
                  <input
                    type="tel"
                    name="contactNumber"
                    value={formData.contactNumber}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-field">
                  <label>College Name *</label>
                  <input
                    type="text"
                    name="collegeName"
                    value={formData.collegeName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-field">
                  <label>Year of Study *</label>
                  <input
                    type="text"
                    name="year"
                    value={formData.year}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="form-section">
              <h3>Payment & Status</h3>
              <div className="form-grid">
                <div className="form-field">
                  <label>Transaction ID</label>
                  <input
                    type="text"
                    name="transactionId"
                    value={formData.transactionId}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-field">
                  <label>Payment Status *</label>
                  <select
                    name="paymentStatus"
                    value={formData.paymentStatus}
                    onChange={handleChange}
                    required
                  >
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="failed">Failed</option>
                  </select>
                </div>
                <div className="form-field">
                  <label>Registration Status *</label>
                  <select
                    name="registrationStatus"
                    value={formData.registrationStatus}
                    onChange={handleChange}
                    required
                  >
                    <option value="confirmed">Confirmed</option>
                    <option value="pending">Pending</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="info-box">
              <p>📝 Registration Number: <strong>{registration.registrationNumber}</strong></p>
              <p>🎯 Event: <strong>{registration.eventName}</strong></p>
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn-primary">Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditRegistrationModal;
