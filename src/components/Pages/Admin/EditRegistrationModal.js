import React, { useState, useEffect } from 'react';
import { getRegistrationById } from '../../../utils/adminDashboardAPI';
import './Modal.css';

/** Get first non-empty string from an object for given keys. Display/initialization only. */
function getFromObj(obj, ...keys) {
  if (!obj || typeof obj !== 'object') return '';
  for (const k of keys) {
    const v = obj[k];
    if (v != null && String(v).trim() !== '') return String(v).trim();
  }
  return '';
}

/** Get value by scanning object for any key whose name matches pattern (e.g. 'year', 'department'). */
function getFromObjByKeyMatch(obj, ...patterns) {
  if (!obj || typeof obj !== 'object') return '';
  for (const key of Object.keys(obj)) {
    const lower = key.toLowerCase();
    if (patterns.some(p => lower.includes(p))) {
      const v = obj[key];
      if (v != null && typeof v === 'string' && v.trim() !== '') return v.trim();
      if (v != null && typeof v === 'number') return String(v);
    }
  }
  return '';
}

/** Get value from registration or first participant. Used to initialize edit form. */
function getEditValue(reg, ...keys) {
  if (!reg || typeof reg !== 'object') return '';
  const fromReg = getFromObj(reg, ...keys);
  if (fromReg) return fromReg;
  const first = reg.participants && reg.participants[0];
  if (first && typeof first === 'object') return getFromObj(first, ...keys);
  return '';
}

/** Like getEditValue but also scans reg and first participant for keys matching patterns (e.g. year, department). */
function getEditValueWithScan(reg, keys, patterns) {
  const fromKeys = getEditValue(reg, ...keys);
  if (fromKeys) return fromKeys;
  if (!reg || typeof reg !== 'object') return '';
  const fromRegScan = getFromObjByKeyMatch(reg, ...patterns);
  if (fromRegScan) return fromRegScan;
  const first = reg.participants && reg.participants[0];
  if (first && typeof first === 'object') return getFromObjByKeyMatch(first, ...patterns);
  return '';
}

/** Normalize participants array for edit form: ensure name, email, contact, etc. from any key. */
function normalizeParticipants(participants) {
  if (!Array.isArray(participants)) return [];
  return participants.map(p => ({
    ...p,
    name: getFromObj(p, 'name', 'fullName', 'full_name') || p.name || '',
    email: getFromObj(p, 'email', 'emailAddress') || p.email || '',
    contact: getFromObj(p, 'contact', 'phone', 'contactNumber') || p.contact || '',
    college: getFromObj(p, 'college', 'collegeName') || p.college || '',
    year: getFromObj(p, 'year', 'yearOfStudy') || p.year || '',
    department: getFromObj(p, 'department') || p.department || '',
  }));
}

/** Build initial form state from a full registration object (from API or list). */
function buildInitialFormData(reg) {
  if (!reg || typeof reg !== 'object') return null;
  return {
    fullName: getEditValue(reg, 'fullName', 'full_name', 'name') || '',
    emailAddress: getEditValue(reg, 'emailAddress', 'email') || '',
    contactNumber: getEditValue(reg, 'contactNumber', 'phone', 'contact') || '',
    collegeName: getEditValue(reg, 'collegeName', 'college', 'institution') || '',
    year: getEditValueWithScan(reg, ['year', 'yearOfStudy', 'year_of_study'], ['year']) || '',
    department: getEditValueWithScan(reg, ['department', 'dept'], ['department', 'dept']) || '',
    streamBranch: getEditValueWithScan(reg, ['streamBranch', 'stream', 'stream_branch', 'branch'], ['stream', 'branch']) || '',
    studentId: getEditValue(reg, 'studentId', 'rollNumber') || '',
    teamName: getFromObj(reg, 'teamName') || '',
    teamSize: getFromObj(reg, 'teamSize', 'numberOfParticipants') || '1',
    teamMember2Name: getFromObj(reg, 'teamMember2Name') || '',
    teamMember2Email: getFromObj(reg, 'teamMember2Email') || '',
    teamMember2Phone: getFromObj(reg, 'teamMember2Phone') || '',
    teamMember3Name: getFromObj(reg, 'teamMember3Name') || '',
    teamMember3Email: getFromObj(reg, 'teamMember3Email') || '',
    teamMember3Phone: getFromObj(reg, 'teamMember3Phone') || '',
    teamMember4Name: getFromObj(reg, 'teamMember4Name') || '',
    teamMember4Email: getFromObj(reg, 'teamMember4Email') || '',
    teamMember4Phone: getFromObj(reg, 'teamMember4Phone') || '',
    participants: normalizeParticipants(reg.participants || []),
    fifaUsername: getEditValue(reg, 'fifaUsername') || '',
    teamOvr: getEditValue(reg, 'teamOvr', 'teamOVR', 'ovr') || '',
    deviceModel: getFromObj(reg, 'deviceModel') || '',
    gameUsername: getFromObj(reg, 'gameUsername') || '',
    playerRating: getFromObj(reg, 'playerRating') || '',
    gamingPlatform: getFromObj(reg, 'gamingPlatform') || '',
    paymentMode: getFromObj(reg, 'paymentMode', 'paymentMethod') || 'online',
    transactionId: getFromObj(reg, 'transactionId') || '',
    paymentStatus: getFromObj(reg, 'paymentStatus') || 'pending',
    registrationStatus: getFromObj(reg, 'registrationStatus') || 'pending',
  };
}

const EditRegistrationModal = ({ registration, onClose, onSave }) => {
  const [fullRegistration, setFullRegistration] = useState(null);
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);
  const [saveError, setSaveError] = useState(null);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('basic');

  // Fetch full registration from API when modal opens so the form has complete data
  useEffect(() => {
    if (!registration || !registration._id) {
      setLoading(false);
      setFetchError('No registration selected');
      return;
    }
    const eventName = registration.eventName || registration.event;
    if (!eventName) {
      setFullRegistration(registration);
      setFormData(buildInitialFormData(registration));
      setLoading(false);
      return;
    }
    let cancelled = false;
    setLoading(true);
    setFetchError(null);
    getRegistrationById(eventName, registration._id)
      .then((result) => {
        if (cancelled) return;
        const data = result.registration || result;
        const regWithEvent = { ...data, eventName: data.eventName || eventName };
        setFullRegistration(regWithEvent);
        setFormData(buildInitialFormData(regWithEvent));
      })
      .catch((err) => {
        if (cancelled) return;
        setFetchError(err.message || 'Failed to load registration');
        setFullRegistration(registration);
        setFormData(buildInitialFormData(registration));
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, [registration]);

  const displayReg = fullRegistration || registration;
  const hasGameDetails = !!(
    formData?.fifaUsername ||
    formData?.teamOvr ||
    formData?.gameUsername ||
    formData?.playerRating ||
    formData?.deviceModel ||
    formData?.gamingPlatform ||
    getFromObj(displayReg, 'fifaUsername', 'teamOvr', 'teamOVR', 'ovr', 'gameUsername', 'playerRating', 'deviceModel', 'gamingPlatform') ||
    (displayReg?.eventName && String(displayReg.eventName).toLowerCase().includes('fifa'))
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleParticipantChange = (index, field, value) => {
    const updatedParticipants = [...formData.participants];
    if (!updatedParticipants[index]) {
      updatedParticipants[index] = {};
    }
    updatedParticipants[index][field] = value;
    setFormData(prev => ({ ...prev, participants: updatedParticipants }));
  };

  const addParticipant = () => {
    setFormData(prev => ({
      ...prev,
      participants: [...prev.participants, { name: '', email: '', contact: '', college: '', year: '', department: '' }]
    }));
  };

  const removeParticipant = (index) => {
    setFormData(prev => ({
      ...prev,
      participants: prev.participants.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData) return;
    setSaveError(null);
    setSaving(true);

    // Clean up data - remove empty fields
    const cleanedData = Object.entries(formData).reduce((acc, [key, value]) => {
      if (value !== '' && value !== null && value !== undefined) {
        acc[key] = value;
      }
      return acc;
    }, {});

    try {
      await onSave(registration._id, cleanedData);
      onClose();
    } catch (err) {
      setSaveError(err?.message || 'Failed to update registration');
    } finally {
      setSaving(false);
    }
  };

  const teamSize = formData ? parseInt(formData.teamSize) || 1 : 0;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content large-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <h2>Edit Registration</h2>
            <p className="modal-subtitle">{displayReg ? getFromObj(displayReg, 'registrationNumber') || '—' : '—'}</p>
          </div>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        {loading ? (
          <div className="modal-body">
            <div className="modal-inline-loading" aria-busy="true">
              <span className="loader-spinner" aria-hidden="true" />
              <p>Loading registration details…</p>
            </div>
          </div>
        ) : !formData ? (
          <div className="modal-body">
            <div className="admin-error-state" style={{ maxWidth: 'none', margin: 0 }}>
              <p className="admin-error-message">{fetchError || 'Failed to load registration'}</p>
              <button type="button" className="btn-secondary" onClick={onClose}>Close</button>
            </div>
          </div>
        ) : (
        <>

        {/* Tabs */}
        <div className="modal-tabs">
          <button 
            className={`tab-btn ${activeTab === 'basic' ? 'active' : ''}`}
            onClick={() => setActiveTab('basic')}
          >
            Basic Info
          </button>
          <button 
            className={`tab-btn ${activeTab === 'team' ? 'active' : ''}`}
            onClick={() => setActiveTab('team')}
          >
            Team Members
          </button>
          <button 
            className={`tab-btn ${activeTab === 'payment' ? 'active' : ''}`}
            onClick={() => setActiveTab('payment')}
          >
            Payment & Status
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            {saveError && (
              <div className="admin-error-state" style={{ maxWidth: 'none', marginBottom: '16px' }}>
                <p className="admin-error-message">{saveError}</p>
              </div>
            )}

            {/* Basic Info Tab */}
            {activeTab === 'basic' && (
              <>
                <div className="form-section">
                  <h3>Participant Information</h3>
                  <div className="form-grid">
                    <div className="form-field">
                      <label>Full Name *</label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-field">
                      <label>Email Address *</label>
                      <input
                        type="email"
                        name="emailAddress"
                        value={formData.emailAddress}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-field">
                      <label>Contact Number *</label>
                      <input
                        type="tel"
                        name="contactNumber"
                        value={formData.contactNumber}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-field">
                      <label>College Name *</label>
                      <input
                        type="text"
                        name="collegeName"
                        value={formData.collegeName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-field">
                      <label>Year of Study</label>
                      <input
                        type="text"
                        name="year"
                        value={formData.year}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-field">
                      <label>Department</label>
                      <input
                        type="text"
                        name="department"
                        value={formData.department}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-field">
                      <label>Stream/Branch</label>
                      <input
                        type="text"
                        name="streamBranch"
                        value={formData.streamBranch}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>

                <div className="form-section">
                  <h3>Team Information</h3>
                  <div className="form-grid">
                    <div className="form-field">
                      <label>Team Name</label>
                      <input
                        type="text"
                        name="teamName"
                        value={formData.teamName}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-field">
                      <label>Team Size</label>
                      <input
                        type="number"
                        name="teamSize"
                        value={formData.teamSize}
                        onChange={handleChange}
                        min="1"
                        max="10"
                      />
                    </div>
                  </div>
                </div>

                {/* Game-specific fields */}
                {hasGameDetails && (
                  <div className="form-section">
                    <h3>Game Details</h3>
                    <div className="form-grid">
                      <div className="form-field">
                        <label>FIFA Username</label>
                        <input
                          type="text"
                          name="fifaUsername"
                          value={formData.fifaUsername}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="form-field">
                        <label>Team OVR</label>
                        <input
                          type="text"
                          name="teamOvr"
                          value={formData.teamOvr}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="form-field">
                        <label>Device Model</label>
                        <input
                          type="text"
                          name="deviceModel"
                          value={formData.deviceModel}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="form-field">
                        <label>Game Username</label>
                        <input
                          type="text"
                          name="gameUsername"
                          value={formData.gameUsername}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="form-field">
                        <label>Player Rating</label>
                        <input
                          type="text"
                          name="playerRating"
                          value={formData.playerRating}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="form-field">
                        <label>Gaming Platform</label>
                        <input
                          type="text"
                          name="gamingPlatform"
                          value={formData.gamingPlatform}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}

            {/* Team Members Tab */}
            {activeTab === 'team' && (
              <>
                {/* Individual Team Member Fields */}
                {teamSize >= 2 && (
                  <div className="form-section">
                    <h3>Team Member 2</h3>
                    <div className="form-grid">
                      <div className="form-field">
                        <label>Name</label>
                        <input
                          type="text"
                          name="teamMember2Name"
                          value={formData.teamMember2Name}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="form-field">
                        <label>Email</label>
                        <input
                          type="email"
                          name="teamMember2Email"
                          value={formData.teamMember2Email}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="form-field">
                        <label>Phone</label>
                        <input
                          type="tel"
                          name="teamMember2Phone"
                          value={formData.teamMember2Phone}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {teamSize >= 3 && (
                  <div className="form-section">
                    <h3>Team Member 3</h3>
                    <div className="form-grid">
                      <div className="form-field">
                        <label>Name</label>
                        <input
                          type="text"
                          name="teamMember3Name"
                          value={formData.teamMember3Name}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="form-field">
                        <label>Email</label>
                        <input
                          type="email"
                          name="teamMember3Email"
                          value={formData.teamMember3Email}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="form-field">
                        <label>Phone</label>
                        <input
                          type="tel"
                          name="teamMember3Phone"
                          value={formData.teamMember3Phone}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {teamSize >= 4 && (
                  <div className="form-section">
                    <h3>Team Member 4</h3>
                    <div className="form-grid">
                      <div className="form-field">
                        <label>Name</label>
                        <input
                          type="text"
                          name="teamMember4Name"
                          value={formData.teamMember4Name}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="form-field">
                        <label>Email</label>
                        <input
                          type="email"
                          name="teamMember4Email"
                          value={formData.teamMember4Email}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="form-field">
                        <label>Phone</label>
                        <input
                          type="tel"
                          name="teamMember4Phone"
                          value={formData.teamMember4Phone}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Participants Array */}
                {formData.participants.length > 0 && (
                  <div className="form-section">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                      <h3>Participants ({formData.participants.length})</h3>
                      <button type="button" className="btn-primary" onClick={addParticipant}>
                        + Add Participant
                      </button>
                    </div>
                    {formData.participants.map((participant, index) => (
                      <div key={index} className="team-member-card">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                          <h4>Participant {index + 1}</h4>
                          <button 
                            type="button" 
                            className="btn-secondary" 
                            onClick={() => removeParticipant(index)}
                            style={{ padding: '4px 12px', fontSize: '12px' }}
                          >
                            Remove
                          </button>
                        </div>
                        <div className="form-grid">
                          <div className="form-field">
                            <label>Name</label>
                            <input
                              type="text"
                              value={getFromObj(participant, 'name', 'fullName', 'full_name') || ''}
                              onChange={(e) => handleParticipantChange(index, 'name', e.target.value)}
                            />
                          </div>
                          <div className="form-field">
                            <label>Email</label>
                            <input
                              type="email"
                              value={getFromObj(participant, 'email', 'emailAddress') || ''}
                              onChange={(e) => handleParticipantChange(index, 'email', e.target.value)}
                            />
                          </div>
                          <div className="form-field">
                            <label>Contact</label>
                            <input
                              type="tel"
                              value={getFromObj(participant, 'contact', 'phone', 'contactNumber') || ''}
                              onChange={(e) => handleParticipantChange(index, 'contact', e.target.value)}
                            />
                          </div>
                          <div className="form-field">
                            <label>College</label>
                            <input
                              type="text"
                              value={getFromObj(participant, 'college', 'collegeName') || ''}
                              onChange={(e) => handleParticipantChange(index, 'college', e.target.value)}
                            />
                          </div>
                          <div className="form-field">
                            <label>Year</label>
                            <input
                              type="text"
                              value={getFromObj(participant, 'year', 'yearOfStudy') || ''}
                              onChange={(e) => handleParticipantChange(index, 'year', e.target.value)}
                            />
                          </div>
                          <div className="form-field">
                            <label>Department</label>
                            <input
                              type="text"
                              value={getFromObj(participant, 'department') || ''}
                              onChange={(e) => handleParticipantChange(index, 'department', e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {teamSize === 1 && formData.participants.length === 0 && (
                  <div className="empty-state">
                    <p>This is a solo registration (Team Size: 1)</p>
                    <p>No additional team members to edit</p>
                  </div>
                )}
              </>
            )}

            {/* Payment & Status Tab */}
            {activeTab === 'payment' && (
              <>
                <div className="form-section">
                  <h3>Payment Information</h3>
                  <div className="form-grid">
                    <div className="form-field">
                      <label>Payment Mode</label>
                      <select
                        name="paymentMode"
                        value={formData.paymentMode}
                        onChange={handleChange}
                      >
                        <option value="online">Online</option>
                        <option value="offline">Offline</option>
                      </select>
                    </div>
                    <div className="form-field">
                      <label>Transaction ID</label>
                      <input
                        type="text"
                        name="transactionId"
                        value={formData.transactionId}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-field">
                      <label>Payment Status *</label>
                      <select
                        name="paymentStatus"
                        value={formData.paymentStatus}
                        onChange={handleChange}
                        required
                      >
                        <option value="pending">Pending</option>
                        <option value="verified">Verified</option>
                        <option value="failed">Failed</option>
                        <option value="not-required">Not Required</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="form-section">
                  <h3>Registration Status</h3>
                  <div className="form-grid">
                    <div className="form-field">
                      <label>Registration Status *</label>
                      <select
                        name="registrationStatus"
                        value={formData.registrationStatus}
                        onChange={handleChange}
                        required
                      >
                        <option value="confirmed">Confirmed</option>
                        <option value="pending">Pending</option>
                        <option value="cancelled">Cancelled</option>
                        <option value="waitlist">Waitlist</option>
                        <option value="rejected">Rejected</option>
                        <option value="checked-in">Checked In</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="info-box">
                  <p>📝 Registration Number: <strong>{displayReg ? getFromObj(displayReg, 'registrationNumber') || '—' : '—'}</strong></p>
                  <p>🎯 Event: <strong>{displayReg ? getFromObj(displayReg, 'eventName') || '—' : '—'}</strong></p>
                  <p>📅 Submitted: <strong>{displayReg?.submittedAt ? new Date(displayReg.submittedAt).toLocaleString('en-IN') : '—'}</strong></p>
                </div>
              </>
            )}
          </div>

          <div className="modal-footer">
            <button type="button" className="btn-secondary" onClick={onClose} disabled={saving}>Cancel</button>
            <button type="submit" className="btn-primary" disabled={saving}>{saving ? 'Saving…' : 'Save Changes'}</button>
          </div>
        </form>
        </>
        )}
      </div>
    </div>
  );
};

export default EditRegistrationModal;
