import React, { useEffect, useState, useCallback } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import AdminLoading from './AdminLoading';
import RevenueModal from './RevenueModal';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const history = useHistory();
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showRevenueModal, setShowRevenueModal] = useState(false);

  // Extract role from pathname (/admin/core/dashboard -> core)
  const role = location.pathname.split('/')[2];

  const handleLogout = useCallback(() => {
    localStorage.removeItem(`adminToken_${role}`);
    localStorage.removeItem(`adminUser_${role}`);
    history.push('/admin');
  }, [history, role]);

  useEffect(() => {
    // Check authentication with role-specific keys
    const token = localStorage.getItem(`adminToken_${role}`);
    const userData = localStorage.getItem(`adminUser_${role}`);

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
        <div className="dashboard-container dashboard-container--loading">
          <AdminLoading message="Loading dashboard..." roleColor={config.color} />
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
          <div className="dashboard-card dashboard-card--statistics">
            <p className="card-kicker">Overview</p>
            <h3>Statistics</h3>
            <p className="card-desc">View key event and system metrics.</p>
            <button type="button" className="card-button" onClick={() => handleNavigate('statistics')}>Open</button>
          </div>

          {role === 'core' && user.permissions?.includes('delete') && (
            <div className="dashboard-card dashboard-card--revenue">
              <p className="card-kicker">Finance</p>
              <h3>Revenue</h3>
              <p className="card-desc">Generate total earned revenue across TechStorm 2.26.</p>
              <button type="button" className="card-button" onClick={() => setShowRevenueModal(true)}>Open</button>
            </div>
          )}

          <div className="dashboard-card dashboard-card--registrations">
            <p className="card-kicker">Participants</p>
            <h3>Registrations</h3>
            <p className="card-desc">View participant registration status.</p>
            <button type="button" className="card-button" onClick={() => handleNavigate('registrations')}>Open</button>
          </div>
        </div>

        {showRevenueModal && role === 'core' && (
          <RevenueModal onClose={() => setShowRevenueModal(false)} />
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
