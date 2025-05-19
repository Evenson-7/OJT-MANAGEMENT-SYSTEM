import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast'; // 🆕 Add Toaster import
import LoginManagement from './Login management';
import InternLayout from './Intern pages/Intern Layout';
import InternDashboard from './Intern pages/Interns Dashboard';
import MyTimesheet from './Intern pages/My Timesheet';
import DailyReport from './Intern pages/Daily Report';
import LeaveManagement from './Intern pages/Leave Management';
import Performance from './Intern pages/Performance';
import SupervisorDashboard from './Supervisor pages/Supervisor Dashboard';
import SupervisorLayout from './Supervisor pages/Supervisor Layout';
<<<<<<< HEAD
import ManageInterns from './Supervisor pages/Manage Interns';
import TimesheetApprovals from './Supervisor pages/Timesheet Approvals';
import LeaveApprovals from './Supervisor pages/Leave Approvals';
import ReportApprovals from './Supervisor pages/Report Approvals';
import PerformanceOverview from './Supervisor pages/Performance Overview';
=======
>>>>>>> db7fdd23ea17068309846d732c4bd7f9cbad7e3a

const App = () => {
  const isAuthenticated = () => {
    return localStorage.getItem('currentUser') !== null;
  };

  const getUserRole = () => {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    return user ? user.role : null;
  };

  return (
    <Router>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<LoginManagement />} />
        <Route 
          path="/intern" 
          element={
            isAuthenticated() && getUserRole() === 'intern' ? 
            <InternLayout /> : 
            <Navigate to="/" replace />
          }
        >
          <Route index element={<InternDashboard />} />
          <Route path="dashboard" element={<InternDashboard />} />
          <Route path="my-timesheet" element={<MyTimesheet />} />
          <Route path="daily-reports" element={<DailyReport />} />
          <Route path="leave-management" element={<LeaveManagement />} />
          <Route path="performance" element={<Performance />} />
        </Route>
        <Route 
          path="/supervisor" 
          element={
            isAuthenticated() && getUserRole() === 'supervisor' ? 
            <SupervisorLayout /> : 
            <Navigate to="/" replace />
          }
        >
          <Route index element={<SupervisorDashboard />} />
          <Route path="dashboard" element={<SupervisorDashboard />} />
<<<<<<< HEAD
          <Route path="manage-interns" element={<ManageInterns />} />
          <Route path="timesheet-approvals" element={<TimesheetApprovals />} />
          <Route path="leave-approvals" element={<LeaveApprovals />} />
          <Route path="report-approvals" element={<ReportApprovals />} />
          <Route path="performance-overview" element={<PerformanceOverview />} />
=======
          {/* Future supervisor routes */}
>>>>>>> db7fdd23ea17068309846d732c4bd7f9cbad7e3a
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
