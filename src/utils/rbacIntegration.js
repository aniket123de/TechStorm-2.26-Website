// Frontend API Integration Examples
// This file shows how to integrate the RBAC backend with your React frontend

const API_BASE_URL = 'http://localhost:5000/api';

// Auth utilities
export class AuthAPI {
  // Get stored token
  static getToken() {
    return localStorage.getItem('authToken');
  }

  // Set token in storage
  static setToken(token) {
    localStorage.setItem('authToken', token);
  }

  // Remove token from storage
  static removeToken() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
  }

  // Get stored user data
  static getUser() {
    const userData = localStorage.getItem('userData');
    return userData ? JSON.parse(userData) : null;
  }

  // Set user data in storage
  static setUser(user) {
    localStorage.setItem('userData', JSON.stringify(user));
  }

  // Create headers with auth token
  static getAuthHeaders() {
    const token = this.getToken();
    return token ? { 'Authorization': `Bearer ${token}` } : {};
  }

  // Register user
  static async register(userData) {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData)
    });

    const data = await response.json();
    
    if (response.ok) {
      this.setToken(data.token);
      this.setUser(data.user);
      return { success: true, data };
    }
    
    return { success: false, error: data.error, message: data.message };
  }

  // Login user
  static async login(email, password) {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();
    
    if (response.ok) {
      this.setToken(data.token);
      this.setUser(data.user);
      return { success: true, data };
    }
    
    return { success: false, error: data.error, message: data.message };
  }

  // Logout user
  static async logout() {
    try {
      await fetch(`${API_BASE_URL}/auth/logout`, {
        method: 'POST',
        headers: {
          ...this.getAuthHeaders(),
          'Content-Type': 'application/json',
        }
      });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      this.removeToken();
    }
  }

  // Check if user is authenticated
  static isAuthenticated() {
    return !!this.getToken() && !!this.getUser();
  }

  // Check if user has specific permission
  static hasPermission(permission) {
    const user = this.getUser();
    return user && user.permissions && user.permissions.includes(permission);
  }

  // Check if user has specific role
  static hasRole(role) {
    const user = this.getUser();
    return user && user.role === role;
  }

  // Permission helpers
  static canCreate() {
    return this.hasPermission('create');
  }

  static canRead() {
    return this.hasPermission('read');
  }

  static canUpdate() {
    return this.hasPermission('update');
  }

  static canDelete() {
    return this.hasPermission('delete');
  }

  // Role helpers
  static isCore() {
    return this.hasRole('core');
  }

  static isCoordinator() {
    return this.hasRole('coordinator');
  }

  static isVolunteer() {
    return this.hasRole('volunteer');
  }
}

// API request helper with authentication
export class ApiClient {
  static async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...AuthAPI.getAuthHeaders(),
        ...options.headers
      },
      ...options
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      // Handle authentication errors
      if (response.status === 401) {
        AuthAPI.removeToken();
        window.location.href = '/login';
        throw new Error('Authentication required');
      }

      if (!response.ok) {
        throw new Error(data.message || 'Request failed');
      }

      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // GET request
  static async get(endpoint, params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const url = queryString ? `${endpoint}?${queryString}` : endpoint;
    return this.request(url);
  }

  // POST request
  static async post(endpoint, data) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }

  // PUT request
  static async put(endpoint, data) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data)
    });
  }

  // PATCH request
  static async patch(endpoint, data) {
    return this.request(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(data)
    });
  }

  // DELETE request
  static async delete(endpoint) {
    return this.request(endpoint, {
      method: 'DELETE'
    });
  }
}

// React Component Examples

// Protected Route Component
export function ProtectedRoute({ children, requiredPermission, requiredRole }) {
  if (!AuthAPI.isAuthenticated()) {
    return <Navigate to="/login" />;
  }

  if (requiredPermission && !AuthAPI.hasPermission(requiredPermission)) {
    return <div className="alert alert-danger">Access denied. Insufficient permissions.</div>;
  }

  if (requiredRole && !AuthAPI.hasRole(requiredRole)) {
    return <div className="alert alert-danger">Access denied. Required role: {requiredRole}</div>;
  }

  return children;
}

// Permission-based Button Component
export function PermissionButton({ permission, role, onClick, children, className = '' }) {
  const hasPermission = permission ? AuthAPI.hasPermission(permission) : true;
  const hasRole = role ? AuthAPI.hasRole(role) : true;

  if (!hasPermission || !hasRole) {
    return null; // Don't render if no permission
  }

  return (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  );
}

// Usage Examples in React Components

// Login Component Example
export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await AuthAPI.login(email, password);
    
    if (result.success) {
      window.location.href = '/dashboard';
    } else {
      setError(result.message || 'Login failed');
    }
    
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="alert alert-danger">{error}</div>}
      
      <div className="form-group">
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="form-control"
        />
      </div>
      
      <div className="form-group">
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="form-control"
        />
      </div>
      
      <button type="submit" disabled={loading} className="btn btn-primary">
        {loading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
}

// Dashboard with Role-based Content
export function Dashboard() {
  const user = AuthAPI.getUser();

  return (
    <div>
      <h1>Welcome, {user?.name}!</h1>
      <p>Role: {user?.role}</p>
      <p>Permissions: {user?.permissions?.join(', ')}</p>

      {/* Core-only content */}
      {AuthAPI.isCore() && (
        <div className="admin-panel">
          <h2>Admin Panel</h2>
          <PermissionButton 
            permission="create" 
            className="btn btn-success"
            onClick={() => console.log('Create new resource')}
          >
            Create New Event
          </PermissionButton>
          
          <PermissionButton 
            role="core" 
            className="btn btn-warning"
            onClick={() => console.log('Manage users')}
          >
            Manage Users
          </PermissionButton>
        </div>
      )}

      {/* Coordinator content */}
      {(AuthAPI.isCore() || AuthAPI.isCoordinator()) && (
        <div className="coordinator-panel">
          <h2>Event Management</h2>
          <PermissionButton 
            permission="update" 
            className="btn btn-primary"
            onClick={() => console.log('Edit events')}
          >
            Edit Events
          </PermissionButton>
        </div>
      )}

      {/* Content for all authenticated users */}
      <div className="user-content">
        <h2>My Account</h2>
        <button 
          className="btn btn-secondary"
          onClick={() => console.log('View profile')}
        >
          View Profile
        </button>
        
        <button 
          className="btn btn-danger"
          onClick={AuthAPI.logout}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

// Event Management Component
export function EventManager() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    const result = await ApiClient.get('/events');
    if (result.success) {
      setEvents(result.data.data);
    }
    setLoading(false);
  };

  const createEvent = async (eventData) => {
    if (!AuthAPI.canCreate()) {
      alert('You don\'t have permission to create events');
      return;
    }

    const result = await ApiClient.post('/events', eventData);
    if (result.success) {
      loadEvents(); // Refresh the list
    } else {
      alert(`Error: ${result.error}`);
    }
  };

  const updateEvent = async (eventId, eventData) => {
    if (!AuthAPI.canUpdate()) {
      alert('You don\'t have permission to update events');
      return;
    }

    const result = await ApiClient.put(`/events/${eventId}`, eventData);
    if (result.success) {
      loadEvents(); // Refresh the list
    } else {
      alert(`Error: ${result.error}`);
    }
  };

  const deleteEvent = async (eventId) => {
    if (!AuthAPI.canDelete()) {
      alert('You don\'t have permission to delete events');
      return;
    }

    if (!confirm('Are you sure you want to delete this event?')) {
      return;
    }

    const result = await ApiClient.delete(`/events/${eventId}`);
    if (result.success) {
      loadEvents(); // Refresh the list
    } else {
      alert(`Error: ${result.error}`);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Events</h2>
        <PermissionButton 
          permission="create"
          className="btn btn-success"
          onClick={() => {/* Show create event modal */}}
        >
          Create Event
        </PermissionButton>
      </div>

      <div className="events-list">
        {events.map(event => (
          <div key={event._id} className="card mb-3">
            <div className="card-body">
              <h5>{event.title}</h5>
              <p>{event.description}</p>
              <div className="btn-group">
                <PermissionButton 
                  permission="update"
                  className="btn btn-sm btn-primary"
                  onClick={() => updateEvent(event._id, {/* updated data */})}
                >
                  Edit
                </PermissionButton>
                
                <PermissionButton 
                  permission="delete"
                  className="btn btn-sm btn-danger"
                  onClick={() => deleteEvent(event._id)}
                >
                  Delete
                </PermissionButton>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// App Routes with Protection
export function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginForm />} />
      <Route path="/register" element={<RegisterForm />} />
      
      {/* Protected routes */}
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/events" 
        element={
          <ProtectedRoute requiredPermission="read">
            <EventManager />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/admin" 
        element={
          <ProtectedRoute requiredRole="core">
            <AdminPanel />
          </ProtectedRoute>
        } 
      />
    </Routes>
  );
}

export default { AuthAPI, ApiClient, ProtectedRoute, PermissionButton };
