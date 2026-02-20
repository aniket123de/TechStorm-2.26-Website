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
        <header className="dash-header">
          <div>
            <p className="dash-kicker">TechStorm Admin</p>
            <h1 className="dash-title">Core Dashboard</h1>
            <p className="dash-subtitle">Full system access • CRUD operations</p>
          </div>
          <button className="logout-btn" onClick={handleLogout}>Log out</button>
        </header>

        <div className="stats-grid">
          <div className="stat-card">
            <p className="stat-label">Total Registrations</p>
            <p className="stat-value">{registrations.length}</p>
          </div>
          <div className="stat-card">
            <p className="stat-label">Pending Payments</p>
            <p className="stat-value">{registrations.filter(r => r.paymentStatus === 'pending').length}</p>
          </div>
          <div className="stat-card">
            <p className="stat-label">Confirmed</p>
            <p className="stat-value">{registrations.filter(r => r.registrationStatus === 'confirmed').length}</p>
          </div>
          <div className="stat-card">
            <p className="stat-label">Events Active</p>
            <p className="stat-value">{events.length - 1}</p>
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
          <button className="add-btn" onClick={() => setShowAddModal(true)}>+ Add Registration</button>
        </div>

        <div className="registrations-section">
          <h2 className="section-title">Registrations ({filteredRegistrations.length})</h2>
          
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Reg. Number</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Contact</th>
                  <th>College</th>
                  <th>Event</th>
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
                    <td><span className="event-badge">{reg.eventName}</span></td>
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
        </div>

        {/* Modals */}
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
