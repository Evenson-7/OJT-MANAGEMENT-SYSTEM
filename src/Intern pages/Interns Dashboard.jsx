import { useState, useEffect } from 'react';
import { FiClock, FiCalendar, FiFileText, FiAward, FiLogOut, FiAlertTriangle, FiEdit, FiCoffee, FiChevronLeft, FiChevronRight, FiDownload, FiUser, FiCheck, FiX, FiPlus, FiBarChart2, FiTrendingUp, FiLayout } from 'react-icons/fi';

export default function InternDashboard() {
  const [taskNote, setTaskNote] = useState('');
  const [tasks, setTasks] = useState([
    { id: 1, text: "Meeting with supervisor to discuss project requirements", completed: false, time: "9:30 AM" },
    { id: 2, text: "Fix the computer", completed: true, time: "11:45 AM" },
  ]);
  const [activeTab, setActiveTab] = useState('tasks');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [checkInTime, setCheckInTime] = useState(null);
  
  // Timesheet entries
  const [entries] = useState([
    { date: '4/26/2025', timeIn: '8:00 AM', timeOut: '5:00 PM', overtime: '--', totalHours: '8 hours', status: 'approved' },
    { date: '4/25/2025', timeIn: '8:15 AM', timeOut: '5:30 PM', overtime: '0.5 hours', totalHours: '8.25 hours', status: 'approved' },
    { date: '4/24/2025', timeIn: '8:00 AM', timeOut: '6:00 PM', overtime: '1 hour', totalHours: '9 hours', status: 'pending' },
  ]);
  
  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 6;
  const totalEntries = 20;
  const totalPages = Math.ceil(totalEntries / entriesPerPage);
  
  // Update current time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    
    return () => clearInterval(timer);
  }, []);

  const formattedTime = currentTime.toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit' 
  });
  
  const formattedDate = currentTime.toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric'
  });

  const addTask = () => {
    if (taskNote.trim() !== '') {
      const newTask = {
        id: tasks.length + 1,
        text: taskNote,
        completed: false,
        time: formattedTime
      };
      setTasks([...tasks, newTask]);
      setTaskNote('');
    }
  };

  const toggleTaskCompletion = (taskId) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };
  
  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };
  
  const handleCheckIn = () => {
    if (!isCheckedIn) {
      setIsCheckedIn(true);
      setCheckInTime(formattedTime);
    } else {
      setIsCheckedIn(false);
      setCheckInTime(null);
    }
  };
  
  // Status badge component
  const StatusBadge = ({ status }) => {
    const statusClasses = {
      approved: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      rejected: 'bg-red-100 text-red-800'
    };
    
    return (
      <span className={`text-xs px-2 py-1 rounded-full font-medium ${statusClasses[status]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };
  
  // Tab content components
  const TabContent = () => {
    switch (activeTab) {
      case 'tasks':
        return (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 w-full">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <FiFileText className="text-blue-500" />
                <span>Task Notes</span>
              </h2>
            </div>
            
            <div className="p-6">
              <div className="mb-6 flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Add a new task note..."
                  className="flex-1 p-3 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={taskNote}
                  onChange={(e) => setTaskNote(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addTask()}
                />
                <button 
                  onClick={addTask}
                  className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg transition-colors flex items-center justify-center"
                  aria-label="Add task"
                >
                  <FiPlus size={18} />
                </button>
              </div>

              {tasks.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <FiCoffee size={48} className="mx-auto mb-2 text-gray-400" />
                  <p>No tasks for today! Add one to get started.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {tasks.map((task) => (
                    <div key={task.id} className="bg-gray-50 rounded-lg p-4 flex items-center group hover:bg-gray-100 transition-colors">
                      <button
                        onClick={() => toggleTaskCompletion(task.id)}
                        className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 flex-shrink-0 transition-colors ${
                          task.completed ? 'bg-green-500' : 'border-2 border-gray-300 hover:border-blue-500'
                        }`}
                        aria-label={task.completed ? "Mark as incomplete" : "Mark as complete"}
                      >
                        {task.completed && (
                          <FiCheck size={14} className="text-white" />
                        )}
                      </button>
                      <div className="flex-1">
                        <span className={`${task.completed ? 'text-gray-400 line-through' : 'text-gray-700'}`}>
                          {task.text}
                        </span>
                        <div className="text-xs text-gray-500 mt-1 flex items-center">
                          <FiClock size={12} className="mr-1" /> {task.time}
                        </div>
                      </div>
                      <button 
                        onClick={() => deleteTask(task.id)}
                        className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                        aria-label="Delete task"
                      >
                        <FiX size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        );
      case 'timesheet':
        return (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden w-full">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <FiCalendar className="text-blue-500" />
                <span>My Timesheet</span>
              </h2>
              <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100 transition-colors">
                <FiDownload size={16} />
                <span>Export</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Time In
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Time Out
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Overtime
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total Hours
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {entries.map((entry, index) => (
                    <tr key={index} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {entry.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {entry.timeIn}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {entry.timeOut}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {entry.overtime}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {entry.totalHours}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <StatusBadge status={entry.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="px-6 py-4 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center">
              <div className="text-sm text-gray-700 mb-4 sm:mb-0">
                Showing <span className="font-medium">1</span> to <span className="font-medium">{entriesPerPage}</span> of{' '}
                <span className="font-medium">{totalEntries}</span> entries
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className={`p-2 rounded-md ${currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-100'}`}
                >
                  <FiChevronLeft size={18} />
                </button>
                
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
                      onClick={() => setCurrentPage(pageNum)}
                      className={`w-10 h-10 flex items-center justify-center rounded-md ${currentPage === pageNum ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-gray-100'}`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
                
                {totalPages > 5 && currentPage < totalPages - 2 && (
                  <span className="px-2">...</span>
                )}
                
                {totalPages > 5 && currentPage < totalPages - 2 && (
                  <button
                    onClick={() => setCurrentPage(totalPages)}
                    className={`w-10 h-10 flex items-center justify-center rounded-md ${currentPage === totalPages ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-gray-100'}`}
                  >
                    {totalPages}
                  </button>
                )}
                
                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className={`p-2 rounded-md ${currentPage === totalPages ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-100'}`}
                >
                  <FiChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>
        );
      case 'reports':
        return (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 w-full">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <FiFileText className="text-blue-500" />
                <span>Daily Reports</span>
              </h2>
            </div>
            <div className="p-6">
              <p className="text-gray-500 mb-4">Submit and view your daily progress reports</p>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-4">
                <h4 className="font-medium mb-2">Today's Report</h4>
                <textarea 
                  className="w-full p-3 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                  rows="4"
                  placeholder="Describe what you worked on today..."
                ></textarea>
                <button className="mt-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors">
                  Submit Report
                </button>
              </div>
            </div>
          </div>
        );
      case 'performance':
        return (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 w-full">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <FiTrendingUp className="text-blue-500" />
                <span>Performance Overview</span>
              </h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                  <p className="text-green-800 font-medium">Completed Tasks</p>
                  <p className="text-2xl font-bold text-green-600">24</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                  <p className="text-blue-800 font-medium">Hours This Week</p>
                  <p className="text-2xl font-bold text-blue-600">32.5</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
                  <p className="text-purple-800 font-medium">Projects Contributed</p>
                  <p className="text-2xl font-bold text-purple-600">3</p>
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h4 className="font-medium mb-3">Recent Feedback</h4>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <div className="bg-blue-100 p-2 rounded-full mr-3">
                      <FiBarChart2 className="text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium">Excellent work on the database migration</p>
                      <p className="text-sm text-gray-500">From: Supervisor (April 17, 2025)</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-yellow-100 p-2 rounded-full mr-3">
                      <FiAlertTriangle className="text-yellow-600" />
                    </div>
                    <div>
                      <p className="font-medium">Please improve documentation</p>
                      <p className="text-sm text-gray-500">From: Team Lead (April 10, 2025)</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return <div>Content not found</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
            <FiLayout className="text-blue-500" />
            <span>Intern Dashboard</span>
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Quick Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <button 
            onClick={handleCheckIn}
            className={`${isCheckedIn ? 'bg-gray-500' : 'bg-green-500 hover:bg-green-600'} rounded-lg p-4 text-white transition-colors shadow-sm`}
          >
            <div className="flex flex-col items-center">
              <h2 className="text-xl font-bold">{isCheckedIn ? "CHECKED IN" : "TIME IN"}</h2>
              <p className="text-sm">{isCheckedIn ? `Time: ${checkInTime}` : `Current: ${formattedTime}`}</p>
            </div>
          </button>
          <button 
            onClick={() => isCheckedIn && handleCheckIn()}
            className={`${!isCheckedIn ? 'bg-gray-300 cursor-not-allowed' : 'bg-red-500 hover:bg-red-600'} rounded-lg p-4 text-white transition-colors shadow-sm`}
            disabled={!isCheckedIn}
          >
            <div className="flex flex-col items-center">
              <h2 className="text-xl font-bold">TIME OUT</h2>
              <p className="text-sm">Current: {formattedTime}</p>
            </div>
          </button>
          <button className="bg-yellow-500 hover:bg-yellow-600 rounded-lg p-4 text-white transition-colors shadow-sm flex flex-col items-center justify-center">
            <FiEdit size={20} className="mb-1" />
            <h2 className="text-base font-medium">Request Timesheet Edit</h2>
          </button>
          <button className="bg-purple-500 hover:bg-purple-600 rounded-lg p-4 text-white transition-colors shadow-sm flex flex-col items-center justify-center">
            <FiLogOut size={20} className="mb-1" />
            <h2 className="text-base font-medium">File a Leave</h2>
          </button>
        </div>

        {/* Status + QR Code */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 col-span-2">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Today's Status</h3>
            <div className="flex items-center">
              <div className={`w-3 h-3 rounded-full mr-2 ${isCheckedIn ? 'bg-green-500' : 'bg-red-500'}`}></div>
              <h2 className="text-xl font-bold text-gray-700">{isCheckedIn ? "Checked In" : "Not Checked In"}</h2>
            </div>
            <p className="text-gray-500 text-sm mt-1">Expected Hours: 8:00 AM - 05:00 PM</p>
            {!isCheckedIn && (
              <div className="mt-2 flex items-center text-yellow-600 bg-yellow-50 p-2 rounded text-xs">
                <FiAlertTriangle size={14} className="mr-1" />
                <span>Remember to check in when you arrive</span>
              </div>
            )}
          </div>
          <div className="bg-blue-500 rounded-lg p-4 shadow-sm text-white">
            <div className="text-center">
              <p className="mb-2 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                  <circle cx="8.5" cy="8.5" r="1.5"></circle>
                  <polyline points="21 15 16 10 5 21"></polyline>
                </svg>
                View My QR Code
              </p>
              <div className="bg-white rounded p-4 w-32 h-32 mx-auto grid grid-cols-3 gap-2">
                {[...Array(9)].map((_, i) => (
                  <div key={i} className="bg-blue-500 rounded-sm"></div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-6 overflow-x-auto pb-1">
          {[
            { id: 'tasks', name: 'Task Notes', icon: FiFileText },
            { id: 'timesheet', name: 'My Timesheet', icon: FiCalendar },
            { id: 'reports', name: 'Daily Reports', icon: FiFileText },
            { id: 'performance', name: 'Performance', icon: FiTrendingUp }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg text-sm flex items-center transition-colors ${
                activeTab === tab.id 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              <tab.icon size={16} className="mr-1" />
              {tab.name}
            </button>
          ))}
        </div>

        {/* Content based on active tab */}
        <TabContent />
      </main>
    </div>
  );
}