import { useState } from 'react';
import { Clock, FileText, Calendar, BarChart2, Check, Menu, ChevronLeft } from 'lucide-react';

export default function TimesheetDashboard() {
  const [taskNote, setTaskNote] = useState('');
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [tasks, setTasks] = useState([
    { id: 1, text: "Meeting with supervisor to discuss project requirements", completed: false, time: "9:30 AM" },
    { id: 2, text: "Fix the computer", completed: true, time: "11:45 AM" },
  ]);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const addTask = () => {
    if (taskNote.trim() !== '') {
      const newTask = {
        id: tasks.length + 1,
        text: taskNote,
        completed: false,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
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

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-gray-100">
      {/* Sidebar */}
      <div
        className={`transition-all duration-300 ease-in-out bg-gray-800 text-white flex flex-col ${
          isSidebarOpen ? 'w-64' : 'w-16'
        }`}
      >
        <div className={`p-4 bg-gray-900 font-bold text-lg flex items-center ${isSidebarOpen ? 'justify-between' : 'justify-center'}`}>
          {isSidebarOpen && <span>OJT MANAGER</span>}
          <button
            onClick={toggleSidebar}
            className="text-gray-300 hover:text-white focus:outline-none flex-shrink-0"
          >
            {isSidebarOpen ? <ChevronLeft size={20} /> : <Menu size={20} />}
          </button>
        </div>
        <nav className="flex-1">
          <div className="bg-blue-500 p-4 text-white flex items-center">
            {isSidebarOpen ? (
              <span className="truncate">Dashboard</span>
            ) : (
              <div className="mx-auto">
                <BarChart2 size={20} />
              </div>
            )}
          </div>
          {[
            { icon: Clock, label: 'My Timesheet' },
            { icon: FileText, label: 'Daily Reports' },
            { icon: Calendar, label: 'Leave Management' },
            { icon: BarChart2, label: 'Performance' }
          ].map(({ icon: Icon, label }, idx) => (
            <div key={idx} className="hover:bg-gray-700 p-4 flex items-center cursor-pointer">
              {isSidebarOpen ? (
                <div className="flex items-center">
                  <Icon size={18} className="mr-2 flex-shrink-0" />
                  <span className="truncate">{label}</span>
                </div>
              ) : (
                <div className="mx-auto">
                  <Icon size={20} />
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 w-full overflow-auto">
        <div className="p-4 md:px-8 md:py-6 w-full max-w-none">
          {/* Header */}
          <div className="flex justify-between items-center mb-6 w-full">
            <h3 className="text-xl font-medium text-gray-700">Intern Dashboard</h3>
            <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white">
              JD
            </div>
          </div>

          {/* Time Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 w-full">
            <div className="bg-green-500 rounded-lg p-4 md:p-6 text-white text-center">
              <h2 className="text-xl md:text-2xl font-bold">TIME IN</h2>
              <p className="text-sm">Current Time: 8:45 AM</p>
            </div>
            <div className="bg-red-500 rounded-lg p-4 md:p-6 text-white text-center">
              <h2 className="text-xl md:text-2xl font-bold">TIME OUT</h2>
              <p className="text-sm">Current Time: 00:00 PM</p>
            </div>
            <div className="bg-yellow-500 rounded-lg p-4 md:p-6 text-white text-center flex items-center justify-center">
              <h2 className="text-base md:text-lg font-medium">Request Timesheet Edit</h2>
            </div>
            <div className="bg-purple-500 rounded-lg p-4 md:p-6 text-white text-center flex items-center justify-center">
              <h2 className="text-base md:text-lg font-medium">File a Leave</h2>
            </div>
          </div>

          {/* Status + QR Code */}
          <div className="flex flex-col md:flex-row gap-4 mb-6 w-full">
            <div className="bg-white rounded-lg p-4 shadow w-full md:w-2/3">
              <h3 className="text-sm text-gray-500 mb-2">Today's Status</h3>
              <h2 className="text-xl font-bold text-gray-700">Not Checked In</h2>
              <p className="text-gray-500 text-sm">Expected Hours: 8:00 AM - 05:00 PM</p>
            </div>
            <div className="bg-blue-500 rounded-lg p-4 shadow text-white w-full md:w-2/3">
              <div className="text-center">
                <p className="mb-2">View My QR Code</p>
                <div className="bg-white rounded p-4 w-32 h-32 mx-auto grid grid-cols-3 gap-2">
                  {[...Array(9)].map((_, i) => (
                    <div key={i} className="bg-blue-500 rounded-sm"></div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Tabs with spacing */}
          <div className="flex flex-wrap gap-2 mb-4 w-full">
            <div className="px-4 py-2 md:px-6 md:py-3 bg-blue-500 text-white rounded-lg text-sm md:text-base">Task Notes</div>
            <div className="px-4 py-2 md:px-6 md:py-3 bg-gray-200 text-gray-700 rounded-lg text-sm md:text-base">My Timesheet</div>
            <div className="px-4 py-2 md:px-6 md:py-3 bg-gray-200 text-gray-700 rounded-lg text-sm md:text-base">Daily Reports</div>
            <div className="px-4 py-2 md:px-6 md:py-3 bg-gray-200 text-gray-700 rounded-lg text-sm md:text-base">Performance</div>
          </div>

          {/* Task Section */}
          <div className="bg-white rounded-lg p-4 shadow w-full">
            {/* Task Input - Updated to match image styling */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                addTask();
              }}
              className="mb-6"
            >
              <input
                type="text"
                placeholder="Add a new task note..."
                className="w-full p-4 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={taskNote}
                onChange={(e) => setTaskNote(e.target.value)}
              />
            </form>

            <h3 className="font-medium text-gray-700 text-2xl mb-4">Today's Tasks</h3>

            {/* Updated task list to match the image */}
            <div className="space-y-4">
              {tasks.map((task) => (
                <div key={task.id} className="bg-gray-50 rounded-lg p-4 flex items-center">
                  <button
                    onClick={() => toggleTaskCompletion(task.id)}
                    className={`w-8 h-8 rounded-full flex items-center justify-center mr-4 flex-shrink-0 ${
                      task.completed ? 'bg-green-500' : 'bg-gray-200'
                    }`}
                  >
                    {task.completed && <Check size={24} className="text-white" />}
                  </button>
                  <div className="flex-1">
                    <span className={`text-lg ${task.completed ? 'text-gray-400 line-through' : 'text-gray-700'}`}>
                      {task.text}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}