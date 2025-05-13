import { useState } from 'react';
import { FiDownload, FiChevronDown, FiTrendingUp, FiCheck, FiClock, FiUser, FiAward, FiBarChart2, FiStar } from 'react-icons/fi';

function Performance() {
  const [selectedPeriod, setSelectedPeriod] = useState('This Month');
  const [selectedMetric, setSelectedMetric] = useState('Overall');
  
  // Sample performance data
  const performanceData = [
    {
      taskName: "Database Migration",
      assignedDate: "April 12, 2025",
      dueDate: "April 18, 2025",
      completionDate: "April 17, 2025",
      status: "Completed",
      efficiency: 85,
      quality: 90,
      teamwork: 88,
      overall: 88
    },
    {
      taskName: "UI Design Implementation",
      assignedDate: "April 5, 2025",
      dueDate: "April 15, 2025",
      completionDate: "April 14, 2025",
      status: "Completed",
      efficiency: 92,
      quality: 95,
      teamwork: 85,
      overall: 91
    },
    {
      taskName: "API Integration",
      assignedDate: "March 28, 2025",
      dueDate: "April 10, 2025",
      completionDate: "April 8, 2025",
      status: "Completed",
      efficiency: 95,
      quality: 88,
      teamwork: 90,
      overall: 91
    },
    {
      taskName: "User Authentication System",
      assignedDate: "April 18, 2025",
      dueDate: "April 25, 2025",
      completionDate: null,
      status: "In Progress",
      efficiency: null,
      quality: null,
      teamwork: null,
      overall: null
    },
    {
      taskName: "Regression Testing",
      assignedDate: "April 20, 2025",
      dueDate: "April 28, 2025",
      completionDate: null,
      status: "In Progress",
      efficiency: null,
      quality: null,
      teamwork: null,
      overall: null
    }
  ];

  // Calculate average scores
  const calculateAverages = () => {
    const completedTasks = performanceData.filter(task => task.status === "Completed");
    if (completedTasks.length === 0) return { efficiency: 0, quality: 0, teamwork: 0, overall: 0 };
    
    const sum = completedTasks.reduce((acc, task) => ({
      efficiency: acc.efficiency + task.efficiency,
      quality: acc.quality + task.quality,
      teamwork: acc.teamwork + task.teamwork,
      overall: acc.overall + task.overall
    }), { efficiency: 0, quality: 0, teamwork: 0, overall: 0 });
    
    return {
      efficiency: Math.round(sum.efficiency / completedTasks.length),
      quality: Math.round(sum.quality / completedTasks.length),
      teamwork: Math.round(sum.teamwork / completedTasks.length),
      overall: Math.round(sum.overall / completedTasks.length)
    };
  };
  
  const averages = calculateAverages();

  // Helper function to determine score color
  const getScoreColor = (score) => {
    if (!score && score !== 0) return "bg-gray-200";
    if (score >= 90) return "bg-green-500";
    if (score >= 80) return "bg-blue-500";
    if (score >= 70) return "bg-yellow-500";
    return "bg-red-500";
  };

  // Get metric icon
  const getMetricIcon = (metric) => {
    switch (metric.toLowerCase()) {
      case 'overall': return <FiTrendingUp />;
      case 'efficiency': return <FiBarChart2 />;
      case 'quality': return <FiStar />;
      case 'teamwork': return <FiAward />;
      default: return <FiTrendingUp />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
            <FiTrendingUp className="text-blue-500" />
            <span>Performance Dashboard</span>
          </h1>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <div className="relative w-full sm:w-48">
              <select 
                className="appearance-none w-full bg-white border border-gray-300 rounded-md pl-3 pr-8 py-2 text-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
              >
                <option>This Week</option>
                <option>This Month</option>
                <option>Last 3 Months</option>
                <option>All Time</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <FiChevronDown size={16} />
              </div>
            </div>
            
            <div className="relative w-full sm:w-48">
              <select 
                className="appearance-none w-full bg-white border border-gray-300 rounded-md pl-3 pr-8 py-2 text-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={selectedMetric}
                onChange={(e) => setSelectedMetric(e.target.value)}
              >
                <option>Overall</option>
                <option>Efficiency</option>
                <option>Quality</option>
                <option>Teamwork</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <FiChevronDown size={16} />
              </div>
            </div>
          </div>
          
          <button className="w-full sm:w-auto flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
            <FiDownload size={16} />
            <span>Download Report</span>
          </button>
        </div>
        
        {/* Performance Summary */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6 overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              {getMetricIcon(selectedMetric)}
              <span>Performance Summary</span>
            </h2>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <PerformanceCard 
                label="Overall Score" 
                score={averages.overall} 
                colorClass={getScoreColor(averages.overall)}
                icon={<FiTrendingUp size={20} />}
              />
              <PerformanceCard 
                label="Efficiency" 
                score={averages.efficiency} 
                colorClass={getScoreColor(averages.efficiency)}
                icon={<FiBarChart2 size={20} />}
              />
              <PerformanceCard 
                label="Quality" 
                score={averages.quality} 
                colorClass={getScoreColor(averages.quality)}
                icon={<FiStar size={20} />}
              />
              <PerformanceCard 
                label="Teamwork" 
                score={averages.teamwork} 
                colorClass={getScoreColor(averages.teamwork)}
                icon={<FiAward size={20} />}
              />
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between text-sm text-gray-600">
                <span>{selectedMetric} Score</span>
                <span>{averages[selectedMetric.toLowerCase()]}%</span>
              </div>
              <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-blue-500 transition-all duration-500" 
                  style={{ width: `${averages[selectedMetric.toLowerCase()]}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-xs text-gray-500">
                <span>0%</span>
                <span>25%</span>
                <span>50%</span>
                <span>75%</span>
                <span>100%</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Task Performance Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-4 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <h2 className="text-lg font-semibold text-gray-900">Task Performance</h2>
            <div className="flex items-center gap-3 text-sm">
              <span className="flex items-center gap-1 text-green-600">
                <FiCheck size={14} />
                <span>{performanceData.filter(task => task.status === "Completed").length} completed</span>
              </span>
              <span className="flex items-center gap-1 text-blue-600">
                <FiClock size={14} />
                <span>{performanceData.filter(task => task.status === "In Progress").length} in progress</span>
              </span>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Task Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Timeline
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Efficiency
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Quality
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Teamwork
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Overall
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {performanceData.map((task, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">{task.taskName}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{task.assignedDate}</div>
                      <div className="text-xs text-gray-500">Due: {task.dueDate}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusBadge status={task.status} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <ScoreBadge score={task.efficiency} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <ScoreBadge score={task.quality} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <ScoreBadge score={task.teamwork} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <ScoreBadge score={task.overall} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

function PerformanceCard({ label, score, colorClass, icon }) {
  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{label}</p>
          <p className="text-2xl font-semibold mt-1">
            {score !== null ? score : '-'}
          </p>
        </div>
        <div className={`p-3 rounded-full ${colorClass} text-white`}>
          {icon}
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  const getStatusStyles = () => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'In Progress':
        return 'bg-blue-100 text-blue-800';
      case 'Overdue':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusStyles()}`}>
      {status}
    </span>
  );
}

function ScoreBadge({ score }) {
  if (!score && score !== 0) {
    return <span className="text-gray-400">-</span>;
  }
  
  const getScoreStyles = () => {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-blue-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };
  
  return (
    <span className={`font-medium ${getScoreStyles()}`}>
      {score}
    </span>
  );
}

export default Performance;