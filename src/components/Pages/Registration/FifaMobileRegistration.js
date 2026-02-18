import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { submitEventRegistration } from '../../../utils/eventRegistrationAPI';
import Breadcrumb from '../../Utilities/Breadcrumb/Breadcrumb';
import './Registration.css';
import fifaMobileBanner from '../../../assets/img/event_specific_pictures/games/fifa_mobile.png';

const FifaMobileRegistration = () => {
  const history = useHistory();
  const [formData, setFormData] = useState({
    fullName: '',
    collegeName: '',
    department: '',
    yearOfStudy: '',
    contactNumber: '',
    emailAddress: '',
    fifaUsername: '',
    teamOvr: '',
    deviceModel: '',
    paymentMode: '',
    paymentDate: '',
    paymentReceipt: null,
    agreeToRules: false,
    whatsappConfirmed: false
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const nextValue = type === 'checkbox' ? checked : value;
    setFormData((prev) => ({ ...prev, [name]: nextValue }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const nextErrors = {};

    if (!formData.fullName.trim()) nextErrors.fullName = 'Full Name is required';
    if (!formData.collegeName.trim()) nextErrors.collegeName = 'College Name is required';
    if (!formData.department.trim()) nextErrors.department = 'Department / Branch is required';
    if (!formData.yearOfStudy.trim()) nextErrors.yearOfStudy = 'Year of Study is required';

    if (!formData.contactNumber.trim()) {
      nextErrors.contactNumber = 'Contact Number is required';
    } else if (!/^\d{10,15}$/.test(formData.contactNumber.replace(/\D/g, ''))) {
      nextErrors.contactNumber = 'Enter a valid contact number';
    }

    if (!formData.emailAddress.trim()) {
      nextErrors.emailAddress = 'Email Address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.emailAddress)) {
      nextErrors.emailAddress = 'Invalid email format';
    }

    if (!formData.fifaUsername.trim()) nextErrors.fifaUsername = 'FIFA Mobile Username is required';
    if (!formData.teamOvr.trim()) nextErrors.teamOvr = 'Team OVR is required';
    if (!formData.deviceModel.trim()) nextErrors.deviceModel = 'Device Model is required';
    
    if (!formData.paymentMode) nextErrors.paymentMode = 'Payment mode is required';
    if (!formData.paymentDate) nextErrors.paymentDate = 'Payment date is required';
    
    if (formData.paymentMode === 'online' && !formData.paymentReceipt) {
      nextErrors.paymentReceipt = 'Payment screenshot is required for online payment';
    }
    if (formData.paymentMode === 'offline' && !formData.paymentReceipt) {
      nextErrors.paymentReceipt = 'Offline receipt is required for offline payment';
    }
    
    if (!formData.agreeToRules) nextErrors.agreeToRules = 'You must agree to tournament rules';
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
      const result = await submitEventRegistration('FIFA Mobile', formData);
      console.log('FIFA Mobile registration successful:', result);
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
        pageTitle="Register for FIFA Mobile"
        currentPage="Registration"
        bgImage={fifaMobileBanner}
      />

      <div className="registration-container">
        <div className="registration-content">
          <div className="registration-header">
            <h1 className="registration-title">FIFA Mobile Registration Form</h1>
            <p className="registration-subtitle">Registration Information Required from Participants</p>
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
                <label className="form-label required">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="retro-input"
                  placeholder="Full Name"
                />
                {errors.fullName && <div className="error-message">{errors.fullName}</div>}
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
                <label className="form-label required">Department / Branch</label>
                <input
                  type="text"
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                  className="retro-input"
                  placeholder="Department / Branch"
                />
                {errors.department && <div className="error-message">{errors.department}</div>}
              </div>

              <div className="form-group">
                <label className="form-label required">Year of Study</label>
                <input
                  type="text"
                  name="yearOfStudy"
                  value={formData.yearOfStudy}
                  onChange={handleInputChange}
                  className="retro-input"
                  placeholder="Year of Study"
                />
                {errors.yearOfStudy && <div className="error-message">{errors.yearOfStudy}</div>}
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
                <label className="form-label required">Email Address</label>
                <input
                  type="text"
                  name="emailAddress"
                  value={formData.emailAddress}
                  onChange={handleInputChange}
                  className="retro-input"
                  placeholder="Email Address"
                />
                {errors.emailAddress && <div className="error-message">{errors.emailAddress}</div>}
              </div>

              <div className="form-group">
                <label className="form-label required">FIFA Mobile Username (In-game Name)</label>
                <input
                  type="text"
                  name="fifaUsername"
                  value={formData.fifaUsername}
                  onChange={handleInputChange}
                  className="retro-input"
                  placeholder="FIFA Mobile Username"
                />
                {errors.fifaUsername && <div className="error-message">{errors.fifaUsername}</div>}
              </div>

              <div className="form-group">
                <label className="form-label required">Team OVR (Overall Rating)</label>
                <input
                  type="text"
                  name="teamOvr"
                  value={formData.teamOvr}
                  onChange={handleInputChange}
                  className="retro-input"
                  placeholder="Team OVR"
                />
                {errors.teamOvr && <div className="error-message">{errors.teamOvr}</div>}
              </div>

              <div className="form-group">
                <label className="form-label required">Device Model</label>
                <input
                  type="text"
                  name="deviceModel"
                  value={formData.deviceModel}
                  onChange={handleInputChange}
                  className="retro-input"
                  placeholder="Device Model"
                />
                {errors.deviceModel && <div className="error-message">{errors.deviceModel}</div>}
              </div>
            </div>

            <div className="form-section">
              <h2 className="form-section-title">&gt;&gt;&gt; Payment Information</h2>
              
              <div className="form-group">
                <label className="form-label required">Payment Mode</label>
                <div className="mcq-group">
                  <label className="mcq-option">
                    <input
                      type="radio"
                      name="paymentMode"
                      value="online"
                      checked={formData.paymentMode === 'online'}
                      onChange={handleInputChange}
                    />
                    <span className="mcq-option-label">Online Payment</span>
                  </label>
                  <label className="mcq-option">
                    <input
                      type="radio"
                      name="paymentMode"
                      value="offline"
                      checked={formData.paymentMode === 'offline'}
                      onChange={handleInputChange}
                    />
                    <span className="mcq-option-label">Offline Payment</span>
                  </label>
                </div>
                {errors.paymentMode && <div className="error-message">{errors.paymentMode}</div>}
              </div>

              <div className="form-group">
                <label className="form-label required">Payment Date</label>
                <input
                  type="date"
                  name="paymentDate"
                  value={formData.paymentDate}
                  onChange={handleInputChange}
                  className="retro-input"
                  max={new Date().toISOString().split('T')[0]}
                />
                {errors.paymentDate && <div className="error-message">{errors.paymentDate}</div>}
              </div>

              {formData.paymentMode && (
                <div className="form-group">
                  <label className="form-label required">
                    {formData.paymentMode === 'online' ? 'Upload Payment Screenshot' : 'Upload Offline Receipt'}
                  </label>
                  <div className="file-upload-wrapper">
                    <div className="file-upload">
                      <input
                        type="file"
                        name="paymentReceipt"
                        id="paymentReceipt"
                        onChange={handleInputChange}
                        className="file-upload-input"
                        accept="image/*,.pdf"
                      />
                      <label htmlFor="paymentReceipt" className="file-upload-label">
                        <div className="file-upload-icon">FILE</div>
                        <div className="file-upload-text">
                          <span className="highlight">Click to upload</span><br/>
                          {formData.paymentMode === 'online' ? 'Payment screenshot' : 'Offline receipt'}<br/>
                          (PNG, JPG, PDF)
                        </div>
                      </label>
                    </div>
                    {formData.paymentReceipt && (
                      <div className="file-name">
                        ✓ {formData.paymentReceipt.name}
                      </div>
                    )}
                  </div>
                  {errors.paymentReceipt && <div className="error-message">{errors.paymentReceipt}</div>}
                </div>
              )}
            </div>

            <div className="form-section">
              <h2 className="form-section-title">&gt;&gt;&gt; Agreement</h2>

              <div className="form-group">
                <label className="form-label required">Agreement to Tournament Rules</label>
                <label className="checkbox-group">
                  <input
                    type="checkbox"
                    name="agreeToRules"
                    checked={formData.agreeToRules}
                    onChange={handleInputChange}
                  />
                  <span className="checkbox-custom"></span>
                  <span className="checkbox-label">
                    I agree to the FIFA Mobile tournament rules
                  </span>
                </label>
                {errors.agreeToRules && <div className="error-message">{errors.agreeToRules}</div>}
              </div>
            </div>

            <div className="form-section">
              <h2 className="form-section-title">&gt;&gt;&gt; WhatsApp Group</h2>
              <div className="form-group">
                <label className="form-label">Link</label>
                <p style={{ margin: 0 }}>
                  <a
                    href="https://chat.whatsapp.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: '#ffc010' }}
                  >
                    https://chat.whatsapp.com/
                  </a>
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
                    Yes, I have Done
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

export default FifaMobileRegistration;
