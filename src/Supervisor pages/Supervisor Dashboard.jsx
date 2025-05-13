// src/pages/supervisor/Dashboard.jsx
import { BarChart2, Users, Clipboard, Clock } from 'lucide-react';

const SupervisorDashboard = () => {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  return (
    <div className="p-4 md:px-8 md:py-6 w-full max-w-none">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 w-full">
        <h3 className="text-xl font-medium text-gray-700">Welcome, {currentUser?.name}</h3>
        <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white">
          {currentUser?.name.split(' ').map(n => n[0]).join('')}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 w-full">
        <div className="bg-blue-500 rounded-lg p-4 md:p-6 text-white">
          <h2 className="text-xl md:text-2xl font-bold">12</h2>
          <p className="text-sm">Active Interns</p>
        </div>
        <div className="bg-green-500 rounded-lg p-4 md:p-6 text-white">
          <h2 className="text-xl md:text-2xl font-bold">7</h2>
          <p className="text-sm">Pending Approvals</p>
        </div>
        <div className="bg-purple-500 rounded-lg p-4 md:p-6 text-white">
          <h2 className="text-xl md:text-2xl font-bold">3</h2>
          <p className="text-sm">Leave Requests</p>
        </div>
        <div className="bg-yellow-500 rounded-lg p-4 md:p-6 text-white">
          <h2 className="text-xl md:text-2xl font-bold">24</h2>
          <p className="text-sm">Tasks Assigned</p>
        </div>
      </div>

      {/* Real-time Monitoring */}
      <div className="bg-white rounded-lg p-4 shadow w-full mb-6">
        <h3 className="text-lg font-medium text-gray-700 mb-4">Real-time Monitoring</h3>
        <div className="flex flex-wrap gap-4 mb-4">
          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Timesheet Approval</span>
          <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">Leave Management</span>
          <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">Evaluations</span>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Intern</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time In</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current Task</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {[
                { id: 'JD', name: 'John Doe', status: 'Active', timeIn: '8:02 AM', task: 'Database Setup' },
                { id: 'AS', name: 'Amy Smith', status: 'Late', timeIn: '9:15 AM', task: 'UI Design' },
                { id: 'MP', name: 'Mike Parker', status: 'Active', timeIn: '8:30 AM', task: 'API Testing' },
                { id: 'SR', name: 'Sara Reed', status: 'Absent', timeIn: '-', task: '-' },
                { id: 'TB', name: 'Tom Brown', status: 'Overtime', timeIn: '8:00 AM', task: 'Report Writing' },
              ].map((intern) => (
                <tr key={intern.id}>
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
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      intern.status === 'Active' ? 'bg-green-100 text-green-800' :
                      intern.status === 'Late' ? 'bg-yellow-100 text-yellow-800' :
                      intern.status === 'Absent' ? 'bg-red-100 text-red-800' :
                      'bg-purple-100 text-purple-800'
                    }`}>
                      {intern.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{intern.timeIn}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{intern.task}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900">View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SupervisorDashboard;