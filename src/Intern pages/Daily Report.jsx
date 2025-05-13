import { useState } from 'react';
import { FiPlus, FiChevronDown, FiEye, FiEdit2, FiUser, FiCalendar, FiFileText } from 'react-icons/fi';

function DailyReport() {
  const [statusFilter, setStatusFilter] = useState('All Status');
  
  const reports = [
    { 
      day: 1, 
      date: 'April 14, 2025', 
      status: 'Approved',
      tasksCompleted: 8,
      hoursWorked: 8.5
    },
    { 
      day: 2, 
      date: 'April 15, 2025', 
      status: 'Improve',
      tasksCompleted: 5,
      hoursWorked: 6
    },
    { 
      day: 3, 
      date: 'April 16, 2025', 
      status: 'Pending',
      tasksCompleted: 7,
      hoursWorked: 7.5
    },
    { 
      day: 4, 
      date: 'April 17, 2025', 
      status: 'Pending',
      tasksCompleted: 6,
      hoursWorked: 7
    },
    { 
      day: 5, 
      date: 'April 18, 2025', 
      status: 'Pending',
      tasksCompleted: 4,
      hoursWorked: 5
    }
  ];

  const filteredReports = statusFilter === 'All Status' 
    ? reports 
    : reports.filter(report => report.status === statusFilter);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
            <FiFileText className="text-blue-500" />
            <span>Daily Reports</span>
          </h1>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Filters and actions */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="relative w-full sm:w-48">
            <select
              className="appearance-none w-full bg-white border border-gray-300 rounded-md pl-3 pr-10 py-2 text-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option>All Status</option>
              <option>Approved</option>
              <option>Pending</option>
              <option>Improve</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <FiChevronDown size={16} />
            </div>
          </div>
          
          <button className="w-full sm:w-auto flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
            <FiPlus size={16} />
            <span>New Report</span>
          </button>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <h3 className="text-sm font-medium text-gray-500">Total Reports</h3>
            <p className="text-2xl font-semibold mt-1">{reports.length}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <h3 className="text-sm font-medium text-gray-500">Approved</h3>
            <p className="text-2xl font-semibold mt-1">
              {reports.filter(r => r.status === 'Approved').length}
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <h3 className="text-sm font-medium text-gray-500">Pending Review</h3>
            <p className="text-2xl font-semibold mt-1">
              {reports.filter(r => r.status === 'Pending').length}
            </p>
          </div>
        </div>

        {/* Reports list */}
        <div className="space-y-4">
          {filteredReports.length === 0 ? (
            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
              <p className="text-gray-500">No reports found matching your filter</p>
            </div>
          ) : (
            filteredReports.map((report) => (
              <ReportCard
                key={report.day}
                day={report.day}
                date={report.date}
                status={report.status}
                tasksCompleted={report.tasksCompleted}
                hoursWorked={report.hoursWorked}
              />
            ))
          )}
        </div>
      </main>
    </div>
  );
}

function ReportCard({ day, date, status, tasksCompleted, hoursWorked }) {
  const getStatusStyles = () => {
    switch (status) {
      case 'Approved':
        return 'bg-green-100 text-green-800';
      case 'Improve':
        return 'bg-red-100 text-red-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h3 className="font-semibold text-lg text-gray-900">Day {day} - Tasks Report</h3>
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusStyles()}`}>
              {status}
            </span>
          </div>
          <p className="text-gray-600 text-sm mt-1">{date}</p>
          
          <div className="flex gap-4 mt-3">
            <div className="text-sm">
              <span className="text-gray-500">Tasks:</span>{' '}
              <span className="font-medium">{tasksCompleted}</span>
            </div>
            <div className="text-sm">
              <span className="text-gray-500">Hours:</span>{' '}
              <span className="font-medium">{hoursWorked}h</span>
            </div>
          </div>
        </div>
        
        <div className="flex gap-2">
          {status !== 'Approved' && (
            <button className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100 transition-colors">
              <FiEdit2 size={14} />
              <span className="hidden sm:inline">Edit</span>
            </button>
          )}
          
          <button className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100 transition-colors">
            <FiEye size={14} />
            <span className="hidden sm:inline">View</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default DailyReport;