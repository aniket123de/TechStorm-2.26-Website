import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { submitEventRegistration } from '../../../utils/eventRegistrationAPI';
import Breadcrumb from '../../Utilities/Breadcrumb/Breadcrumb';
import Stepper, { Step } from '../../Utilities/Stepper/Stepper';
import RegistrationSuccess from './RegistrationSuccess';
import './Registration.css';
import { cloudinaryImages } from '../../../config/cloudinary';
const qrCodeImage = cloudinaryImages.misc.qrCode;

const khetBanner = "https://res.cloudinary.com/ds3vepmkd/image/upload/f_auto,q_auto/v1/eoorox/event_specific_pictures/games/khet";

const YEAR_OPTIONS = ['1st Year', '2nd Year', '3rd Year', '4th Year'];
const DEPARTMENT_OPTIONS = ["CSE", "IT", "ECE", "EE", "BCA", "MCA", "Others"];
const COLLEGE_NAME = 'B. P. Poddar Institute of Management & Technology';

const KhetRegistration = () => {
  const history = useHistory();
  const [formData, setFormData] = useState({
    teamName: '',
    numberOfParticipants: '1',
    fullName: '',
    year: '',
    department: '',
    collegeName: COLLEGE_NAME,
    collegeIdProof: null,
    contactNumber: '',
    emailAddress: '',
    joinWhatsappConfirmed: false,
    paymentMode: '',
    transactionId: '',
    transactionDate: '',
    paymentScreenshot: null,
    declarationConfirmed: false,
    referralCode: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [registrationNumber, setRegistrationNumber] = useState(null);

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

  const validateStep1 = () => {
    const nextErrors = {};
    if (!String(formData.numberOfParticipants).trim()) {
      nextErrors.numberOfParticipants = 'Number of Participants is required';
    } else if (Number(formData.numberOfParticipants) !== 1) {
      nextErrors.numberOfParticipants = 'This is an individual event. Number of Participants must be 1';
    }
    if (!formData.fullName.trim()) nextErrors.fullName = 'Full Name is required';
    if (!formData.year) nextErrors.year = 'Year is required';
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
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const validateStep2 = () => {
    const nextErrors = {};
    if (!formData.paymentMode) nextErrors.paymentMode = 'Mode of Payment is required';
    if (formData.paymentMode === 'online') {
      if (!formData.transactionDate) nextErrors.transactionDate = 'Payment date is required';
      if (!formData.transactionId.trim()) {
        nextErrors.transactionId = 'Transaction ID is required for online payment';
      }
      if (!formData.paymentScreenshot) {
        nextErrors.paymentScreenshot = 'Upload payment screenshot for online payment';
      }
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const validateStep3 = () => {
    const nextErrors = {};
    if (formData.joinWhatsappConfirmed !== true) {
      nextErrors.joinWhatsappConfirmed = 'Please confirm you joined the official WhatsApp group';
    }
    if (formData.declarationConfirmed !== true) {
      nextErrors.declarationConfirmed = 'Please confirm the mandatory declaration';
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleStepValidation = (step) => {
    if (step === 0) {
      return validateStep1();
    } else if (step === 1) {
      return validateStep2();
    } else if (step === 2) {
      return validateStep3();
    }
    return true;
  };

  const handleComplete = async () => {
    // Validate the final step before submitting
    if (!validateStep3()) {
      console.log('❌ Final step validation failed');
      return;
    }
    
    setIsSubmitting(true);

    try {
      const result = await submitEventRegistration('Khet', formData);
      console.log('Khet registration successful:', result);
      
      // Extract registration number directly from response
      const regNumber = result.data?.registrationNumber;
      
      if (regNumber) {
        setRegistrationNumber(regNumber);
        setSubmitSuccess(true);
      } else {
        console.error('Registration number not found in response:', result);
        throw new Error('Registration number not received from server. Please contact support.');
      }
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
        pageTitle="Register for Khet"
        currentPage="Registration"
        bgImage={khetBanner}
      />

      <div className="registration-container">
        <div className="registration-content">
          <div className="registration-header">
            <h1 className="registration-title">Khet Registration Form</h1>
            <p className="registration-subtitle">Note: "*" indicates Mandatory Fields</p>
          </div>{errors.submit && (
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

          <Stepper
            initialStep={1}
            onStepChange={(step) => console.log('Step:', step)}
            onStepValidation={handleStepValidation}
            onFinalStepCompleted={handleComplete}
            backButtonText="← Previous"
            nextButtonText="Next Step →"
          >
            {/* Step 1: Participant Details */}
            <Step>
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
                  <select
                    name="year"
                    value={formData.year}
                    onChange={handleInputChange}
                    className="retro-input"
                  >
                    <option value="">Select Year</option>
                    {YEAR_OPTIONS.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                  {errors.year && <div className="error-message">{errors.year}</div>}
                </div>

                <div className="form-group">
                  <label className="form-label">Department</label>
                  <select
                    name="department"
                    value={formData.department}
                    onChange={handleInputChange}
                    className="retro-input"
                  >
                    <option value="">Select Department</option>
                    {DEPARTMENT_OPTIONS.map((deptOption) => (
                      <option key={deptOption} value={deptOption}>{deptOption}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label required">College Name</label>
                  <input
                    type="text"
                    name="collegeName"
                    value={formData.collegeName}
                    className="retro-input"
                    disabled
                    style={{ 
                      backgroundColor: 'rgba(255, 192, 16, 0.1)',
                      cursor: 'not-allowed',
                      color: '#ffc010'
                    }}
                  />
                  <p style={{ 
                    margin: '8px 0 0', 
                    color: '#00ffea', 
                    fontSize: '11px', 
                    fontFamily: 'Press Start 2P, monospace' 
                  }}>
                    ⚠️ This event is only for BPPIMT students
                  </p>
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
                        accept="image/jpeg,image/jpg,image/png,.jpg,.jpeg,.png"
                        onChange={handleInputChange}
                      />
                      <label htmlFor="collegeIdProof" className="file-upload-label">
                        <div className="file-upload-icon">📁</div>
                        <div className="file-upload-text">
                          <span className="highlight">Click to upload</span>
                          <br />
                          PNG, JPG, JPEG
                        </div>
                      </label>
                    </div>
                    {formData.collegeIdProof && <div className="file-name">✓ {formData.collegeIdProof.name}</div>}
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
              </div>
            </Step>

            {/* Step 2: Payment Section */}
            <Step>
              <div className="form-section">
                <h2 className="form-section-title">&gt;&gt;&gt; Payment Section</h2>

                <div style={{
                  backgroundColor: 'rgba(255, 192, 16, 0.1)',
                  border: '2px solid #ffc010',
                  padding: '20px',
                  borderRadius: '5px',
                  marginBottom: '25px'
                }}>
                  <h4 style={{ color: '#ffc010', marginTop: 0, marginBottom: '15px', fontSize: '14px' }}>
                    💰 Registration Fee
                  </h4>
                  <p style={{ color: '#fff', lineHeight: '1.8', margin: 0, fontSize: '16px' }}>
                    <strong style={{ color: '#ffc010' }}>Fee:</strong> ₹50 per participant
                    <br />
                    <span style={{ color: '#ff6b6b', fontSize: '14px' }}>⚠️ This event is only for BPPIMT students</span>
                  </p>
                </div>

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

                {formData.paymentMode === 'online' && (
                  <>
                    {/* QR Code and UPI ID Section */}
                    <div className="payment-qr-section">
                      <div className="payment-qr-title">SCAN QR CODE TO PAY</div>
                      <div className="payment-qr-container">
                        <div className="qr-code-wrapper">
                          <img 
                            src={qrCodeImage} 
                            alt="Payment QR Code" 
                            className="qr-code-image"
                          />
                        </div>
                        <div className="upi-id-container">
                          <div className="upi-id-label">UPI ID</div>
                          <div className="upi-id-value">bppoddar@iob</div>
                        </div>
                        <div className="payment-instruction-note">
                          Scan the QR code or use the UPI ID to make payment
                        </div>
                      </div>
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

                    <div className="form-group">
                      <label className="form-label required">Transaction ID (For Online Payment)</label>
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
                            accept="image/jpeg,image/jpg,image/png,.jpg,.jpeg,.png"
                            onChange={handleInputChange}
                          />
                          <label htmlFor="paymentScreenshot" className="file-upload-label">
                            <div className="file-upload-icon">💳</div>
                            <div className="file-upload-text">
                              <span className="highlight">Click to upload</span>
                              <br />
                              PNG, JPG, JPEG
                            </div>
                          </label>
                        </div>
                        {formData.paymentScreenshot && <div className="file-name">✓ {formData.paymentScreenshot.name}</div>}
                      </div>
                      {errors.paymentScreenshot && <div className="error-message">{errors.paymentScreenshot}</div>}
                    </div>
                  </>
                )}

                {formData.paymentMode === 'cash' && (
                  <div className="form-group">
                    <div style={{
                      backgroundColor: 'rgba(255, 192, 16, 0.1)',
                      border: '2px solid #ffc010',
                      padding: '20px',
                      borderRadius: '5px',
                      marginTop: '20px'
                    }}>
                      <h4 style={{ color: '#ffc010', marginTop: 0, marginBottom: '15px' }}>
                        📌 Important: Cash Payment Instructions
                      </h4>
                      <p style={{ color: '#fff', lineHeight: '1.8', margin: 0 }}>
                        You must pay the registration fee in cash within <strong style={{ color: '#ffc010' }}>7 days of registration</strong> at the <strong style={{ color: '#ffc010' }}>Alumni Room</strong> of the college. 
                        <br /><br />
                        Please collect the paper receipt during payment and <strong style={{ color: '#ffc010' }}>keep it safe for event day verification</strong>.
                        <br /><br />
                        <span style={{ color: '#ff6b6b' }}>⚠️ No receipt upload is required during registration.</span>
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </Step>

            {/* Step 3: Rules & Agreement */}
            <Step>
              <div className="form-section">
                <h2 className="form-section-title">&gt;&gt;&gt; Rules & Regulations</h2>
                
                <div className="rules-container" style={{ 
                  background: '#1a1a1a', 
                  padding: '30px', 
                  borderRadius: '8px',
                  marginBottom: '30px',
                  border: '2px solid #333'
                }}>
                  <h3 style={{ color: '#ffc010', marginBottom: '20px' }}>Khet Event Rules</h3>
                  <ul style={{ color: '#ccc', lineHeight: '1.8', paddingLeft: '20px' }}>
                    <li>All participants must carry a valid college ID card</li>
                    <li>This is an individual event - only 1 participant allowed</li>
                    <li>Registration is mandatory for all participants</li>
                    <li>Participants must follow the event schedule strictly</li>
                    <li>Any form of malpractice will lead to disqualification</li>
                    <li>Organizers' decision will be final and binding</li>
                    <li>Entry fee is non-refundable under any circumstances</li>
                  </ul>
                </div>

                <div className="form-group">
                  <label className="form-label required">Join Official WhatsApp Group</label>
                  <p style={{ margin: '10px 0' }}>
                    <a
                      href="https://chat.whatsapp.com/LeNZPNivID87ydepOLpAvY?mode=gi_t"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: '#ffc010' }}
                    >
                      https://chat.whatsapp.com/LeNZPNivID87ydepOLpAvY?mode=gi_t
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

                <div className="form-group">
                  <label className="form-label">Referral Code (If Any)</label>
                  <input
                    type="text"
                    name="referralCode"
                    value={formData.referralCode}
                    onChange={handleInputChange}
                    className="retro-input"
                    placeholder="Enter referral code (optional)"
                  />
                </div>

                <div className="form-group">
                  <label className="checkbox-group">
                    <input
                      type="checkbox"
                      name="declarationConfirmed"
                      checked={formData.declarationConfirmed}
                      onChange={handleInputChange}
                    />
                    <span className="checkbox-custom"></span>
                    <span className="checkbox-label">
                      I have checked all the details carefully and have joined the WhatsApp group
                    </span>
                  </label>
                  {errors.declarationConfirmed && <div className="error-message">{errors.declarationConfirmed}</div>}
                </div>
              </div>
            </Step>
          </Stepper>

          <div style={{ marginTop: '20px', textAlign: 'center' }}>
            <button 
              type="button" 
              className="retro-button secondary"
              onClick={() => history.goBack()}
              disabled={isSubmitting}
            >
              Cancel Registration
            </button>
          </div>
        </div>
      </div>

      {submitSuccess && registrationNumber && (
        <RegistrationSuccess 
          registrationNumber={registrationNumber}
          eventName="Khet"
          onClose={() => setSubmitSuccess(false)}
        />
      )}
    </div>
  );
};

export default KhetRegistration;
