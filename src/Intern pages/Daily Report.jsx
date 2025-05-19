import { toast, Toaster } from 'react-hot-toast';
import { useState, useEffect } from 'react';
import { FiPlus, FiChevronDown, FiEye, FiEdit2, FiFileText, FiCheck, FiAlertCircle } from 'react-icons/fi';
import NewReportModal from "../Modals/New Report Modal";

function DailyReport() {
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingReport, setEditingReport] = useState(null);
  const [viewingReport, setViewingReport] = useState(null);
  const [tasks, setTasks] = useState([
    { id: 1, text: "Meeting with supervisor to discuss project requirements", completed: false, time: "9:30 AM" },
    { id: 2, text: "Fix the computer", completed: true, time: "11:45 AM" },
    { id: 3, text: "Prepare weekly presentation slides", completed: false, time: "2:15 PM" },
    { id: 4, text: "Update project documentation", completed: true, time: "3:30 PM" },
  ]);
  
  const [reports, setReports] = useState([
    { 
      day: 5, 
      date: 'April 18, 2025', 
      status: 'Pending',
      tasksCompleted: 4,
      hoursWorked: 5,
      summary: 'Attended training session and worked on personal project.',
      challenges: 'Training took longer than expected.',
      plans: 'Will catch up on missed work tomorrow.',
      selectedTasks: []
    },
    { 
      day: 4, 
      date: 'April 17, 2025', 
      status: 'Pending',
      tasksCompleted: 6,
      hoursWorked: 7,
      summary: 'Refactored legacy code and improved performance.',
      challenges: 'Legacy code was poorly documented.',
      plans: 'Will continue refactoring and add documentation.',
      selectedTasks: []
    },
    { 
      day: 3, 
      date: 'April 16, 2025', 
      status: 'Pending',
      tasksCompleted: 7,
      hoursWorked: 7.5,
      summary: 'Implemented new features and wrote documentation.',
      challenges: 'None',
      plans: 'Will review code with team lead.',
      selectedTasks: [
        { id: 4, text: "Update project documentation", completed: true, time: "3:30 PM" }
      ]
    },
    { 
      day: 2, 
      date: 'April 15, 2025', 
      status: 'Improve',
      tasksCompleted: 5,
      hoursWorked: 6,
      summary: 'Worked on frontend components and fixed some bugs.',
      challenges: 'Some components were not responsive on mobile devices.',
      plans: 'Will focus on mobile responsiveness tomorrow.',
      selectedTasks: [
        { id: 3, text: "Prepare weekly presentation slides", completed: false, time: "2:15 PM" }
      ]
    },
    { 
      day: 1, 
      date: 'April 14, 2025', 
      status: 'Approved',
      tasksCompleted: 8,
      hoursWorked: 8.5,
      summary: 'Completed all assigned tasks and attended team meeting.',
      challenges: 'Had some issues with the database connection.',
      plans: 'Will work on optimizing the database queries.',
      selectedTasks: [
        { id: 1, text: "Meeting with supervisor to discuss project requirements", completed: false, time: "9:30 AM" },
        { id: 2, text: "Fix the computer", completed: true, time: "11:45 AM" }
      ]
    }
  ].sort((a, b) => b.day - a.day));

  const openModal = () => {
    setEditingReport(null);
    setViewingReport(null);
    setIsModalOpen(true);
  };

  const closeModal = ({ wasSubmitted = false, isViewing = false } = {}) => {
    setIsModalOpen(false);
    setEditingReport(null);
    setViewingReport(null);
    if (!wasSubmitted && !isViewing) {
      toast.error('Report submission cancelled');
    }
  };

  const handleSubmitReport = (formData) => {
    const dateObj = new Date(formData.date);
    if (isNaN(dateObj.getTime())) {
      throw new Error('Invalid date provided');
    }

    const options = { month: 'long', day: 'numeric', year: 'numeric' };
    const formattedDate = dateObj.toLocaleDateString('en-US', options);
    
    const selectedTaskDetails = formData.selectedTasks.map(taskId => 
      tasks.find(task => task.id === taskId)
    ).filter(Boolean);

    const exactTasksCount = selectedTaskDetails.length;
    
    if (editingReport) {
      const updatedReports = reports.map(report => 
        report.day === editingReport.day ? {
          ...report,
          date: formattedDate,
          tasksCompleted: exactTasksCount,
          hoursWorked: parseFloat(formData.hoursWorked),
          summary: formData.summary,
          challenges: formData.challenges,
          plans: formData.plans,
          selectedTasks: selectedTaskDetails
        } : report
      ).sort((a, b) => b.day - a.day);
      setReports(updatedReports);
      toast.success('Report successfully updated!');
    } else {
      const newDay = reports.length > 0 ? Math.max(...reports.map(r => r.day)) + 1 : 1;
      const newReport = {
        day: newDay,
        date: formattedDate,
        status: 'Pending',
        tasksCompleted: exactTasksCount,
        hoursWorked: parseFloat(formData.hoursWorked),
        summary: formData.summary,
        challenges: formData.challenges,
        plans: formData.plans,
        selectedTasks: selectedTaskDetails
      };
      setReports([newReport, ...reports].sort((a, b) => b.day - a.day));
      toast.success('New report successfully created!');
    }
  };

  const handleEditReport = (report) => {
    const formattedDate = new Date(report.date).toISOString().split('T')[0];
    setEditingReport({
      ...report,
      date: formattedDate,
      selectedTasks: report.selectedTasks.map(task => task.id)
    });
    setViewingReport(null);
    setIsModalOpen(true);
  };

  const handleViewReport = (report) => {
    setViewingReport(report);
    setEditingReport(null);
    setIsModalOpen(true);
  };

  const filteredReports = statusFilter === 'All Status' 
    ? reports 
    : reports.filter(report => report.status === statusFilter);

  const totalReports = reports.length;
  const approvedReports = reports.filter(r => r.status === 'Approved').length;
  const pendingReports = reports.filter(r => r.status === 'Pending').length;

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster />
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
            <FiFileText className="text-blue-500" />
            <span>Daily Reports</span>
          </h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
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
          
          <button 
            onClick={openModal}
            className="w-full sm:w-auto flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
          >
            <FiPlus size={16} />
            <span>New Report</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <SummaryCard 
            count={totalReports} 
            label="Total Reports" 
            icon={<FiFileText className="text-blue-500" size={24} />}
            bgColor="bg-blue-50"
            textColor="text-blue-800"
          />
          <SummaryCard 
            count={approvedReports} 
            label="Approved" 
            icon={<FiCheck className="text-green-500" size={24} />}
            bgColor="bg-green-50"
            textColor="text-green-800"
          />
          <SummaryCard 
            count={pendingReports} 
            label="Pending Review" 
            icon={<FiAlertCircle className="text-yellow-500" size={24} />}
            bgColor="bg-yellow-50"
            textColor="text-yellow-800"
          />
        </div>

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
                selectedTasks={report.selectedTasks}
                onEdit={() => handleEditReport(report)}
                onView={() => handleViewReport(report)}
              />
            ))
          )}
        </div>
      </main>

      <NewReportModal 
        isOpen={isModalOpen} 
        onClose={closeModal} 
        onSubmit={handleSubmitReport}
        tasks={tasks}
        reportToEdit={editingReport}
        reportToView={viewingReport}
      />
    </div>
  );
}

function SummaryCard({ count, label, icon, bgColor, textColor }) {
  return (
    <div className={`${bgColor} p-4 rounded-lg shadow-sm border border-gray-100`}>
      <div className="flex items-center justify-between">
        <div>
          <p className={`text-sm font-medium ${textColor}`}>{label}</p>
          <p className={`text-2xl font-semibold mt-1 ${textColor}`}>{count}</p>
        </div>
        <div className="p-2 rounded-full bg-white">
          {icon}
        </div>
      </div>
    </div>
  );
}

function ReportCard({ day, date, status, tasksCompleted, hoursWorked, selectedTasks = [], onEdit, onView }) {
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
          
          {selectedTasks && selectedTasks.length > 0 && (
            <div className="mt-2 text-xs text-gray-500">
              <div className="font-medium mb-1">Tasks included:</div>
              <ul className="list-disc pl-5 space-y-1">
                {selectedTasks.slice(0, 2).map((task, index) => (
                  <li key={index}>{task.text}</li>
                ))}
                {selectedTasks.length > 2 && (
                  <li>and {selectedTasks.length - 2} more...</li>
                )}
              </ul>
            </div>
          )}
        </div>
        
        <div className="flex gap-2">
          {status !== 'Approved' && (
            <button 
              onClick={onEdit}
              className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100 transition-colors"
            >
              <FiEdit2 size={14} />
              <span className="hidden sm:inline">Edit</span>
            </button>
          )}
          
          <button 
            onClick={onView}
            className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100 transition-colors"
          >
            <FiEye size={14} />
            <span className="hidden sm:inline">View</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default DailyReport;