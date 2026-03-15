import React, { useEffect, useMemo, useState } from 'react';
import { getRegistrations } from '../../../utils/adminDashboardAPI';
import { calculateRevenueSummary, formatCurrency } from '../../../utils/adminRevenue';
import './Modal.css';

const RevenueModal = ({ onClose }) => {
  const [codeBeeTeams, setCodeBeeTeams] = useState('');
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [generated, setGenerated] = useState(false);

  useEffect(() => {
    let mounted = true;

    const loadRegistrations = async () => {
      try {
        setLoading(true);
        const result = await getRegistrations({ limit: 1000 });
        if (!mounted) return;
        setRegistrations(result.registrations || []);
        setError('');
      } catch (err) {
        if (!mounted) return;
        setError(err.message || 'Failed to load registrations for revenue calculation.');
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadRegistrations();

    return () => {
      mounted = false;
    };
  }, []);

  const summary = useMemo(
    () => calculateRevenueSummary(registrations, codeBeeTeams),
    [registrations, codeBeeTeams]
  );

  const verifiedOrSettledEntries =
    summary.totalPaidRegistrations - summary.totalPendingCashVerificationCount;
  const totalEntriesDisplay = summary.totalPendingCashVerificationCount > 0
    ? `${verifiedOrSettledEntries}+${summary.totalPendingCashVerificationCount}`
    : String(summary.totalPaidRegistrations);

  const handleGenerate = () => {
    setGenerated(true);
  };

  const hasResults = generated && !loading && !error;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content large-modal revenue-modal"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="modal-header">
          <div>
            <h2>Revenue Generator</h2>
            <p className="modal-subtitle">Core-only revenue summary for TechStorm 2.26</p>
          </div>
          <button className="modal-close" onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>

        <div className="modal-body">
          {loading ? (
            <div className="modal-inline-loading">
              <span className="loader-spinner" />
              <p>Loading registrations for revenue calculation...</p>
            </div>
          ) : (
            <>
              <div className="form-section">
                <h3>Code-Bee Input</h3>
                <div className="revenue-input-card">
                  <label className="revenue-field-label" htmlFor="codeBeeTeams">
                    Code-Bee registrations from Unstop
                  </label>
                  <input
                    id="codeBeeTeams"
                    type="number"
                    min="0"
                    className="revenue-number-input"
                    value={codeBeeTeams}
                    onChange={(event) => setCodeBeeTeams(event.target.value)}
                    placeholder="Enter total Code-Bee teams"
                  />
                  <p className="revenue-field-help">
                    Code-Bee is counted manually at Rs. 80 per team.
                  </p>
                </div>
              </div>

              {error && (
                <div className="empty-state">
                  <p>{error}</p>
                </div>
              )}

              {hasResults && (
                <>
                  <div className="revenue-summary-grid">
                    <div className="revenue-summary-card">
                      <span className="revenue-summary-label">Total Revenue</span>
                      <strong className="revenue-summary-value">
                        {formatCurrency(summary.totalRevenue)}
                      </strong>
                    </div>
                    <div className="revenue-summary-card">
                      <span className="revenue-summary-label">Total Registration (Total Verified + Unverified)</span>
                      <strong className="revenue-summary-value">
                        {totalEntriesDisplay}
                      </strong>
                    </div>
                    <div className="revenue-summary-card">
                      <span className="revenue-summary-label">Code-Bee Teams</span>
                      <strong className="revenue-summary-value">
                        {summary.codeBeeTeams}
                      </strong>
                    </div>
                    <div className="revenue-summary-card">
                      <span className="revenue-summary-label">Cash Left To Verify</span>
                      <strong className="revenue-summary-value">
                        {formatCurrency(summary.totalPendingCashVerificationAmount)}
                      </strong>
                    </div>
                  </div>

                  <div className="revenue-breakdown">
                    <h3>Event Breakdown</h3>
                    <div className="table-container">
                      <table className="data-table">
                        <thead>
                          <tr>
                            <th>Event</th>
                            <th>Earned Entries</th>
                            <th>Internal</th>
                            <th>External</th>
                            <th>Earned Revenue</th>
                            <th>Cash Pending Verify</th>
                          </tr>
                        </thead>
                        <tbody>
                          {summary.breakdown.map((event) => (
                            <tr key={event.eventName}>
                              <td>{event.eventName}</td>
                              <td>{event.paidRegistrations}</td>
                              <td>{event.internalCount}</td>
                              <td>{event.externalCount}</td>
                              <td>{formatCurrency(event.amount)}</td>
                              <td>
                                {event.pendingCashVerificationCount > 0
                                  ? `${formatCurrency(event.pendingCashVerificationAmount)} (${event.pendingCashVerificationCount})`
                                  : '—'}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div className="revenue-pending-list">
                      {summary.breakdown
                        .filter((event) => event.pendingCashVerificationAmount > 0)
                        .map((event) => (
                          <p key={`${event.eventName}-pending`} className="revenue-pending-item">
                            From {event.eventName}, {formatCurrency(event.pendingCashVerificationAmount)} remains to verify in cash
                            ({event.pendingCashVerificationCount} registration{event.pendingCashVerificationCount > 1 ? 's' : ''}).
                          </p>
                        ))}
                    </div>
                    <p className="revenue-note">
                      The total revenue already includes the cash amount shown in "Cash Left To Verify". That cash figure is displayed separately only to show how much still remains to verify.
                    </p>
                  </div>
                </>
              )}
            </>
          )}
        </div>

        <div className="modal-footer">
          <button type="button" className="btn-secondary" onClick={onClose}>
            Close
          </button>
          <button
            type="button"
            className="btn-primary"
            onClick={handleGenerate}
            disabled={loading || Boolean(error)}
          >
            Generate Revenue
          </button>
        </div>
      </div>
    </div>
  );
};

export default RevenueModal;
