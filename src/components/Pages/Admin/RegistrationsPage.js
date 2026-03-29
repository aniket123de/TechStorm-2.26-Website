import React, { useState, useEffect, useCallback } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { getRegistrations, updateRegistration, updateRegistrationStatus, deleteRegistration, getEvents, createRegistration } from '../../../utils/adminDashboardAPI';
import AdminLoading from './AdminLoading';
import './RoleDashboard.css';
import ViewRegistrationModal from './ViewRegistrationModal';
import EditRegistrationModal from './EditRegistrationModal';
import AddRegistrationModal from './AddRegistrationModal';
import ParticipantRemarksModal from './ParticipantRemarksModal';
import {
  getParticipantRemarkCount,
  registrationHasParticipantRemarks
} from './participantRemarks';
import * as XLSX from 'xlsx';

/**
 * Get display value from a registration object, checking multiple possible keys
 * (API/documents may use different field names per event). Display only - no DB logic.
 */
function getDisplayValue(reg, ...keys) {
  if (!reg || typeof reg !== 'object') return '';
  for (const k of keys) {
    const v = reg[k];
    if (v != null && String(v).trim() !== '') return String(v).trim();
  }
  const first = reg.participants && reg.participants[0];
  if (first && typeof first === 'object') {
    for (const k of keys) {
      const v = first[k];
      if (v != null && String(v).trim() !== '') return String(v).trim();
    }
  }
  return '';
}

/** Get email from registration, checking all known and email-like keys. Display only. */
function getDisplayEmail(reg) {
  const main = getDisplayValue(reg, 'emailAddress', 'email', 'teamLeaderEmail', 'teamMember2Email');
  if (main) return main;
  if (reg && typeof reg === 'object') {
    for (const key of Object.keys(reg)) {
      if (key.toLowerCase().includes('email') && typeof reg[key] === 'string' && reg[key].trim() !== '')
        return reg[key].trim();
    }
    const first = reg.participants && reg.participants[0];
    if (first && typeof first === 'object') {
      const fromFirst = first.email || first.emailAddress || '';
      if (String(fromFirst).trim()) return String(fromFirst).trim();
      for (const key of Object.keys(first)) {
        if (key.toLowerCase().includes('email') && typeof first[key] === 'string' && first[key].trim() !== '')
          return first[key].trim();
      }
    }
  }
  return '';
}

const RegistrationsPage = () => {
  const history = useHistory();
  const location = useLocation();
  const [selectedEvent, setSelectedEvent] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchInput, setSearchInput] = useState(''); // New: separate input state
  const [paymentModeFilter, setPaymentModeFilter] = useState('all'); // NEW: Payment mode filter
  const [viewingRegistration, setViewingRegistration] = useState(null);
  const [editingRegistration, setEditingRegistration] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [remarksRegistration, setRemarksRegistration] = useState(null);
  const [user, setUser] = useState(null);
  const [registrations, setRegistrations] = useState([]);
  const [events, setEvents] = useState(['all']);
  const [loading, setLoading] = useState(true);
  const [tableLoading, setTableLoading] = useState(false); // New: separate loading for table only
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [stats, setStats] = useState({
    total: 0,
    pendingPayments: 0,
    confirmed: 0
  });

  // Extract role from pathname
  const role = location.pathname.split('/')[2];

  // Define fetch functions before useEffect hooks
  const fetchEvents = async () => {
    try {
      const result = await getEvents();
      const eventNames = ['all', ...result.events.map(e => e.name)];
      setEvents(eventNames);
    } catch (err) {
      console.error('Error fetching events:', err);
    }
  };

  const fetchRegistrations = useCallback(async (isInitialLoad = false) => {
    try {
      // Only show full page loading on initial load
      if (isInitialLoad) {
        setLoading(true);
      } else {
        setTableLoading(true);
      }
      
      const params = {
        limit: 1000 // Fetch up to 1000 registrations
      };
      
      if (selectedEvent !== 'all') {
        params.eventName = selectedEvent;
      }
      
      if (searchTerm) {
        params.search = searchTerm;
      }
      
      if (paymentModeFilter !== 'all') {
        params.paymentMode = paymentModeFilter;
      }
      
      console.log('🔍 Fetching registrations with params:', params);
      const result = await getRegistrations(params);
      console.log('📊 API Response:', result);
      console.log('📊 Total from pagination:', result.pagination?.total);
      console.log('📊 Registrations received:', result.registrations?.length);
      
      setRegistrations(result.registrations || []);
      
      // Calculate stats
      const total = result.registrations?.length || 0;
      const pendingPayments = result.registrations?.filter(r => r.paymentStatus === 'pending').length || 0;
      const confirmed = result.registrations?.filter(r => r.registrationStatus === 'confirmed').length || 0;
      
      console.log('📊 Stats calculated:', { total, pendingPayments, confirmed });
      
      setStats({ total, pendingPayments, confirmed });
      setError(null);
    } catch (err) {
      console.error('❌ Error fetching registrations:', err);
      setError(err.message);
    } finally {
      setLoading(false);
      setTableLoading(false);
    }
  }, [selectedEvent, searchTerm, paymentModeFilter]);

  useEffect(() => {
    const userData = localStorage.getItem(`adminUser_${role}`);
    if (userData) {
      setUser(JSON.parse(userData));
    }
    
    // Fetch initial data with full page loading
    fetchEvents();
    fetchRegistrations(true); // Pass true for initial load
  }, [fetchRegistrations, role]);

  useEffect(() => {
    // Refetch when filters change (but NOT searchInput, only searchTerm)
    // Don't show full page loading, only table loading
    fetchRegistrations(false);
  }, [selectedEvent, searchTerm, paymentModeFilter, fetchRegistrations]);

  // Handle search button click
  const handleSearch = () => {
    setSearchTerm(searchInput);
    setCurrentPage(1); // Reset to first page on new search
  };

  // Handle Enter key in search input
  const handleSearchKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  // Handle clear search
  const handleClearSearch = () => {
    setSearchInput('');
    setSearchTerm('');
    setCurrentPage(1); // Reset to first page
  };

  // Dummy registration data - REMOVED, now fetching from API
  // const [registrations, setRegistrations] = useState([...]);

  // const events = ['all', 'Khet', 'FIFA Mobile', 'Combat', 'Hackstrom', 'Codebee'];

  const roleConfig = {
    core: { name: 'Core', color: '#0f766e', canEdit: true, canDelete: true, canAdd: true, canEditRegistration: true, canChangePaymentStatus: true, canChangeRegistrationStatus: true },
    coordinator: { name: 'Coordinator', color: '#2563eb', canEdit: false, canDelete: false, canAdd: false, canEditRegistration: false, canChangePaymentStatus: false, canChangeRegistrationStatus: false },
    volunteer: { name: 'Volunteer', color: '#9333ea', canEdit: false, canDelete: false, canAdd: false, canEditRegistration: false, canChangePaymentStatus: false, canChangeRegistrationStatus: false }
  };

  const config = roleConfig[role] || roleConfig.core;

  const handleBack = () => {
    history.push(`/admin/${role}/dashboard`);
  };

  const handleDelete = async (eventName, id) => {
    if (window.confirm('Are you sure you want to delete this registration?')) {
      try {
        await deleteRegistration(eventName, id);
        await fetchRegistrations(); // Refresh the list
      } catch (err) {
        alert('Error deleting registration: ' + err.message);
      }
    }
  };

  const handleView = (registration) => {
    setViewingRegistration(registration);
  };

  const handleEdit = (registration) => {
    setEditingRegistration(registration);
  };

  const handleRemarks = (registration) => {
    setRemarksRegistration(registration);
  };

  const handleSaveEdit = async (id, updatedData) => {
    try {
      // Find the registration to get the event name
      const registration = registrations.find(r => r._id === id);
      if (!registration) {
        alert('Registration not found');
        return;
      }
      
      await updateRegistration(registration.eventName, id, updatedData);
      await fetchRegistrations(); // Refresh the list
      alert('Registration updated successfully!');
    } catch (err) {
      alert('Error updating registration: ' + err.message);
    }
  };

  const handleAddRegistration = async (newRegistration) => {
    try {
      await createRegistration(newRegistration.eventName, newRegistration);
      await fetchRegistrations(); // Refresh the list
      alert('Registration added successfully!');
    } catch (err) {
      alert('Error adding registration: ' + err.message);
    }
  };

  const handleStatusChange = async (eventName, id, field, value) => {
    try {
      const updates = { [field]: value };
      await updateRegistrationStatus(eventName, id, updates);
      
      // Update local state
      setRegistrations(prev => prev.map(reg => 
        reg._id === id ? { ...reg, [field]: value } : reg
      ));
    } catch (err) {
      alert('Error updating status: ' + err.message);
    }
  };

  const handleSaveParticipantRemarks = async (registration, participants) => {
    if (!registration?._id || !registration?.eventName) {
      throw new Error('Registration details are incomplete');
    }

    await updateRegistration(registration.eventName, registration._id, { participants });

    setRegistrations((prev) =>
      prev.map((item) =>
        item._id === registration._id ? { ...item, participants } : item
      )
    );

    if (viewingRegistration?._id === registration._id) {
      setViewingRegistration((prev) => (prev ? { ...prev, participants } : prev));
    }

    if (editingRegistration?._id === registration._id) {
      setEditingRegistration((prev) => (prev ? { ...prev, participants } : prev));
    }

    setRemarksRegistration((prev) => (prev ? { ...prev, participants } : prev));
  };

  // Filter by event for coordinator/volunteer - now handled by API
  let filteredRegistrations = registrations;

  // Apply search and event filter - now handled by API, just display what we have
  // filteredRegistrations = filteredRegistrations.filter(reg => {...});

  // Pagination logic
  const totalPages = Math.ceil(filteredRegistrations.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedRegistrations = filteredRegistrations.slice(startIndex, endIndex);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    // Scroll to top of table
    document.querySelector('.registrations-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1);
    }
  };

  // Export to Excel function
  const handleExportToExcel = () => {
    try {
      // Prepare data for export
      const exportData = filteredRegistrations.map((reg, index) => {
        const row = {
          'S.No': index + 1,
          'Registration Number': getDisplayValue(reg, 'registrationNumber') || 'N/A',
          'Event Name': reg.eventName || 'N/A',
          'Registration Date': reg.submittedAt ? new Date(reg.submittedAt).toLocaleDateString('en-IN') + ' ' + new Date(reg.submittedAt).toLocaleTimeString('en-IN') : 'N/A',
          'Registration Status': reg.registrationStatus || 'N/A',
          'OVR': getDisplayValue(reg, 'teamOvr') || 'N/A',
        };

        // Check if it's a team event
        if (reg.teamName || (reg.participants && reg.participants.length > 1)) {
          row['Team Name'] = reg.teamName || 'N/A';
          row['Number of Participants'] = reg.numberOfParticipants || reg.participants?.length || 'N/A';
          
          // Add participant details
          if (reg.participants && Array.isArray(reg.participants)) {
            reg.participants.forEach((participant, idx) => {
              const num = idx + 1;
              row[`P${num} Name`] = participant.name || 'N/A';
              row[`P${num} Email`] = participant.email || 'N/A';
              row[`P${num} Contact`] = participant.contact || 'N/A';
              row[`P${num} College`] = participant.college || 'N/A';
              row[`P${num} College Other`] = participant.collegeOther || 'N/A';
              row[`P${num} Year`] = participant.year || 'N/A';
              row[`P${num} Department`] = participant.department || 'N/A';
              row[`P${num} ID File URL`] = participant.idFileUrl || 'N/A';
              row[`P${num} ID Cloudinary ID`] = participant.idFileCloudinaryId || 'N/A';
              row[`P${num} Remark`] = participant.remark || 'N/A';
            });
          }
        } else {
          // Solo event - check both top-level and participants array
          const participant = reg.participants && reg.participants[0];
          
          row['Full Name'] = getDisplayValue(reg, 'fullName', 'full_name', 'name') || 
                            participant?.name || 'N/A';
          row['Email'] = getDisplayEmail(reg) || participant?.email || 'N/A';
          row['Contact'] = getDisplayValue(reg, 'contactNumber', 'phone', 'contact') || 
                          participant?.contact || 'N/A';
          row['College'] = getDisplayValue(reg, 'collegeName', 'college', 'institution') || 
                          participant?.college || 'N/A';
          row['College Other'] = reg.collegeOther || participant?.collegeOther || 'N/A';
          row['Year'] = getDisplayValue(reg, 'year', 'yearOfStudy') || 
                       participant?.year || 'N/A';
          row['Department'] = getDisplayValue(reg, 'department') || 
                             participant?.department || 'N/A';
          row['ID File URL'] = reg.idFileUrl || reg.idProofUrl || 
                              participant?.idFileUrl || 'N/A';
          row['ID Cloudinary ID'] = reg.idFileCloudinaryId || reg.idProofCloudinaryId || 
                                   participant?.idFileCloudinaryId || 'N/A';
        }

        // Payment details
        row['Payment Mode'] = reg.paymentMode || 'N/A';
        row['Payment Date'] = reg.paymentDate || 'N/A';
        row['Payment Status'] = reg.paymentStatus || 'N/A';
        row['Transaction ID'] = reg.transactionId || 'N/A';
        row['Payment Screenshot URL'] = reg.paymentScreenshotUrl || reg.paymentReceiptUrl || 'N/A';
        row['Payment Screenshot Cloudinary ID'] = reg.paymentScreenshotCloudinaryId || reg.paymentReceiptCloudinaryId || 'N/A';

        // Additional fields
        row['WhatsApp Confirmed'] = reg.whatsappConfirmed ? 'Yes' : 'No';
        row['Agree to Rules'] = reg.agreeToRules ? 'Yes' : 'No';
        row['Source'] = reg.source || 'web';

        return row;
      });

      // Set column widths and headers explicitly so mixed row shapes still
      // produce a stable Excel column order.
      const maxParticipants = Math.max(
        ...filteredRegistrations.map(reg => reg.participants?.length || 1)
      );
      const hasTeamEvents = filteredRegistrations.some(reg => reg.teamName || (reg.participants && reg.participants.length > 1));
      const headers = [
        'S.No',
        'Registration Number',
        'Event Name',
        'Registration Date',
        'Registration Status',
        'OVR',
      ];
      
      const baseColumns = [
        { wch: 6 },  // S.No
        { wch: 22 }, // Registration Number
        { wch: 20 }, // Event Name
        { wch: 20 }, // Registration Date
        { wch: 18 }, // Registration Status
        { wch: 12 }, // OVR
      ];
      
      if (hasTeamEvents) {
        headers.push('Team Name', 'Number of Participants');
        baseColumns.push({ wch: 25 }); // Team Name
        baseColumns.push({ wch: 12 }); // Number of Participants
        
        // Add participant columns
        for (let i = 0; i < maxParticipants; i++) {
          const num = i + 1;
          headers.push(
            `P${num} Name`,
            `P${num} Email`,
            `P${num} Contact`,
            `P${num} College`,
            `P${num} College Other`,
            `P${num} Year`,
            `P${num} Department`,
            `P${num} ID File URL`,
            `P${num} ID Cloudinary ID`,
            `P${num} Remark`
          );
          baseColumns.push(
            { wch: 25 }, // Name
            { wch: 30 }, // Email
            { wch: 15 }, // Contact
            { wch: 35 }, // College
            { wch: 20 }, // College Other
            { wch: 12 }, // Year
            { wch: 15 }, // Department
            { wch: 50 }, // ID File URL
            { wch: 40 }, // ID Cloudinary ID
            { wch: 40 }  // Remark
          );
        }
      } else {
        headers.push(
          'Full Name',
          'Email',
          'Contact',
          'College',
          'College Other',
          'Year',
          'Department',
          'ID File URL',
          'ID Cloudinary ID'
        );
        baseColumns.push(
          { wch: 25 }, // Full Name
          { wch: 30 }, // Email
          { wch: 15 }, // Contact
          { wch: 35 }, // College
          { wch: 20 }, // College Other
          { wch: 12 }, // Year
          { wch: 15 }, // Department
          { wch: 50 }, // ID File URL
          { wch: 40 }  // ID Cloudinary ID
        );
      }
      
      // Payment columns
      headers.push(
        'Payment Mode',
        'Payment Date',
        'Payment Status',
        'Transaction ID',
        'Payment Screenshot URL',
        'Payment Screenshot Cloudinary ID',
        'WhatsApp Confirmed',
        'Agree to Rules',
        'Source'
      );
      baseColumns.push(
        { wch: 12 }, // Payment Mode
        { wch: 15 }, // Payment Date
        { wch: 15 }, // Payment Status
        { wch: 25 }, // Transaction ID
        { wch: 50 }, // Payment Screenshot URL
        { wch: 40 }, // Payment Screenshot Cloudinary ID
        { wch: 12 }, // WhatsApp Confirmed
        { wch: 12 }, // Agree to Rules
        { wch: 10 }  // Source
      );

      // Create worksheet with explicit headers
      const worksheet = XLSX.utils.json_to_sheet(exportData, { header: headers });
      
      worksheet['!cols'] = baseColumns;

      // Create workbook
      const workbook = XLSX.utils.book_new();
      
      // Generate sheet name
      const sheetName = selectedEvent !== 'all' 
        ? selectedEvent.substring(0, 31) // Excel sheet name limit is 31 chars
        : 'All Events';
      
      XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);

      // Generate filename
      const timestamp = new Date().toISOString().split('T')[0];
      const eventPart = selectedEvent !== 'all' ? `_${selectedEvent.replace(/\s+/g, '_')}` : '_All_Events';
      const filename = `TechStorm_Registrations${eventPart}_${timestamp}.xlsx`;

      // Download file
      XLSX.writeFile(workbook, filename);

      console.log(`✅ Exported ${exportData.length} registrations to ${filename}`);
    } catch (error) {
      console.error('❌ Error exporting to Excel:', error);
      alert('Failed to export data. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className={`role-dashboard ${role}-dashboard`}>
        <div className="dashboard-wrapper dashboard-wrapper--loading">
          <AdminLoading message="Loading registrations..." roleColor={config.color} />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`role-dashboard ${role}-dashboard`}>
        <div className="dashboard-wrapper">
          <div className="admin-error-state">
            <p className="admin-error-message">Error: {error}</p>
            <button type="button" className="admin-error-retry" onClick={fetchRegistrations}>Retry</button>
          </div>
        </div>
      </div>
    );
  }

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

        <div className="stats-grid stats-grid--overview">
          <div className="stat-card stat-card--total">
            <p className="stat-label">Total Registrations</p>
            <p className="stat-value">{stats.total}</p>
          </div>
          <div className="stat-card stat-card--pending">
            <p className="stat-label">Pending Payments</p>
            <p className="stat-value">{stats.pendingPayments}</p>
          </div>
          <div className="stat-card stat-card--confirmed">
            <p className="stat-label">Confirmed</p>
            <p className="stat-value">{stats.confirmed}</p>
          </div>
          <div className="stat-card stat-card--events">
            <p className="stat-label">Events</p>
            <p className="stat-value">{role === 'core' ? events.length - 1 : 1}</p>
          </div>
        </div>

        <div className="controls-bar">
          <div className="search-container" style={{ display: 'flex', gap: '10px', flex: 1 }}>
            <input
              type="text"
              placeholder="Search by name, email, or registration number..."
              className="search-input"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyPress={handleSearchKeyPress}
              style={{ flex: 1 }}
            />
            <button 
              className="search-btn" 
              onClick={handleSearch}
              style={{
                padding: '10px 20px',
                backgroundColor: '#0f766e',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                fontWeight: '500'
              }}
            >
              🔍 Search
            </button>
            {searchTerm && (
              <button 
                className="clear-btn" 
                onClick={handleClearSearch}
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#dc2626',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  fontWeight: '500'
                }}
              >
                ✕ Clear
              </button>
            )}
          </div>
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
          <select
            className="payment-mode-filter"
            value={paymentModeFilter}
            onChange={(e) => setPaymentModeFilter(e.target.value)}
            style={{
              padding: '10px 15px',
              border: '1px solid #d1d5db',
              borderRadius: '5px',
              backgroundColor: 'white',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500',
              color: '#374151'
            }}
          >
            <option value="all">All Payments</option>
            <option value="cash">💵 Cash</option>
            <option value="online">💳 Online</option>
          </select>
          <button 
            className="export-btn" 
            onClick={handleExportToExcel}
            disabled={filteredRegistrations.length === 0}
            style={{
              padding: '10px 20px',
              backgroundColor: filteredRegistrations.length === 0 ? '#9ca3af' : '#059669',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: filteredRegistrations.length === 0 ? 'not-allowed' : 'pointer',
              fontWeight: '500',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
            title={filteredRegistrations.length === 0 ? 'No data to export' : 'Export to Excel'}
          >
            📊 Export Excel
          </button>
          {config.canAdd && (
            <button className="add-btn" onClick={() => setShowAddModal(true)}>+ Add Registration</button>
          )}
        </div>

        <div className="registrations-section section-card">
          <h2 className="section-title">
            {role === 'core' ? 'All Registrations' : `${user?.eventName || 'Event'} Registrations`} ({filteredRegistrations.length})
          </h2>
          <p className="section-subtitle">Search and filter below</p>
          
          {tableLoading && (
            <div style={{
              padding: '20px',
              textAlign: 'center',
              backgroundColor: 'rgba(15, 118, 110, 0.1)',
              borderRadius: '8px',
              marginBottom: '20px',
              color: '#0f766e',
              fontWeight: '500'
            }}>
              🔄 Loading registrations...
            </div>
          )}
          
          {/* Pagination Controls - Top */}
          {filteredRegistrations.length > itemsPerPage && (
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '20px',
              padding: '15px',
              backgroundColor: '#f9fafb',
              borderRadius: '8px',
              border: '1px solid #e5e7eb'
            }}>
              <div style={{ color: '#6b7280', fontSize: '14px' }}>
                Showing {startIndex + 1} to {Math.min(endIndex, filteredRegistrations.length)} of {filteredRegistrations.length} registrations
              </div>
              
              <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
                <button
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                  style={{
                    padding: '8px 12px',
                    backgroundColor: currentPage === 1 ? '#e5e7eb' : '#0f766e',
                    color: currentPage === 1 ? '#9ca3af' : 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                    fontWeight: '500',
                    fontSize: '14px'
                  }}
                >
                  ← Previous
                </button>
                
                {/* Page numbers */}
                <div style={{ display: 'flex', gap: '5px' }}>
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }
                    
                    return (
                      <button
                        key={pageNum}
                        onClick={() => handlePageChange(pageNum)}
                        style={{
                          padding: '8px 12px',
                          backgroundColor: currentPage === pageNum ? '#0f766e' : 'white',
                          color: currentPage === pageNum ? 'white' : '#374151',
                          border: '1px solid #d1d5db',
                          borderRadius: '5px',
                          cursor: 'pointer',
                          fontWeight: currentPage === pageNum ? '600' : '500',
                          fontSize: '14px',
                          minWidth: '40px'
                        }}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>
                
                <button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  style={{
                    padding: '8px 12px',
                    backgroundColor: currentPage === totalPages ? '#e5e7eb' : '#0f766e',
                    color: currentPage === totalPages ? '#9ca3af' : 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                    fontWeight: '500',
                    fontSize: '14px'
                  }}
                >
                  Next →
                </button>
              </div>
            </div>
          )}
          
          <div className="table-container" style={{ opacity: tableLoading ? 0.5 : 1, transition: 'opacity 0.3s' }}>
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
                {paginatedRegistrations.length > 0 ? (
                  paginatedRegistrations.map(reg => {
                    const displayName = getDisplayValue(reg, 'fullName', 'full_name', 'name') ||
                                       (reg.participants && reg.participants[0]?.name) ||
                                       reg.teamName ||
                                       '—';
                    const displayEmail = getDisplayEmail(reg) || '—';
                    const displayContact = getDisplayValue(reg, 'contactNumber', 'phone', 'contact') || '—';
                    const displayCollege = getDisplayValue(reg, 'collegeName', 'college', 'institution') || '—';
                    const displayRegNumber = getDisplayValue(reg, 'registrationNumber') || '—';
                    const hasParticipantRemarks = registrationHasParticipantRemarks(reg);
                    const participantRemarkCount = getParticipantRemarkCount(reg);
                    return (
                    <tr key={reg._id}>
                      <td
                        className={`reg-number cell-nowrap ${hasParticipantRemarks ? 'reg-number--remarked' : ''}`}
                        title={displayRegNumber}
                      >
                        {displayRegNumber}
                      </td>
                      <td className="name-cell">{displayName}</td>
                      <td className="email-cell" title={displayEmail}>{displayEmail}</td>
                      <td className="contact-cell cell-nowrap" title={displayContact}>{displayContact}</td>
                      <td className="college-cell" title={displayCollege}>{displayCollege}</td>
                      {role === 'core' && (
                        <td className="event-cell" title={reg.eventName || ''}>
                          <span className="event-badge">{reg.eventName || '—'}</span>
                        </td>
                      )}
                      <td>
                        {config.canChangePaymentStatus ? (
                          <select
                            className={`status-select payment-${reg.paymentStatus}`}
                            value={reg.paymentStatus}
                            onChange={(e) => handleStatusChange(reg.eventName, reg._id, 'paymentStatus', e.target.value)}
                          >
                            <option value="pending">Pending</option>
                            <option value="verified">Verified</option>
                            <option value="failed">Failed</option>
                          </select>
                        ) : (
                          <span className={`status-pill payment-${reg.paymentStatus}`}>
                            {reg.paymentStatus}
                          </span>
                        )}
                      </td>
                      <td>
                        {config.canChangeRegistrationStatus ? (
                          <select
                            className={`status-select reg-${reg.registrationStatus}`}
                            value={reg.registrationStatus}
                            onChange={(e) => handleStatusChange(reg.eventName, reg._id, 'registrationStatus', e.target.value)}
                          >
                            <option value="confirmed">Confirmed</option>
                            <option value="pending">Pending</option>
                            <option value="cancelled">Cancelled</option>
                            <option value="waitlist">Waitlist</option>
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
                          {role === 'core' && (
                            <button
                              className={`action-btn remarks-btn ${hasParticipantRemarks ? 'remarks-btn--active' : ''}`}
                              onClick={() => handleRemarks(reg)}
                              title={
                                hasParticipantRemarks
                                  ? `${participantRemarkCount} participant remark${participantRemarkCount > 1 ? 's' : ''}`
                                  : 'Add participant remarks'
                              }
                            >
                              📝
                            </button>
                          )}
                          {config.canEditRegistration && (
                            <button className="action-btn edit-btn" onClick={() => handleEdit(reg)} title="Edit">✏️</button>
                          )}
                          {config.canDelete && (
                            <button className="action-btn delete-btn" onClick={() => handleDelete(reg.eventName, reg._id)} title="Delete">🗑️</button>
                          )}
                        </div>
                      </td>
                    </tr>
                  )})
                ) : (
                  <tr>
                    <td colSpan={role === 'core' ? 9 : 8} className="table-empty-cell">
                      <span className="empty-state-inline">No registrations found</span>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modals */}
        {viewingRegistration && (
          <ViewRegistrationModal
            registration={viewingRegistration}
            onClose={() => setViewingRegistration(null)}
            canManageParticipantRemarks={role === 'core'}
            onManageParticipantRemarks={handleRemarks}
          />
        )}

        {editingRegistration && config.canEditRegistration && (
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

        {remarksRegistration && role === 'core' && (
          <ParticipantRemarksModal
            registration={remarksRegistration}
            onClose={() => setRemarksRegistration(null)}
            onSave={(participants) => handleSaveParticipantRemarks(remarksRegistration, participants)}
          />
        )}
      </div>
    </div>
  );
};

export default RegistrationsPage;
