import { useState, useEffect } from 'react';
import { 
  BarChart2, 
  Users, 
  Clipboard, 
  Clock, 
  FileText, 
  TrendingUp, 
  Calendar, 
  Layout,
  AlertTriangle,
  Edit,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Download,
  User,
  Check,
  X,
  Plus,
  Coffee
} from 'lucide-react';

const SupervisorDashboard = () => {
  const [activeTab, setActiveTab] = useState('monitoring');
  const [currentTime, setCurrentTime] = useState(new Date());
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

  // Status badge component
  const StatusBadge = ({ status }) => {
    const statusClasses = {
      active: 'bg-green-100 text-green-800',
      late: 'bg-yellow-100 text-yellow-800',
      absent: 'bg-red-100 text-red-800',
      overtime: 'bg-orange-100 text-orange-800',
      approved: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      rejected: 'bg-red-100 text-red-800'
    };
    
    return (
      <span className={`text-xs px-2 py-1 rounded-full font-medium ${statusClasses[status.toLowerCase()]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  // Tab content components
  const TabContent = () => {
    switch (activeTab) {
      case 'monitoring':
        return (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 w-full">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <BarChart2 className="text-blue-500" />
                <span>Real-time Monitoring</span>
              </h2>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Intern</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time In</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time Out</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {[
                    { id: 'JD', name: 'John Doe', status: 'Active', timeIn: '8:02 AM', timeout: '-' },
                    { id: 'AS', name: 'Amy Smith', status: 'Late', timeIn: '9:15 AM', timeout: '-' },
                    { id: 'MP', name: 'Mike Parker', status: 'Active', timeIn: '8:30 AM', timeout: '-' },
                    { id: 'SR', name: 'Sara Reed', status: 'Absent', timeIn: '-', timeout: '-'},
                    { id: 'TB', name: 'Tom Brown', status: 'Overtime', timeIn: '8:00 AM', timeout: '-'},
                  ].map((intern) => (
                    <tr key={intern.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white">
                            {intern.id}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{intern.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <StatusBadge status={intern.status} />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{intern.timeIn}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{intern.timeout}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-md bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors">View</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      case 'timesheets':
        return (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden w-full">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <Clipboard className="text-blue-500" />
                <span>Timesheet Approvals</span>
              </h2>
              <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100 transition-colors">
                <Download size={16} />
                <span>Export</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Intern
                    </th>
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
                      Total Hours
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {[
                    { intern: 'John Doe', date: '4/26/2025', timeIn: '8:00 AM', timeOut: '5:00 PM', totalHours: '8 hours', status: 'Pending' },
                    { intern: 'Amy Smith', date: '4/26/2025', timeIn: '8:15 AM', timeOut: '5:30 PM', totalHours: '8.25 hours', status: 'Pending' },
                    { intern: 'Mike Parker', date: '4/25/2025', timeIn: '8:00 AM', timeOut: '6:00 PM', totalHours: '9 hours', status: 'Approved' },
                  ].map((entry, index) => (
                    <tr key={index} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {entry.intern}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {entry.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {entry.timeIn}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {entry.timeOut}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {entry.totalHours}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <StatusBadge status={entry.status} />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex gap-2">
                          <button className="p-1 text-green-600 hover:text-green-800">
                            <Check size={16} />
                          </button>
                          <button className="p-1 text-red-600 hover:text-red-800">
                            <X size={16} />
                          </button>
                        </div>
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
                  <ChevronLeft size={18} />
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
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>
        );
      case 'leave':
        return (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 w-full">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <Calendar className="text-blue-500" />
                <span>Leave Management</span>
              </h2>
            </div>
            <div className="p-6">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Intern</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Leave Type</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Start Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">End Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {[
                      { intern: 'John Doe', type: 'Sick Leave', startDate: '5/10/2025', endDate: '5/11/2025', status: 'Pending' },
                      { intern: 'Amy Smith', type: 'Personal Leave', startDate: '5/15/2025', endDate: '5/16/2025', status: 'Pending' },
                      { intern: 'Mike Parker', type: 'Vacation', startDate: '5/20/2025', endDate: '5/25/2025', status: 'Pending' },
                    ].map((leave, index) => (
                      <tr key={index} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{leave.intern}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{leave.type}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{leave.startDate}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{leave.endDate}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <StatusBadge status={leave.status} />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex gap-2">
                            <button className="p-1 text-green-600 hover:text-green-800">
                              <Check size={16} />
                            </button>
                            <button className="p-1 text-red-600 hover:text-red-800">
                              <X size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
      case 'evaluations':
        return (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 w-full">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <FileText className="text-blue-500" />
                <span>Evaluations</span>
              </h2>
              <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100 transition-colors">
                <Plus size={16} />
                <span>New Evaluation</span>
              </button>
            </div>
            <div className="p-6">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Intern</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Evaluation Type</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {[
                      { intern: 'John Doe', type: 'Monthly Review', date: '4/30/2025', score: '8.5/10' },
                      { intern: 'Amy Smith', type: 'Project Completion', date: '4/25/2025', score: '9/10' },
                      { intern: 'Mike Parker', type: 'Monthly Review', date: '4/30/2025', score: '7.5/10' },
                    ].map((evaluation, index) => (
                      <tr key={index} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{evaluation.intern}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{evaluation.type}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{evaluation.date}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{evaluation.score}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button className="flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-md bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors">
                            <Edit size={14} />
                            <span>Edit</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
      case 'performance':
        return (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 w-full">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <TrendingUp className="text-blue-500" />
                <span>Performance Overview</span>
              </h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                  <p className="text-green-800 font-medium">Total Interns</p>
                  <p className="text-2xl font-bold text-green-600">12</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                  <p className="text-blue-800 font-medium">Average Hours/Week</p>
                  <p className="text-2xl font-bold text-blue-600">36.5</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
                  <p className="text-purple-800 font-medium">Completed Projects</p>
                  <p className="text-2xl font-bold text-purple-600">8</p>
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h4 className="font-medium mb-3">Top Performing Interns</h4>
                <div className="space-y-3">
                  {[
                    { name: 'Amy Smith', performance: 'Excellent', details: 'Outstanding work on the database migration project' },
                    { name: 'Mike Parker', performance: 'Very Good', details: 'Strong technical skills and team collaboration' },
                    { name: 'John Doe', performance: 'Good', details: 'Consistently meets deadlines with quality work' },
                  ].map((intern, index) => (
                    <div key={index} className="flex items-start">
                      <div className="bg-blue-100 p-2 rounded-full mr-3">
                        <User className="text-blue-600" size={16} />
                      </div>
                      <div>
                        <p className="font-medium">{intern.name} - {intern.performance}</p>
                        <p className="text-sm text-gray-500">{intern.details}</p>
                      </div>
                    </div>
                  ))}
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
            <Layout className="text-blue-500" />
            <span>Supervisor Dashboard</span>
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-blue-500 rounded-lg p-4 text-white shadow-sm">
            <div className="flex flex-col items-center">
              <h2 className="text-xl font-bold">12</h2>
              <p className="text-sm">Total Interns</p>
            </div>
          </div>
          <div className="bg-green-500 rounded-lg p-4 text-white shadow-sm">
            <div className="flex flex-col items-center">
              <h2 className="text-xl font-bold">7</h2>
              <p className="text-sm">Pending Approvals</p>
            </div>
          </div>
          <div className="bg-purple-500 rounded-lg p-4 text-white shadow-sm">
            <div className="flex flex-col items-center">
              <h2 className="text-xl font-bold">3</h2>
              <p className="text-sm">Leave Requests</p>
            </div>
          </div>
          <div className="bg-yellow-500 rounded-lg p-4 text-white shadow-sm">
            <div className="flex flex-col items-center">
              <h2 className="text-xl font-bold">24</h2>
              <p className="text-sm">Report Approvals</p>
            </div>
          </div>
        </div>

        {/* Status Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 col-span-2">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Today's Overview</h3>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full mr-2 bg-green-500"></div>
              <h2 className="text-xl font-bold text-gray-700">5 Interns Currently Active</h2>
            </div>
            <p className="text-gray-500 text-sm mt-1">Current Time: {formattedTime}</p>
            <div className="mt-2 flex items-center text-yellow-600 bg-yellow-50 p-2 rounded text-xs">
              <AlertTriangle size={14} className="mr-1" />
              <span>1 intern is currently late</span>
            </div>
          </div>
          <div className="bg-blue-500 rounded-lg p-4 shadow-sm text-white">
            <div className="text-center">
              <p className="mb-2">Today's Schedule</p>
              <div className="bg-white text-gray-800 rounded p-3 text-sm">
                <div className="flex justify-between items-center mb-2">
                  <span>Team Meeting</span>
                  <span>10:00 AM</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Project Review</span>
                  <span>2:00 PM</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-6 overflow-x-auto pb-1">
          {[
            { id: 'monitoring', name: 'Real-time Monitoring', icon: BarChart2 },
            { id: 'timesheets', name: 'Timesheet Approval', icon: Clipboard },
            { id: 'leave', name: 'Leave Management', icon: Calendar },
            { id: 'evaluations', name: 'Evaluations', icon: FileText },
            { id: 'performance', name: 'Performance Overview', icon: TrendingUp }
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
};

export default SupervisorDashboard