// Update your React App.jsx with these improved handler functions

const API_URL = 'http://localhost:8080/api/auth';

// Register Handler
const handleRegister = async () => {
  try {
    const response = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        password: formData.password
      })
    });

    const data = await response.json();

    if (response.ok) {
      // Store token and user info
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify({
        id: data.id,
        name: data.name,
        email: data.email
      }));

      setSubmitStatus({ 
        type: 'success', 
        message: 'Registration successful! Welcome aboard!' 
      });

      // Clear form
      setFormData({ name: '', email: '', password: '', message: '' });

      // Redirect to home after 2 seconds
      setTimeout(() => {
        setCurrentPage('home');
        setSubmitStatus(null);
      }, 2000);
    } else {
      setSubmitStatus({ 
        type: 'error', 
        message: data.message || 'Registration failed. Please try again.' 
      });
    }
  } catch (error) {
    console.error('Registration error:', error);
    setSubmitStatus({ 
      type: 'error', 
      message: 'Network error. Please check your connection.' 
    });
  }
  setTimeout(() => setSubmitStatus(null), 5000);
};

// Login Handler
const handleLogin = async () => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: formData.email,
        password: formData.password
      })
    });

    const data = await response.json();

    if (response.ok) {
      // Store token and user info
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify({
        id: data.id,
        name: data.name,
        email: data.email
      }));

      setSubmitStatus({ 
        type: 'success', 
        message: `Welcome back, ${data.name}!` 
      });

      // Clear form
      setFormData({ ...formData, email: '', password: '' });

      // Redirect to home after 2 seconds
      setTimeout(() => {
        setCurrentPage('home');
        setSubmitStatus(null);
      }, 2000);
    } else {
      setSubmitStatus({ 
        type: 'error', 
        message: data.message || 'Invalid email or password' 
      });
    }
  } catch (error) {
    console.error('Login error:', error);
    setSubmitStatus({ 
      type: 'error', 
      message: 'Network error. Please check your connection.' 
    });
  }
  setTimeout(() => setSubmitStatus(null), 5000);
};

// Optional: Contact Form Handler (if you want to add this endpoint)
const handleContact = async () => {
  try {
    const response = await fetch(`${API_URL}/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        message: formData.message
      })
    });

    const data = await response.json();

    if (response.ok) {
      setSubmitStatus({ 
        type: 'success', 
        message: 'Message sent! We will get back to you soon.' 
      });
      setFormData({ ...formData, name: '', email: '', message: '' });
    } else {
      setSubmitStatus({ 
        type: 'error', 
        message: 'Failed to send message. Please try again.' 
      });
    }
  } catch (error) {
    console.error('Contact error:', error);
    setSubmitStatus({ 
      type: 'error', 
      message: 'Network error. Please check your connection.' 
    });
  }
  setTimeout(() => setSubmitStatus(null), 5000);
};

// Utility function to check if user is logged in
const isLoggedIn = () => {
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');
  return token && user;
};

// Utility function to get current user
const getCurrentUser = () => {
  const userStr = localStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : null;
};

// Logout function
const handleLogout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  setCurrentPage('home');
  setSubmitStatus({ type: 'success', message: 'Logged out successfully' });
  setTimeout(() => setSubmitStatus(null), 3000);
};

// Protected API call example (for future use)
const makeAuthenticatedRequest = async (url, options = {}) => {
  const token = localStorage.getItem('token');
  
  const response = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });

  if (response.status === 401) {
    // Token expired or invalid
    handleLogout();
    throw new Error('Session expired. Please login again.');
  }

  return response;
};