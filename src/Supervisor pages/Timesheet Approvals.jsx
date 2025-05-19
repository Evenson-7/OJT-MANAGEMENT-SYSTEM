import { useState } from 'react';
import { FiDownload, FiChevronLeft, FiChevronRight, FiCalendar, FiClock, FiCheck, FiX, FiEye } from 'react-icons/fi';
import { toast } from 'react-hot-toast';

function TimesheetApprovals() {
  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 6;
  const [viewingRequest, setViewingRequest] = useState(null);
  const [requests, setRequests] = useState([
    { 
      id: 1, 
      employee: 'John Doe', 
      date: '4/18/2025', 
      currentTimeIn: '08:00', 
      currentTimeOut: '17:00', 
      requestedTimeIn: '09:00', 
      requestedTimeOut: '18:00', 
      reason: 'Had a doctor appointment in the morning', 
      status: 'pending', 
      submittedAt: '2025-04-18T10:30:00Z' 
    },
    { 
      id: 2, 
      employee: 'Jane Smith', 
      date: '4/17/2025', 
      currentTimeIn: '08:15', 
      currentTimeOut: '17:30', 
      requestedTimeIn: '08:15', 
      requestedTimeOut: '19:30', 
      reason: 'Needed to stay late to finish project', 
      status: 'pending', 
      submittedAt: '2025-04-17T18:45:00Z' 
    },
  ]);

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

  const StatusBadge = ({ status }) => {
    const statusClasses = {
      approved: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800',
      pending: 'bg-yellow-100 text-yellow-800'
    };
    
    const statusText = {
      approved: 'Approved',
      rejected: 'Rejected',
      pending: 'Pending Review'
    };
    
    return (
      <span className={`text-xs px-2 py-1 rounded-full ${statusClasses[status]}`}>
        {statusText[status]}
      </span>
    );
  };

  const handleApprove = (requestId) => {
    if (window.confirm('Are you sure you want to approve this request?')) {
      setRequests(requests.map(req => 
        req.id === requestId ? { ...req, status: 'approved' } : req
      ));
      toast.success('Timesheet request has been approved');
      setViewingRequest(null);
    }
  };

  const handleReject = (requestId) => {
    if (window.confirm('Are you sure you want to reject this request?')) {
      setRequests(requests.map(req => 
        req.id === requestId ? { ...req, status: 'rejected' } : req
      ));
      toast.success('Timesheet request has been rejected');
      setViewingRequest(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
            <FiClock className="text-blue-500" />
            <span>Timesheet Approvals</span>
          </h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <div>
              <h2 className="text-lg font-medium text-gray-900">Edit Requests</h2>
              <p className="text-sm text-gray-500">
                {requests.filter(r => r.status === 'pending').length > 0 ? (
                  `You have ${requests.filter(r => r.status === 'pending').length} request${requests.filter(r => r.status === 'pending').length !== 1 ? 's' : ''} pending approval`
                ) : (
                  'All requests have been processed'
                )}
              </p>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors shadow-sm">
              <FiDownload size={16} />
              <span>Export</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current Time</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Requested Time</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {requests.map((request) => (
                  <tr key={request.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {request.employee}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(request.date)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatTimeTo12Hour(request.currentTimeIn)} - {formatTimeTo12Hour(request.currentTimeOut)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-purple-600">
                      {formatTimeTo12Hour(request.requestedTimeIn)} - {formatTimeTo12Hour(request.requestedTimeOut)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusBadge status={request.status} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <div className="flex gap-2">
                        <button
                          onClick={() => setViewingRequest(request)}
                          className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100 transition-colors"
                          title="View request details"
                        >
                          <FiEye size={14} />
                          <span>View</span>
                        </button>
                        {request.status === 'pending' && (
                          <>
                            <button
                              onClick={() => handleApprove(request.id)}
                              className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-green-600 bg-green-50 rounded-md hover:bg-green-100 transition-colors"
                              title="Approve request"
                            >
                              <FiCheck size={14} />
                              <span>Approve</span>
                            </button>
                            <button
                              onClick={() => handleReject(request.id)}
                              className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-md hover:bg-red-100 transition-colors"
                              title="Reject request"
                            >
                              <FiX size={14} />
                              <span>Reject</span>
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

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
                  <p className="text-sm font-medium text-gray-500">Employee</p>
                  <p>{viewingRequest.employee}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Date</p>
                  <p>{formatDate(viewingRequest.date)}</p>
                </div>
              </div>
              
              <div>
                <p className="text-sm font-medium text-gray-500">Current Time</p>
                <p>{formatTimeTo12Hour(viewingRequest.currentTimeIn)} - {formatTimeTo12Hour(viewingRequest.currentTimeOut)}</p>
              </div>
              
              <div>
                <p className="text-sm font-medium text-gray-500">Requested Time</p>
                <p className="text-purple-600">
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
                {viewingRequest.status === 'pending' && (
                  <>
                    <button
                      onClick={() => handleReject(viewingRequest.id)}
                      className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-md hover:bg-red-100 transition-colors"
                    >
                      <FiX size={14} />
                      <span>Reject</span>
                    </button>
                    <button
                      onClick={() => handleApprove(viewingRequest.id)}
                      className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-green-600 bg-green-50 rounded-md hover:bg-green-100 transition-colors"
                    >
                      <FiCheck size={14} />
                      <span>Approve</span>
                    </button>
                  </>
                )}
                <button
                  onClick={() => setViewingRequest(null)}
                  className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                >
                  <span>Close</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TimesheetApprovals;