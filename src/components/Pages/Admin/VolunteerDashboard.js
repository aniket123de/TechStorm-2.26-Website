import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './RoleDashboard.css';

const VolunteerDashboard = () => {
  const history = useHistory();
  const [searchTerm, setSearchTerm] = useState('');
  
  // Volunteer is assigned to specific event
  const assignedEvent = 'Khet';

  // Dummy registration data - only for assigned event (view only)
  const registrations = [
    {
      _id: '6996adc9805fef4756d00974',
      fullName: 'Adrish Basak',
      emailAddress: 'adrishbasak003@gmail.com',
      contactNumber: '07003940421',
      collegeName: 'B. P. Poddar Institute of Management and Technology',
      year: '3rd Year',
      streamBranch: 'CSE',
      teamName: '',
      numberOfParticipants: '1',
      eventName: 'Khet',
      paymentStatus: 'pending',
      registrationStatus: 'confirmed',
      registrationNumber: 'KHE-MLT2ZEYC-VJG',
      submittedAt: '2026-02-19T06:29:29.841Z'
    },
    {
      _id: '6996d234805fef4756d009b2',
      fullName: 'Amit Kumar',
      emailAddress: 'amit.kumar@example.com',
      contactNumber: '09123456780',
      collegeName: 'Calcutta University',
      year: '2nd Year',
      streamBranch: 'ECE',
      teamName: 'Tech Warriors',
      numberOfParticipants: '2',
      eventName: 'Khet',
      paymentStatus: 'confirmed',
      registrationStatus: 'confirmed',
      registrationNumber: 'KHE-MLT3ABC9-XYZ',
      submittedAt: '2026-02-18T12:15:30.456Z'
    },
    {
      _id: '6996e345805fef4756d009c3',
      fullName: 'Riya Chatterjee',
      emailAddress: 'riya.c@example.com',
      contactNumber: '08234567891',
      collegeName: 'St. Xavier\'s College',
      year: '4th Year',
      streamBranch: 'IT',
      teamName: 'Code Ninjas',
      numberOfParticipants: '3',
      eventName: 'Khet',
      paymentStatus: 'confirmed',
      registrationStatus: 'confirmed',
      registrationNumber: 'KHE-MLT4DEF2-PQR',
      submittedAt: '2026-02-17T09:45:12.789Z'
    }
  ];

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    history.push('/admin');
  };

  const filteredRegistrations = registrations.filter(reg => {
    const matchesSearch = reg.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         reg.emailAddress.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         reg.registrationNumber.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="role-dashboard volunteer-dashboard">
      <div className="dashboard-wrapper">
        <header className="dash-header">
          <div>
            <p className="dash-kicker">TechStorm Admin</p>
            <h1 className="dash-title">Volunteer Dashboard</h1>
            <p className="dash-subtitle">Event: {assignedEvent} • View Only Access</p>
          </div>
          <button className="logout-btn" onClick={handleLogout}>Log out</button>
        </header>

        <div className="stats-grid">
          <div className="stat-card">
            <p className="stat-label">Total Participants</p>
            <p className="stat-value">{registrations.length}</p>
          </div>
          <div className="stat-card">
            <p className="stat-label">Confirmed Payments</p>
            <p className="stat-value">{registrations.filter(r => r.paymentStatus === 'confirmed').length}</p>
          </div>
          <div className="stat-card">
            <p className="stat-label">Pending Payments</p>
            <p className="stat-value">{registrations.filter(r => r.paymentStatus === 'pending').length}</p>
          </div>
          <div className="stat-card">
            <p className="stat-label">Total Teams</p>
            <p className="stat-value">{registrations.filter(r => r.teamName).length}</p>
          </div>
        </div>

        <div className="controls-bar">
          <input
            type="text"
            placeholder="Search by name, email, or registration number..."
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="view-only-badge">👁️ View Only Mode</div>
        </div>

        <div className="registrations-section">
          <h2 className="section-title">{assignedEvent} Participants ({filteredRegistrations.length})</h2>
          
          <div className="list-view">
            {filteredRegistrations.map(reg => (
              <div key={reg._id} className="participant-item">
                <div className="participant-main">
                  <div className="participant-info">
                    <h3 className="participant-name">{reg.fullName}</h3>
                    <p className="participant-reg">{reg.registrationNumber}</p>
                  </div>
                  <div className="participant-badges">
                    <span className={`status-badge payment-${reg.paymentStatus}`}>
                      {reg.paymentStatus === 'confirmed' ? '✓ Paid' : '⏳ Pending'}
                    </span>
                    <span className="status-badge reg-confirmed">
                      {reg.registrationStatus}
                    </span>
                  </div>
                </div>

                <div className="participant-details-grid">
                  <div className="detail-item">
                    <span className="detail-icon">📧</span>
                    <div>
                      <p className="detail-label">Email</p>
                      <p className="detail-value">{reg.emailAddress}</p>
                    </div>
                  </div>
                  
                  <div className="detail-item">
                    <span className="detail-icon">📱</span>
                    <div>
                      <p className="detail-label">Contact</p>
                      <p className="detail-value">{reg.contactNumber}</p>
                    </div>
                  </div>
                  
                  <div className="detail-item">
                    <span className="detail-icon">🏫</span>
                    <div>
                      <p className="detail-label">College</p>
                      <p className="detail-value">{reg.collegeName}</p>
                    </div>
                  </div>
                  
                  <div className="detail-item">
                    <span className="detail-icon">📚</span>
                    <div>
                      <p className="detail-label">Year & Branch</p>
                      <p className="detail-value">{reg.year} - {reg.streamBranch}</p>
                    </div>
                  </div>
                  
                  {reg.teamName && (
                    <div className="detail-item">
                      <span className="detail-icon">👥</span>
                      <div>
                        <p className="detail-label">Team</p>
                        <p className="detail-value">{reg.teamName} ({reg.numberOfParticipants} members)</p>
                      </div>
                    </div>
                  )}
                  
                  <div className="detail-item">
                    <span className="detail-icon">📅</span>
                    <div>
                      <p className="detail-label">Registered</p>
                      <p className="detail-value">
                        {new Date(reg.submittedAt).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VolunteerDashboard;
