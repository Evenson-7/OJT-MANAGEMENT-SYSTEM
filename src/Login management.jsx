import React, { useState, useEffect } from 'react';
<<<<<<< HEAD
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
=======
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { toast } from 'react-hot-toast'; // 🆕 Added for toast notifications

const LoginManagement = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    const rememberedEmail = localStorage.getItem('rememberedEmail');
    if (rememberedEmail) {
      setCredentials(prev => ({ ...prev, email: rememberedEmail }));
      setRememberMe(true);
    }
  }, []);

  const users = [
    { id: 1, email: 'intern1@ojt.com', password: 'intern123', role: 'intern', name: 'John Doe' },
    { id: 2, email: 'intern2@ojt.com', password: 'intern123', role: 'intern', name: 'Jane Smith' },
    { id: 3, email: 'intern3@ojt.com', password: 'intern123', role: 'intern', name: 'Mike Johnson' },
    { id: 4, email: 'supervisor@ojt.com', password: 'admin123', role: 'supervisor', name: 'Admin Supervisor' },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const user = users.find(
        user => user.email === credentials.email && user.password === credentials.password
      );

      if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));

        if (rememberMe) {
          localStorage.setItem('rememberedEmail', credentials.email);
        } else {
          localStorage.removeItem('rememberedEmail');
        }

        toast.success('Login successful!'); // 🆕 Success Toast

        // Slight delay before navigation so user sees the toast (optional)
        setTimeout(() => {
          if (user.role === 'intern') {
            navigate('/intern/dashboard');
          } else {
            navigate('/supervisor/dashboard');
          }
        }, 800);
        
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      setError('An error occurred during login');
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          OJT Management System
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Sign in to your account
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {error && (
            <div className="mb-4 bg-red-50 border-l-4 border-red-500 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  {/* Error Icon */}
                  <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          )}

          {/* 🆕 Form: added autoComplete="off" */}
          <form className="space-y-6" onSubmit={handleSubmit} autoComplete="off">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="new-email" // 🆕 Prevent Google Save Popup
                  required
                  value={credentials.email}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1 relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password" // 🆕 Prevent Google Save Popup
                  required
                  value={credentials.password}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm pr-10"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-500"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" aria-hidden="true" />
                  ) : (
                    <Eye className="h-5 w-5" aria-hidden="true" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                  isLoading ? 'opacity-75 cursor-not-allowed' : ''
                }`}
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing in...
                  </>
                ) : (
                  'Sign in'
                )}
              </button>
            </div>
          </form>

          {/* Demo Accounts Section */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Demo Accounts
                </span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-3">
              <div className="bg-gray-50 p-4 rounded-md">
                <h4 className="text-sm font-medium text-gray-700">Intern Accounts</h4>
                <p className="text-xs text-gray-500 mt-1">
                  Email: intern1@ojt.com / intern2@ojt.com / intern3@ojt.com<br />
                  Password: intern123
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-md">
                <h4 className="text-sm font-medium text-gray-700">Supervisor Account</h4>
                <p className="text-xs text-gray-500 mt-1">
                  Email: supervisor@ojt.com<br />
                  Password: admin123
                </p>
              </div>
            </div>
          </div>
        </div>
>>>>>>> db7fdd23ea17068309846d732c4bd7f9cbad7e3a
      </div>
    </div>
  );
};

<<<<<<< HEAD
export default LoginManagement;
=======
export default LoginManagement;
>>>>>>> db7fdd23ea17068309846d732c4bd7f9cbad7e3a
