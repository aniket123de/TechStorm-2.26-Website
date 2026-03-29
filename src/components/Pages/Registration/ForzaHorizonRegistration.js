import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { submitEventRegistration } from '../../../utils/eventRegistrationAPI';
import Breadcrumb from '../../Utilities/Breadcrumb/Breadcrumb';
import Stepper, { Step } from '../../Utilities/Stepper/Stepper';
import RegistrationSuccess from './RegistrationSuccess';
import './Registration.css';
import { cloudinaryImages } from '../../../config/cloudinary';
const qrCodeImage = cloudinaryImages.misc.qrCode;

const forzaHorizonBanner = "https://res.cloudinary.com/ds3vepmkd/image/upload/f_auto,q_auto/v1/eoorox/event_specific_pictures/games/forza_horizon";

const YEAR_OPTIONS = ['1st Year', '2nd Year', '3rd Year', '4th Year'];
const DEPARTMENT_OPTIONS = ["CSE", "IT", "ECE", "EE", "BCA", "MCA", "Others"];
const COLLEGE_OPTIONS = [
  'B. P. Poddar Institute of Management & Technology',
  'Others'
];

const ForzaHorizonRegistration = () => {
  const history = useHistory();
  const [formData, setFormData] = useState({
    fullName: '',
    contactNumber: '',
    emailId: '',
    collegeName: '',
    collegeOther: '',
    year: '',
    department: '',
    participantIdProof: null,
    paymentMode: '',
    transactionId: '',
    paymentScreenshot: null,
    whatsappConfirmed: false,
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
    if (!formData.fullName.trim()) nextErrors.fullName = 'Participant Name is required';
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
    if (!formData.collegeName) nextErrors.collegeName = 'College selection is required';
    if (formData.collegeName === 'Others' && !formData.collegeOther.trim()) {
      nextErrors.collegeOther = 'Please specify your college name';
    }
    if (!formData.year) nextErrors.year = 'Year is required';
    if (!formData.participantIdProof) nextErrors.participantIdProof = 'Participant ID Proof is required';
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const validateStep2 = () => {
    const nextErrors = {};
    if (!formData.paymentMode) nextErrors.paymentMode = 'Mode of Payment is required';
    if (formData.paymentMode === 'online') {
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
    if (formData.whatsappConfirmed !== true) {
      nextErrors.whatsappConfirmed = 'Please confirm after joining the WhatsApp group';
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
    if (!validateStep2()) {
      console.log('❌ Final step validation failed');
      return;
    }
    
    setIsSubmitting(true);

    try {
      const result = await submitEventRegistration('Forza Horizon', formData);
      console.log('Forza Horizon registration successful:', result);
      
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
        pageTitle="Register for Forza Horizon"
        currentPage="Registration"
        bgImage={forzaHorizonBanner}
      />

      <div className="registration-container">
        <div className="registration-content">
          <div className="registration-header">
            <h1 className="registration-title">Forza Horizon Registration Form</h1>
            <p className="registration-subtitle">Note: "*" indicates mandatory fields.</p>
          </div>{errors.submit && (
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
            <Step>
              <div className="form-section">
                <h2 className="form-section-title">&gt;&gt;&gt; Participant Details</h2>

                <div className="form-group">
                  <label className="form-label required">Participant Name</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="retro-input"
                    placeholder="Enter your full name"
                  />
                  {errors.fullName && <div className="error-message">{errors.fullName}</div>}
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
                  <label className="form-label required">Year</label>
                  <select
                    name="year"
                    value={formData.year}
                    onChange={handleInputChange}
                    className="retro-input"
                  >
                    <option value="">Select Year</option>
                    {YEAR_OPTIONS.map((yearOption) => (
                      <option key={yearOption} value={yearOption}>{yearOption}</option>
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
                  <label className="form-label required">Participant ID Proof (College ID / Library Card)</label>
                  <div className="file-upload-wrapper">
                    <div className="file-upload">
                      <input
                        type="file"
                        name="participantIdProof"
                        id="participantIdProof"
                        className="file-upload-input"
                        accept="image/jpeg,image/jpg,image/png,.jpg,.jpeg,.png"
                        onChange={handleInputChange}
                      />
                      <label htmlFor="participantIdProof" className="file-upload-label">
                        <div className="file-upload-icon">📁</div>
                        <div className="file-upload-text">
                          <span className="highlight">Click to upload</span>
                          <br />
                          PNG, JPG, JPEG
                        </div>
                      </label>
                    </div>
                    {formData.participantIdProof && <div className="file-name">✓ {formData.participantIdProof.name}</div>}
                  </div>
                  {errors.participantIdProof && <div className="error-message">{errors.participantIdProof}</div>}
                </div>
              </div>
            </Step>

            <Step>
              <div className="form-section">
                <h2 className="form-section-title">&gt;&gt;&gt; Payment Details</h2>

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
                    <strong style={{ color: '#ffc010' }}>In-house (BPPIMT):</strong> ₹80 per participant
                    <br />
                    <strong style={{ color: '#ffc010' }}>Outside College:</strong> ₹100 per participant
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

            <Step>
              <div className="form-section">
                <h2 className="form-section-title">&gt;&gt;&gt; Rules & Communication</h2>
                
                <div className="rules-container" style={{ 
                  background: '#1a1a1a', 
                  padding: '30px', 
                  borderRadius: '8px',
                  marginBottom: '30px',
                  border: '2px solid #333'
                }}>
                  <h3 style={{ color: '#ffc010', marginBottom: '20px' }}>Forza Horizon Event Rules</h3>
                  <ul style={{ color: '#ccc', lineHeight: '1.8', paddingLeft: '20px' }}>
                    <li>All participants must carry a valid college ID card</li>
                    <li>Registration is mandatory for all participants</li>
                    <li>Participants must follow the event schedule strictly</li>
                    <li>Any form of malpractice will lead to disqualification</li>
                    <li>Organizers' decision will be final and binding</li>
                    <li>Entry fee is non-refundable under any circumstances</li>
                  </ul>
                </div>

                <div className="form-group">
                  <label className="form-label required">Join WhatsApp Group</label>
                  <p style={{ margin: '10px 0' }}>
                    <a
                      href="https://chat.whatsapp.com/LUkCLLC2wS83vAKLMvS9O7?mode=gi_t"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: '#ffc010' }}
                    >
                      https://chat.whatsapp.com/LUkCLLC2wS83vAKLMvS9O7?mode=gi_t
                    </a>
                  </p>
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
          eventName="Forza Horizon"
          onClose={() => setSubmitSuccess(false)}
        />
      )}
    </div>
  );
};

export default ForzaHorizonRegistration;
