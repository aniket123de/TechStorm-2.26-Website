import React, { useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { submitEventRegistration } from '../../../utils/eventRegistrationAPI';
import Breadcrumb from '../../Utilities/Breadcrumb/Breadcrumb';
import Stepper, { Step } from '../../Utilities/Stepper/Stepper';
import RegistrationSuccess from './RegistrationSuccess';
import './Registration.css';
import { cloudinaryImages } from '../../../config/cloudinary';
const qrCodeImage = cloudinaryImages.misc.qrCode;

const techHuntBanner = "https://res.cloudinary.com/ds3vepmkd/image/upload/f_auto,q_auto/v1/eoorox/event_specific_pictures/techHunt/techhunt_banner";

const MIN_PARTICIPANTS = 3;
const MAX_PARTICIPANTS = 5;
const YEAR_OPTIONS = ['1st Year', '2nd Year', '3rd Year', '4th Year'];
const DEPARTMENT_OPTIONS = ["CSE", "IT", "ECE", "EE", "BCA", "MCA", "Others"];
const COLLEGE_OPTIONS = [
  'B. P. Poddar Institute of Management & Technology',
  'Others'
];

const createParticipant = () => ({
  name: '',
  contact: '',
  email: '',
  college: '',
  collegeOther: '',
  year: '',
  department: '',
  idFile: null
});

const TechHuntRegistration = () => {
  const history = useHistory();

  const [formData, setFormData] = useState({
    teamName: '',
    numberOfParticipants: '3',
    participants: Array.from({ length: MAX_PARTICIPANTS }, createParticipant),
    paymentMode: '',
    transactionId: '',
    paymentReceipt: null,
    whatsappConfirmed: false,
    declarationRulesRead: false,
    declarationFairPlay: false,
    declarationLogistics: false,
    referralCode: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [registrationNumber, setRegistrationNumber] = useState(null);

  const participantCount = useMemo(() => {
    const parsed = Number(formData.numberOfParticipants);
    if (!Number.isInteger(parsed)) return MIN_PARTICIPANTS;
    return Math.max(MIN_PARTICIPANTS, Math.min(MAX_PARTICIPANTS, parsed));
  }, [formData.numberOfParticipants]);

  const handleFieldChange = (e) => {
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

  const handleParticipantChange = (index, field, value) => {
    setFormData((prev) => {
      const nextParticipants = [...prev.participants];
      nextParticipants[index] = {
        ...nextParticipants[index],
        [field]: value
      };

      return {
        ...prev,
        participants: nextParticipants
      };
    });

    const key = `participant_${index}_${field}`;
    if (errors[key]) {
      setErrors((prev) => ({ ...prev, [key]: '' }));
    }
  };

  const validateStep1 = () => {
    const nextErrors = {};
    const numericCount = Number(formData.numberOfParticipants);

    if (!formData.teamName.trim()) {
      nextErrors.teamName = 'Team Name is required';
    }

    if (!String(formData.numberOfParticipants).trim()) {
      nextErrors.numberOfParticipants = 'Number of Participants is required';
    } else if (!Number.isInteger(numericCount) || numericCount < MIN_PARTICIPANTS || numericCount > MAX_PARTICIPANTS) {
      nextErrors.numberOfParticipants = 'Participants must be an integer between 3 and 5';
    }

    for (let i = 0; i < participantCount; i += 1) {
      const participant = formData.participants[i];

      if (!participant.name.trim()) nextErrors[`participant_${i}_name`] = 'Name is required';

      if (!participant.contact.trim()) {
        nextErrors[`participant_${i}_contact`] = 'Contact Number is required';
      } else if (!/^\d{10,15}$/.test(participant.contact.replace(/\D/g, ''))) {
        nextErrors[`participant_${i}_contact`] = 'Enter a valid contact number';
      }

      if (!participant.email.trim()) {
        nextErrors[`participant_${i}_email`] = 'Email ID is required';
      } else if (!/\S+@\S+\.\S+/.test(participant.email)) {
        nextErrors[`participant_${i}_email`] = 'Invalid email format';
      }

      if (!participant.year) nextErrors[`participant_${i}_year`] = 'Year is required';
      if (!participant.idFile) nextErrors[`participant_${i}_idFile`] = 'ID card file is required';
      if (!participant.college) nextErrors[`participant_${i}_college`] = 'College selection is required';
      if (participant.college === 'Others' && !participant.collegeOther.trim()) {
        nextErrors[`participant_${i}_collegeOther`] = 'Please specify your college name';
      }
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const validateStep2 = () => {
    const nextErrors = {};

    if (!formData.paymentMode) {
      nextErrors.paymentMode = 'Mode of Payment is required';
    }

    if (formData.paymentMode === 'online') {
      if (!formData.transactionId.trim()) {
        nextErrors.transactionId = 'Transaction ID is required for online payment';
      }
      if (!formData.paymentReceipt) {
        nextErrors.paymentReceipt = 'Payment receipt is required for online payment';
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

    if (formData.declarationRulesRead !== true) {
      nextErrors.declarationRulesRead = 'Please accept this declaration';
    }

    if (formData.declarationFairPlay !== true) {
      nextErrors.declarationFairPlay = 'Please accept this declaration';
    }

    if (formData.declarationLogistics !== true) {
      nextErrors.declarationLogistics = 'Please accept this declaration';
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
      const result = await submitEventRegistration('Tech Hunt', formData);
      console.log('Tech Hunt registration successful:', result);
      
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
        pageTitle="Register for Tech Hunt"
        currentPage="Registration"
        bgImage={techHuntBanner}
      />

      <div className="registration-container">
        <div className="registration-content">
          <div className="registration-header">
            <h1 className="registration-title">Tech Hunt Registration Form</h1>
            <p className="registration-subtitle">Note: "*" Indicates Mandatory</p>
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
            {/* Step 1: Team & Participant Details */}
            <Step>
              <div className="form-section">
                <h2 className="form-section-title">&gt;&gt;&gt; Team Details</h2>

                <div className="form-group">
                  <label className="form-label required">Team Name</label>
                  <input
                    type="text"
                    name="teamName"
                    value={formData.teamName}
                    onChange={handleFieldChange}
                    className="retro-input"
                    placeholder="Team Name"
                  />
                  {errors.teamName && <div className="error-message">{errors.teamName}</div>}
                </div>

                <div className="form-group">
                  <label className="form-label required">Number of Participants</label>
                  <select
                    name="numberOfParticipants"
                    value={formData.numberOfParticipants}
                    onChange={handleFieldChange}
                    className="retro-input"
                  >
                    {Array.from({ length: MAX_PARTICIPANTS - MIN_PARTICIPANTS + 1 }, (_, i) => MIN_PARTICIPANTS + i).map(num => (
                      <option key={num} value={num}>{num} Participant{num > 1 ? 's' : ''}</option>
                    ))}
                  </select>
                  {errors.numberOfParticipants && (
                    <div className="error-message">{errors.numberOfParticipants}</div>
                  )}
                </div>
              </div>

              {Array.from({ length: participantCount }).map((_, index) => {
                const participant = formData.participants[index];
                const number = index + 1;
                const sectionTitle =
                  index === 0 ? '>>> Participant 1 (Team Leader)' : `>>> Participant ${number}`;

                return (
                  <div className="form-section" key={number}>
                    <h2 className="form-section-title">{sectionTitle}</h2>

                    <div className="form-group">
                      <label className="form-label required">Name</label>
                      <input
                        type="text"
                        value={participant.name}
                        onChange={(e) => handleParticipantChange(index, 'name', e.target.value)}
                        className="retro-input"
                        placeholder={`Participant ${number} Name`}
                      />
                      {errors[`participant_${index}_name`] && (
                        <div className="error-message">{errors[`participant_${index}_name`]}</div>
                      )}
                    </div>

                    <div className="form-group">
                      <label className="form-label required">Contact Number</label>
                      <input
                        type="text"
                        value={participant.contact}
                        onChange={(e) => handleParticipantChange(index, 'contact', e.target.value)}
                        className="retro-input"
                        placeholder={`Participant ${number} Contact Number`}
                      />
                      {errors[`participant_${index}_contact`] && (
                        <div className="error-message">{errors[`participant_${index}_contact`]}</div>
                      )}
                    </div>

                    <div className="form-group">
                      <label className="form-label required">Email ID</label>
                      <input
                        type="text"
                        value={participant.email}
                        onChange={(e) => handleParticipantChange(index, 'email', e.target.value)}
                        className="retro-input"
                        placeholder={`Participant ${number} Email ID`}
                      />
                      {errors[`participant_${index}_email`] && (
                        <div className="error-message">{errors[`participant_${index}_email`]}</div>
                      )}
                    </div>

                    <div className="form-group">
                      <label className="form-label required">Year</label>
                      <select
                        name={`participantYear_${index}`}
                        value={participant.year}
                        onChange={(e) => handleParticipantChange(index, 'year', e.target.value)}
                        className="retro-input"
                      >
                        <option value="">Select Year</option>
                        {YEAR_OPTIONS.map((yearOption) => (
                          <option key={`${number}_${yearOption}`} value={yearOption}>{yearOption}</option>
                        ))}
                      </select>
                      {errors[`participant_${index}_year`] && (
                        <div className="error-message">{errors[`participant_${index}_year`]}</div>
                      )}
                    </div>

                    <div className="form-group">
                      <label className="form-label">Department</label>
                      <select
                        name={`participantDepartment_${index}`}
                        value={participant.department}
                        onChange={(e) => handleParticipantChange(index, 'department', e.target.value)}
                        className="retro-input"
                      >
                        <option value="">Select Department</option>
                        {DEPARTMENT_OPTIONS.map((deptOption) => (
                          <option key={`${number}_${deptOption}`} value={deptOption}>{deptOption}</option>
                        ))}
                      </select>
                    </div>

                    <div className="form-group">
                      <label className="form-label required">Student ID card / Library Card</label>
                      <div className="file-upload-wrapper">
                        <div className="file-upload">
                          <input
                            type="file"
                            id={`participantId_${index}`}
                            className="file-upload-input"
                            accept="image/jpeg,image/jpg,image/png,.jpg,.jpeg,.png"
                            onChange={(e) =>
                              handleParticipantChange(index, 'idFile', e.target.files && e.target.files[0] ? e.target.files[0] : null)
                            }
                          />
                          <label htmlFor={`participantId_${index}`} className="file-upload-label">
                            <div className="file-upload-icon">📁</div>
                            <div className="file-upload-text">
                              <span className="highlight">Click to upload</span>
                              <br />
                              PNG, JPG, JPEG
                            </div>
                          </label>
                        </div>
                        {participant.idFile && <div className="file-name">✓ {participant.idFile.name}</div>}
                      </div>
                      {errors[`participant_${index}_idFile`] && (
                        <div className="error-message">{errors[`participant_${index}_idFile`]}</div>
                      )}
                    </div>

                    <div className="form-group">
                      <label className="form-label required">College</label>
                      <div className="mcq-group">
                        {COLLEGE_OPTIONS.map((option) => (
                          <label className="mcq-option" key={`${number}_${option}`}>
                            <input
                              type="radio"
                              name={`participantCollege_${index}`}
                              value={option}
                              checked={participant.college === option}
                              onChange={(e) => handleParticipantChange(index, 'college', e.target.value)}
                            />
                            <span className="mcq-option-label">{option}</span>
                          </label>
                        ))}
                      </div>
                      {errors[`participant_${index}_college`] && (
                        <div className="error-message">{errors[`participant_${index}_college`]}</div>
                      )}
                    </div>

                    {participant.college === 'Others' && (
                      <div className="form-group">
                        <label className="form-label required">Specify College Name</label>
                        <input
                          type="text"
                          value={participant.collegeOther}
                          onChange={(e) => handleParticipantChange(index, 'collegeOther', e.target.value)}
                          className="retro-input"
                          placeholder="Enter your college name"
                        />
                        {errors[`participant_${index}_collegeOther`] && (
                          <div className="error-message">{errors[`participant_${index}_collegeOther`]}</div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </Step>

            {/* Step 2: Payment */}
            <Step>
              <div className="form-section">
                <h2 className="form-section-title">&gt;&gt;&gt; Payment</h2>

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
                    <strong style={{ color: '#ffc010' }}>Fee:</strong> ₹200 per team
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
                        onChange={handleFieldChange}
                      />
                      <span className="mcq-option-label">Offline (Cash)</span>
                    </label>

                    <label className="mcq-option">
                      <input
                        type="radio"
                        name="paymentMode"
                        value="online"
                        checked={formData.paymentMode === 'online'}
                        onChange={handleFieldChange}
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
                        onChange={handleFieldChange}
                        className="retro-input"
                        placeholder="Transaction ID"
                      />
                      {errors.transactionId && <div className="error-message">{errors.transactionId}</div>}
                    </div>

                    <div className="form-group">
                      <label className="form-label required">Payment Receipt (Transaction Screenshot)</label>
                      <div className="file-upload-wrapper">
                        <div className="file-upload">
                          <input
                            type="file"
                            name="paymentReceipt"
                            id="paymentReceipt"
                            className="file-upload-input"
                            accept="image/jpeg,image/jpg,image/png,.jpg,.jpeg,.png"
                            onChange={handleFieldChange}
                          />
                          <label htmlFor="paymentReceipt" className="file-upload-label">
                            <div className="file-upload-icon">💳</div>
                            <div className="file-upload-text">
                              <span className="highlight">Click to upload</span>
                              <br />
                              PNG, JPG, PDF
                            </div>
                          </label>
                        </div>
                        {formData.paymentReceipt && <div className="file-name">✓ {formData.paymentReceipt.name}</div>}
                      </div>
                      {errors.paymentReceipt && <div className="error-message">{errors.paymentReceipt}</div>}
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
                  <h3 style={{ color: '#ffc010', marginBottom: '20px' }}>Tech Hunt Event Rules</h3>
                  <ul style={{ color: '#ccc', lineHeight: '1.8', paddingLeft: '20px' }}>
                    <li>All participants must carry a valid college ID card</li>
                    <li>Team size: 3-5 participants</li>
                    <li>Registration is mandatory for all participants</li>
                    <li>Participants must follow the event schedule strictly</li>
                    <li>Mobile phones, smart devices, AI tools, and calculators are prohibited</li>
                    <li>Any form of malpractice will lead to immediate disqualification</li>
                    <li>Organizers' decision will be final and binding</li>
                    <li>Entry fee is non-refundable under any circumstances</li>
                  </ul>
                </div>

                <h2 className="form-section-title">&gt;&gt;&gt; WhatsApp Group</h2>

                <div className="form-group">
                  <label className="form-label">Link</label>
                  <p style={{ margin: '10px 0' }}>
                    <a
                      href="https://chat.whatsapp.com/DW3NkqHcc7LEKanF4ZRpm1?mode=gi_t"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: '#ffc010' }}
                    >
                      https://chat.whatsapp.com/DW3NkqHcc7LEKanF4ZRpm1?mode=gi_t
                    </a>
                  </p>
                  <p style={{ margin: '8px 0 0', color: '#ffffff', fontSize: '11px', fontFamily: 'Press Start 2P, monospace' }}>
                    Every participant must join.
                  </p>
                </div>

                <div className="form-group">
                  <label className="checkbox-group">
                    <input
                      type="checkbox"
                      name="whatsappConfirmed"
                      checked={formData.whatsappConfirmed}
                      onChange={handleFieldChange}
                    />
                    <span className="checkbox-custom"></span>
                    <span className="checkbox-label">
                      I have checked all the details carefully and have joined the WhatsApp group
                    </span>
                  </label>
                  {errors.whatsappConfirmed && <div className="error-message">{errors.whatsappConfirmed}</div>}
                </div>

                <div className="form-group">
                  <label className="form-label">Referral Code (If Any)</label>
                  <input
                    type="text"
                    name="referralCode"
                    value={formData.referralCode}
                    onChange={handleFieldChange}
                    className="retro-input"
                    placeholder="Enter referral code (optional)"
                  />
                </div>

                <div className="form-group">
                  <label className="checkbox-group">
                    <input
                      type="checkbox"
                      name="declarationRulesRead"
                      checked={formData.declarationRulesRead}
                      onChange={handleFieldChange}
                    />
                    <span className="checkbox-custom"></span>
                    <span className="checkbox-label">
                      I have read all the above information carefully and will abide by the rules and regulations
                    </span>
                  </label>
                  {errors.declarationRulesRead && <div className="error-message">{errors.declarationRulesRead}</div>}
                </div>

                <div className="form-group">
                  <label className="checkbox-group">
                    <input
                      type="checkbox"
                      name="declarationFairPlay"
                      checked={formData.declarationFairPlay}
                      onChange={handleFieldChange}
                    />
                    <span className="checkbox-custom"></span>
                    <span className="checkbox-label">
                      I confirm that I will carry my College ID / Library Card. I understand that mobile phones, smart devices, AI tools, calculators, or any unfair means will lead to immediate disqualification.
                    </span>
                  </label>
                  {errors.declarationFairPlay && <div className="error-message">{errors.declarationFairPlay}</div>}
                </div>

                <div className="form-group">
                  <label className="checkbox-group">
                    <input
                      type="checkbox"
                      name="declarationLogistics"
                      checked={formData.declarationLogistics}
                      onChange={handleFieldChange}
                    />
                    <span className="checkbox-custom"></span>
                    <span className="checkbox-label">
                      I agree to follow all published logistics, scoring rules, tie-break criteria, and organizers&apos; decisions. I understand the registration fee is non-refundable.
                    </span>
                  </label>
                  {errors.declarationLogistics && <div className="error-message">{errors.declarationLogistics}</div>}
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
          eventName="Tech Hunt"
          onClose={() => setSubmitSuccess(false)}
        />
      )}
    </div>
  );
};

export default TechHuntRegistration;

