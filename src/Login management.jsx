import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';

const LoginManagement = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [justLoggedOut, setJustLoggedOut] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();
  
  // Predefined user accounts - in a real app, these would come from a database
  const users = [
    { id: 1, name: 'Intern One', email: 'intern1@ojt.com', password: 'intern123', role: 'intern' },
    { id: 2, name: 'Intern Two', email: 'intern2@ojt.com', password: 'intern123', role: 'intern' },
    { id: 3, name: 'Intern Three', email: 'intern3@ojt.com', password: 'intern123', role: 'intern' },
    { id: 4, name: 'Admin User', email: 'admin@ojt.com', password: 'admin123', role: 'supervisor' },
  ];

  // Check for logout status from URL params
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const logoutParam = queryParams.get('logout');
    
    if (logoutParam === 'true') {
      // Clear all authentication data
      localStorage.removeItem('currentUser');
      sessionStorage.removeItem('isAuthenticated');
      
      // Show logout message
      toast.success('Logged out successfully');
      
      // Clean up URL
      window.history.replaceState({}, document.title, '/');
      
      // Set flag to prevent immediate auto-login
      setJustLoggedOut(true);
      
      // Reset flag after a short delay to allow future logins
      setTimeout(() => {
        setJustLoggedOut(false);
      }, 500);
    }
  }, [location]);
  
  // Handle detecting existing login
  useEffect(() => {
    // Skip if we just logged out
    if (justLoggedOut) {
      return;
    }
    
    const detectExistingLogin = () => {
      try {
        const currentUser = localStorage.getItem('currentUser');
        const isAuthenticated = sessionStorage.getItem('isAuthenticated');
        
        if (currentUser && isAuthenticated === 'true') {
          const userData = JSON.parse(currentUser);
          if (userData && userData.role) {
            const path = userData.role === 'intern' ? '/intern/dashboard' : '/supervisor/dashboard';
            navigate(path);
          }
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
        // Clean up potentially corrupted data
        localStorage.removeItem('currentUser');
        sessionStorage.removeItem('isAuthenticated');
      }
    };
    
    detectExistingLogin();
  }, [navigate, justLoggedOut]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Find matching user
    const user = users.find(
      user => user.email === formData.email && user.password === formData.password
    );
    
    if (user) {
      // First clean any existing authentication data
      localStorage.removeItem('currentUser');
      sessionStorage.removeItem('isAuthenticated');
      
      // Wait a moment to ensure cleanup completes
      setTimeout(() => {
        // Save user data and set authentication status
        const { password, ...safeUserData } = user;
        localStorage.setItem('currentUser', JSON.stringify(safeUserData));
        sessionStorage.setItem('isAuthenticated', 'true');
        
        // Show success message
        toast.success(`Welcome, ${user.name}!`, {
          duration: 2000,
        });
        
        // Set redirection path based on role
        const path = user.role === 'intern' ? '/intern/dashboard' : '/supervisor/dashboard';
        
        // Navigate after a short delay
        setTimeout(() => {
          // Use window.location for most reliable navigation between sessions
          window.location.href = path;
        }, 800);
      }, 300);
    } else {
      toast.error('Invalid email or password');
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo and System Name */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-indigo-700">OJT Management System</h1>
          <p className="text-gray-600 mt-2">Login to access your dashboard</p>
        </div>
        
        {/* Login Card */}
        <div className="bg-white rounded-lg shadow-xl p-8">
          <h2 className="text-center text-2xl font-semibold text-gray-800 mb-6 ">Sign In</h2>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-5">
              <label htmlFor="email" className="block text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter your email"
                required
              />
            </div>
            
            <div className="mb-5">
              <div className="flex justify-between mb-2">
                <label htmlFor="password" className="text-gray-700">
                  Password
                </label>
                <a href="#" className="text-sm text-indigo-600 hover:text-indigo-800">
                  Forgot password?
                </a>
              </div>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter your password"
                required
              />
            </div>
            
            <button
              type="submit"
              className={`w-full py-3 rounded-lg text-white font-medium bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition ${
                isLoading ? 'opacity-70 cursor-not-allowed' : ''
              }`}
              disabled={isLoading}
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
          
          {/* Test Accounts Section */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <h3 className="text-sm font-medium text-gray-500 mb-3">Test Accounts:</h3>
            <div className="grid grid-cols-1 gap-2 text-xs">
              {users.map(user => (
                <div key={user.id} className="flex justify-between p-2 bg-gray-50 rounded">
                  <span className="font-medium">{user.name} ({user.role})</span>
                  <span className="text-gray-600">{user.email} / {user.password}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="text-center mt-6 text-sm text-gray-600">
          © {new Date().getFullYear()} OJT Management System - All rights reserved
        </div>
      </div>
    </div>
  );
};

export default LoginManagement;