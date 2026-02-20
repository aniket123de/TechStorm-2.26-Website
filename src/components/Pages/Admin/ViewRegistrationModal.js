import React from 'react';
import './Modal.css';

const ViewRegistrationModal = ({ registration, onClose }) => {
  if (!registration) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Registration Details</h2>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        <div className="modal-body">
          <div className="detail-section">
            <h3>Participant Information</h3>
            <div className="detail-grid">
              <div className="detail-field">
                <label>Registration Number</label>
                <p className="reg-code">{registration.registrationNumber}</p>
              </div>
              <div className="detail-field">
                <label>Full Name</label>
                <p>{registration.fullName}</p>
              </div>
              <div className="detail-field">
                <label>Email Address</label>
                <p>{registration.emailAddress}</p>
              </div>
              <div className="detail-field">
                <label>Contact Number</label>
                <p>{registration.contactNumber}</p>
              </div>
              <div className="detail-field">
                <label>College Name</label>
                <p>{registration.collegeName}</p>
              </div>
              <div className="detail-field">
                <label>Year of Study</label>
                <p>{registration.year || registration.yearOfStudy}</p>
              </div>
              {registration.department && (
                <div className="detail-field">
                  <label>Department</label>
                  <p>{registration.department.toUpperCase()}</p>
                </div>
              )}
              {registration.streamBranch && (
                <div className="detail-field">
                  <label>Stream/Branch</label>
                  <p>{registration.streamBranch}</p>
                </div>
              )}
            </div>
          </div>

          <div className="detail-section">
            <h3>Event Details</h3>
            <div className="detail-grid">
              <div className="detail-field">
                <label>Event Name</label>
                <p className="event-name">{registration.eventName}</p>
              </div>
              {registration.teamName && (
                <div className="detail-field">
                  <label>Team Name</label>
                  <p>{registration.teamName || 'Solo Participant'}</p>
                </div>
              )}
              {registration.numberOfParticipants && (
                <div className="detail-field">
                  <label>Number of Participants</label>
                  <p>{registration.numberOfParticipants}</p>
                </div>
              )}
              {registration.fifaUsername && (
                <div className="detail-field">
                  <label>FIFA Username</label>
                  <p>{registration.fifaUsername}</p>
                </div>
              )}
              {registration.teamOvr && (
                <div className="detail-field">
                  <label>Team OVR</label>
                  <p>{registration.teamOvr}</p>
                </div>
              )}
              {registration.deviceModel && (
                <div className="detail-field">
                  <label>Device Model</label>
                  <p>{registration.deviceModel}</p>
                </div>
              )}
            </div>
          </div>

          <div className="detail-section">
            <h3>Payment Information</h3>
            <div className="detail-grid">
              <div className="detail-field">
                <label>Payment Mode</label>
                <p>{registration.paymentMode}</p>
              </div>
              <div className="detail-field">
                <label>Payment Status</label>
                <p className={`status-pill payment-${registration.paymentStatus}`}>
                  {registration.paymentStatus}
                </p>
              </div>
              {registration.transactionId && (
                <div className="detail-field">
                  <label>Transaction ID</label>
                  <p className="transaction-id">{registration.transactionId}</p>
                </div>
              )}
              {registration.paymentDate && (
                <div className="detail-field">
                  <label>Payment Date</label>
                  <p>{registration.paymentDate}</p>
                </div>
              )}
            </div>
          </div>

          <div className="detail-section">
            <h3>Registration Status</h3>
            <div className="detail-grid">
              <div className="detail-field">
                <label>Status</label>
                <p className={`status-pill reg-${registration.registrationStatus}`}>
                  {registration.registrationStatus}
                </p>
              </div>
              <div className="detail-field">
                <label>Submitted At</label>
                <p>{new Date(registration.submittedAt).toLocaleString('en-IN')}</p>
              </div>
              <div className="detail-field">
                <label>Source</label>
                <p>{registration.source || 'web'}</p>
              </div>
            </div>
          </div>

          {registration.paymentScreenshot && (
            <div className="detail-section">
              <h3>Documents</h3>
              <div className="document-list">
                <div className="document-item">
                  <span>📄 Payment Screenshot</span>
                  <button className="download-btn">Download</button>
                </div>
                {registration.collegeIdProof && (
                  <div className="document-item">
                    <span>🆔 College ID Proof</span>
                    <button className="download-btn">Download</button>
                  </div>
                )}
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

export default ViewRegistrationModal;
