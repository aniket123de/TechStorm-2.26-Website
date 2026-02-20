import React, { useEffect, useState, useCallback } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const history = useHistory();
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Extract role from pathname (/admin/core/dashboard -> core)
  const role = location.pathname.split('/')[2];

  const handleLogout = useCallback(() => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    history.push('/admin');
  }, [history]);

  useEffect(() => {
    // Check authentication
    const token = localStorage.getItem('adminToken');
    const userData = localStorage.getItem('adminUser');

    if (!token || !userData) {
      history.push(`/admin/${role}`);
      return;
    }

    const parsedUser = JSON.parse(userData);

    // Verify role matches
    if (parsedUser.role !== role) {
      alert('Access denied: Role mismatch');
      handleLogout();
      return;
    }

    setUser(parsedUser);
    setLoading(false);
  }, [role, history, handleLogout]);

  const roleConfig = {
    core: {
      name: 'Core',
      color: '#0f766e'
    },
    coordinator: {
      name: 'Coordinator',
      color: '#2563eb'
    },
    volunteer: {
      name: 'Volunteer',
      color: '#9333ea'
    }
  };

  const config = roleConfig[role] || roleConfig.core;

  const handleNavigate = (page) => {
    // Navigate to specific dashboard based on role
    if (role === 'core') {
      history.push(`/admin/core/${page}`);
    } else if (role === 'coordinator') {
      history.push(`/admin/coordinator/${page}`);
    } else if (role === 'volunteer') {
      history.push(`/admin/volunteer/${page}`);
    }
  };

  if (loading) {
    return (
      <div className="admin-dashboard" style={{ '--role-color': config.color }}>
        <div className="dashboard-container">
          <div className="loading">Loading dashboard...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard" style={{ '--role-color': config.color }}>
      <div className="dashboard-container">
        <header className="dashboard-header">
          <div>
            <p className="header-kicker">TechStorm Admin</p>
            <h1 className="dashboard-title">{config.name} Dashboard</h1>
          </div>
          <button className="logout-button" onClick={handleLogout}>
            Log out
          </button>
        </header>

        <div className="welcome-card">
          <h2>Welcome, {user.name || config.name}</h2>
          <div className="user-info">
            <div className="info-item">
              <span className="info-label">Email</span>
              <span className="info-value">{user.email}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Role</span>
              <span className="info-value">{user.role}</span>
            </div>
            {user.eventAbbr && (
              <div className="info-item">
                <span className="info-label">Event</span>
                <span className="info-value">{user.eventName || user.eventAbbr}</span>
              </div>
            )}
          </div>
        </div>

        <div className="dashboard-grid">
          <div className="dashboard-card">
            <p className="card-kicker">Overview</p>
            <h3>Statistics</h3>
            <p>View key event and system metrics.</p>
            <button className="card-button" onClick={() => handleNavigate('statistics')}>Open</button>
          </div>

          {user.permissions?.includes('read') && (
            <div className="dashboard-card">
              <p className="card-kicker">Data</p>
              <h3>Events</h3>
              <p>Review schedules and event records.</p>
              <button className="card-button" onClick={() => handleNavigate('events')}>Open</button>
            </div>
          )}

          {user.permissions?.includes('update') && (
            <div className="dashboard-card">
              <p className="card-kicker">Actions</p>
              <h3>Edit Content</h3>
              <p>Update event details and announcements.</p>
              <button className="card-button" onClick={() => handleNavigate('edit')}>Open</button>
            </div>
          )}

          {user.permissions?.includes('create') && (
            <div className="dashboard-card">
              <p className="card-kicker">Actions</p>
              <h3>Create New</h3>
              <p>Add new events and resources.</p>
              <button className="card-button" onClick={() => handleNavigate('create')}>Open</button>
            </div>
          )}

          {user.permissions?.includes('delete') && (
            <div className="dashboard-card">
              <p className="card-kicker">Admin</p>
              <h3>Manage Users</h3>
              <p>Access user administration controls.</p>
              <button className="card-button" onClick={() => handleNavigate('users')}>Open</button>
            </div>
          )}

          <div className="dashboard-card">
            <p className="card-kicker">Participants</p>
            <h3>Registrations</h3>
            <p>View participant registration status.</p>
            <button className="card-button" onClick={() => handleNavigate('registrations')}>Open</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
