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
      icon: '🔴',
      color: '#ff4444'
    },
    coordinator: {
      name: 'Coordinator',
      icon: '🟡',
      color: '#ffaa00'
    },
    volunteer: {
      name: 'Volunteer',
      icon: '🟢',
      color: '#44ff44'
    }
  };

  const config = roleConfig[role] || roleConfig.core;

  if (loading) {
    return (
      <div className="admin-dashboard" style={{ '--role-color': config.color }}>
        <div className="dashboard-container">
          <div className="loading">
            <div className="spinner-large"></div>
            <p>Loading dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard" style={{ '--role-color': config.color }}>
      <div className="dashboard-container">
        <header className="dashboard-header">
          <div className="header-left">
            <div className="role-icon-small">{config.icon}</div>
            <div>
              <h1 className="dashboard-title">{config.name} Dashboard</h1>
              <p className="dashboard-subtitle">TechStorm 2.26 Admin Portal</p>
            </div>
          </div>
          <button className="logout-button" onClick={handleLogout}>
            Logout →
          </button>
        </header>

        <div className="welcome-card">
          <h2>Welcome back, {user.name || config.name}!</h2>
          <div className="user-info">
            <div className="info-item">
              <span className="info-label">Email:</span>
              <span className="info-value">{user.email}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Role:</span>
              <span className="info-value">{user.role}</span>
            </div>
            {user.eventAbbr && (
              <div className="info-item">
                <span className="info-label">Event:</span>
                <span className="info-value">{user.eventName || user.eventAbbr}</span>
              </div>
            )}
            <div className="info-item">
              <span className="info-label">Permissions:</span>
              <span className="info-value">{user.permissions?.join(', ')}</span>
            </div>
          </div>
        </div>

        <div className="dashboard-grid">
          <div className="dashboard-card">
            <div className="card-icon">📊</div>
            <h3>Statistics</h3>
            <p>View system and event statistics</p>
            <button className="card-button">View Stats</button>
          </div>

          {user.permissions?.includes('read') && (
            <div className="dashboard-card">
              <div className="card-icon">📋</div>
              <h3>Events</h3>
              <p>Manage and view events</p>
              <button className="card-button">View Events</button>
            </div>
          )}

          {user.permissions?.includes('update') && (
            <div className="dashboard-card">
              <div className="card-icon">✏️</div>
              <h3>Edit Content</h3>
              <p>Update event information</p>
              <button className="card-button">Edit Events</button>
            </div>
          )}

          {user.permissions?.includes('create') && (
            <div className="dashboard-card">
              <div className="card-icon">➕</div>
              <h3>Create New</h3>
              <p>Add new events and resources</p>
              <button className="card-button">Create Event</button>
            </div>
          )}

          {user.permissions?.includes('delete') && (
            <div className="dashboard-card">
              <div className="card-icon">🗑️</div>
              <h3>Manage Users</h3>
              <p>User administration</p>
              <button className="card-button">Manage Users</button>
            </div>
          )}

          <div className="dashboard-card">
            <div className="card-icon">👥</div>
            <h3>Registrations</h3>
            <p>View participant registrations</p>
            <button className="card-button">View Registrations</button>
          </div>
        </div>

        <div className="permissions-info">
          <h3>Your Permissions</h3>
          <div className="permissions-list">
            {user.permissions?.map((permission) => (
              <span key={permission} className="permission-badge">
                ✓ {permission.toUpperCase()}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
