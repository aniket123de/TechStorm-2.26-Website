import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { submitEventRegistration } from '../../../utils/eventRegistrationAPI';
import Breadcrumb from '../../Utilities/Breadcrumb/Breadcrumb';
import Stepper, { Step } from '../../Utilities/Stepper/Stepper';
import RegistrationSuccess from './RegistrationSuccess';
import './Registration.css';
import qrCodeImage from '../../../assets/img/QrCode_For_Payment.jpg.jpeg';

const fifaMobileBanner = "https://res.cloudinary.com/dyj3kxni2/image/upload/v1772034191/eoorox/event_specific_pictures/games/fifa_mobile.png";

const YEAR_OPTIONS = ['1st Year', '2nd Year', '3rd Year', '4th Year'];
const DEPARTMENT_OPTIONS = ["CSE", "IT", "ECE", "EE", "BCA", "MCA", "Others"];
const COLLEGE_OPTIONS = [
  'B. P. Poddar Institute of Management & Technology',
  'Others'
];

const FifaMobileRegistration = () => {
  const history = useHistory();
  const [formData, setFormData] = useState({
    fullName: '',
    collegeName: '',
    collegeOther: '',
    department: '',
    yearOfStudy: '',
    contactNumber: '',
    emailAddress: '',
    collegeIdProof: null,
    fifaUsername: '',
    teamOvr: '',
    deviceModel: '',
    paymentMode: '',
    transactionId: '',
    paymentDate: '',
    paymentReceipt: null,
    agreeToRules: false,
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
      nextValue = files && files[0] ? files[0] : null;
    }
    
    setFormData((prev) => ({ ...prev, [name]: nextValue }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateStep1 = () => {
    const nextErrors = {};
    if (!formData.fullName.trim()) nextErrors.fullName = 'Full Name is required';
    if (!formData.collegeName) nextErrors.collegeName = 'College selection is required';
    if (formData.collegeName === 'Others' && !formData.collegeOther.trim()) {
      nextErrors.collegeOther = 'Please specify your college name';
    }
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
    if (!formData.collegeIdProof) nextErrors.collegeIdProof = 'College ID / Library Card upload is required';
    if (!formData.fifaUsername.trim()) nextErrors.fifaUsername = 'FIFA Mobile Username is required';
    if (!formData.teamOvr.trim()) nextErrors.teamOvr = 'Team OVR is required';
    if (!formData.deviceModel.trim()) nextErrors.deviceModel = 'Device Model is required';
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const validateStep2 = () => {
    const nextErrors = {};
    if (!formData.paymentMode) nextErrors.paymentMode = 'Payment mode is required';
    if (formData.paymentMode === 'online') {
      if (!formData.paymentDate) nextErrors.paymentDate = 'Payment date is required';
      if (!formData.transactionId.trim()) {
        nextErrors.transactionId = 'Transaction ID is required for online payment';
      }
      if (!formData.paymentReceipt) {
        nextErrors.paymentReceipt = 'Payment screenshot is required for online payment';
      }
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const validateStep3 = () => {
    const nextErrors = {};
    if (formData.agreeToRules !== true) nextErrors.agreeToRules = 'You must agree to tournament rules';
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
    if (!validateStep3()) {
      console.log('❌ Final step validation failed');
      return;
    }
    
    setIsSubmitting(true);

    try {
      const result = await submitEventRegistration('FIFA Mobile', formData);
      console.log('FIFA Mobile registration successful:', result);
      
      const regNumber = result.data?.registrationNumber || result.registrationNumber;
      
      if (regNumber) {
        setRegistrationNumber(regNumber);
        setSubmitSuccess(true);
      } else {
        throw new Error('Registration number not received from server');
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
                  <label className="form-label required">Department / Branch</label>
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
                  {errors.department && <div className="error-message">{errors.department}</div>}
                </div>

                <div className="form-group">
                  <label className="form-label required">Year of Study</label>
                  <select
                    name="yearOfStudy"
                    value={formData.yearOfStudy}
                    onChange={handleInputChange}
                    className="retro-input"
                  >
                    <option value="">Select Year</option>
                    {YEAR_OPTIONS.map((yearOption) => (
                      <option key={yearOption} value={yearOption}>{yearOption}</option>
                    ))}
                  </select>
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
            </Step>

            {/* Step 2: Payment Information */}
            <Step>
              <div className="form-section">
                <h2 className="form-section-title">&gt;&gt;&gt; Payment Information</h2>

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
                        name="paymentDate"
                        value={formData.paymentDate}
                        onChange={handleInputChange}
                        className="retro-input"
                        max={new Date().toISOString().split('T')[0]}
                      />
                      {errors.paymentDate && <div className="error-message">{errors.paymentDate}</div>}
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
                            name="paymentReceipt"
                            id="paymentReceipt"
                            onChange={(e) => {
                              const file = e.target.files[0];
                              setFormData(prev => ({ ...prev, paymentReceipt: file }));
                              if (errors.paymentReceipt) {
                                setErrors(prev => ({ ...prev, paymentReceipt: '' }));
                              }
                            }}
                            className="file-upload-input"
                            accept="image/jpeg,image/jpg,image/png,.jpg,.jpeg,.png"
                          />
                          <label htmlFor="paymentReceipt" className="file-upload-label">
                            <div className="file-upload-icon">💳</div>
                            <div className="file-upload-text">
                              <span className="highlight">Click to upload</span><br/>
                              Payment screenshot<br/>
                              (PNG, JPG, JPEG)
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
                  </>
                )}

                {formData.paymentMode === 'offline' && (
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
                <h2 className="form-section-title">&gt;&gt;&gt; Rules & Agreement</h2>

                <div className="rules-container" style={{ 
                  background: '#1a1a1a', 
                  padding: '30px', 
                  borderRadius: '8px',
                  marginBottom: '30px',
                  border: '2px solid #333'
                }}>
                  <h3 style={{ color: '#ffc010', marginBottom: '20px' }}>FIFA Mobile Tournament Rules</h3>
                  <ul style={{ color: '#ccc', lineHeight: '1.8', paddingLeft: '20px' }}>
                    <li>All participants must carry a valid college ID card</li>
                    <li>Registration is mandatory for all participants</li>
                    <li>Participants must follow the tournament schedule strictly</li>
                    <li>Any form of cheating or malpractice will lead to disqualification</li>
                    <li>Organizers' decision will be final and binding</li>
                    <li>Entry fee is non-refundable under any circumstances</li>
                  </ul>
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

                <div className="form-group">
                  <h3 className="form-section-title">&gt;&gt;&gt; WhatsApp Group</h3>
                  <label className="form-label">Link</label>
                  <p style={{ margin: '10px 0' }}>
                    <a
                      href="https://chat.whatsapp.com/CEmHyQs0gdL0iM6l0PAFY3"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: '#ffc010' }}
                    >
                      https://chat.whatsapp.com/CEmHyQs0gdL0iM6l0PAFY3
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
                      Yes, I have joined the WhatsApp group
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
          eventName="FIFA Mobile"
          onClose={() => setSubmitSuccess(false)}
        />
      )}
    </div>
  );
};

export default FifaMobileRegistration;
