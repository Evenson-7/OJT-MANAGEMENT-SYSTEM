import { FiX, FiCalendar, FiClock, FiInfo } from 'react-icons/fi';

const ViewLeaveRequest = ({ request, onClose }) => {
  if (!request) return null;

  return (
    <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="flex justify-between items-center border-b border-gray-200 p-4">
          <h3 className="text-lg font-semibold text-gray-900">Leave Request Details</h3>
          <button 
            onClick={() => onClose({ isViewing: true })}
            className="text-gray-400 hover:text-gray-500"
            aria-label="Close modal"
          >
            <FiX size={20} />
          </button>
        </div>
        
        <div className="p-4 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-500">Leave Type</p>
              <p className="text-sm text-gray-900 mt-1">{request.type}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Status</p>
              <p className="text-sm text-gray-900 mt-1">{request.status}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-500">Start Date</p>
              <p className="text-sm text-gray-900 mt-1">{request.from}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">End Date</p>
              <p className="text-sm text-gray-900 mt-1">{request.to}</p>
            </div>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-500">Duration</p>
            <p className="text-sm text-gray-900 mt-1">{request.duration}</p>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-500">Reason</p>
            <p className="text-sm text-gray-900 mt-1 whitespace-pre-line">{request.reason}</p>
          </div>

          {request.contactInfo && (
            <div>
              <p className="text-sm font-medium text-gray-500">Contact Information</p>
              <p className="text-sm text-gray-900 mt-1">{request.contactInfo}</p>
            </div>
          )}

          <div className="flex justify-end pt-4 border-t border-gray-200">
            <button
              onClick={() => onClose({ isViewing: true })}
              className="px-4 py-2 bg-blue-600 rounded-md text-sm font-medium text-white hover:bg-blue-700"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewLeaveRequest;