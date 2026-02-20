import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import './RoleDashboard.css';

const EventsPage = () => {
  const history = useHistory();
  const location = useLocation();
  const role = location.pathname.split('/')[2];
  const [searchTerm, setSearchTerm] = useState('');

  const handleBack = () => {
    history.push(`/admin/${role}/dashboard`);
  };

  const roleConfig = {
    core: { name: 'Core', color: '#0f766e' },
    coordinator: { name: 'Coordinator', color: '#2563eb' },
    volunteer: { name: 'Volunteer', color: '#9333ea' }
  };

  const config = roleConfig[role] || roleConfig.core;

  const events = [
    { id: 1, name: 'FIFA Mobile', category: 'Gaming', date: '2026-03-15', status: 'Active', participants: 45 },
    { id: 2, name: 'Khet', category: 'Gaming', date: '2026-03-16', status: 'Active', participants: 38 },
    { id: 3, name: 'Combat', category: 'Robotics', date: '2026-03-17', status: 'Active', participants: 52 },
    { id: 4, name: 'Hackstrom', category: 'Coding', date: '2026-03-18', status: 'Active', participants: 67 },
    { id: 5, name: 'Codebee', category: 'Coding', date: '2026-03-19', status: 'Active', participants: 89 },
    { id: 6, name: 'Ro Soccer', category: 'Robotics', date: '2026-03-20', status: 'Upcoming', participants: 0 },
    { id: 7, name: 'Creative Canvas', category: 'Art', date: '2026-03-21', status: 'Upcoming', participants: 0 },
  ];

  const filteredEvents = events.filter(event =>
    event.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={`role-dashboard ${role}-dashboard`}>
      <div className="dashboard-wrapper">
        <header className="dash-header">
          <div>
            <button className="back-btn" onClick={handleBack}>← Back</button>
            <p className="dash-kicker">TechStorm Admin</p>
            <h1 className="dash-title">Events</h1>
            <p className="dash-subtitle">{config.name} Dashboard</p>
          </div>
        </header>

        <div className="controls-bar">
          <input
            type="text"
            placeholder="Search events..."
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="registrations-section">
          <h2 className="section-title">All Events ({filteredEvents.length})</h2>
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Event Name</th>
                  <th>Category</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Participants</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredEvents.map(event => (
                  <tr key={event.id}>
                    <td><span className="event-badge">{event.name}</span></td>
                    <td>{event.category}</td>
                    <td>{new Date(event.date).toLocaleDateString('en-IN')}</td>
                    <td>
                      <span className={`status-pill ${event.status === 'Active' ? 'payment-confirmed' : 'payment-pending'}`}>
                        {event.status}
                      </span>
                    </td>
                    <td>{event.participants}</td>
                    <td>
                      <div className="action-buttons">
                        <button className="action-btn view-btn" title="View Details">👁️</button>
                        <button className="action-btn edit-btn" title="Edit">✏️</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventsPage;
