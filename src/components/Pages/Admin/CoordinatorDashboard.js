import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './RoleDashboard.css';

const CoordinatorDashboard = () => {
  const history = useHistory();
  const [searchTerm, setSearchTerm] = useState('');
  
  // Coordinator is assigned to specific event
  const assignedEvent = 'FIFA Mobile';

  // Dummy registration data - only for assigned event
  const registrations = [
    {
      _id: '6996ac2a805fef4756d0095e',
      fullName: 'Rahul Sharma',
      emailAddress: 'rahul.sharma@example.com',
      contactNumber: '09876543210',
      collegeName: 'Heritage Institute of Technology',
      yearOfStudy: '2025',
      department: 'ece',
      fifaUsername: 'rahul_fifa',
      teamOvr: '125',
      deviceModel: 'iPhone 13',
      eventName: 'FIFA Mobile',
      paymentStatus: 'confirmed',
      registrationStatus: 'confirmed',
      registrationNumber: 'FIF-MLT2QI7O-5GE',
      submittedAt: '2026-02-19T06:22:34.161Z'
    },
    {
      _id: '6996b504805fef4756d00998',
      fullName: 'Adrish Basak',
      emailAddress: 'adrishbasak003@gmail.com',
      contactNumber: '07003940421',
      collegeName: 'B. P. Poddar Institute of Management and Technology',
      yearOfStudy: '2025',
      department: 'cse',
      fifaUsername: 'bepo',
      teamOvr: '120',
      deviceModel: '13r',
      eventName: 'FIFA Mobile',
      paymentStatus: 'pending',
      registrationStatus: 'confirmed',
      registrationNumber: 'FIF-MLT433AY-NFX',
      submittedAt: '2026-02-19T07:00:20.985Z'
    },
    {
      _id: '6996c123805fef4756d009a1',
      fullName: 'Sneha Roy',
      emailAddress: 'sneha.roy@example.com',
      contactNumber: '08123456789',
      collegeName: 'Techno India',
      yearOfStudy: '2026',
      department: 'cse',
      fifaUsername: 'sneha_gamer',
      teamOvr: '118',
      deviceModel: 'Samsung S21',
      eventName: 'FIFA Mobile',
      paymentStatus: 'confirmed',
      registrationStatus: 'confirmed',
      registrationNumber: 'FIF-MLT5X8PQ-ABC',
      submittedAt: '2026-02-18T14:30:15.123Z'
    }
  ];

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    history.push('/admin');
  };

  const handleStatusChange = (id, field, value) => {
    console.log('Update:', id, field, value);
    // API call would go here
  };

  const handleViewDetails = (reg) => {
    console.log('View details:', reg);
    // Open modal or navigate to detail page
  };

  const filteredRegistrations = registrations.filter(reg => {
    const matchesSearch = reg.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         reg.emailAddress.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         reg.registrationNumber.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="role-dashboard coordinator-dashboard">
      <div className="dashboard-wrapper">

        {/* ── Header ── */}
        <header className="dash-header">
          <div className="dash-header-left">
            <p className="dash-kicker">TechStorm 2.26 · Admin Portal</p>
            <h1 className="dash-title">Coordinator Dashboard</h1>
            <div className="dash-header-meta">
              <span className="coord-event-tag">{assignedEvent}</span>
              <span className="coord-access-tag">Update &amp; View Access</span>
            </div>
          </div>
          <button className="logout-btn" onClick={handleLogout}>↩ Log out</button>
        </header>

        {/* ── Stats ── */}
        <div className="stats-grid stats-grid--coordinator">
          <div className="stat-card stat-card--total">
            <p className="stat-icon">👥</p>
            <p className="stat-label">Total Participants</p>
            <p className="stat-value">{registrations.length}</p>
            <p className="stat-hint">All registrations</p>
          </div>
          <div className="stat-card stat-card--pending">
            <p className="stat-icon">⏳</p>
            <p className="stat-label">Pending Payments</p>
            <p className="stat-value">{registrations.filter(r => r.paymentStatus === 'pending').length}</p>
            <p className="stat-hint">Awaiting verification</p>
          </div>
          <div className="stat-card stat-card--confirmed">
            <p className="stat-icon">✅</p>
            <p className="stat-label">Confirmed</p>
            <p className="stat-value">{registrations.filter(r => r.paymentStatus === 'confirmed').length}</p>
            <p className="stat-hint">Payments verified</p>
          </div>
          <div className="stat-card stat-card--events">
            <p className="stat-icon">⚽</p>
            <p className="stat-label">Avg Team OVR</p>
            <p className="stat-value">
              {Math.round(registrations.reduce((sum, r) => sum + parseInt(r.teamOvr), 0) / registrations.length)}
            </p>
            <p className="stat-hint">Average squad rating</p>
          </div>
        </div>

        {/* ── Controls ── */}
        <div className="controls-bar">
          <div className="coord-search-wrapper">
            <span className="coord-search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search by name, email or registration number…"
              className="search-input coord-search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="export-btn">📊 Export Data</button>
        </div>

        {/* ── Registrations ── */}
        <div className="registrations-section">
          <div className="coord-section-header">
            <div>
              <h2 className="section-title">{assignedEvent} Registrations</h2>
              <p className="section-subtitle">
                Showing <strong>{filteredRegistrations.length}</strong> of <strong>{registrations.length}</strong> participants
              </p>
            </div>
          </div>

          {filteredRegistrations.length === 0 ? (
            <div className="coord-empty-state">
              <p className="coord-empty-icon">🔍</p>
              <p className="coord-empty-title">No results found</p>
              <p className="coord-empty-body">Try adjusting your search term.</p>
            </div>
          ) : (
            <div className="cards-grid">
              {filteredRegistrations.map(reg => (
                <div key={reg._id} className="registration-card coord-reg-card">

                  {/* Card Top */}
                  <div className="card-header">
                    <span className="reg-number-badge">{reg.registrationNumber}</span>
                    <span className={`status-badge payment-${reg.paymentStatus}`}>
                      {reg.paymentStatus}
                    </span>
                  </div>

                  <h3 className="participant-name">{reg.fullName}</h3>

                  {/* Contact Info */}
                  <p className="coord-detail-section-label">Contact Info</p>
                  <div className="card-details">
                    <div className="detail-row">
                      <span className="detail-label">Email</span>
                      <span className="detail-value">{reg.emailAddress}</span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">Phone</span>
                      <span className="detail-value">{reg.contactNumber}</span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">College</span>
                      <span className="detail-value">{reg.collegeName}</span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">Year</span>
                      <span className="detail-value">{reg.yearOfStudy}</span>
                    </div>
                  </div>

                  {/* Game Info */}
                  <p className="coord-detail-section-label coord-detail-section-label--game">Game Details</p>
                  <div className="card-details">
                    <div className="detail-row">
                      <span className="detail-label">FIFA Username</span>
                      <span className="detail-value coord-detail-accent">{reg.fifaUsername}</span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">Team OVR</span>
                      <span className="detail-value coord-detail-accent">{reg.teamOvr}</span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">Device</span>
                      <span className="detail-value">{reg.deviceModel}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="card-actions coord-card-actions">
                    <select
                      className={`status-select payment-${reg.paymentStatus}`}
                      value={reg.paymentStatus}
                      onChange={(e) => handleStatusChange(reg._id, 'paymentStatus', e.target.value)}
                    >
                      <option value="pending">Payment Pending</option>
                      <option value="confirmed">Payment Confirmed</option>
                      <option value="failed">Payment Failed</option>
                    </select>
                    <button className="view-details-btn" onClick={() => handleViewDetails(reg)}>
                      View Full Details
                    </button>
                  </div>

                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default CoordinatorDashboard;
