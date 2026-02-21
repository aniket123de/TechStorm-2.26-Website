/**
 * Admin Dashboard API Utility
 * Handles all API calls for admin dashboard
 */

import API_URL from '../config/api';

const API_BASE_URL = API_URL;

/**
 * Get authentication token from localStorage
 */
const getAuthToken = () => {
  return localStorage.getItem('adminToken');
};

/**
 * Create headers with auth token
 */
const getAuthHeaders = () => {
  const token = getAuthToken();
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` })
  };
};

/**
 * Get dashboard statistics
 * @returns {Promise<object>} Dashboard stats
 */
export const getDashboardStats = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/admin-dashboard/stats`, {
      headers: getAuthHeaders()
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to fetch dashboard stats');
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    throw error;
  }
};

/**
 * Get all registrations with filters
 * @param {object} params - Query parameters
 * @returns {Promise<object>} Registrations list
 */
export const getRegistrations = async (params = {}) => {
  try {
    const queryString = new URLSearchParams(params).toString();
    const url = `${API_BASE_URL}/admin-dashboard/registrations${queryString ? '?' + queryString : ''}`;
    
    const response = await fetch(url, {
      headers: getAuthHeaders()
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to fetch registrations');
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error fetching registrations:', error);
    throw error;
  }
};

/**
 * Get single registration details
 * @param {string} eventName - Event name
 * @param {string} id - Registration ID
 * @returns {Promise<object>} Registration details
 */
export const getRegistrationById = async (eventName, id) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/admin-dashboard/registrations/${eventName}/${id}`,
      {
        headers: getAuthHeaders()
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to fetch registration');
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error fetching registration:', error);
    throw error;
  }
};

/**
 * Update registration (full update)
 * @param {string} eventName - Event name
 * @param {string} id - Registration ID
 * @param {object} updates - All fields to update
 * @returns {Promise<object>} Updated registration
 */
export const updateRegistration = async (eventName, id, updates) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/admin-dashboard/registrations/${eventName}/${id}`,
      {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(updates)
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to update registration');
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error updating registration:', error);
    throw error;
  }
};

/**
 * Update registration status (partial update)
 * @param {string} eventName - Event name
 * @param {string} id - Registration ID
 * @param {object} updates - Fields to update
 * @returns {Promise<object>} Updated registration
 */
export const updateRegistrationStatus = async (eventName, id, updates) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/admin-dashboard/registrations/${eventName}/${id}`,
      {
        method: 'PATCH',
        headers: getAuthHeaders(),
        body: JSON.stringify(updates)
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to update registration');
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error updating registration:', error);
    throw error;
  }
};

/**
 * Delete registration
 * @param {string} eventName - Event name
 * @param {string} id - Registration ID
 * @returns {Promise<object>} Deletion confirmation
 */
export const deleteRegistration = async (eventName, id) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/admin-dashboard/registrations/${eventName}/${id}`,
      {
        method: 'DELETE',
        headers: getAuthHeaders()
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to delete registration');
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error deleting registration:', error);
    throw error;
  }
};

/**
 * Create new registration
 * @param {string} eventName - Event name
 * @param {object} registrationData - Registration data
 * @returns {Promise<object>} Created registration
 */
export const createRegistration = async (eventName, registrationData) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/admin-dashboard/registrations/${eventName}`,
      {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(registrationData)
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to create registration');
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error creating registration:', error);
    throw error;
  }
};

/**
 * Get events list
 * @returns {Promise<object>} Events list
 */
export const getEvents = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/admin-dashboard/events`, {
      headers: getAuthHeaders()
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to fetch events');
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error;
  }
};

const adminDashboardAPI = {
  getDashboardStats,
  getRegistrations,
  getRegistrationById,
  updateRegistration,
  updateRegistrationStatus,
  deleteRegistration,
  createRegistration,
  getEvents
};

export default adminDashboardAPI;
