import { useState } from 'react';
import { FiDownload, FiChevronLeft, FiChevronRight, FiCalendar, FiClock, FiEdit2, FiCheck, FiX } from 'react-icons/fi';

function MyTimesheet() {
  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 6;
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [editRequest, setEditRequest] = useState({
    date: '',
    currentTimeIn: '',
    currentTimeOut: '',
    requestedTimeIn: '',
    requestedTimeOut: '',
    reason: ''
  });
  const [requests, setRequests] = useState([]);

  const [entries] = useState([
    { date: '4/14/2025', timeIn: '8:00 AM', timeOut: '5:00 PM', overtime: '--', totalHours: '8 hours', status: 'approved' },
    { date: '4/15/2025', timeIn: '8:15 AM', timeOut: '5:30 PM', overtime: '0.5 hours', totalHours: '8.25 hours', status: 'approved' },
    { date: '4/17/2025', timeIn: '9:00 AM', timeOut: '5:00 PM', overtime: '--', totalHours: '7 hours', status: 'approved' },
    { date: '4/18/2025', timeIn: '8:00 AM', timeOut: '4:30 PM', overtime: '--', totalHours: '7.5 hours', status: 'rejected' },
    { date: '4/19/2025', timeIn: '8:00 AM', timeOut: '5:00 PM', overtime: '--', totalHours: '8 hours', status: 'approved' },
  ]);

  const totalEntries = 20;
  const totalPages = Math.ceil(totalEntries / entriesPerPage);

  // Status badge component
  const StatusBadge = ({ status }) => {
    const statusClasses = {
      approved: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800',
      'edit-requested': 'bg-purple-100 text-purple-800'
    };
    
    return (
      <span className={`text-xs px-2 py-1 rounded-full ${statusClasses[status]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const handleEditRequest = (entry) => {
    setSelectedEntry(entry);
    setEditRequest({
      date: entry.date,
      currentTimeIn: entry.timeIn,
      currentTimeOut: entry.timeOut,
      requestedTimeIn: entry.timeIn,
      requestedTimeOut: entry.timeOut,
      reason: ''
    });
    setShowEditModal(true);
  };

  const handleSubmitEdit = () => {
    // In a real app, this would send to backend
    const newRequest = {
      ...editRequest,
      id: Date.now(),
      status: 'edit-requested',
      submittedAt: new Date().toISOString()
    };
    
    setRequests([...requests, newRequest]);
    setShowEditModal(false);
    
    // Show success message
    alert('Edit request submitted for supervisor approval');
  };

  const isEntryEditable = (entry) => {
    // Only allow edits for approved entries that don't already have a pending request
    return entry.status === 'approved' && 
           !requests.some(req => req.date === entry.date && req.status === 'edit-requested');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
            <FiClock className="text-blue-500" />
            <span>Intern Timesheet</span>
          </h1>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Pending Requests Section */}
        {requests.length > 0 && (
          <div className="mb-6 bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 mb-3">Pending Edit Requests</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current Time</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Requested Time</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reason</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {requests.map((request, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{request.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {request.currentTimeIn} - {request.currentTimeOut}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {request.requestedTimeIn} - {request.requestedTimeOut}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">{request.reason}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <StatusBadge status={request.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Timesheet table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {/* Table header with actions */}
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-lg font-medium text-gray-900">Daily Records</h2>
            <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100 transition-colors">
              <FiDownload size={16} />
              <span>Export</span>
            </button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time In</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time Out</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Overtime</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {entries.map((entry, index) => {
                  const hasPendingRequest = requests.some(req => req.date === entry.date && req.status === 'edit-requested');
                  return (
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
                      <td className="px-6 py-4 whitespace-nowrap">
                        {hasPendingRequest ? (
                          <StatusBadge status="edit-requested" />
                        ) : (
                          <StatusBadge status={entry.status} />
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        {isEntryEditable(entry) && (
                          <button
                            onClick={() => handleEditRequest(entry)}
                            className="text-blue-600 hover:text-blue-900 flex items-center gap-1"
                          >
                            <FiEdit2 size={14} />
                            <span>Request Edit</span>
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Pagination (unchanged) */}
          {/* ... */}
        </div>
      </main>

      {/* Edit Request Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Request Timesheet Edit</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Date</label>
                  <div className="mt-1 p-2 bg-gray-100 rounded-md">{editRequest.date}</div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Current Time In</label>
                    <div className="mt-1 p-2 bg-gray-100 rounded-md">{editRequest.currentTimeIn}</div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Current Time Out</label>
                    <div className="mt-1 p-2 bg-gray-100 rounded-md">{editRequest.currentTimeOut}</div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Requested Time In</label>
                    <input
                      type="time"
                      value={editRequest.requestedTimeIn}
                      onChange={(e) => setEditRequest({...editRequest, requestedTimeIn: e.target.value})}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Requested Time Out</label>
                    <input
                      type="time"
                      value={editRequest.requestedTimeOut}
                      onChange={(e) => setEditRequest({...editRequest, requestedTimeOut: e.target.value})}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Reason for Edit</label>
                  <textarea
                    rows={3}
                    value={editRequest.reason}
                    onChange={(e) => setEditRequest({...editRequest, reason: e.target.value})}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    placeholder="Explain why you need this edit..."
                  />
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse rounded-b-lg">
              <button
                type="button"
                onClick={handleSubmitEdit}
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Submit Request
              </button>
              <button
                type="button"
                onClick={() => setShowEditModal(false)}
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyTimesheet;