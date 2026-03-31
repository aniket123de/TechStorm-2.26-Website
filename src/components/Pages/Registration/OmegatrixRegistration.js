import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { submitEventRegistration } from '../../../utils/eventRegistrationAPI';
import Breadcrumb from '../../Utilities/Breadcrumb/Breadcrumb';
import Stepper, { Step } from '../../Utilities/Stepper/Stepper';
import RegistrationSuccess from './RegistrationSuccess';
import './Registration.css';
import { cloudinaryImages } from '../../../config/cloudinary';
const qrCodeImage = cloudinaryImages.misc.qrCode;

const omegatrixBanner = "https://res.cloudinary.com/ds3vepmkd/image/upload/f_auto,q_auto/v1/eoorox/event_specific_pictures/omegatrix/OMEGATRIX_banner";

const YEAR_OPTIONS = ['1st Year', '2nd Year', '3rd Year', '4th Year'];
const DEPARTMENT_OPTIONS = ["CSE", "IT", "ECE", "EE", "BCA", "MCA", "Others"];
const COLLEGE_OPTIONS = [
  'B. P. Poddar Institute of Management & Technology',
  'Others'
];

const OmegatrixRegistration = () => {
  const history = useHistory();
  const [formData, setFormData] = useState({
    fullName: '',
    year: '',
    department: '',
    collegeName: '',
    collegeOther: '',
    collegeIdProof: null,
    contactNumber: '',
    emailAddress: '',
    joinWhatsappConfirmed: false,
    paymentMode: '',
    transactionId: '',
    transactionDate: '',
    paymentScreenshot: null,
    declarationEligibility: false,
    declarationRounds: false,
    declarationCarryItems: false,
    declarationRules: false,
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
      const file = files && files[0] ? files[0] : null;
      if (file && file.size > 2 * 1024 * 1024) {
        setErrors((prev) => ({ ...prev, [name]: 'File size must not exceed 2MB. Please choose a smaller file.' }));
        e.target.value = '';
        return;
      }
      nextValue = file;
    }

    setFormData((prev) => ({ ...prev, [name]: nextValue }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateStep1 = () => {
    const nextErrors = {};

    if (!formData.fullName.trim()) nextErrors.fullName = 'Full Name is required';
    if (!formData.year) nextErrors.year = 'Year is required';
    if (!formData.collegeName) nextErrors.collegeName = 'College selection is required';
    if (formData.collegeName === 'Others' && !formData.collegeOther.trim()) {
      nextErrors.collegeOther = 'Please specify your college name';
    }
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

    if (formData.declarationEligibility !== true) {
      nextErrors.declarationEligibility = 'Please accept declaration 1';
    }
    if (formData.declarationRounds !== true) {
      nextErrors.declarationRounds = 'Please accept declaration 2';
    }
    if (formData.declarationCarryItems !== true) {
      nextErrors.declarationCarryItems = 'Please accept declaration 3';
    }
    if (formData.declarationRules !== true) {
      nextErrors.declarationRules = 'Please accept declaration 4';
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
      const result = await submitEventRegistration('Omegatrix', formData);
      console.log('Omegatrix registration successful:', result);
      
      const regNumber = result.data?.registrationNumber || result.registrationNumber;
      
      if (regNumber) {
        setRegistrationNumber(regNumber);
        setSubmitSuccess(true);
      } else {
        throw new Error('Registration number not received from server');
      }
    } catch (error) {
      console.error('Registration error:', error);
      const msg = error?.message || '';
      let userMessage;
      if (msg.toLowerCase().includes('failed to fetch') || msg.toLowerCase().includes('network error') || msg.toLowerCase().includes('networkerror')) {
        userMessage = "We're unable to submit your registration. Please try again with the same payment screenshot and event details. For further assistance, contact Anik Paul - +91 91264 26769, Protyoy Bhandary - +91 82740 34667, Aniket De - +91 90389 03850.";
      } else if (msg.includes('FUNCTION_PAYLOAD_TOO_LARGE') || msg.toLowerCase().includes('request entity too large') || msg.toLowerCase().includes('payload too large')) {
        userMessage = 'Submission is too large. Please ensure all uploaded images are under 2MB and try again.';
      } else if (msg.toLowerCase().includes('duplicate')) {
        userMessage = 'You have already registered for this event with this email or phone number.';
      } else {
        userMessage = msg || 'Registration failed. Please try again or contact support if the issue persists.';
      }
      setErrors({ submit: userMessage });
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

          {errors.submit && (
            <div className="submit-error">
              <span className="submit-error-icon">⚠</span>
              <span>{errors.submit}</span>
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
                  <div className="mcq-group">
                    {COLLEGE_OPTIONS.map((option) => (
                      <label className="mcq-option" key={option}>
                        <input
                          type="radio"
                          name="collegeName"
                          value={option}
                          checked={formData.collegeName === option}
                          onChange={handleInputChange}
                        />
                        <span className="mcq-option-label">{option}</span>
                      </label>
                    ))}
                  </div>
                  {errors.collegeName && <div className="error-message">{errors.collegeName}</div>}
                </div>

                {formData.collegeName === 'Others' && (
                  <div className="form-group">
                    <label className="form-label required">Specify College Name</label>
                    <input
                      type="text"
                      name="collegeOther"
                      value={formData.collegeOther}
                      onChange={handleInputChange}
                      className="retro-input"
                      placeholder="Enter your college name"
                    />
                    {errors.collegeOther && <div className="error-message">{errors.collegeOther}</div>}
                  </div>
                )}

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

                <div className="form-group">
                  <label className="form-label required">Join Official WhatsApp Group</label>
                  <p style={{ margin: '10px 0' }}>
                    <a
                      href="https://chat.whatsapp.com/GX5lrda3fgl10nsOAFWdIn?mode=gi_t"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: '#ffc010' }}
                    >
                      https://chat.whatsapp.com/GX5lrda3fgl10nsOAFWdIn?mode=gi_t
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
                    <strong style={{ color: '#ffc010' }}>In-house (BPPIMT):</strong> ₹50 per participant
                    <br />
                    <strong style={{ color: '#ffc010' }}>Outside College:</strong> ₹60 per participant
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

            {/* Step 3: Mandatory Declaration */}
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
                  <h3 style={{ color: '#ffc010', marginBottom: '20px' }}>Omegatrix Event Rules</h3>
                  <ul style={{ color: '#ccc', lineHeight: '1.8', paddingLeft: '20px' }}>
                    <li>This is an individual event - no team participation allowed</li>
                    <li>All participants must carry a valid college ID card</li>
                    <li>Event consists of two rounds: Prelims (paper-based MCQ) and Mains (screen-based)</li>
                    <li>No negative marking in Prelims round</li>
                    <li>Only top scorers from Prelims qualify for Mains</li>
                    <li>Mobile phones, calculators, and AI tools are strictly prohibited</li>
                    <li>Late entry will not be permitted</li>
                    <li>No substitutions allowed after registration</li>
                    <li>Organizers' decision will be final and binding</li>
                    <li>Entry fee is non-refundable under any circumstances</li>
                  </ul>
                </div>

                <h2 className="form-section-title">&gt;&gt;&gt; Mandatory Declaration</h2>

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
          eventName="Omegatrix"
          onClose={() => setSubmitSuccess(false)}
        />
      )}
    </div>
  );
};

export default OmegatrixRegistration;
