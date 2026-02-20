import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import './RoleDashboard.css';

const StatisticsPage = () => {
  const history = useHistory();
  const location = useLocation();
  const role = location.pathname.split('/')[2];

  const handleBack = () => {
    history.push(`/admin/${role}/dashboard`);
  };

  const roleConfig = {
    core: { name: 'Core', color: '#0f766e' },
    coordinator: { name: 'Coordinator', color: '#2563eb' },
    volunteer: { name: 'Volunteer', color: '#9333ea' }
  };

  const config = roleConfig[role] || roleConfig.core;

  return (
    <div className={`role-dashboard ${role}-dashboard`}>
      <div className="dashboard-wrapper">
        <header className="dash-header">
          <div>
            <button className="back-btn" onClick={handleBack}>← Back</button>
            <p className="dash-kicker">TechStorm Admin</p>
            <h1 className="dash-title">Statistics</h1>
            <p className="dash-subtitle">{config.name} Dashboard</p>
          </div>
        </header>

        <div className="stats-grid">
          <div className="stat-card">
            <p className="stat-label">Total Events</p>
            <p className="stat-value">15</p>
          </div>
          <div className="stat-card">
            <p className="stat-label">Total Registrations</p>
            <p className="stat-value">342</p>
          </div>
          <div className="stat-card">
            <p className="stat-label">Revenue Generated</p>
            <p className="stat-value">₹1.2L</p>
          </div>
          <div className="stat-card">
            <p className="stat-label">Active Users</p>
            <p className="stat-value">289</p>
          </div>
        </div>

        <div className="registrations-section">
          <h2 className="section-title">Event-wise Statistics</h2>
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Event Name</th>
                  <th>Registrations</th>
                  <th>Confirmed</th>
                  <th>Pending</th>
                  <th>Revenue</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><span className="event-badge">FIFA Mobile</span></td>
                  <td>45</td>
                  <td>42</td>
                  <td>3</td>
                  <td>₹13,500</td>
                </tr>
                <tr>
                  <td><span className="event-badge">Khet</span></td>
                  <td>38</td>
                  <td>35</td>
                  <td>3</td>
                  <td>₹11,400</td>
                </tr>
                <tr>
                  <td><span className="event-badge">Combat</span></td>
                  <td>52</td>
                  <td>50</td>
                  <td>2</td>
                  <td>₹15,600</td>
                </tr>
                <tr>
                  <td><span className="event-badge">Hackstrom</span></td>
                  <td>67</td>
                  <td>65</td>
                  <td>2</td>
                  <td>₹20,100</td>
                </tr>
                <tr>
                  <td><span className="event-badge">Codebee</span></td>
                  <td>89</td>
                  <td>85</td>
                  <td>4</td>
                  <td>₹26,700</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatisticsPage;
