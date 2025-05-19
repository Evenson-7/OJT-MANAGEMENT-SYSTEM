import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { FiUser, FiTrash2, FiPlus, FiMail, FiKey } from 'react-icons/fi';

const ManageInterns = () => {
  const navigate = useNavigate();
  const [interns, setInterns] = useState([]);
  const [newIntern, setNewIntern] = useState({
    name: '',
    email: '',
    password: '',
  });

  // Default intern accounts
  const defaultInterns = [
    { id: 1, name: 'John Doe', email: 'intern1@ojt.com', password: 'intern123', role: 'intern' },
    { id: 2, name: 'Jane Smith', email: 'intern2@ojt.com', password: 'intern123', role: 'intern' },
    { id: 3, name: 'Mike Johnson', email: 'intern3@ojt.com', password: 'intern123', role: 'intern' },
  ];

  // Check if user is supervisor on component mount
  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser || currentUser.role !== 'supervisor') {
      navigate('/');
      toast.error('Access denied. Supervisor login required.');
    }

    // Load or initialize interns
    const storedUsers = JSON.parse(localStorage.getItem('users'));
    if (!storedUsers || storedUsers.length === 0) {
      // Initialize with default accounts (interns + supervisor)
      const defaultUsers = [
        ...defaultInterns,
        { id: 4, name: 'Admin Supervisor', email: 'supervisor@ojt.com', password: 'admin123', role: 'supervisor' }
      ];
      localStorage.setItem('users', JSON.stringify(defaultUsers));
      setInterns(defaultInterns);
    } else {
      // Only show intern accounts in management
      setInterns(storedUsers.filter(user => user.role === 'intern'));
    }
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewIntern(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddIntern = (e) => {
    e.preventDefault();
    
    if (!newIntern.name || !newIntern.email || !newIntern.password) {
      toast.error('Please fill all fields');
      return;
    }

    // Check if email already exists
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    if (storedUsers.some(user => user.email === newIntern.email)) {
      toast.error('An account with this email already exists');
      return;
    }

    const newInternWithId = {
      ...newIntern,
      id: Date.now(),
      role: 'intern'
    };

    const updatedUsers = [...storedUsers, newInternWithId];
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    setInterns(updatedUsers.filter(user => user.role === 'intern'));
    
    toast.success('Intern added successfully!');
    setNewIntern({ name: '', email: '', password: '' });
  };

  const handleDeleteIntern = (id) => {
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    const updatedUsers = storedUsers.filter(user => user.id !== id);
    
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    setInterns(updatedUsers.filter(user => user.role === 'intern'));
    
    toast.success('Intern removed successfully!');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
              <FiUser className="text-blue-500" />
              <span>Manage Interns</span>
            </h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <FiPlus className="text-blue-500" />
            <span>Add New Intern</span>
          </h2>
          <form onSubmit={handleAddIntern} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                  <FiUser size={14} />
                  <span>Full Name</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={newIntern.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                  <FiMail size={14} />
                  <span>Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={newIntern.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                  <FiKey size={14} />
                  <span>Password</span>
                </label>
                <input
                  type="text"
                  name="password"
                  value={newIntern.password}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center gap-2"
            >
              <FiPlus size={16} />
              <span>Add Intern</span>
            </button>
          </form>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <FiUser className="text-blue-500" />
            <span>Current Interns ({interns.length})</span>
          </h2>
          {interns.length === 0 ? (
            <p className="text-gray-500">No interns added yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {interns.map((intern) => (
                    <tr key={intern.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{intern.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{intern.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <button
                          onClick={() => handleDeleteIntern(intern.id)}
                          className="text-red-600 hover:text-red-900 flex items-center gap-1"
                        >
                          <FiTrash2 size={14} />
                          <span>Delete</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ManageInterns;