/**
 * Event Registration API Utility
 * Handles all API calls for event registration system
 */

import API_URL from '../config/api';

const API_BASE_URL = API_URL;

/**
 * Submit event registration
 * @param {string} eventName - Name of the event (e.g., 'Technomania', 'Omegatrix')
 * @param {object} registrationData - Form data to submit
 * @returns {Promise<object>} Registration response
 */
export const submitEventRegistration = async (eventName, registrationData) => {
  console.log('🚀 Submitting registration for:', eventName);
  console.log('📝 Data:', registrationData);
  console.log('🌐 API URL:', `${API_BASE_URL}/event-registration/${eventName}`);
  
  try {
    const response = await fetch(`${API_BASE_URL}/event-registration/${eventName}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(registrationData)
    });

    console.log('📡 Response status:', response.status);
    
    const result = await response.json();
    console.log('📦 Response data:', result);

    if (!response.ok) {
      // Handle specific error cases
      if (response.status === 409) {
        throw new Error('duplicate: ' + (result.message || 'You have already registered for this event'));
      } else if (response.status === 400) {
        throw new Error('validation: ' + (result.message || 'Invalid registration data'));
      } else {
        throw new Error(result.message || 'Registration failed');
      }
    }

    console.log('✅ Registration successful!');
    return result;
  } catch (error) {
    console.error('❌ Registration error:', error);
    throw error;
  }
};

/**
 * Get registration statistics for an event
 * @param {string} eventName - Name of the event
 * @returns {Promise<object>} Statistics
 */
export const getEventStatistics = async (eventName) => {
  try {
    const response = await fetch(`${API_BASE_URL}/event-registration/${eventName}/stats/summary`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch statistics');
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error fetching statistics:', error);
    throw error;
  }
};

/**
 * Get all registrations for an event (requires authentication)
 * @param {string} eventName - Name of the event
 * @param {string} token - Authentication token
 * @param {object} params - Query parameters (page, limit, status)
 * @returns {Promise<object>} Registrations list
 */
export const getEventRegistrations = async (eventName, token, params = {}) => {
  try {
    const queryString = new URLSearchParams(params).toString();
    const url = `${API_BASE_URL}/event-registration/${eventName}${queryString ? '?' + queryString : ''}`;
    
    const headers = {
      'Content-Type': 'application/json',
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(url, { headers });

    if (!response.ok) {
      throw new Error('Failed to fetch registrations');
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error fetching registrations:', error);
    throw error;
  }
};

/**
 * Get a specific registration by ID (requires authentication)
 * @param {string} eventName - Name of the event
 * @param {string} registrationId - Registration ID
 * @param {string} token - Authentication token
 * @returns {Promise<object>} Registration details
 */
export const getRegistrationById = async (eventName, registrationId, token) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/event-registration/${eventName}/${registrationId}`,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch registration');
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error fetching registration:', error);
    throw error;
  }
};

/**
 * Update registration status (requires authentication with UPDATE permission)
 * @param {string} eventName - Name of the event
 * @param {string} registrationId - Registration ID
 * @param {string} status - New status (pending/confirmed/cancelled/waitlist)
 * @param {string} token - Authentication token
 * @returns {Promise<object>} Updated registration
 */
export const updateRegistrationStatus = async (eventName, registrationId, status, token) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/event-registration/${eventName}/${registrationId}`,
      {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ registrationStatus: status })
      }
    );

    if (!response.ok) {
      throw new Error('Failed to update registration');
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error updating registration:', error);
    throw error;
  }
};

/**
 * Delete a registration (requires authentication with DELETE permission)
 * @param {string} eventName - Name of the event
 * @param {string} registrationId - Registration ID
 * @param {string} token - Authentication token
 * @returns {Promise<object>} Deletion confirmation
 */
export const deleteRegistration = async (eventName, registrationId, token) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/event-registration/${eventName}/${registrationId}`,
      {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      }
    );

    if (!response.ok) {
      throw new Error('Failed to delete registration');
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error deleting registration:', error);
    throw error;
  }
};

/**
 * Helper function to handle registration errors
 * @param {Error} error - Error object
 * @returns {string} User-friendly error message
 */
export const getErrorMessage = (error) => {
  const message = error.message || '';

  if (message.includes('duplicate:')) {
    return 'You have already registered for this event with this email or phone number.';
  } else if (message.includes('validation:')) {
    return 'Please check your form data and try again.';
  } else if (message.includes('network') || message.includes('fetch')) {
    return 'Network error. Please check your internet connection.';
  } else if (message.includes('403') || message.includes('Access denied')) {
    return 'You do not have permission to perform this action.';
  } else if (message.includes('404') || message.includes('not found')) {
    return 'Registration not found.';
  } else {
    return 'Registration failed. Please try again later.';
  }
};

/**
 * Event name constants for consistency
 */
export const EVENT_NAMES = {
  TECHNOMANIA: 'Technomania',
  OMEGATRIX: 'Omegatrix',
  HACKSTORM: 'HackStorm',
  CODEBEE: 'Code-Bee',
  ROSUMO: 'Ro-Sumo',
  ROTERRANCE: 'Ro-Terrance',
  ROCOMBAT: 'Ro-Combat',
  RONAVIGATOR: 'Ro-Navigator',
  ROSOCCER: 'Ro-Soccer',
  TECHHUNT: 'Tech Hunt',
  KHET: 'Khet',
  PASSIONWITHREELS: 'Passion With Reels',
  FORZAHORIZON: 'Forza Horizon',
  CREATIVECANVAS: 'Creative Canvas'
};
