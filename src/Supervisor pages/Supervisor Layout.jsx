// src/layouts/SupervisorLayout.jsx
import { useState } from 'react';
import { BarChart2, Users, Clipboard, Clock, Menu, ChevronLeft, Calendar } from 'lucide-react';
import { Outlet, useNavigate } from 'react-router-dom';

const SupervisorLayout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate('/');
  };

  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-gray-100">
      {/* Sidebar */}
      <div
        className={`transition-all duration-300 ease-in-out bg-gray-800 text-white flex flex-col ${
          isSidebarOpen ? 'w-64' : 'w-16'
        }`}
      >
        <div className={`p-4 bg-gray-900 font-bold text-lg flex items-center ${isSidebarOpen ? 'justify-between' : 'justify-center'}`}>
          {isSidebarOpen && <span>OJT MANAGER</span>}
          <button
            onClick={toggleSidebar}
            className="text-gray-300 hover:text-white focus:outline-none flex-shrink-0"
          >
            {isSidebarOpen ? <ChevronLeft size={20} /> : <Menu size={20} />}
          </button>
        </div>
        <nav className="flex-1">
          <div className="bg-blue-500 p-4 text-white flex items-center">
            {isSidebarOpen ? (
              <span className="truncate">Supervisor Dashboard</span>
            ) : (
              <div className="mx-auto">
                <BarChart2 size={20} />
              </div>
            )}
          </div>
          {[
            { icon: Users, label: 'Manage Interns', path: '/supervisor/interns' },
            { icon: Clipboard, label: 'Timesheet Approvals', path: '/supervisor/timesheets' },
            { icon: Calendar, label: 'Leave Management', path: '/supervisor/leave' },
            { icon: Clock, label: 'Attendance Reports', path: '/supervisor/attendance' },
            { icon: BarChart2, label: 'Performance Overview', path: '/supervisor/performance' }
          ].map(({ icon: Icon, label, path }, idx) => (
            <div 
              key={idx} 
              className="hover:bg-gray-700 p-4 flex items-center cursor-pointer"
              onClick={() => navigate(path)}
            >
              {isSidebarOpen ? (
                <div className="flex items-center">
                  <Icon size={18} className="mr-2 flex-shrink-0" />
                  <span className="truncate">{label}</span>
                </div>
              ) : (
                <div className="mx-auto">
                  <Icon size={20} />
                </div>
              )}
            </div>
          ))}
        </nav>
        {isSidebarOpen && (
          <div className="p-4 border-t border-gray-700">
            <button
              onClick={handleLogout}
              className="w-full py-2 px-4 bg-red-600 hover:bg-red-700 rounded-md text-sm font-medium text-white"
            >
              Logout
            </button>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 w-full overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default SupervisorLayout;