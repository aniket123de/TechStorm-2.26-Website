import React, { useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { submitEventRegistration } from '../../../utils/eventRegistrationAPI';
import Breadcrumb from '../../Utilities/Breadcrumb/Breadcrumb';
import './Registration.css';
import creativeCanvasBanner from '../../../assets/img/event_specific_pictures/creative/creative_canvas.png';

const MIN_PARTICIPANTS = 1;
const MAX_PARTICIPANTS = 2;
const YEAR_OPTIONS = ['1st', '2nd', '3rd', '4th'];
const COLLEGE_OPTIONS = [
  'B.P. PODDAR INSTITUTE OF MANAGEMENT & TECHNOLOGY',
  'OTHERS'
];

const createParticipant = () => ({
  name: '',
  contact: '',
  email: '',
  college: '',
  year: '',
  idFile: null
});

const CreativeCanvasRegistration = () => {
  const history = useHistory();

  const [formData, setFormData] = useState({
    teamName: '',
    numberOfParticipants: '1',
    participants: Array.from({ length: MAX_PARTICIPANTS }, createParticipant),
    paymentMode: '',
    transactionId: '',
    paymentReceipt: null,
    cashReceipt: null,
    whatsappConfirmed: false,
    agreeToRules: false
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
    const participant1 = formData.participants[0];
    const participant2 = formData.participants[1];

    if (!formData.teamName.trim()) {
      nextErrors.teamName = 'Team Name is required';
    }

    if (!String(formData.numberOfParticipants).trim()) {
      nextErrors.numberOfParticipants = 'Number of Participants is required';
    } else if (!Number.isInteger(numericCount) || numericCount < MIN_PARTICIPANTS || numericCount > MAX_PARTICIPANTS) {
      nextErrors.numberOfParticipants = 'Participants must be an integer between 1 and 2';
    }

    if (!participant1.name.trim()) nextErrors.participant_0_name = 'Name is required';

    if (!participant1.contact.trim()) {
      nextErrors.participant_0_contact = 'Contact Number is required';
    } else if (!/^\d{10,15}$/.test(participant1.contact.replace(/\D/g, ''))) {
      nextErrors.participant_0_contact = 'Enter a valid contact number';
    }

    if (!participant1.email.trim()) {
      nextErrors.participant_0_email = 'Email ID is required';
    } else if (!/\S+@\S+\.\S+/.test(participant1.email)) {
      nextErrors.participant_0_email = 'Invalid email format';
    }

    if (!participant1.college) nextErrors.participant_0_college = 'College selection is required';
    if (!participant1.idFile) nextErrors.participant_0_idFile = 'Participant ID file is required';

    if (participant2.contact.trim() && !/^\d{10,15}$/.test(participant2.contact.replace(/\D/g, ''))) {
      nextErrors.participant_1_contact = 'Enter a valid contact number';
    }

    if (participant2.email.trim() && !/\S+@\S+\.\S+/.test(participant2.email)) {
      nextErrors.participant_1_email = 'Invalid email format';
    }

    if (!formData.paymentMode) {
      nextErrors.paymentMode = 'Mode of Payment is required';
    }

    if (formData.paymentMode === 'online') {
      if (!formData.transactionId.trim()) {
        nextErrors.transactionId = 'Transaction ID is required for online payment';
      }
      if (!formData.paymentReceipt) {
        nextErrors.paymentReceipt = 'Upload payment receipt screenshot for online payment';
      }
    }

    if (formData.paymentMode === 'cash') {
      if (!formData.cashReceipt) {
        nextErrors.cashReceipt = 'Upload cash receipt photocopy for offline payment';
      }
    }

    if (!formData.whatsappConfirmed) {
      nextErrors.whatsappConfirmed = 'Please confirm after joining the WhatsApp group';
    }

    if (!formData.agreeToRules) {
      nextErrors.agreeToRules = 'You must agree to the rules and regulations';
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
      const result = await submitEventRegistration('Creative Canvas', formData);
      console.log('Creative Canvas registration successful:', result);
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
        pageTitle="Register for Creative Canvas"
        currentPage="Registration"
        bgImage={creativeCanvasBanner}
      />

      <div className="registration-container">
        <div className="registration-content">
          <div className="registration-header">
            <h1 className="registration-title">Creative Canvas Registration Form</h1>
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
                <label className="form-label required">Number of Participants</label>
                <input
                  type="number"
                  name="numberOfParticipants"
                  min={MIN_PARTICIPANTS}
                  max={MAX_PARTICIPANTS}
                  value={formData.numberOfParticipants}
                  onChange={handleFieldChange}
                  className="retro-input"
                  placeholder="Enter number between 1 and 2"
                />
                {errors.numberOfParticipants && (
                  <div className="error-message">{errors.numberOfParticipants}</div>
                )}
              </div>
            </div>

            {Array.from({ length: participantCount }).map((_, index) => {
              const participant = formData.participants[index];
              const number = index + 1;
              const isParticipantOne = index === 0;
              const requiredClass = isParticipantOne ? 'required' : '';

              return (
                <div className="form-section" key={number}>
                  <h2 className="form-section-title">{`>>> Participant ${number}`}</h2>

                  <div className="form-group">
                    <label className={`form-label ${requiredClass}`}>Name</label>
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
                    <label className={`form-label ${requiredClass}`}>Contact Number</label>
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
                    <label className={`form-label ${requiredClass}`}>Email ID</label>
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
                    <label className={`form-label ${requiredClass}`}>College Name</label>
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

                  <div className="form-group">
                    <label className="form-label">Year</label>
                    <div className="mcq-group">
                      {YEAR_OPTIONS.map((yearOption) => (
                        <label className="mcq-option" key={`${number}_${yearOption}`}>
                          <input
                            type="radio"
                            name={`participantYear_${index}`}
                            value={yearOption}
                            checked={participant.year === yearOption}
                            onChange={(e) => handleParticipantChange(index, 'year', e.target.value)}
                          />
                          <span className="mcq-option-label">{yearOption}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="form-group">
                    <label className={`form-label ${requiredClass}`}>
                      Participants Id (if student then College id / library card)
                    </label>
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
                <label className="form-label">Payment Receipt (Upload the screenshot)</label>
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

              <div className="form-group">
                <label className="form-label">Upload cash Receipt photocopy (In Case of Offline)</label>
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
            </div>

            <div className="form-section">
              <h2 className="form-section-title">&gt;&gt;&gt; WhatsApp Group Link</h2>
              <div className="form-group">
                <p style={{ margin: 0, color: '#ffffff', fontSize: '11px', fontFamily: 'Press Start 2P, monospace' }}>
                  Every Participants must join!
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
                    name="agreeToRules"
                    checked={formData.agreeToRules}
                    onChange={handleFieldChange}
                  />
                  <span className="checkbox-custom"></span>
                  <span className="checkbox-label">
                    I have read all the above information carefully and will abide by the rules and regulations
                  </span>
                </label>
                {errors.agreeToRules && <div className="error-message">{errors.agreeToRules}</div>}
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

export default CreativeCanvasRegistration;
