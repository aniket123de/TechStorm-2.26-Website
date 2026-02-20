import React, { useState } from 'react';
import './Modal.css';

const AddRegistrationModal = ({ onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    emailAddress: '',
    contactNumber: '',
    collegeName: '',
    year: '',
    eventName: '',
    paymentMode: 'online',
    transactionId: '',
    paymentStatus: 'pending',
    registrationStatus: 'confirmed',
  });

  const events = ['Khet', 'FIFA Mobile', 'Combat', 'Hackstrom', 'Codebee', 'Ro Soccer', 'Ro Terrance'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Generate registration number
    const eventAbbr = formData.eventName.substring(0, 3).toUpperCase();
    const randomCode = Math.random().toString(36).substring(2, 10).toUpperCase();
    const registrationNumber = `${eventAbbr}-${randomCode}`;

    const newRegistration = {
      ...formData,
      _id: Date.now().toString(),
      registrationNumber,
      submittedAt: new Date().toISOString(),
      source: 'admin',
    };

    onAdd(newRegistration);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content large-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Add New Registration</h2>
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
                    placeholder="Enter full name"
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
                    placeholder="email@example.com"
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
                    placeholder="10-digit mobile number"
                    pattern="[0-9]{10}"
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
                    placeholder="Enter college name"
                    required
                  />
                </div>
                <div className="form-field">
                  <label>Year of Study *</label>
                  <select
                    name="year"
                    value={formData.year}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Year</option>
                    <option value="1st Year">1st Year</option>
                    <option value="2nd Year">2nd Year</option>
                    <option value="3rd Year">3rd Year</option>
                    <option value="4th Year">4th Year</option>
                  </select>
                </div>
                <div className="form-field">
                  <label>Event *</label>
                  <select
                    name="eventName"
                    value={formData.eventName}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Event</option>
                    {events.map(event => (
                      <option key={event} value={event}>{event}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="form-section">
              <h3>Payment Details</h3>
              <div className="form-grid">
                <div className="form-field">
                  <label>Payment Mode *</label>
                  <select
                    name="paymentMode"
                    value={formData.paymentMode}
                    onChange={handleChange}
                    required
                  >
                    <option value="online">Online</option>
                    <option value="offline">Offline</option>
                  </select>
                </div>
                <div className="form-field">
                  <label>Transaction ID</label>
                  <input
                    type="text"
                    name="transactionId"
                    value={formData.transactionId}
                    onChange={handleChange}
                    placeholder="Enter transaction ID (optional)"
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

            <div className="info-box success">
              <p>✅ Registration number will be auto-generated upon submission</p>
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn-primary">Add Registration</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddRegistrationModal;
