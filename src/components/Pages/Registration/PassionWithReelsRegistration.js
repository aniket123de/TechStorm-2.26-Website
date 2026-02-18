import React, { useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { submitEventRegistration } from '../../../utils/eventRegistrationAPI';
import Breadcrumb from '../../Utilities/Breadcrumb/Breadcrumb';
import './Registration.css';
import passionWithReelsBanner from '../../../assets/img/event_specific_pictures/creative/passion_with_reels.png';

const MIN_PARTICIPANTS = 2;
const MAX_PARTICIPANTS = 8;
const YEAR_OPTIONS = ['1st Year', '2nd Year', '3rd Year', '4th Year'];

const createParticipant = () => ({
  name: '',
  contact: '',
  email: '',
  college: '',
  department: '',
  year: '',
  idFile: null
});

const PassionWithReelsRegistration = () => {
  const history = useHistory();

  const [formData, setFormData] = useState({
    teamName: '',
    filmName: '',
    numberOfParticipants: '2',
    participants: Array.from({ length: MAX_PARTICIPANTS }, createParticipant),
    paymentMode: '',
    transactionId: '',
    paymentDate: '',
    paymentScreenshot: null,
    cashReceipt: null,
    agreeToRules: false,
    whatsappConfirmed: false
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

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

  const validateForm = () => {
    const nextErrors = {};
    const numericCount = Number(formData.numberOfParticipants);

    if (!formData.teamName.trim()) {
      nextErrors.teamName = 'Team Name is required';
    }

    if (!formData.filmName.trim()) {
      nextErrors.filmName = 'Film Name is required';
    }

    if (!String(formData.numberOfParticipants).trim()) {
      nextErrors.numberOfParticipants = 'Number of Participants is required';
    } else if (!Number.isInteger(numericCount) || numericCount < MIN_PARTICIPANTS || numericCount > MAX_PARTICIPANTS) {
      nextErrors.numberOfParticipants = 'Participants must be an integer between 2 and 8';
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

      if (!participant.college.trim()) nextErrors[`participant_${i}_college`] = 'College Name is required';
      if (!participant.department.trim()) nextErrors[`participant_${i}_department`] = 'Department is required';
      if (!participant.year) nextErrors[`participant_${i}_year`] = 'Year is required';
      if (!participant.idFile) nextErrors[`participant_${i}_idFile`] = 'Participant ID file is required';
    }

    if (!formData.paymentMode) {
      nextErrors.paymentMode = 'Mode of Payment is required';
    }
    
    if (!formData.paymentDate) {
      nextErrors.paymentDate = 'Payment date is required';
    }

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
        nextErrors.cashReceipt = 'Upload cash receipt for offline payment';
      }
    }
    
    if (!formData.agreeToRules) {
      nextErrors.agreeToRules = 'You must agree to the event rules and regulations';
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
      const result = await submitEventRegistration('Passion With Reels', formData);
      console.log('Passion With Reels registration successful:', result);
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
        pageTitle="Register for Passion With Reels"
        currentPage="Registration"
        bgImage={passionWithReelsBanner}
      />

      <div className="registration-container">
        <div className="registration-content">
          <div className="registration-header">
            <h1 className="registration-title">Passion With Reels Registration Form</h1>
            <p className="registration-subtitle">Note: "*" = Mandatory</p>
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
                <label className="form-label required">Film Name</label>
                <input
                  type="text"
                  name="filmName"
                  value={formData.filmName}
                  onChange={handleFieldChange}
                  className="retro-input"
                  placeholder="Film Name"
                />
                {errors.filmName && <div className="error-message">{errors.filmName}</div>}
              </div>

              <div className="form-group">
                <label className="form-label required">Number of Participants (2-8)</label>
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

              return (
                <div className="form-section" key={number}>
                  <h2 className="form-section-title">{`>>> Participant ${number}`}</h2>

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
                    <label className="form-label required">College Name</label>
                    <input
                      type="text"
                      value={participant.college}
                      onChange={(e) => handleParticipantChange(index, 'college', e.target.value)}
                      className="retro-input"
                      placeholder={`Participant ${number} College Name`}
                    />
                    {errors[`participant_${index}_college`] && (
                      <div className="error-message">{errors[`participant_${index}_college`]}</div>
                    )}
                  </div>

                  <div className="form-group">
                    <label className="form-label required">Department</label>
                    <input
                      type="text"
                      value={participant.department}
                      onChange={(e) => handleParticipantChange(index, 'department', e.target.value)}
                      className="retro-input"
                      placeholder={`Participant ${number} Department`}
                    />
                    {errors[`participant_${index}_department`] && (
                      <div className="error-message">{errors[`participant_${index}_department`]}</div>
                    )}
                  </div>

                  <div className="form-group">
                    <label className="form-label required">Year</label>
                    <div className="mcq-group">
                      {YEAR_OPTIONS.map((option) => (
                        <label className="mcq-option" key={`${number}-${option}`}>
                          <input
                            type="radio"
                            name={`participantYear_${index}`}
                            value={option}
                            checked={participant.year === option}
                            onChange={(e) => handleParticipantChange(index, 'year', e.target.value)}
                          />
                          <span className="mcq-option-label">{option}</span>
                        </label>
                      ))}
                    </div>
                    {errors[`participant_${index}_year`] && (
                      <div className="error-message">{errors[`participant_${index}_year`]}</div>
                    )}
                  </div>

                  <div className="form-group">
                    <label className="form-label required">Participant ID (College ID / Library Card)</label>
                    <div className="file-upload-wrapper">
                      <div className="file-upload">
                        <input
                          type="file"
                          id={`participantId_${index}`}
                          className="file-upload-input"
                          accept="image/*,.pdf"
                          onChange={(e) =>
                            handleParticipantChange(
                              index,
                              'idFile',
                              e.target.files && e.target.files[0] ? e.target.files[0] : null
                            )
                          }
                        />
                        <label htmlFor={`participantId_${index}`} className="file-upload-label">
                          <div className="file-upload-icon">FILE</div>
                          <div className="file-upload-text">
                            <span className="highlight">Click to upload</span>
                            <br />
                            PNG, JPG, PDF
                          </div>
                        </label>
                      </div>
                      {participant.idFile && <div className="file-name">{participant.idFile.name}</div>}
                    </div>
                    {errors[`participant_${index}_idFile`] && (
                      <div className="error-message">{errors[`participant_${index}_idFile`]}</div>
                    )}
                  </div>
                </div>
              );
            })}

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
                      onChange={handleFieldChange}
                    />
                    <span className="mcq-option-label">Cash</span>
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

              <div className="form-group">
                <label className="form-label required">Payment Date</label>
                <input
                  type="date"
                  name="paymentDate"
                  value={formData.paymentDate}
                  onChange={handleFieldChange}
                  className="retro-input"
                  max={new Date().toISOString().split('T')[0]}
                />
                {errors.paymentDate && <div className="error-message">{errors.paymentDate}</div>}
              </div>

              {formData.paymentMode === 'online' && (
                <>
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
                    <label className="form-label required">Upload Payment Screenshot</label>
                    <div className="file-upload-wrapper">
                      <div className="file-upload">
                        <input
                          type="file"
                          name="paymentScreenshot"
                          id="paymentScreenshot"
                          className="file-upload-input"
                          accept="image/*,.pdf"
                          onChange={handleFieldChange}
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
                  <label className="form-label required">Upload Cash Receipt</label>
                  <div className="file-upload-wrapper">
                    <div className="file-upload">
                      <input
                        type="file"
                        name="cashReceipt"
                        id="cashReceipt"
                        className="file-upload-input"
                        accept="image/*,.pdf"
                        onChange={handleFieldChange}
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
              <h2 className="form-section-title">&gt;&gt;&gt; Rules & Regulations</h2>
              
              <div className="form-group">
                <label className="checkbox-group">
                  <input
                    type="checkbox"
                    name="agreeToRules"
                    checked={formData.agreeToRules}
                    onChange={handleFieldChange}
                  />
                  <span className="checkbox-custom"></span>
                  <span className="checkbox-label">
                    I agree to follow all event rules, regulations, and organizers' decisions. I understand the registration fee is non-refundable.
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
                    href="https://chat.whatsapp.com/F0eDr4BPqHOIjgK8zn4sLm"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: '#ffc010' }}
                  >
                    https://chat.whatsapp.com/F0eDr4BPqHOIjgK8zn4sLm
                  </a>
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

export default PassionWithReelsRegistration;
