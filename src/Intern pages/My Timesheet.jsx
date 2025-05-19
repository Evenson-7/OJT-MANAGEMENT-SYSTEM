import { useState } from 'react';
<<<<<<< HEAD
import { FiDownload, FiChevronLeft, FiChevronRight, FiCalendar, FiClock, FiEdit2, FiCheck, FiX } from 'react-icons/fi';
=======
import { FiDownload, FiChevronLeft, FiChevronRight, FiCalendar, FiClock, FiEdit2, FiEye, FiX } from 'react-icons/fi';
import { toast } from 'react-hot-toast';
import EditRequestModal from "../Modals/Edit Request Modal";
>>>>>>> golocino

function MyTimesheet() {
  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 6;
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState(null);
<<<<<<< HEAD
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
=======
  const [requests, setRequests] = useState([]);
  const [viewingRequest, setViewingRequest] = useState(null);

  // Format date to "MonthName Day, Year"
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  // Convert time to 12-hour format
  const formatTimeTo12Hour = (timeString) => {
    if (!timeString) return '--';
    
    // Check if it's already in 12-hour format
    if (timeString.includes('AM') || timeString.includes('PM')) {
      return timeString;
    }

    // Handle 24-hour format conversion
    const [hours, minutes] = timeString.split(':').map(Number);
    const period = hours >= 12 ? 'PM' : 'AM';
    const hours12 = hours % 12 || 12; // Convert 0 to 12 for 12AM
    return `${hours12}:${minutes.toString().padStart(2, '0')} ${period}`;
  };

  // Sample data - in a real app this would come from an API
  const [entries] = useState([
    { date: '4/18/2025', timeIn: '08:00', timeOut: '17:00', overtime: '--', totalHours: '8 hours', status: 'approved' },
    { date: '4/17/2025', timeIn: '08:15', timeOut: '17:30', overtime: '0.5 hours', totalHours: '8.25 hours', status: 'approved' },
    { date: '4/16/2025', timeIn: '09:00', timeOut: '17:00', overtime: '--', totalHours: '7 hours', status: 'approved' },
    { date: '4/15/2025', timeIn: '08:00', timeOut: '16:30', overtime: '--', totalHours: '7.5 hours', status: 'rejected' },
    { date: '4/14/2025', timeIn: '08:00', timeOut: '17:00', overtime: '--', totalHours: '8 hours', status: 'approved' },
  ]);

>>>>>>> golocino
  const StatusBadge = ({ status }) => {
    const statusClasses = {
      approved: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800',
<<<<<<< HEAD
      'edit-requested': 'bg-purple-100 text-purple-800'
=======
      'edit-requested': 'bg-yellow-100 text-yellow-800',
      pending: 'bg-yellow-100 text-yellow-800'
    };
    
    const statusText = {
      approved: 'Approved',
      rejected: 'Rejected',
      'edit-requested': 'Pending Edit',
      pending: 'Pending Review'
>>>>>>> golocino
    };
    
    return (
      <span className={`text-xs px-2 py-1 rounded-full ${statusClasses[status]}`}>
<<<<<<< HEAD
        {status.charAt(0).toUpperCase() + status.slice(1)}
=======
        {statusText[status]}
>>>>>>> golocino
      </span>
    );
  };

  const handleEditRequest = (entry) => {
<<<<<<< HEAD
    setSelectedEntry(entry);
    setEditRequest({
      date: entry.date,
      currentTimeIn: entry.timeIn,
      currentTimeOut: entry.timeOut,
      requestedTimeIn: entry.timeIn,
      requestedTimeOut: entry.timeOut,
      reason: ''
=======
    setSelectedEntry({
      ...entry,
      timeIn: formatTimeTo12Hour(entry.timeIn),
      timeOut: formatTimeTo12Hour(entry.timeOut)
>>>>>>> golocino
    });
    setShowEditModal(true);
  };

<<<<<<< HEAD
  const handleSubmitEdit = () => {
    // In a real app, this would send to backend
=======
  const handleSubmitEdit = (editRequest) => {
>>>>>>> golocino
    const newRequest = {
      ...editRequest,
      id: Date.now(),
      status: 'edit-requested',
<<<<<<< HEAD
      submittedAt: new Date().toISOString()
=======
      submittedAt: new Date().toISOString(),
      // Convert back to 24-hour format if needed for backend
      requestedTimeIn: editRequest.requestedTimeIn,
      requestedTimeOut: editRequest.requestedTimeOut,
      currentTimeIn: editRequest.timeIn,
      currentTimeOut: editRequest.timeOut
>>>>>>> golocino
    };
    
    setRequests([...requests, newRequest]);
    setShowEditModal(false);
<<<<<<< HEAD
    
    // Show success message
    alert('Edit request submitted for supervisor approval');
  };

  const isEntryEditable = (entry) => {
    // Only allow edits for approved entries that don't already have a pending request
    return entry.status === 'approved' && 
           !requests.some(req => req.date === entry.date && req.status === 'edit-requested');
=======
    toast.success('Edit request submitted successfully!');
  };

  const handleCancelRequest = (request) => {
    if (window.confirm('Are you sure you want to cancel this edit request?')) {
      setRequests(requests.filter(req => req.id !== request.id));
      setViewingRequest(null);
      toast.success('Edit request has been cancelled');
    }
  };

  const isEntryEditable = (entry) => {
    return (entry.status === 'approved' || entry.status === 'rejected') && 
           !requests.some(req => req.date === entry.date);
  };

  const getRequestForEntry = (entry) => {
    return requests.find(req => req.date === entry.date);
>>>>>>> golocino
  };

  return (
    <div className="min-h-screen bg-gray-50">
<<<<<<< HEAD
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
            <FiClock className="text-blue-500" />
            <span>Intern Timesheet</span>
=======
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
            <FiClock className="text-blue-500" />
            <span>My Timesheet</span>
>>>>>>> golocino
          </h1>
        </div>
      </header>

<<<<<<< HEAD
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
=======
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <div>
              <h2 className="text-lg font-medium text-gray-900">Time Records</h2>
              <p className="text-sm text-gray-500">
                {requests.length > 0 ? (
                  `You have ${requests.length} edit request${requests.length !== 1 ? 's' : ''} pending approval`
                ) : (
                  'All entries are up to date'
                )}
              </p>
            </div>
            <button 
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors shadow-sm"
              onClick={() => toast.success('Export initiated successfully!')}
            >
>>>>>>> golocino
              <FiDownload size={16} />
              <span>Export</span>
            </button>
          </div>

<<<<<<< HEAD
          {/* Table */}
=======
>>>>>>> golocino
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
<<<<<<< HEAD
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time In</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time Out</th>
=======
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
>>>>>>> golocino
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Overtime</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {entries.map((entry, index) => {
<<<<<<< HEAD
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
=======
                  const request = getRequestForEntry(entry);
                  const hasRequest = !!request;
                  
                  return (
                    <tr key={index} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {formatDate(entry.date)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex flex-col">
                          <span>In: {formatTimeTo12Hour(entry.timeIn)}</span>
                          <span>Out: {formatTimeTo12Hour(entry.timeOut)}</span>
                          {hasRequest && (
                            <div className="mt-1 text-xs text-yellow-600">
                              Requested: {formatTimeTo12Hour(request.requestedTimeIn)} - {formatTimeTo12Hour(request.requestedTimeOut)}
                            </div>
                          )}
                        </div>
>>>>>>> golocino
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {entry.overtime}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
<<<<<<< HEAD
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
=======
                        <StatusBadge status={hasRequest ? 'edit-requested' : entry.status} />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                        {hasRequest ? (
                          <div className="flex gap-2">
                            <button
                              onClick={() => setViewingRequest(request)}
                              className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100 transition-colors"
                              title="View request details"
                            >
                              <FiEye size={14} />
                              <span>View</span>
                            </button>
                            <button
                              onClick={() => handleCancelRequest(request)}
                              className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-md hover:bg-red-100 transition-colors"
                              title="Cancel request"
                            >
                              <FiX size={14} />
                              <span>Cancel</span>
                            </button>
                          </div>
                        ) : isEntryEditable(entry) ? (
                          <button
                            onClick={() => handleEditRequest(entry)}
                            className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100 transition-colors"
>>>>>>> golocino
                          >
                            <FiEdit2 size={14} />
                            <span>Request Edit</span>
                          </button>
<<<<<<< HEAD
                        )}
=======
                        ) : null}
>>>>>>> golocino
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
<<<<<<< HEAD

          {/* Pagination (unchanged) */}
          {/* ... */}
=======
>>>>>>> golocino
        </div>
      </main>

      {/* Edit Request Modal */}
<<<<<<< HEAD
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
=======
      <EditRequestModal
        show={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          toast.error('Edit request cancelled'); // Changed to toast.error for consistency
        }}
        entry={selectedEntry}
        onSubmit={handleSubmitEdit}
      />

      {/* View Request Modal */}
      {viewingRequest && (
        <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Edit Request Details</h3>
              <button 
                onClick={() => setViewingRequest(null)} 
                className="text-gray-500 hover:text-gray-700"
              >
                <FiX size={20} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Date</p>
                  <p>{formatDate(viewingRequest.date)}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Status</p>
                  <StatusBadge status="edit-requested" />
                </div>
              </div>
              
              <div>
                <p className="text-sm font-medium text-gray-500">Current Time</p>
                <p>{formatTimeTo12Hour(viewingRequest.currentTimeIn)} - {formatTimeTo12Hour(viewingRequest.currentTimeOut)}</p>
              </div>
              
              <div>
                <p className="text-sm font-medium text-gray-500">Requested Time</p>
                <p className="text-yellow-600">
                  {formatTimeTo12Hour(viewingRequest.requestedTimeIn)} - {formatTimeTo12Hour(viewingRequest.requestedTimeOut)}
                </p>
              </div>
              
              <div>
                <p className="text-sm font-medium text-gray-500">Reason</p>
                <p className="mt-1 p-2 bg-gray-50 rounded text-sm">
                  {viewingRequest.reason}
                </p>
              </div>
              
              <div className="flex justify-end space-x-2 pt-4">
                <button
                  onClick={() => handleCancelRequest(viewingRequest)}
                  className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-md hover:bg-red-100 transition-colors"
                >
                  <FiX size={14} />
                  <span>Cancel Request</span>
                </button>
                <button
                  onClick={() => setViewingRequest(null)}
                  className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                >
                  <span>Close</span>
                </button>
              </div>
>>>>>>> golocino
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyTimesheet;