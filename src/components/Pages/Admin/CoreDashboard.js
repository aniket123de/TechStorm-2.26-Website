import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './RoleDashboard.css';
import ViewRegistrationModal from './ViewRegistrationModal';
import EditRegistrationModal from './EditRegistrationModal';
import AddRegistrationModal from './AddRegistrationModal';

const CoreDashboard = () => {
  const history = useHistory();
  const [selectedEvent, setSelectedEvent] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewingRegistration, setViewingRegistration] = useState(null);
  const [editingRegistration, setEditingRegistration] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);

  // Dummy registration data (in real app, this would be state from API)
  const [registrations, setRegistrations] = useState([
    {
      _id: '6996adc9805fef4756d00974',
      fullName: 'Adrish Basak',
      emailAddress: 'adrishbasak003@gmail.com',
      contactNumber: '07003940421',
      collegeName: 'B. P. Poddar Institute of Management and Technology',
      year: '3rd Year',
      eventName: 'Khet',
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
      eventName: 'FIFA Mobile',
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
      paymentStatus: 'confirmed',
      registrationStatus: 'confirmed',
      registrationNumber: 'COM-MLT433AY-NFX',
      submittedAt: '2026-02-18T10:15:20.985Z'
    }
  ]);

  const events = ['all', 'Khet', 'FIFA Mobile', 'Combat', 'Hackstrom', 'Codebee'];

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    history.push('/admin');
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this registration?')) {
      setRegistrations(prev => prev.filter(reg => reg._id !== id));
      console.log('Deleted registration:', id);
      // API call would go here
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
    console.log('Updated registration:', id, updatedData);
    // API call would go here
  };

  const handleAddRegistration = (newRegistration) => {
    setRegistrations(prev => [newRegistration, ...prev]);
    console.log('Added new registration:', newRegistration);
    // API call would go here
  };

  const handleStatusChange = (id, field, value) => {
    setRegistrations(prev => prev.map(reg => 
      reg._id === id ? { ...reg, [field]: value } : reg
    ));
    console.log('Update:', id, field, value);
    // API call would go here
  };

  const filteredRegistrations = registrations.filter(reg => {
    const matchesEvent = selectedEvent === 'all' || reg.eventName === selectedEvent;
    const matchesSearch = reg.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         reg.emailAddress.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         reg.registrationNumber.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesEvent && matchesSearch;
  });

  return (
    <div className="role-dashboard core-dashboard">
      <div className="dashboard-wrapper">

        {/* ── Header ── */}
        <header className="dash-header">
          <div className="dash-header-left">
            <p className="dash-kicker">TechStorm 2.26 · Admin Portal</p>
            <h1 className="dash-title">Core Dashboard</h1>
            <div className="dash-header-meta">
              <span className="core-access-tag core-access-tag--full">Full Access</span>
              <span className="core-access-tag core-access-tag--crud">CRUD Operations</span>
            </div>
          </div>
          <button className="logout-btn" onClick={handleLogout}>↩ Log out</button>
        </header>

        {/* ── Stats ── */}
        <div className="stats-grid stats-grid--core">
          <div className="stat-card stat-card--events">
            <p className="stat-icon">📋</p>
            <p className="stat-label">Total Registrations</p>
            <p className="stat-value">{registrations.length}</p>
            <p className="stat-hint">Across all events</p>
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
            <p className="stat-value">{registrations.filter(r => r.registrationStatus === 'confirmed').length}</p>
            <p className="stat-hint">Registration confirmed</p>
          </div>
          <div className="stat-card stat-card--total">
            <p className="stat-icon">🎮</p>
            <p className="stat-label">Events Active</p>
            <p className="stat-value">{events.length - 1}</p>
            <p className="stat-hint">Live event tracks</p>
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
          <button className="add-btn" onClick={() => setShowAddModal(true)}>＋ Add Registration</button>
        </div>

        {/* ── Table Section ── */}
        <div className="registrations-section">
          <div className="core-section-header">
            <div>
              <h2 className="section-title">Registrations</h2>
              <p className="section-subtitle">
                Showing <strong>{filteredRegistrations.length}</strong> of <strong>{registrations.length}</strong> total registrations
                {selectedEvent !== 'all' && <> · filtered by <strong>{selectedEvent}</strong></>}
              </p>
            </div>
          </div>

          {filteredRegistrations.length === 0 ? (
            <div className="coord-empty-state">
              <p className="coord-empty-icon">🔍</p>
              <p className="coord-empty-title">No registrations found</p>
              <p className="coord-empty-body">Try adjusting your search or event filter.</p>
            </div>
          ) : (
            <div className="table-container core-table-container">
              <table className="data-table core-table">
                <thead>
                  <tr>
                    <th className="col-reg">Reg. No.</th>
                    <th className="col-name">Name</th>
                    <th className="col-email">Email</th>
                    <th className="col-contact">Contact</th>
                    <th className="col-college">College</th>
                    <th className="col-event">Event</th>
                    <th className="col-payment">Payment</th>
                    <th className="col-status">Status</th>
                    <th className="col-actions">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRegistrations.map(reg => (
                    <tr key={reg._id}>
                      <td><span className="reg-number cell-nowrap">{reg.registrationNumber}</span></td>
                      <td><span className="name-cell">{reg.fullName}</span></td>
                      <td><span className="email-cell">{reg.emailAddress}</span></td>
                      <td><span className="cell-nowrap">{reg.contactNumber}</span></td>
                      <td><span className="college-cell">{reg.collegeName}</span></td>
                      <td className="event-cell"><span className="event-badge">{reg.eventName}</span></td>
                      <td>
                        <select
                          className={`status-select payment-${reg.paymentStatus}`}
                          value={reg.paymentStatus}
                          onChange={(e) => handleStatusChange(reg._id, 'paymentStatus', e.target.value)}
                        >
                          <option value="pending">Pending</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="failed">Failed</option>
                        </select>
                      </td>
                      <td>
                        <select
                          className={`status-select reg-${reg.registrationStatus}`}
                          value={reg.registrationStatus}
                          onChange={(e) => handleStatusChange(reg._id, 'registrationStatus', e.target.value)}
                        >
                          <option value="confirmed">Confirmed</option>
                          <option value="pending">Pending</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>
                      <td>
                        <div className="action-buttons">
                          <button className="action-btn view-btn" onClick={() => handleView(reg)} title="View Details">👁️</button>
                          <button className="action-btn edit-btn" onClick={() => handleEdit(reg)} title="Edit">✏️</button>
                          <button className="action-btn delete-btn" onClick={() => handleDelete(reg._id)} title="Delete">🗑️</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* ── Modals ── */}
        {viewingRegistration && (
          <ViewRegistrationModal
            registration={viewingRegistration}
            onClose={() => setViewingRegistration(null)}
          />
        )}

        {editingRegistration && (
          <EditRegistrationModal
            registration={editingRegistration}
            onClose={() => setEditingRegistration(null)}
            onSave={handleSaveEdit}
          />
        )}

        {showAddModal && (
          <AddRegistrationModal
            onClose={() => setShowAddModal(false)}
            onAdd={handleAddRegistration}
          />
        )}

      </div>
    </div>
  );
};

export default CoreDashboard;
