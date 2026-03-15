import React, { useEffect, useMemo, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { getRegistrations } from '../../../utils/adminDashboardAPI';
import { calculateRevenueSummary, formatCurrency } from '../../../utils/adminRevenue';
import AdminLoading from './AdminLoading';
import './RoleDashboard.css';
import './AdminDashboard.css';

const RevenuePage = () => {
  const history = useHistory();
  const location = useLocation();
  const role = location.pathname.split('/')[2];
  const [codeBeeTeams, setCodeBeeTeams] = useState('');
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (role !== 'core') {
      history.replace(`/admin/${role}/dashboard`);
      return;
    }

    const loadRegistrations = async () => {
      try {
        setLoading(true);
        const result = await getRegistrations({ limit: 1000 });
        setRegistrations(result.registrations || []);
        setError(null);
      } catch (err) {
        setError(err.message || 'Failed to load registrations for revenue calculation.');
      } finally {
        setLoading(false);
      }
    };

    loadRegistrations();
  }, [history, role]);

  const summary = useMemo(
    () => calculateRevenueSummary(registrations, codeBeeTeams),
    [registrations, codeBeeTeams]
  );

  const totalEntriesVerifiedOrSettled =
    summary.totalPaidRegistrations - summary.totalPendingCashVerificationCount;
  const totalEntriesDisplay = summary.totalPendingCashVerificationCount > 0
    ? `${totalEntriesVerifiedOrSettled}+${summary.totalPendingCashVerificationCount}`
    : String(summary.totalPaidRegistrations);

  const handleBack = () => {
    history.push(`/admin/${role}/dashboard`);
  };

  const formatEntrySplit = (event) => {
    const verifiedOrSettled = event.paidRegistrations - (event.pendingCashVerificationCount || 0);
    return event.pendingCashVerificationCount > 0
      ? `${verifiedOrSettled}+${event.pendingCashVerificationCount}`
      : String(event.paidRegistrations);
  };

  if (loading) {
    return (
      <div className="role-dashboard core-dashboard">
        <div className="dashboard-wrapper dashboard-wrapper--loading">
          <AdminLoading message="Loading revenue..." roleColor="#0f766e" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="role-dashboard core-dashboard">
        <div className="dashboard-wrapper">
          <div className="admin-error-state">
            <p className="admin-error-message">Error: {error}</p>
            <button type="button" className="admin-error-retry" onClick={() => window.location.reload()}>
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="role-dashboard core-dashboard">
      <div className="dashboard-wrapper">
        <header className="dash-header">
          <div>
            <button className="back-btn" onClick={handleBack}>← Back</button>
            <p className="dash-kicker">TechStorm Admin</p>
            <h1 className="dash-title">Revenue</h1>
            <p className="dash-subtitle">Core Dashboard</p>
          </div>
        </header>

        <div className="registrations-section section-card revenue-page-intro">
          <div className="revenue-page-topbar">
            <div>
              <h2 className="section-title">Revenue Controls</h2>
              <p className="section-subtitle">Code-Bee is entered manually because registrations are handled through Unstop.</p>
            </div>
            <div className="revenue-input-card revenue-input-card--page">
              <label className="revenue-field-label" htmlFor="codeBeeTeamsPage">
                Code-Bee Teams
              </label>
              <input
                id="codeBeeTeamsPage"
                type="number"
                min="0"
                className="revenue-number-input"
                value={codeBeeTeams}
                onChange={(event) => setCodeBeeTeams(event.target.value)}
                placeholder="Enter total teams"
              />
              <p className="revenue-field-help">Code-Bee is counted at Rs. 80 per team.</p>
            </div>
          </div>
        </div>

        <div className="revenue-summary-grid revenue-summary-grid--page">
          <div className="revenue-summary-card">
            <span className="revenue-summary-label">Total Revenue</span>
            <strong className="revenue-summary-value">{formatCurrency(summary.totalRevenue)}</strong>
          </div>
          <div className="revenue-summary-card">
            <span className="revenue-summary-label">Total Registration (Total Verified + Unverified)</span>
            <strong className="revenue-summary-value">{totalEntriesDisplay}</strong>
          </div>
          <div className="revenue-summary-card">
            <span className="revenue-summary-label">Code-Bee Teams</span>
            <strong className="revenue-summary-value">{summary.codeBeeTeams}</strong>
          </div>
          <div className="revenue-summary-card">
            <span className="revenue-summary-label">Cash Left To Verify</span>
            <strong className="revenue-summary-value">
              {formatCurrency(summary.totalPendingCashVerificationAmount)}
            </strong>
          </div>
        </div>

        <div className="registrations-section section-card">
          <h2 className="section-title">Event Breakdown</h2>
          <p className="section-subtitle">From which event how many registrations came in and what revenue that event adds.</p>

          <div className="table-container">
            <table className="data-table data-table--stats">
              <thead>
                <tr>
                  <th>Event</th>
                  <th>Total Registration</th>
                  <th>Internal</th>
                  <th>External</th>
                  <th>Revenue From Event</th>
                  <th>Cash Pending Verify</th>
                </tr>
              </thead>
              <tbody>
                {summary.breakdown.length > 0 ? (
                  summary.breakdown.map((event) => (
                    <tr key={event.eventName}>
                      <td><span className="event-badge">{event.eventName}</span></td>
                      <td>{formatEntrySplit(event)}</td>
                      <td>{event.internalCount}</td>
                      <td>{event.externalCount}</td>
                      <td>{formatCurrency(event.amount)}</td>
                      <td>
                        {event.pendingCashVerificationCount > 0
                          ? `${formatCurrency(event.pendingCashVerificationAmount)} (${event.pendingCashVerificationCount})`
                          : '—'}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="table-empty-cell">
                      <span className="empty-state-inline">No revenue data available</span>
                    </td>
                  </tr>
                )}
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
            The total revenue already includes the cash amount shown in "Cash Left To Verify". That cash figure is shown separately only for tracking.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RevenuePage;
