import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { submitEventRegistration } from '../../../utils/eventRegistrationAPI';
import Breadcrumb from '../../Utilities/Breadcrumb/Breadcrumb';
import './Registration.css';
import omegatrixBanner from '../../../assets/img/event_specific_pictures/omegatrix/OMEGATRIX_banner.png';

const YEAR_OPTIONS = ['1st Year', '2nd Year', '3rd Year', '4th Year'];
const STREAM_OPTIONS = ['CSE', 'IT', 'ECE', 'EE', 'Others'];

const OmegatrixRegistration = () => {
  const history = useHistory();
  const [formData, setFormData] = useState({
    fullName: '',
    year: '',
    streamBranch: '',
    collegeName: '',
    collegeIdProof: null,
    contactNumber: '',
    emailAddress: '',
    joinWhatsappConfirmed: false,
    paymentMode: '',
    transactionId: '',
    transactionDate: '',
    paymentScreenshot: null,
    cashReceipt: null,
    declarationEligibility: false,
    declarationRounds: false,
    declarationCarryItems: false,
    declarationRules: false
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

    if (!formData.fullName.trim()) nextErrors.fullName = 'Full Name is required';
    if (!formData.year) nextErrors.year = 'Year is required';
    if (!formData.streamBranch) nextErrors.streamBranch = 'Stream / Branch is required';
    if (!formData.collegeName.trim()) nextErrors.collegeName = 'College Name is required';
    if (!formData.collegeIdProof) nextErrors.collegeIdProof = 'College ID / Library Card upload is required';

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

    if (!formData.joinWhatsappConfirmed) {
      nextErrors.joinWhatsappConfirmed = 'Please confirm you joined the official WhatsApp group';
    }

    if (!formData.paymentMode) nextErrors.paymentMode = 'Mode of Payment is required';
    if (!formData.transactionDate) nextErrors.transactionDate = 'Payment date is required';

    if (formData.paymentMode === 'online') {
      if (!formData.transactionId.trim()) {
        nextErrors.transactionId = 'Transaction ID is required for online payment';
      }
      if (!formData.paymentScreenshot) {
        nextErrors.paymentScreenshot = 'Upload payment screenshot for online payment';
      }
    }

    if (formData.paymentMode === 'cash') {
      if (!formData.cashReceipt) {
        nextErrors.cashReceipt = 'Upload cash receipt / slip for offline payment';
      }
    }

    if (!formData.declarationEligibility) {
      nextErrors.declarationEligibility = 'Please accept declaration 1';
    }
    if (!formData.declarationRounds) {
      nextErrors.declarationRounds = 'Please accept declaration 2';
    }
    if (!formData.declarationCarryItems) {
      nextErrors.declarationCarryItems = 'Please accept declaration 3';
    }
    if (!formData.declarationRules) {
      nextErrors.declarationRules = 'Please accept declaration 4';
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
      const result = await submitEventRegistration('Omegatrix', formData);
      console.log('Omegatrix registration successful:', result);
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
        pageTitle="Register for Omegatrix"
        currentPage="Registration"
        bgImage={omegatrixBanner}
      />

      <div className="registration-container">
        <div className="registration-content">
          <div className="registration-header">
            <h1 className="registration-title">Omegatrix Registration Form</h1>
            <p className="registration-subtitle">Note: "*" indicates Mandatory Fields</p>
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
              <h2 className="form-section-title">&gt;&gt;&gt; Registration Form (Individual Event)</h2>
            </div>

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
                <label className="form-label required">Year</label>
                <div className="mcq-group">
                  {YEAR_OPTIONS.map((option) => (
                    <label className="mcq-option" key={option}>
                      <input
                        type="radio"
                        name="year"
                        value={option}
                        checked={formData.year === option}
                        onChange={handleInputChange}
                      />
                      <span className="mcq-option-label">{option}</span>
                    </label>
                  ))}
                </div>
                {errors.year && <div className="error-message">{errors.year}</div>}
              </div>

              <div className="form-group">
                <label className="form-label required">Stream / Branch</label>
                <div className="mcq-group">
                  {STREAM_OPTIONS.map((option) => (
                    <label className="mcq-option" key={option}>
                      <input
                        type="radio"
                        name="streamBranch"
                        value={option}
                        checked={formData.streamBranch === option}
                        onChange={handleInputChange}
                      />
                      <span className="mcq-option-label">{option}</span>
                    </label>
                  ))}
                </div>
                {errors.streamBranch && <div className="error-message">{errors.streamBranch}</div>}
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
                <label className="form-label required">College ID / Library Card Upload</label>
                <div className="file-upload-wrapper">
                  <div className="file-upload">
                    <input
                      type="file"
                      name="collegeIdProof"
                      id="collegeIdProof"
                      className="file-upload-input"
                      accept="image/*,.pdf"
                      onChange={handleInputChange}
                    />
                    <label htmlFor="collegeIdProof" className="file-upload-label">
                      <div className="file-upload-icon">FILE</div>
                      <div className="file-upload-text">
                        <span className="highlight">Click to upload</span>
                        <br />
                        PNG, JPG, PDF
                      </div>
                    </label>
                  </div>
                  {formData.collegeIdProof && <div className="file-name">{formData.collegeIdProof.name}</div>}
                </div>
                {errors.collegeIdProof && <div className="error-message">{errors.collegeIdProof}</div>}
              </div>

              <div className="form-group">
                <label className="form-label required">Contact Number (Preferably WhatsApp Number)</label>
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
                <label className="form-label required">Join Official WhatsApp Group</label>
                <p style={{ margin: 0 }}>
                  <a
                    href="https://chat.whatsapp.com/C0C0alA0SsjJC3vI0XoRfc?mode=gi_t"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: '#ffc010' }}
                  >
                    https://chat.whatsapp.com/C0C0alA0SsjJC3vI0XoRfc?mode=gi_t
                  </a>
                </p>
                <label className="checkbox-group" style={{ marginTop: '12px' }}>
                  <input
                    type="checkbox"
                    name="joinWhatsappConfirmed"
                    checked={formData.joinWhatsappConfirmed}
                    onChange={handleInputChange}
                  />
                  <span className="checkbox-custom"></span>
                  <span className="checkbox-label">I have joined the official WhatsApp group</span>
                </label>
                {errors.joinWhatsappConfirmed && <div className="error-message">{errors.joinWhatsappConfirmed}</div>}
              </div>
            </div>

            <div className="form-section">
              <h2 className="form-section-title">&gt;&gt;&gt; Payment Section</h2>

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
                <label className="form-label required">Payment Date</label>
                <input
                  type="date"
                  name="transactionDate"
                  value={formData.transactionDate}
                  onChange={handleInputChange}
                  className="retro-input"
                  max={new Date().toISOString().split('T')[0]}
                />
                {errors.transactionDate && <div className="error-message">{errors.transactionDate}</div>}
              </div>

              {formData.paymentMode === 'online' && (
                <>
                  <div className="form-group">
                    <label className="form-label required">Transaction ID</label>
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
                    <label className="form-label required">Upload Payment Screenshot</label>
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
                </>
              )}

              {formData.paymentMode === 'cash' && (
                <div className="form-group">
                  <label className="form-label required">Upload Cash Receipt / Slip</label>
                  <div className="file-upload-wrapper">
                    <div className="file-upload">
                      <input
                        type="file"
                        name="cashReceipt"
                        id="cashReceipt"
                        className="file-upload-input"
                        accept="image/*,.pdf"
                        onChange={handleInputChange}
                      />
                      <label htmlFor="cashReceipt" className="file-upload-label">
                        <div className="file-upload-icon">FILE</div>
                        <div className="file-upload-text">
                          <span className="highlight">Click to upload</span>
                          <br />
                          PNG, JPG, PDF
                        </div>
                      </label>
                    </div>
                    {formData.cashReceipt && <div className="file-name">{formData.cashReceipt.name}</div>}
                  </div>
                  {errors.cashReceipt && <div className="error-message">{errors.cashReceipt}</div>}
                </div>
              )}
            </div>

            <div className="form-section">
              <h2 className="form-section-title">&gt;&gt;&gt; Mandatory Declaration</h2>

              <div className="form-group">
                <label className="checkbox-group">
                  <input
                    type="checkbox"
                    name="declarationEligibility"
                    checked={formData.declarationEligibility}
                    onChange={handleInputChange}
                  />
                  <span className="checkbox-custom"></span>
                  <span className="checkbox-label">
                    I confirm that I am eligible with a valid college ID and that Omegatrix 2.26 is an individual event with no substitutions allowed. I understand late entry will not be permitted.
                  </span>
                </label>
                {errors.declarationEligibility && <div className="error-message">{errors.declarationEligibility}</div>}
              </div>

              <div className="form-group">
                <label className="checkbox-group">
                  <input
                    type="checkbox"
                    name="declarationRounds"
                    checked={formData.declarationRounds}
                    onChange={handleInputChange}
                  />
                  <span className="checkbox-custom"></span>
                  <span className="checkbox-label">
                    I understand that the event consists of two offline rounds: Prelims (paper-based MCQ, no negative marking) and Mains (screen-based with declared marking scheme). Only top scorers from Prelims will qualify for Mains.
                  </span>
                </label>
                {errors.declarationRounds && <div className="error-message">{errors.declarationRounds}</div>}
              </div>

              <div className="form-group">
                <label className="checkbox-group">
                  <input
                    type="checkbox"
                    name="declarationCarryItems"
                    checked={formData.declarationCarryItems}
                    onChange={handleInputChange}
                  />
                  <span className="checkbox-custom"></span>
                  <span className="checkbox-label">
                    I confirm that I will carry my College ID / Library Card and a Pen. I understand that mobile phones, smart devices, AI tools, calculators, or any unfair means will lead to immediate disqualification.
                  </span>
                </label>
                {errors.declarationCarryItems && <div className="error-message">{errors.declarationCarryItems}</div>}
              </div>

              <div className="form-group">
                <label className="checkbox-group">
                  <input
                    type="checkbox"
                    name="declarationRules"
                    checked={formData.declarationRules}
                    onChange={handleInputChange}
                  />
                  <span className="checkbox-custom"></span>
                  <span className="checkbox-label">
                    I agree to follow all published logistics, scoring rules, tie-break criteria, and organizers&apos; decisions. I understand the registration fee is non-refundable.
                  </span>
                </label>
                {errors.declarationRules && <div className="error-message">{errors.declarationRules}</div>}
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

export default OmegatrixRegistration;
