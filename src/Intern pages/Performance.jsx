<<<<<<< HEAD
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
=======
import React from "react";
import { motion } from "framer-motion";
import { Circle } from "rc-progress";
import {
  Star as StarIcon,
  Users,
  TrendingUp,
  FileDown,
  Code,
  Clock,
  ThumbsUp,
  Zap,
  MessageSquare,
  Award,
} from "lucide-react";

// Sample evaluation data (mimicking evaluatedInterns from PerformanceOverview)
const evaluation = {
  id: 1,
  name: "Juan Dela Cruz",
  skills: {
    "Technical Skills": 80, // 4 stars
    "Problem Solving": 60, // 3 stars
    "Communication": 100, // 5 stars
    "Teamwork": 80, // 4 stars
    "Adaptability": 80, // 4 stars
    "Time Management": 60, // 3 stars
    "Professionalism": 80, // 4 stars
  },
  feedback: "The intern demonstrated strong technical aptitude, team collaboration, and growth mindset throughout the internship. Highly recommended for future roles.",
  supervisor: "Engr. Supervisor Name",
  readiness: 78, // Average of skill percentages
  badges: ["React Expert", "Team Player", "Fast Learner"],
  date: "2025-05-13",
};

const PerformanceFinalEvaluation = () => {
  const skills = Object.entries(evaluation.skills).map(([name, score]) => ({
    name,
    score,
  }));

  const readinessScore = evaluation.readiness;

  const getSkillIcon = (skill) => {
    switch (skill) {
      case "Technical Skills": return <Code className="w-4 h-4 text-blue-600" />;
      case "Problem Solving": return <Zap className="w-4 h-4 text-yellow-600" />;
      case "Communication": return <MessageSquare className="w-4 h-4 text-green-600" />;
      case "Teamwork": return <Users className="w-4 h-4 text-purple-600" />;
      case "Time Management": return <Clock className="w-4 h-4 text-red-600" />;
      case "Professionalism": return <Award className="w-4 h-4 text-indigo-600" />;
      default: return <TrendingUp className="w-4 h-4 text-gray-600" />;
    }
  };

  const getBadgeIcon = (badge) => {
    switch (badge) {
      case "React Expert": return <StarIcon className="w-4 h-4 text-blue-600" />;
      case "Team Player": return <Users className="w-4 h-4 text-blue-600" />;
      case "Fast Learner": return <TrendingUp className="w-4 h-4 text-blue-600" />;
      case "Punctual": return <Clock className="w-4 h-4 text-blue-600" />;
      case "Clean Coder": return <Code className="w-4 h-4 text-blue-600" />;
      case "Top Performer": return <ThumbsUp className="w-4 h-4 text-blue-600" />;
      default: return null;
>>>>>>> golocino
    }
  };

  return (
<<<<<<< HEAD
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
            <FiTrendingUp className="text-blue-500" />
            <span>Performance Dashboard</span>
=======
    <motion.div
      className="min-h-screen bg-gray-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
            <TrendingUp className="text-blue-500" />
            <span>Final Evaluation Summary - {evaluation.name}</span>
>>>>>>> golocino
          </h1>
        </div>
      </header>

<<<<<<< HEAD
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
=======
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-6">
          <h2 className="text-2xl font-bold text-gray-900 border-b pb-2">
            Performance Evaluation
          </h2>

          {/* Skills Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">Skills Assessment</h3>
            <p className="text-sm text-gray-500">
              Scores are based on supervisor star ratings (1 star = 20/100, 2 stars = 40/100, etc.).
            </p>
            {skills.map((skill, idx) => (
              <div key={idx} className="py-3 border-b border-gray-100">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <span className="flex items-center gap-2 font-medium text-gray-700">
                    {getSkillIcon(skill.name)}
                    {skill.name}
                  </span>
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-medium text-gray-600">{skill.score}/100</span>
                    <Circle
                      percent={skill.score}
                      strokeWidth={6}
                      strokeColor="#4F46E5"
                      trailColor="#E5E7EB"
                      className="w-8 h-8"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Readiness Score */}
          <div className="bg-blue-50 p-4 rounded-lg flex items-center gap-6 border border-blue-100">
            <Circle
              percent={readinessScore}
              strokeWidth={8}
              strokeColor="#10B981"
              trailColor="#E5E7EB"
              className="w-16 h-16"
            />
            <div>
              <p className="text-2xl font-bold text-green-600">{readinessScore}/100</p>
              <p className="text-sm text-gray-600">Career Readiness Score</p>
            </div>
          </div>

          {/* Supervisor Feedback */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-gray-800">Supervisor Feedback</h3>
            <p className="text-sm text-gray-700 italic">"{evaluation.feedback}"</p>
            <p className="text-xs text-right text-gray-400">– {evaluation.supervisor}</p>
          </div>

          {/* Badges */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-gray-800">Earned Badges</h3>
            <div className="flex gap-2 flex-wrap">
              {evaluation.badges.length > 0 ? (
                evaluation.badges.map((badge, i) => (
                  <span
                    key={i}
                    className="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm border border-blue-200"
                  >
                    {getBadgeIcon(badge)}
                    {badge}
                  </span>
                ))
              ) : (
                <p className="text-sm text-gray-500">No badges earned</p>
              )}
            </div>
          </div>

          {/* Export Button */}
          <div className="flex justify-end pt-4 border-t border-gray-200">
            <button
              onClick={() => window.print()}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg flex items-center gap-2 shadow-sm"
            >
              <FileDown className="w-4 h-4" />
              Export PDF Report
            </button>
          </div>
        </div>
      </main>
    </motion.div>
  );
};

export default PerformanceFinalEvaluation;
>>>>>>> golocino
