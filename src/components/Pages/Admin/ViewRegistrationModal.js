import React, { useState } from 'react';
import './Modal.css';
import {
  getParticipantDisplayName,
  registrationHasParticipantRemarks
} from './participantRemarks';

/** Get first non-empty string from an object for given keys. Display only. */
function getFromObj(obj, ...keys) {
  if (!obj || typeof obj !== 'object') return '';
  for (const k of keys) {
    const v = obj[k];
    if (v != null && String(v).trim() !== '') return String(v).trim();
  }
  return '';
}

/** Get display value from registration, checking multiple keys and first participant. Display only. */
function getDisplayValueFromRegistration(reg, ...keys) {
  if (!reg || typeof reg !== 'object') return '';
  const fromReg = getFromObj(reg, ...keys);
  if (fromReg) return fromReg;
  const first = reg.participants && reg.participants[0];
  if (first && typeof first === 'object') return getFromObj(first, ...keys);
  return '';
}

/** Get email from registration object, checking all known and email-like keys. Display only. */
function getEmailFromRegistration(reg) {
  if (!reg || typeof reg !== 'object') return '';
  const tryKeys = (obj) => {
    for (const k of ['emailAddress', 'email', 'teamLeaderEmail', 'teamMember2Email']) {
      const v = obj[k];
      if (v != null && String(v).trim() !== '') return String(v).trim();
    }
    for (const key of Object.keys(obj)) {
      if (key.toLowerCase().includes('email') && typeof obj[key] === 'string' && obj[key].trim() !== '')
        return obj[key].trim();
    }
    return '';
  };
  const main = tryKeys(reg);
  if (main) return main;
  const first = reg.participants && reg.participants[0];
  if (first && typeof first === 'object') return tryKeys(first);
  return '';
}

const ViewRegistrationModal = ({ registration, onClose, canManageParticipantRemarks = false, onManageParticipantRemarks }) => {
  const [activeTab, setActiveTab] = useState('basic');

  if (!registration) return null;

  // Helper function to format field names
  const formatFieldName = (key) => {
    return key
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, (str) => str.toUpperCase())
      .trim();
  };

  // Helper function to check if value exists and is not empty
  const hasValue = (value) => {
    if (value === null || value === undefined || value === '') return false;
    if (Array.isArray(value) && value.length === 0) return false;
    if (typeof value === 'object' && Object.keys(value).length === 0) return false;
    return true;
  };

  // Helper to render file links
  const renderFileLink = (url, cloudinaryId, label) => {
    if (!url && !cloudinaryId) return null;
    return (
      <div className="file-link">
        <span>📎 {label}</span>
        {url && (
          <a href={url} target="_blank" rel="noopener noreferrer" className="view-file-btn">
            View File
          </a>
        )}
      </div>
    );
  };

  const hasParticipantRemarks = registrationHasParticipantRemarks(registration);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content large-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <h2>Registration Details</h2>
            <p className="modal-subtitle">{getDisplayValueFromRegistration(registration, 'registrationNumber') || registration.registrationNumber || '—'}</p>
          </div>
          <div className="modal-header-actions">
            {canManageParticipantRemarks && typeof onManageParticipantRemarks === 'function' && (
              <button
                type="button"
                className={`btn-secondary modal-remarks-trigger ${hasParticipantRemarks ? 'modal-remarks-trigger--active' : ''}`}
                onClick={() => onManageParticipantRemarks(registration)}
              >
                {hasParticipantRemarks ? 'View Remarks' : 'Add Remarks'}
              </button>
            )}
            <button className="modal-close" onClick={onClose}>✕</button>
          </div>
        </div>

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
            Team/Participants
          </button>
          <button 
            className={`tab-btn ${activeTab === 'payment' ? 'active' : ''}`}
            onClick={() => setActiveTab('payment')}
          >
            Payment
          </button>
          <button 
            className={`tab-btn ${activeTab === 'files' ? 'active' : ''}`}
            onClick={() => setActiveTab('files')}
          >
            Files
          </button>
          <button 
            className={`tab-btn ${activeTab === 'all' ? 'active' : ''}`}
            onClick={() => setActiveTab('all')}
          >
            All Fields
          </button>
        </div>

        <div className="modal-body">
          {/* Basic Information Tab */}
          {activeTab === 'basic' && (
            <>
              <div className="detail-section">
                <h3>Participant Information</h3>
                <div className="detail-grid">
                  <DetailField label="Registration Number" value={getDisplayValueFromRegistration(registration, 'registrationNumber')} highlight />
                  <DetailField label="Full Name" value={getDisplayValueFromRegistration(registration, 'fullName', 'full_name', 'name') || (registration.participants && registration.participants[0]?.name) || registration.teamName} />
                  <DetailField label="Email" value={getEmailFromRegistration(registration)} />
                  <DetailField label="Contact Number" value={getDisplayValueFromRegistration(registration, 'contactNumber', 'phone', 'contact')} />
                  <DetailField label="College Name" value={getDisplayValueFromRegistration(registration, 'collegeName', 'college', 'institution')} />
                  <DetailField label="Year of Study" value={getDisplayValueFromRegistration(registration, 'year', 'yearOfStudy')} />
                  <DetailField label="Department" value={getDisplayValueFromRegistration(registration, 'department')} />
                  <DetailField label="Stream/Branch" value={getDisplayValueFromRegistration(registration, 'streamBranch', 'stream')} />
                  <DetailField label="Student ID" value={getDisplayValueFromRegistration(registration, 'studentId', 'rollNumber')} />
                </div>
              </div>

              <div className="detail-section">
                <h3>Event Details</h3>
                <div className="detail-grid">
                  <DetailField label="Event Name" value={getDisplayValueFromRegistration(registration, 'eventName') || registration.eventName} highlight />
                  <DetailField label="Team Name" value={getDisplayValueFromRegistration(registration, 'teamName')} />
                  <DetailField label="Team Size" value={getDisplayValueFromRegistration(registration, 'teamSize', 'numberOfParticipants')} />
                  <DetailField label="Number of Participants" value={getDisplayValueFromRegistration(registration, 'numberOfParticipants', 'teamSize')} />
                  
                  {/* Game-specific fields */}
                  <DetailField label="FIFA Username" value={getDisplayValueFromRegistration(registration, 'fifaUsername')} />
                  <DetailField label="Team OVR" value={getDisplayValueFromRegistration(registration, 'teamOvr')} />
                  <DetailField label="Device Model" value={getDisplayValueFromRegistration(registration, 'deviceModel')} />
                  <DetailField label="Game Username" value={getDisplayValueFromRegistration(registration, 'gameUsername')} />
                  <DetailField label="Player Rating" value={getDisplayValueFromRegistration(registration, 'playerRating')} />
                  <DetailField label="Gaming Platform" value={getDisplayValueFromRegistration(registration, 'gamingPlatform')} />
                  
                  {/* Other fields */}
                  <DetailField label="Experience Level" value={getDisplayValueFromRegistration(registration, 'experienceLevel')} />
                  <DetailField label="Dietary Restrictions" value={getDisplayValueFromRegistration(registration, 'dietaryRestrictions')} />
                  <DetailField label="Special Requirements" value={getDisplayValueFromRegistration(registration, 'specialRequirements')} />
                  <DetailField label="How Did You Hear" value={getDisplayValueFromRegistration(registration, 'howDidYouHear')} />
                </div>
              </div>

              <div className="detail-section">
                <h3>Registration Status</h3>
                <div className="detail-grid">
                  <div className="detail-field">
                    <label>Status</label>
                    <p className={`status-pill reg-${getFromObj(registration, 'registrationStatus') || 'pending'}`}>
                      {getDisplayValueFromRegistration(registration, 'registrationStatus') || registration.registrationStatus || '—'}
                    </p>
                  </div>
                  <DetailField label="Submitted At" value={registration.submittedAt ? new Date(registration.submittedAt).toLocaleString('en-IN') : getFromObj(registration, 'submittedAt')} />
                  <DetailField label="Updated At" value={registration.updatedAt ? new Date(registration.updatedAt).toLocaleString('en-IN') : null} />
                  <DetailField label="Source" value={getFromObj(registration, 'source') || 'web'} />
                </div>
              </div>

              {/* Confirmations */}
              {(registration.whatsappConfirmed || registration.agreeToTerms || registration.agreeToRules) && (
                <div className="detail-section">
                  <h3>Confirmations</h3>
                  <div className="detail-grid">
                    <DetailField label="WhatsApp Confirmed" value={registration.whatsappConfirmed ? '✅ Yes' : '❌ No'} />
                    <DetailField label="Agree to Terms" value={registration.agreeToTerms ? '✅ Yes' : '❌ No'} />
                    <DetailField label="Agree to Rules" value={registration.agreeToRules ? '✅ Yes' : '❌ No'} />
                  </div>
                </div>
              )}
            </>
          )}

          {/* Team/Participants Tab */}
          {activeTab === 'team' && (
            <>
              {/* Team Members (individual fields) */}
              {(getFromObj(registration, 'teamMember2Name') || getFromObj(registration, 'teamMember3Name') || getFromObj(registration, 'teamMember4Name')) && (
                <div className="detail-section">
                  <h3>Team Members</h3>
                  
                  {getFromObj(registration, 'teamMember2Name') && (
                    <div className="team-member-card">
                      <h4>Team Member 2</h4>
                      <div className="detail-grid">
                        <DetailField label="Name" value={getFromObj(registration, 'teamMember2Name')} />
                        <DetailField label="Email" value={getFromObj(registration, 'teamMember2Email')} />
                        <DetailField label="Phone" value={getFromObj(registration, 'teamMember2Phone')} />
                      </div>
                    </div>
                  )}
                  
                  {getFromObj(registration, 'teamMember3Name') && (
                    <div className="team-member-card">
                      <h4>Team Member 3</h4>
                      <div className="detail-grid">
                        <DetailField label="Name" value={getFromObj(registration, 'teamMember3Name')} />
                        <DetailField label="Email" value={getFromObj(registration, 'teamMember3Email')} />
                        <DetailField label="Phone" value={getFromObj(registration, 'teamMember3Phone')} />
                      </div>
                    </div>
                  )}
                  
                  {getFromObj(registration, 'teamMember4Name') && (
                    <div className="team-member-card">
                      <h4>Team Member 4</h4>
                      <div className="detail-grid">
                        <DetailField label="Name" value={getFromObj(registration, 'teamMember4Name')} />
                        <DetailField label="Email" value={getFromObj(registration, 'teamMember4Email')} />
                        <DetailField label="Phone" value={getFromObj(registration, 'teamMember4Phone')} />
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Participants Array */}
              {registration.participants && registration.participants.length > 0 && (
                <div className="detail-section">
                  <h3>Participants ({registration.participants.length})</h3>
                  {registration.participants.map((participant, index) => (
                    <div key={index} className="team-member-card">
                      <div className="participant-card-title-row">
                        <h4>{getParticipantDisplayName(participant, index)}</h4>
                        {participant.remark && String(participant.remark).trim() && (
                          <span className="remark-indicator-pill">Remark added</span>
                        )}
                      </div>
                      <div className="detail-grid">
                        <DetailField label="Name" value={getFromObj(participant, 'name', 'fullName', 'full_name')} />
                        <DetailField label="Email" value={getFromObj(participant, 'email', 'emailAddress')} />
                        <DetailField label="Contact" value={getFromObj(participant, 'contact', 'phone', 'contactNumber')} />
                        <DetailField label="College" value={getFromObj(participant, 'college', 'collegeName')} />
                        <DetailField label="Year" value={getFromObj(participant, 'year', 'yearOfStudy')} />
                        <DetailField label="Department" value={getFromObj(participant, 'department')} />
                        <DetailField label="Role" value={getFromObj(participant, 'role')} />
                        <DetailField label="Remarks" value={getFromObj(participant, 'remark')} />
                        {(participant.idFileUrl || participant.idProofUrl) && renderFileLink(participant.idFileUrl || participant.idProofUrl, participant.idFileCloudinaryId, 'ID Proof')}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {!getFromObj(registration, 'teamMember2Name') && !getFromObj(registration, 'teamMember3Name') && !getFromObj(registration, 'teamMember4Name') && !registration.participants?.length && (
                <div className="empty-state">
                  <p>No team members or participants data available</p>
                </div>
              )}
            </>
          )}

          {/* Payment Tab */}
          {activeTab === 'payment' && (
            <>
              <div className="detail-section">
                <h3>Payment Information</h3>
                <div className="detail-grid">
                  <div className="detail-field">
                    <label>Payment Status</label>
                    <p className={`status-pill payment-${getFromObj(registration, 'paymentStatus') || 'pending'}`}>
                      {getDisplayValueFromRegistration(registration, 'paymentStatus') || registration.paymentStatus || '—'}
                    </p>
                  </div>
                  <DetailField label="Payment Mode" value={getDisplayValueFromRegistration(registration, 'paymentMode', 'paymentMethod')} />
                  <DetailField label="Transaction ID" value={getDisplayValueFromRegistration(registration, 'transactionId')} />
                  <DetailField label="Payment Date" value={getDisplayValueFromRegistration(registration, 'paymentDate')} />
                </div>
              </div>

              {/* Payment Files */}
              <div className="detail-section">
                <h3>Payment Documents</h3>
                <div className="file-list">
                  {renderFileLink(registration.paymentReceiptUrl, registration.paymentReceiptCloudinaryId, 'Payment Receipt')}
                  {renderFileLink(registration.paymentScreenshotUrl, registration.paymentScreenshotCloudinaryId, 'Payment Screenshot')}
                  {renderFileLink(registration.cashReceiptUrl, registration.cashReceiptCloudinaryId, 'Cash Receipt')}
                  
                  {!registration.paymentReceiptUrl && !registration.paymentScreenshotUrl && !registration.cashReceiptUrl && (
                    <p className="empty-state">No payment documents uploaded</p>
                  )}
                </div>
              </div>
            </>
          )}

          {/* Files Tab */}
          {activeTab === 'files' && (
            <div className="detail-section">
              <h3>All Uploaded Files</h3>
              <div className="file-list">
                {/* Main ID Proofs */}
                {renderFileLink(registration.idProofUrl, registration.idProofCloudinaryId, 'ID Proof (Main)')}
                {renderFileLink(registration.idFileUrl, registration.idFileCloudinaryId, 'ID File (Main)')}
                {renderFileLink(registration.collegeIdProofUrl, registration.collegeIdProofCloudinaryId, 'College ID Proof')}
                {renderFileLink(registration.participantIdProofUrl, registration.participantIdProofCloudinaryId, 'Participant ID Proof')}
                
                {/* Participant ID Proofs from participants array */}
                {registration.participants && registration.participants.length > 0 && (
                  <>
                    <h4 style={{ marginTop: '20px', marginBottom: '10px', color: '#666' }}>Participant ID Proofs</h4>
                    {registration.participants.map((participant, index) => (
                      (participant.idFileUrl || participant.idProofUrl) && (
                        <div key={index} className="file-link">
                          <span>📎 Participant {index + 1} - {getFromObj(participant, 'name', 'fullName') || 'N/A'} ID Proof</span>
                          <a href={participant.idFileUrl || participant.idProofUrl} target="_blank" rel="noopener noreferrer" className="view-file-btn">
                            View File
                          </a>
                        </div>
                      )
                    ))}
                  </>
                )}
                
                {/* Payment Documents */}
                <h4 style={{ marginTop: '20px', marginBottom: '10px', color: '#666' }}>Payment Documents</h4>
                {renderFileLink(registration.paymentReceiptUrl, registration.paymentReceiptCloudinaryId, 'Payment Receipt')}
                {renderFileLink(registration.paymentScreenshotUrl, registration.paymentScreenshotCloudinaryId, 'Payment Screenshot')}
                {renderFileLink(registration.cashReceiptUrl, registration.cashReceiptCloudinaryId, 'Cash Receipt')}
                
                {/* Transaction ID if available */}
                {registration.transactionId && (
                  <div className="file-link" style={{ marginTop: '15px', padding: '10px', background: '#f5f5f5', borderRadius: '4px' }}>
                    <span style={{ fontWeight: 'bold' }}>💳 Transaction ID:</span>
                    <span style={{ marginLeft: '10px', fontFamily: 'monospace' }}>{registration.transactionId}</span>
                  </div>
                )}
                
                {!registration.idProofUrl && !registration.idFileUrl && !registration.paymentReceiptUrl && 
                 !registration.paymentScreenshotUrl && !registration.cashReceiptUrl && 
                 !registration.collegeIdProofUrl && !registration.participantIdProofUrl &&
                 (!registration.participants || !registration.participants.some(p => p.idFileUrl)) && (
                  <p className="empty-state">No files uploaded</p>
                )}
              </div>
            </div>
          )}

          {/* All Fields Tab - Raw Data */}
          {activeTab === 'all' && (
            <div className="detail-section">
              <h3>All Database Fields</h3>
              <div className="raw-data">
                {Object.entries(registration)
                  .filter(([key]) => !key.startsWith('_') && key !== '__v')
                  .sort(([a], [b]) => a.localeCompare(b))
                  .map(([key, value]) => {
                    if (!hasValue(value)) return null;
                    
                    return (
                      <div key={key} className="raw-field">
                        <label>{formatFieldName(key)}</label>
                        <div className="raw-value">
                          {typeof value === 'object' ? (
                            <pre>{JSON.stringify(value, null, 2)}</pre>
                          ) : typeof value === 'boolean' ? (
                            value ? '✅ Yes' : '❌ No'
                          ) : (
                            <span>{String(value)}</span>
                          )}
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          )}
        </div>

        <div className="modal-footer">
          <button className="btn-secondary" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

// Helper component for consistent field display
const DetailField = ({ label, value, highlight }) => {
  if (!value && value !== 0 && value !== false) return null;
  
  return (
    <div className={`detail-field ${highlight ? 'highlight' : ''}`}>
      <label>{label}</label>
      <p>{String(value)}</p>
    </div>
  );
};

export default ViewRegistrationModal;
