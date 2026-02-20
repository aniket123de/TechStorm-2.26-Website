import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import './RoleDashboard.css';
import ViewRegistrationModal from './ViewRegistrationModal';
import EditRegistrationModal from './EditRegistrationModal';
import AddRegistrationModal from './AddRegistrationModal';

const RegistrationsPage = () => {
  const history = useHistory();
  const location = useLocation();
  const [selectedEvent, setSelectedEvent] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewingRegistration, setViewingRegistration] = useState(null);
  const [editingRegistration, setEditingRegistration] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [user, setUser] = useState(null);

  // Extract role from pathname
  const role = location.pathname.split('/')[2];

  useEffect(() => {
    const userData = localStorage.getItem('adminUser');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  // Dummy registration data
  const [registrations, setRegistrations] = useState([
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
      paymentMode: 'online',
      transactionId: 'tfgmjgvh,jcfg,',
      paymentStatus: 'pending',
      registrationStatus: 'confirmed',
      registrationNumber: 'KHE-MLT2ZEYC-VJG',
      submittedAt: '2026-02-19T06:29:29.841Z'
    },
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
      paymentMode: 'online',
      transactionId: 'dfzdsgzfg45646',
      paymentStatus: 'confirmed',
      registrationStatus: 'confirmed',
      registrationNumber: 'FIF-MLT2QI7O-5GE',
      submittedAt: '2026-02-19T06:22:34.161Z'
    },
    {
      _id: '6996b504805fef4756d00998',
      fullName: 'Priya Das',
      emailAddress: 'priya.das@example.com',
      contactNumber: '08765432109',
      collegeName: 'Jadavpur University',
      yearOfStudy: '2024',
      department: 'it',
      eventName: 'Combat',
      paymentMode: 'offline',
      paymentStatus: 'confirmed',
      registrationStatus: 'confirmed',
      registrationNumber: 'COM-MLT433AY-NFX',
      submittedAt: '2026-02-18T10:15:20.985Z'
    }
  ]);

  const events = ['all', 'Khet', 'FIFA Mobile', 'Combat', 'Hackstrom', 'Codebee'];

  const roleConfig = {
    core: { name: 'Core', color: '#0f766e', canEdit: true, canDelete: true, canAdd: true },
    coordinator: { name: 'Coordinator', color: '#2563eb', canEdit: true, canDelete: false, canAdd: false },
    volunteer: { name: 'Volunteer', color: '#9333ea', canEdit: false, canDelete: false, canAdd: false }
  };

  const config = roleConfig[role] || roleConfig.core;

  const handleBack = () => {
    history.push(`/admin/${role}/dashboard`);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this registration?')) {
      setRegistrations(prev => prev.filter(reg => reg._id !== id));
    }
  };

  const handleView = (registration) => {
    setViewingRegistration(registration);
  };

  const handleEdit = (registration) => {
    setEditingRegistration(registration);
  };

  const handleSaveEdit = (id, updatedData) => {
    setRegistrations(prev => prev.map(reg => 
      reg._id === id ? { ...reg, ...updatedData } : reg
    ));
  };

  const handleAddRegistration = (newRegistration) => {
    setRegistrations(prev => [newRegistration, ...prev]);
  };

  const handleStatusChange = (id, field, value) => {
    setRegistrations(prev => prev.map(reg => 
      reg._id === id ? { ...reg, [field]: value } : reg
    ));
  };

  // Filter by event for coordinator/volunteer
  let filteredRegistrations = registrations;
  if (role !== 'core' && user?.eventName) {
    filteredRegistrations = registrations.filter(reg => reg.eventName === user.eventName);
  }

  // Apply search and event filter
  filteredRegistrations = filteredRegistrations.filter(reg => {
    const matchesEvent = selectedEvent === 'all' || reg.eventName === selectedEvent;
    const matchesSearch = reg.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         reg.emailAddress.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         reg.registrationNumber.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesEvent && matchesSearch;
  });

  return (
    <div className={`role-dashboard ${role}-dashboard`}>
      <div className="dashboard-wrapper">
        <header className="dash-header">
          <div>
            <button className="back-btn" onClick={handleBack}>← Back</button>
            <p className="dash-kicker">TechStorm Admin</p>
            <h1 className="dash-title">Registrations</h1>
            <p className="dash-subtitle">{config.name} • {config.canEdit ? 'Edit Access' : 'View Only'}</p>
          </div>
        </header>

        <div className="stats-grid">
          <div className="stat-card">
            <p className="stat-label">Total Registrations</p>
            <p className="stat-value">{filteredRegistrations.length}</p>
          </div>
          <div className="stat-card">
            <p className="stat-label">Pending Payments</p>
            <p className="stat-value">{filteredRegistrations.filter(r => r.paymentStatus === 'pending').length}</p>
          </div>
          <div className="stat-card">
            <p className="stat-label">Confirmed</p>
            <p className="stat-value">{filteredRegistrations.filter(r => r.registrationStatus === 'confirmed').length}</p>
          </div>
          <div className="stat-card">
            <p className="stat-label">Events</p>
            <p className="stat-value">{role === 'core' ? events.length - 1 : 1}</p>
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
          {role === 'core' && (
            <select
              className="event-filter"
              value={selectedEvent}
              onChange={(e) => setSelectedEvent(e.target.value)}
            >
              {events.map(event => (
                <option key={event} value={event}>
                  {event === 'all' ? 'All Events' : event}
                </option>
              ))}
            </select>
          )}
          {config.canAdd && (
            <button className="add-btn" onClick={() => setShowAddModal(true)}>+ Add Registration</button>
          )}
        </div>

        <div className="registrations-section">
          <h2 className="section-title">
            {role === 'core' ? 'All Registrations' : `${user?.eventName || 'Event'} Registrations`} ({filteredRegistrations.length})
          </h2>
          
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Reg. Number</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Contact</th>
                  <th>College</th>
                  {role === 'core' && <th>Event</th>}
                  <th>Payment</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredRegistrations.map(reg => (
                  <tr key={reg._id}>
                    <td className="reg-number">{reg.registrationNumber}</td>
                    <td>{reg.fullName}</td>
                    <td className="email-cell">{reg.emailAddress}</td>
                    <td>{reg.contactNumber}</td>
                    <td className="college-cell">{reg.collegeName}</td>
                    {role === 'core' && <td><span className="event-badge">{reg.eventName}</span></td>}
                    <td>
                      {config.canEdit ? (
                        <select
                          className={`status-select payment-${reg.paymentStatus}`}
                          value={reg.paymentStatus}
                          onChange={(e) => handleStatusChange(reg._id, 'paymentStatus', e.target.value)}
                        >
                          <option value="pending">Pending</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="failed">Failed</option>
                        </select>
                      ) : (
                        <span className={`status-pill payment-${reg.paymentStatus}`}>
                          {reg.paymentStatus}
                        </span>
                      )}
                    </td>
                    <td>
                      {config.canEdit ? (
                        <select
                          className={`status-select reg-${reg.registrationStatus}`}
                          value={reg.registrationStatus}
                          onChange={(e) => handleStatusChange(reg._id, 'registrationStatus', e.target.value)}
                        >
                          <option value="confirmed">Confirmed</option>
                          <option value="pending">Pending</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      ) : (
                        <span className={`status-pill reg-${reg.registrationStatus}`}>
                          {reg.registrationStatus}
                        </span>
                      )}
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button className="action-btn view-btn" onClick={() => handleView(reg)} title="View Details">👁️</button>
                        {config.canEdit && (
                          <button className="action-btn edit-btn" onClick={() => handleEdit(reg)} title="Edit">✏️</button>
                        )}
                        {config.canDelete && (
                          <button className="action-btn delete-btn" onClick={() => handleDelete(reg._id)} title="Delete">🗑️</button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modals */}
        {viewingRegistration && (
          <ViewRegistrationModal
            registration={viewingRegistration}
            onClose={() => setViewingRegistration(null)}
          />
        )}

        {editingRegistration && config.canEdit && (
          <EditRegistrationModal
            registration={editingRegistration}
            onClose={() => setEditingRegistration(null)}
            onSave={handleSaveEdit}
          />
        )}

        {showAddModal && config.canAdd && (
          <AddRegistrationModal
            onClose={() => setShowAddModal(false)}
            onAdd={handleAddRegistration}
          />
        )}
      </div>
    </div>
  );
};

export default RegistrationsPage;
