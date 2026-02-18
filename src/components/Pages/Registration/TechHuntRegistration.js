import React, { useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { submitEventRegistration } from '../../../utils/eventRegistrationAPI';
import Breadcrumb from '../../Utilities/Breadcrumb/Breadcrumb';
import './Registration.css';
import techHuntBanner from '../../../assets/img/event_specific_pictures/techHunt/techhunt_banner.png';

const MIN_PARTICIPANTS = 2;
const MAX_PARTICIPANTS = 5;
const COLLEGE_OPTIONS = [
  'B.P. Poddar Institute of Management & Technology (BPPIMT)',
  'Others'
];

const createParticipant = () => ({
  name: '',
  contact: '',
  email: '',
  college: '',
  idFile: null
});

const TechHuntRegistration = () => {
  const history = useHistory();

  const [formData, setFormData] = useState({
    teamName: '',
    numberOfParticipants: '2',
    participants: Array.from({ length: MAX_PARTICIPANTS }, createParticipant),
    paymentMode: '',
    transactionId: '',
    paymentReceipt: null,
    whatsappConfirmed: false,
    declarationRulesRead: false,
    declarationFairPlay: false,
    declarationLogistics: false
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

    if (!String(formData.numberOfParticipants).trim()) {
      nextErrors.numberOfParticipants = 'Number of Participants is required';
    } else if (!Number.isInteger(numericCount) || numericCount < MIN_PARTICIPANTS || numericCount > MAX_PARTICIPANTS) {
      nextErrors.numberOfParticipants = 'Participants must be an integer between 2 and 5';
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

      if (!participant.idFile) nextErrors[`participant_${i}_idFile`] = 'ID card file is required';
      if (!participant.college) nextErrors[`participant_${i}_college`] = 'College selection is required';
    }

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

    if (!formData.whatsappConfirmed) {
      nextErrors.whatsappConfirmed = 'Please confirm after joining the WhatsApp group';
    }

    if (!formData.declarationRulesRead) {
      nextErrors.declarationRulesRead = 'Please accept this declaration';
    }

    if (!formData.declarationFairPlay) {
      nextErrors.declarationFairPlay = 'Please accept this declaration';
    }

    if (!formData.declarationLogistics) {
      nextErrors.declarationLogistics = 'Please accept this declaration';
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
      const result = await submitEventRegistration('Tech Hunt', formData);
      console.log('Tech Hunt registration successful:', result);
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
                    <label className="form-label required">Student ID card / Library Card</label>
                    <div className="file-upload-wrapper">
                      <div className="file-upload">
                        <input
                          type="file"
                          id={`participantId_${index}`}
                          className="file-upload-input"
                          accept="image/*,.pdf"
                          onChange={(e) =>
                            handleParticipantChange(index, 'idFile', e.target.files && e.target.files[0] ? e.target.files[0] : null)
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
                </div>
              );
            })}

            <div className="form-section">
              <h2 className="form-section-title">&gt;&gt;&gt; Payment</h2>

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

              <div className="form-group">
                <label className="form-label">Transaction ID</label>
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
                <label className="form-label">Payment Receipt (Transaction Screenshot)</label>
                <div className="file-upload-wrapper">
                  <div className="file-upload">
                    <input
                      type="file"
                      name="paymentReceipt"
                      id="paymentReceipt"
                      className="file-upload-input"
                      accept="image/*,.pdf"
                      onChange={handleFieldChange}
                    />
                    <label htmlFor="paymentReceipt" className="file-upload-label">
                      <div className="file-upload-icon">FILE</div>
                      <div className="file-upload-text">
                        <span className="highlight">Click to upload</span>
                        <br />
                        PNG, JPG, PDF
                      </div>
                    </label>
                  </div>
                  {formData.paymentReceipt && <div className="file-name">{formData.paymentReceipt.name}</div>}
                </div>
                {errors.paymentReceipt && <div className="error-message">{errors.paymentReceipt}</div>}
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

export default TechHuntRegistration;
