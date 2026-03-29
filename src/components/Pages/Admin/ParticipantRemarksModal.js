import React, { useEffect, useMemo, useState } from 'react';
import './Modal.css';
import {
  getParticipantDisplayName,
  normalizeParticipantsForRemarks
} from './participantRemarks';

const ParticipantRemarksModal = ({ registration, onClose, onSave }) => {
  const initialParticipants = useMemo(
    () => normalizeParticipantsForRemarks(registration),
    [registration]
  );
  const [participants, setParticipants] = useState(initialParticipants);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setParticipants(initialParticipants);
    setError('');
  }, [initialParticipants]);

  if (!registration) return null;

  const handleRemarkChange = (index, value) => {
    setParticipants((prev) =>
      prev.map((participant, participantIndex) =>
        participantIndex === index
          ? { ...participant, remark: value }
          : participant
      )
    );
  };

  const handleDeleteRemark = (index) => {
    setParticipants((prev) =>
      prev.map((participant, participantIndex) =>
        participantIndex === index
          ? { ...participant, remark: '', remarkUpdatedAt: null }
          : participant
      )
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    try {
      const participantsToSave = participants.map((participant) => {
        const trimmedRemark = typeof participant.remark === 'string' ? participant.remark.trim() : '';
        return {
          ...participant,
          remark: trimmedRemark,
          remarkUpdatedAt: trimmedRemark ? new Date().toISOString() : null
        };
      });

      await onSave(participantsToSave);
      onClose();
    } catch (err) {
      setError(err.message || 'Failed to save participant remarks');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content large-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <h2>Participant Remarks</h2>
            <p className="modal-subtitle">{registration.registrationNumber || registration.eventName || 'Registration'}</p>
          </div>
          <button className="modal-close" onClick={onClose}>x</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            {participants.length === 0 ? (
              <div className="empty-state">
                <p>No participant data is available for this registration.</p>
              </div>
            ) : (
              <div className="remarks-list">
                {participants.map((participant, index) => {
                  const hasRemark = typeof participant.remark === 'string' && participant.remark.trim() !== '';
                  return (
                    <section
                      key={`${getParticipantDisplayName(participant, index)}-${index}`}
                      className={`team-member-card participant-remark-card ${hasRemark ? 'participant-remark-card--flagged' : ''}`}
                    >
                      <div className="participant-remark-header">
                        <div>
                          <h4>{getParticipantDisplayName(participant, index)}</h4>
                          <p className="participant-remark-meta">
                            {participant.email || participant.contact || participant.college || 'No extra participant details'}
                          </p>
                        </div>
                        {hasRemark && <span className="remark-indicator-pill">Has remark</span>}
                      </div>

                      <label className="participant-remark-label" htmlFor={`participant-remark-${index}`}>
                        Remarks
                      </label>
                      <textarea
                        id={`participant-remark-${index}`}
                        className="participant-remark-input"
                        rows="4"
                        placeholder="Add an internal admin remark for this participant..."
                        value={participant.remark || ''}
                        onChange={(event) => handleRemarkChange(index, event.target.value)}
                      />

                      <div className="participant-remark-actions">
                        <button
                          type="button"
                          className="btn-secondary"
                          onClick={() => handleDeleteRemark(index)}
                          disabled={!hasRemark}
                        >
                          Delete Remark
                        </button>
                      </div>
                    </section>
                  );
                })}
              </div>
            )}

            {error && (
              <div className="info-box" style={{ marginTop: '16px', background: '#fef2f2', borderColor: '#fecaca' }}>
                <p style={{ color: '#b91c1c' }}>{error}</p>
              </div>
            )}
          </div>

          <div className="modal-footer">
            <button type="button" className="btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn-primary" disabled={saving || participants.length === 0}>
              {saving ? 'Saving...' : 'Save Remarks'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ParticipantRemarksModal;
