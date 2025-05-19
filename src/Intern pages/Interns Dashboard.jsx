import { useState, useEffect } from 'react';
<<<<<<< HEAD
import { FiClock, FiCalendar, FiFileText, FiAward, FiLogOut, FiAlertTriangle, FiEdit, FiCoffee, FiChevronLeft, FiChevronRight, FiDownload, FiUser, FiCheck, FiX, FiPlus, FiBarChart2, FiTrendingUp, FiLayout } from 'react-icons/fi';
=======
import { useNavigate } from 'react-router-dom';
import { FiClock, FiCalendar, FiFileText, FiAward, FiLogOut, FiAlertTriangle, FiEdit, FiCoffee, FiChevronLeft, FiChevronRight, FiDownload, FiUser, FiCheck, FiX, FiPlus, FiBarChart2, FiTrendingUp, FiLayout, FiCreditCard } from 'react-icons/fi';

// Sample data from other components, adapted for front-end use
const sampleReports = [
  {
    day: 5,
    date: 'April 18, 2025',
    status: 'Pending',
    tasksCompleted: 4,
    hoursWorked: 5,
    summary: 'Attended training session and worked on personal project.',
    selectedTasks: [],
  },
  {
    day: 4,
    date: 'April 17, 2025',
    status: 'Pending',
    tasksCompleted: 6,
    hoursWorked: 7,
    summary: 'Refactored legacy code and improved performance.',
    selectedTasks: [],
  },
];

const sampleEvaluation = {
  readiness: 78,
  badges: ['React Expert', 'Team Player'],
  skills: { 'Technical Skills': 80, 'Communication': 100 },
  feedback: 'Strong technical aptitude and team collaboration.',
};

const sampleLeaveRequests = [
  { id: 1, type: 'Personal Leave', from: 'May 2, 2025', to: 'May 2, 2025', duration: '1 day', status: 'Pending', reason: 'Family event' },
  { id: 2, type: 'Sick Leave', from: 'April 21, 2025', to: 'April 23, 2025', duration: '3 days', status: 'Approved', reason: 'Flu symptoms' },
];
>>>>>>> golocino

export default function InternDashboard() {
  const [taskNote, setTaskNote] = useState('');
  const [tasks, setTasks] = useState([
<<<<<<< HEAD
    { id: 1, text: "Meeting with supervisor to discuss project requirements", completed: false, time: "9:30 AM" },
    { id: 2, text: "Fix the computer", completed: true, time: "11:45 AM" },
=======
    { id: 1, text: 'Meeting with supervisor to discuss project requirements', completed: false, time: '9:30 AM' },
    { id: 2, text: 'Fix the computer', completed: true, time: '11:45 AM' },
>>>>>>> golocino
  ]);
  const [activeTab, setActiveTab] = useState('tasks');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [checkInTime, setCheckInTime] = useState(null);
<<<<<<< HEAD
  
  // Timesheet entries
  const [entries] = useState([
    { date: '4/26/2025', timeIn: '8:00 AM', timeOut: '5:00 PM', overtime: '--', totalHours: '8 hours', status: 'approved' },
    { date: '4/25/2025', timeIn: '8:15 AM', timeOut: '5:30 PM', overtime: '0.5 hours', totalHours: '8.25 hours', status: 'approved' },
    { date: '4/24/2025', timeIn: '8:00 AM', timeOut: '6:00 PM', overtime: '1 hour', totalHours: '9 hours', status: 'pending' },
  ]);
  
=======
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);
  const [isFaceModalOpen, setIsFaceModalOpen] = useState(false);
  const [isViewQRModalOpen, setIsViewQRModalOpen] = useState(false);
  const [isCheckInFlow, setIsCheckInFlow] = useState(false);

  // State for Daily Reports task selection
  const [reports, setReports] = useState(sampleReports);
  const [selectedTaskIds, setSelectedTaskIds] = useState([]);
  const [reportSummary, setReportSummary] = useState('');
  const [reportHours, setReportHours] = useState('');

  const navigate = useNavigate();

  const entries = [
    { date: '4/26/2025', timeIn: '8:00 AM', timeOut: '5:00 PM', overtime: '--', totalHours: '8 hours', status: 'approved' },
    { date: '4/25/2025', timeIn: '8:15 AM', timeOut: '5:30 PM', overtime: '0.5 hours', totalHours: '8.25 hours', status: 'approved' },
  ];

>>>>>>> golocino
  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 6;
  const totalEntries = 20;
  const totalPages = Math.ceil(totalEntries / entriesPerPage);
<<<<<<< HEAD
  
  // Update current time every minute
=======

>>>>>>> golocino
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
<<<<<<< HEAD
    
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
=======
    return () => clearInterval(timer);
  }, []);

  const getFormattedTime = () => {
    return currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formattedDate = currentTime.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
>>>>>>> golocino

  const addTask = () => {
    if (taskNote.trim() !== '') {
      const newTask = {
        id: tasks.length + 1,
        text: taskNote,
        completed: false,
<<<<<<< HEAD
        time: formattedTime
=======
        time: getFormattedTime(),
>>>>>>> golocino
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
<<<<<<< HEAD
  
  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };
  
  const handleCheckIn = () => {
    if (!isCheckedIn) {
      setIsCheckedIn(true);
      setCheckInTime(formattedTime);
=======

  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const handleCheckIn = () => {
    setIsCheckInFlow(true);
    setIsQRModalOpen(true);
  };

  const handleCheckOut = () => {
    setIsCheckInFlow(false);
    setIsQRModalOpen(true);
  };

  const handleQRDone = () => {
    setIsQRModalOpen(false);
    if (isCheckInFlow) {
      setIsFaceModalOpen(true);
>>>>>>> golocino
    } else {
      setIsCheckedIn(false);
      setCheckInTime(null);
    }
  };
<<<<<<< HEAD
  
  // Status badge component
=======

  const handleQRCancel = () => {
    setIsQRModalOpen(false);
  };

  const handleFaceDone = () => {
    setIsFaceModalOpen(false);
    setIsCheckedIn(true);
    setCheckInTime(getFormattedTime());
  };

  const handleFaceCancel = () => {
    setIsFaceModalOpen(false);
  };

  const handleViewQRCode = () => {
    setIsViewQRModalOpen(true);
  };

  const handleViewQRClose = () => {
    setIsViewQRModalOpen(false);
  };

  const handleDownloadQR = () => {
    const link = document.createElement('a');
    link.href = '';
    link.download = 'my-qr-code.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleTimesheetEdit = () => {
    navigate('/intern/my-timesheet');
  };

  const handleFileLeave = () => {
    navigate('/intern/leave-management');
  };

  // Handle task selection for Daily Reports
  const handleTaskSelection = (taskId) => {
    setSelectedTaskIds(prev =>
      prev.includes(taskId)
        ? prev.filter(id => id !== taskId)
        : [...prev, taskId]
    );
  };

  // Handle report submission
  const handleSubmitReport = () => {
    if (!reportSummary.trim() || !reportHours.trim()) {
      alert('Please provide a summary and hours worked.');
      return;
    }

    const selectedTasks = tasks.filter(task => selectedTaskIds.includes(task.id));
    const newReport = {
      day: reports.length + 1,
      date: formattedDate,
      status: 'Pending',
      tasksCompleted: selectedTasks.length,
      hoursWorked: parseFloat(reportHours) || 0,
      summary: reportSummary,
      selectedTasks,
    };

    setReports([newReport, ...reports]);
    setSelectedTaskIds([]);
    setReportSummary('');
    setReportHours('');
    alert('Report submitted successfully!');
  };

>>>>>>> golocino
  const StatusBadge = ({ status }) => {
    const statusClasses = {
      approved: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
<<<<<<< HEAD
      rejected: 'bg-red-100 text-red-800'
    };
    
=======
      rejected: 'bg-red-100 text-red-800',
    };
>>>>>>> golocino
    return (
      <span className={`text-xs px-2 py-1 rounded-full font-medium ${statusClasses[status]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };
<<<<<<< HEAD
  
  // Tab content components
=======

  // Modal components (unchanged)
  const QRModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Scan QR Code</h2>
        </div>
        <div className="p-6">
          <div className="bg-gray-200 rounded-lg h-64 flex items-center justify-center mb-4">
            <p className="text-gray-500">Camera Feed Placeholder</p>
          </div>
          <div className="flex justify-end gap-2">
            <button
              onClick={handleQRCancel}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleQRDone}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const FaceModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Facial Recognition</h2>
        </div>
        <div className="p-6">
          <div className="bg-gray-200 rounded-lg h-64 flex items-center justify-center mb-4">
            <p className="text-gray-500">Facial Recognition Camera Placeholder</p>
          </div>
          <div className="flex justify-end gap-2">
            <button
              onClick={handleFaceCancel}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleFaceDone}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const ViewQRModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">My QR Code</h2>
        </div>
        <div className="p-6">
          <div className="bg-gray-200 rounded-lg h-64 flex items-center justify-center mb-4">
            <img src="/path-to-qr-code.png" alt="My QR Code" className="w-48 h-48" />
          </div>
          <div className="flex justify-end gap-2">
            <button
              onClick={handleViewQRClose}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Close
            </button>
            <button
              onClick={handleDownloadQR}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
            >
              <FiDownload className="mr-2" />
              Download
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Updated TabContent component
>>>>>>> golocino
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
<<<<<<< HEAD
            
=======
>>>>>>> golocino
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
<<<<<<< HEAD
                <button 
=======
                <button
>>>>>>> golocino
                  onClick={addTask}
                  className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg transition-colors flex items-center justify-center"
                  aria-label="Add task"
                >
                  <FiPlus size={18} />
                </button>
              </div>
<<<<<<< HEAD

=======
>>>>>>> golocino
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
<<<<<<< HEAD
                        aria-label={task.completed ? "Mark as incomplete" : "Mark as complete"}
                      >
                        {task.completed && (
                          <FiCheck size={14} className="text-white" />
                        )}
=======
                        aria-label={task.completed ? 'Mark as incomplete' : 'Mark as complete'}
                      >
                        {task.completed && <FiCheck size={14} className="text-white" />}
>>>>>>> golocino
                      </button>
                      <div className="flex-1">
                        <span className={`${task.completed ? 'text-gray-400 line-through' : 'text-gray-700'}`}>
                          {task.text}
                        </span>
                        <div className="text-xs text-gray-500 mt-1 flex items-center">
                          <FiClock size={12} className="mr-1" /> {task.time}
                        </div>
                      </div>
<<<<<<< HEAD
                      <button 
=======
                      <button
>>>>>>> golocino
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
<<<<<<< HEAD
              <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100 transition-colors">
                <FiDownload size={16} />
                <span>Export</span>
              </button>
            </div>

=======
            </div>
>>>>>>> golocino
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
<<<<<<< HEAD

=======
>>>>>>> golocino
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
<<<<<<< HEAD
                
=======
>>>>>>> golocino
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
<<<<<<< HEAD
                  
=======
>>>>>>> golocino
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
<<<<<<< HEAD
                
                {totalPages > 5 && currentPage < totalPages - 2 && (
                  <span className="px-2">...</span>
                )}
                
=======
                {totalPages > 5 && currentPage < totalPages - 2 && <span className="px-2">...</span>}
>>>>>>> golocino
                {totalPages > 5 && currentPage < totalPages - 2 && (
                  <button
                    onClick={() => setCurrentPage(totalPages)}
                    className={`w-10 h-10 flex items-center justify-center rounded-md ${currentPage === totalPages ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-gray-100'}`}
                  >
                    {totalPages}
                  </button>
                )}
<<<<<<< HEAD
                
=======
>>>>>>> golocino
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
<<<<<<< HEAD
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
=======
              
              <div>
                <h4 className="font-medium mb-2">Previous Reports</h4>
                {reports.length === 0 ? (
                  <p className="text-gray-500">No reports submitted yet.</p>
                ) : (
                  <div className="space-y-3">
                    {reports.map((report) => (
                      <div key={report.day} className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium text-gray-700">Day {report.day} - {report.date}</p>
                            <p className="text-sm text-gray-500">{report.summary}</p>
                            <p className="text-sm text-gray-500">
                              {report.tasksCompleted} tasks, {report.hoursWorked}h
                            </p>
                            {report.selectedTasks.length > 0 && (
                              <ul className="list-disc pl-5 text-sm text-gray-500 mt-1">
                                {report.selectedTasks.map((task) => (
                                  <li key={task.id}>{task.text}</li>
                                ))}
                              </ul>
                            )}
                          </div>
                          <StatusBadge status={report.status} />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
>>>>>>> golocino
              </div>
            </div>
          </div>
        );
<<<<<<< HEAD
      case 'performance':
=======
      case 'leave management':
>>>>>>> golocino
        return (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 w-full">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
<<<<<<< HEAD
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
=======
                <FiCreditCard className="text-blue-500" />
                <span>Leave Management</span>
              </h2>
            </div>
            <div className="p-6">
              <p className="text-gray-500 mb-4">View your leave requests</p>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Leave Type</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dates</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reason</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {sampleLeaveRequests.map((request) => (
                      <tr key={request.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{request.type}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div>{request.from}</div>
                          <div className="text-xs text-gray-400">to {request.to}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{request.duration}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <StatusBadge status={request.status} />
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          <div className="max-w-xs truncate" title={request.reason}>
                            {request.reason}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
>>>>>>> golocino
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
<<<<<<< HEAD
      {/* Header */}
=======
>>>>>>> golocino
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
            <FiLayout className="text-blue-500" />
            <span>Intern Dashboard</span>
          </h1>
        </div>
      </header>
<<<<<<< HEAD

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Quick Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <button 
=======
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <button
>>>>>>> golocino
            onClick={handleCheckIn}
            className={`${isCheckedIn ? 'bg-gray-500' : 'bg-green-500 hover:bg-green-600'} rounded-lg p-4 text-white transition-colors shadow-sm`}
          >
            <div className="flex flex-col items-center">
<<<<<<< HEAD
              <h2 className="text-xl font-bold">{isCheckedIn ? "CHECKED IN" : "TIME IN"}</h2>
              <p className="text-sm">{isCheckedIn ? `Time: ${checkInTime}` : `Current: ${formattedTime}`}</p>
            </div>
          </button>
          <button 
            onClick={() => isCheckedIn && handleCheckIn()}
=======
              <h2 className="text-xl font-bold">{isCheckedIn ? 'CHECKED IN' : 'TIME IN'}</h2>
              <p className="text-sm">{isCheckedIn ? `Time: ${checkInTime}` : `Current: ${getFormattedTime()}`}</p>
            </div>
          </button>
          <button
            onClick={handleCheckOut}
>>>>>>> golocino
            className={`${!isCheckedIn ? 'bg-gray-300 cursor-not-allowed' : 'bg-red-500 hover:bg-red-600'} rounded-lg p-4 text-white transition-colors shadow-sm`}
            disabled={!isCheckedIn}
          >
            <div className="flex flex-col items-center">
              <h2 className="text-xl font-bold">TIME OUT</h2>
<<<<<<< HEAD
              <p className="text-sm">Current: {formattedTime}</p>
            </div>
          </button>
          <button className="bg-yellow-500 hover:bg-yellow-600 rounded-lg p-4 text-white transition-colors shadow-sm flex flex-col items-center justify-center">
            <FiEdit size={20} className="mb-1" />
            <h2 className="text-base font-medium">Request Timesheet Edit</h2>
          </button>
          <button className="bg-purple-500 hover:bg-purple-600 rounded-lg p-4 text-white transition-colors shadow-sm flex flex-col items-center justify-center">
=======
              <p className="text-sm">Current: {getFormattedTime()}</p>
            </div>
          </button>
          <button
            onClick={handleTimesheetEdit}
            className="bg-yellow-500 hover:bg-yellow-600 rounded-lg p-4 text-white transition-colors shadow-sm flex flex-col items-center justify-center"
          >
            <FiEdit size={20} className="mb-1" />
            <h2 className="text-base font-medium">Request Timesheet Edit</h2>
          </button>
          <button
            onClick={handleFileLeave}
            className="bg-purple-500 hover:bg-purple-600 rounded-lg p-4 text-white transition-colors shadow-sm flex flex-col items-center justify-center"
          >
>>>>>>> golocino
            <FiLogOut size={20} className="mb-1" />
            <h2 className="text-base font-medium">File a Leave</h2>
          </button>
        </div>
<<<<<<< HEAD

        {/* Status + QR Code */}
=======
>>>>>>> golocino
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 col-span-2">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Today's Status</h3>
            <div className="flex items-center">
              <div className={`w-3 h-3 rounded-full mr-2 ${isCheckedIn ? 'bg-green-500' : 'bg-red-500'}`}></div>
<<<<<<< HEAD
              <h2 className="text-xl font-bold text-gray-700">{isCheckedIn ? "Checked In" : "Not Checked In"}</h2>
=======
              <h2 className="text-xl font-bold text-gray-700">{isCheckedIn ? 'Checked In' : 'Not Checked In'}</h2>
>>>>>>> golocino
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
<<<<<<< HEAD
              <p className="mb-2 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
=======
              <button
                onClick={handleViewQRCode}
                className="mb-2 flex items-center justify-center mx-auto text-white hover:text-gray-200 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-1"
                >
>>>>>>> golocino
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                  <circle cx="8.5" cy="8.5" r="1.5"></circle>
                  <polyline points="21 15 16 10 5 21"></polyline>
                </svg>
                View My QR Code
<<<<<<< HEAD
              </p>
=======
              </button>
>>>>>>> golocino
              <div className="bg-white rounded p-4 w-32 h-32 mx-auto grid grid-cols-3 gap-2">
                {[...Array(9)].map((_, i) => (
                  <div key={i} className="bg-blue-500 rounded-sm"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
<<<<<<< HEAD

        {/* Tabs */}
=======
>>>>>>> golocino
        <div className="flex flex-wrap gap-2 mb-6 overflow-x-auto pb-1">
          {[
            { id: 'tasks', name: 'Task Notes', icon: FiFileText },
            { id: 'timesheet', name: 'My Timesheet', icon: FiCalendar },
            { id: 'reports', name: 'Daily Reports', icon: FiFileText },
<<<<<<< HEAD
            { id: 'performance', name: 'Performance', icon: FiTrendingUp }
=======
            { id: 'leave management', name: 'Leave', icon: FiCreditCard },
>>>>>>> golocino
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg text-sm flex items-center transition-colors ${
<<<<<<< HEAD
                activeTab === tab.id 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
=======
                activeTab === tab.id ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
>>>>>>> golocino
              }`}
            >
              <tab.icon size={16} className="mr-1" />
              {tab.name}
            </button>
          ))}
        </div>
<<<<<<< HEAD

        {/* Content based on active tab */}
        <TabContent />
=======
        <TabContent />
        {isQRModalOpen && <QRModal />}
        {isFaceModalOpen && <FaceModal />}
        {isViewQRModalOpen && <ViewQRModal />}
>>>>>>> golocino
      </main>
    </div>
  );
}