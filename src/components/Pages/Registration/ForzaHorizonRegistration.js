import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { submitEventRegistration } from '../../../utils/eventRegistrationAPI';
import Breadcrumb from '../../Utilities/Breadcrumb/Breadcrumb';
import './Registration.css';
import forzaHorizonBanner from '../../../assets/img/event_specific_pictures/games/forza_horizon.png';

const ForzaHorizonRegistration = () => {
  const history = useHistory();
  const [formData, setFormData] = useState({
    participantName: '',
    name: '',
    contactNumber: '',
    emailId: '',
    collegeName: '',
    participantIdProof: null,
    paymentMode: '',
    transactionId: '',
    paymentScreenshot: null,
    whatsappConfirmed: false
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    let nextValue = value;

    if (type === 'checkbox') {
      nextValue = checked;
    } else if (type === 'file') {
      nextValue = files && files[0] ? files[0] : null;
    }

    setFormData((prev) => ({ ...prev, [name]: nextValue }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const nextErrors = {};

    if (!formData.participantName.trim()) nextErrors.participantName = 'Participant Name is required';
    if (!formData.name.trim()) nextErrors.name = 'Name is required';

    if (!formData.contactNumber.trim()) {
      nextErrors.contactNumber = 'Contact Number is required';
    } else if (!/^\d{10,15}$/.test(formData.contactNumber.replace(/\D/g, ''))) {
      nextErrors.contactNumber = 'Enter a valid contact number';
    }

    if (!formData.emailId.trim()) {
      nextErrors.emailId = 'Email ID is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.emailId)) {
      nextErrors.emailId = 'Invalid email format';
    }

    if (!formData.collegeName.trim()) nextErrors.collegeName = 'College Name is required';
    if (!formData.participantIdProof) nextErrors.participantIdProof = 'Participant ID Proof is required';
    if (!formData.paymentMode) nextErrors.paymentMode = 'Mode of Payment is required';

    if (formData.paymentMode === 'online') {
      if (!formData.transactionId.trim()) {
        nextErrors.transactionId = 'Transaction ID is required for online payment';
      }
      if (!formData.paymentScreenshot) {
        nextErrors.paymentScreenshot = 'Upload payment screenshot for online payment';
      }
    }

    if (!formData.whatsappConfirmed) {
      nextErrors.whatsappConfirmed = 'Please confirm after joining the WhatsApp group';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await submitEventRegistration('Forza Horizon', formData);
      console.log('Forza Horizon registration successful:', result);
      setSubmitSuccess(true);

      setTimeout(() => {
        history.push('/events');
      }, 2500);
    } catch (error) {
      console.error('Registration error:', error);
      if (error.message.includes('duplicate')) {
        setErrors({ submit: 'You have already registered for this event with this email or phone number.' });
      } else {
        setErrors({ submit: error.message || 'Registration failed. Please try again.' });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="registration-page">
      <Breadcrumb
        pageTitle="Register for Forza Horizon"
        currentPage="Registration"
        bgImage={forzaHorizonBanner}
      />

      <div className="registration-container">
        <div className="registration-content">
          <div className="registration-header">
            <h1 className="registration-title">Forza Horizon Registration Form</h1>
            <p className="registration-subtitle">Note: "*" indicates mandatory fields.</p>
          </div>

          {submitSuccess && (
            <div className="success-message">
              Registration Successful! Redirecting to events page...
            </div>
          )}
          {errors.submit && (
            <div className="error-message" style={{ 
              marginBottom: '20px', 
              padding: '15px', 
              backgroundColor: '#ff4444', 
              color: 'white',
              borderRadius: '5px',
              textAlign: 'center'
            }}>
              {errors.submit}
            </div>
          )}

          <form className="registration-form" onSubmit={handleSubmit}>
            <div className="form-section">
              <h2 className="form-section-title">&gt;&gt;&gt; Participant Details</h2>

              <div className="form-group">
                <label className="form-label required">Participant Name</label>
                <input
                  type="text"
                  name="participantName"
                  value={formData.participantName}
                  onChange={handleInputChange}
                  className="retro-input"
                  placeholder="Participant Name"
                />
                {errors.participantName && <div className="error-message">{errors.participantName}</div>}
              </div>
            </div>

            <div className="form-section">
              <h2 className="form-section-title">&gt;&gt;&gt; Participant (Mandatory)</h2>

              <div className="form-group">
                <label className="form-label required">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="retro-input"
                  placeholder="Name"
                />
                {errors.name && <div className="error-message">{errors.name}</div>}
              </div>

              <div className="form-group">
                <label className="form-label required">Contact Number</label>
                <input
                  type="text"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleInputChange}
                  className="retro-input"
                  placeholder="Contact Number"
                />
                {errors.contactNumber && <div className="error-message">{errors.contactNumber}</div>}
              </div>

              <div className="form-group">
                <label className="form-label required">Email ID</label>
                <input
                  type="text"
                  name="emailId"
                  value={formData.emailId}
                  onChange={handleInputChange}
                  className="retro-input"
                  placeholder="Email ID"
                />
                {errors.emailId && <div className="error-message">{errors.emailId}</div>}
              </div>

              <div className="form-group">
                <label className="form-label required">College Name</label>
                <input
                  type="text"
                  name="collegeName"
                  value={formData.collegeName}
                  onChange={handleInputChange}
                  className="retro-input"
                  placeholder="College Name"
                />
                {errors.collegeName && <div className="error-message">{errors.collegeName}</div>}
              </div>

              <div className="form-group">
                <label className="form-label required">Participant ID Proof (College ID / Library Card)</label>
                <div className="file-upload-wrapper">
                  <div className="file-upload">
                    <input
                      type="file"
                      name="participantIdProof"
                      id="participantIdProof"
                      className="file-upload-input"
                      accept="image/*,.pdf"
                      onChange={handleInputChange}
                    />
                    <label htmlFor="participantIdProof" className="file-upload-label">
                      <div className="file-upload-icon">FILE</div>
                      <div className="file-upload-text">
                        <span className="highlight">Click to upload</span>
                        <br />
                        PNG, JPG, PDF
                      </div>
                    </label>
                  </div>
                  {formData.participantIdProof && <div className="file-name">{formData.participantIdProof.name}</div>}
                </div>
                {errors.participantIdProof && <div className="error-message">{errors.participantIdProof}</div>}
              </div>
            </div>

            <div className="form-section">
              <h2 className="form-section-title">&gt;&gt;&gt; Payment Details</h2>

              <div className="form-group">
                <label className="form-label required">Mode of Payment</label>
                <div className="mcq-group">
                  <label className="mcq-option">
                    <input
                      type="radio"
                      name="paymentMode"
                      value="cash"
                      checked={formData.paymentMode === 'cash'}
                      onChange={handleInputChange}
                    />
                    <span className="mcq-option-label">Cash</span>
                  </label>

                  <label className="mcq-option">
                    <input
                      type="radio"
                      name="paymentMode"
                      value="online"
                      checked={formData.paymentMode === 'online'}
                      onChange={handleInputChange}
                    />
                    <span className="mcq-option-label">Online</span>
                  </label>
                </div>
                {errors.paymentMode && <div className="error-message">{errors.paymentMode}</div>}
              </div>

              <div className="form-group">
                <label className="form-label">Transaction ID</label>
                <input
                  type="text"
                  name="transactionId"
                  value={formData.transactionId}
                  onChange={handleInputChange}
                  className="retro-input"
                  placeholder="Transaction ID"
                />
                {errors.transactionId && <div className="error-message">{errors.transactionId}</div>}
              </div>

              <div className="form-group">
                <label className="form-label">Upload Payment Screenshot (For Online Payment)</label>
                <div className="file-upload-wrapper">
                  <div className="file-upload">
                    <input
                      type="file"
                      name="paymentScreenshot"
                      id="paymentScreenshot"
                      className="file-upload-input"
                      accept="image/*,.pdf"
                      onChange={handleInputChange}
                    />
                    <label htmlFor="paymentScreenshot" className="file-upload-label">
                      <div className="file-upload-icon">FILE</div>
                      <div className="file-upload-text">
                        <span className="highlight">Click to upload</span>
                        <br />
                        PNG, JPG, PDF
                      </div>
                    </label>
                  </div>
                  {formData.paymentScreenshot && <div className="file-name">{formData.paymentScreenshot.name}</div>}
                </div>
                {errors.paymentScreenshot && <div className="error-message">{errors.paymentScreenshot}</div>}
              </div>

              <div className="form-group">
                <label className="form-label">Registration fee</label>
                <p style={{ margin: 0, color: '#ffffff', fontFamily: 'Press Start 2P, monospace', fontSize: '10px', lineHeight: '1.8' }}>
                  In house: 80
                  <br />
                  Outer college: 100
                </p>
              </div>
            </div>

            <div className="form-section">
              <h2 className="form-section-title">&gt;&gt;&gt; Communication</h2>
              <div className="form-group">
                <label className="form-label required">Join WhatsApp Group</label>
                <p style={{ margin: 0, color: '#ffc010', fontFamily: 'Press Start 2P, monospace', fontSize: '10px' }}>
                  Link will be provided by organizers
                </p>
              </div>

              <div className="form-group">
                <label className="checkbox-group">
                  <input
                    type="checkbox"
                    name="whatsappConfirmed"
                    checked={formData.whatsappConfirmed}
                    onChange={handleInputChange}
                  />
                  <span className="checkbox-custom"></span>
                  <span className="checkbox-label">
                    I confirm that I have checked all details carefully and joined the WhatsApp group
                  </span>
                </label>
                {errors.whatsappConfirmed && <div className="error-message">{errors.whatsappConfirmed}</div>}
              </div>
            </div>

            <div className="submit-button-wrapper">
              <button type="submit" className="retro-button" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Submit Registration'}
              </button>
              <button
                type="button"
                className="retro-button secondary"
                onClick={() => history.goBack()}
                disabled={isSubmitting}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForzaHorizonRegistration;
