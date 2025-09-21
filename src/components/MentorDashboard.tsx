import React, { useState, useEffect } from 'react';
import { LogOut, Users, BookOpen, TrendingUp, Award, Search, Filter, Eye, UserCheck, Clock, Star } from 'lucide-react';
import { User } from '../pages/Index';
import EmergencyContacts from './EmergencyContacts';

interface MentorDashboardProps {
  user: User;
  onLogout: () => void;
}

interface StudentData {
  id: string;
  name: string;
  email: string;
  joinDate: string;
  lastActive: string;
  progress: {
    [disaster: string]: boolean;
  };
  totalModulesCompleted: number;
  badges: string[];
  timeSpent: number; // in minutes
}

const MentorDashboard: React.FC<MentorDashboardProps> = ({ user, onLogout }) => {
  const [students, setStudents] = useState<StudentData[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<StudentData | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBy, setFilterBy] = useState<'all' | 'active' | 'inactive'>('all');
  const [currentView, setCurrentView] = useState<'overview' | 'students' | 'analytics'>('overview');

  // Mock student data - in real app, this would come from backend
  useEffect(() => {
    const mockStudents: StudentData[] = [
      {
        id: '1',
        name: 'Emma Johnson',
        email: 'emma.j@school.edu',
        joinDate: '2024-01-15',
        lastActive: '2 hours ago',
        progress: { earthquake: true, fire: true, flood: false, tornado: false, hurricane: false, firstaid: true },
        totalModulesCompleted: 3,
        badges: ['🌍', '🔥', '🏥'],
        timeSpent: 145
      },
      {
        id: '2',
        name: 'Liam Chen',
        email: 'liam.c@school.edu',
        joinDate: '2024-01-20',
        lastActive: '1 day ago',
        progress: { earthquake: true, fire: false, flood: true, tornado: true, hurricane: false, firstaid: false },
        totalModulesCompleted: 3,
        badges: ['🌍', '🌊', '🌪️'],
        timeSpent: 120
      },
      {
        id: '3',
        name: 'Sophia Davis',
        email: 'sophia.d@school.edu',
        joinDate: '2024-02-01',
        lastActive: '30 minutes ago',
        progress: { earthquake: false, fire: true, flood: false, tornado: false, hurricane: false, firstaid: true },
        totalModulesCompleted: 2,
        badges: ['🔥', '🏥'],
        timeSpent: 85
      },
      {
        id: '4',
        name: 'Noah Wilson',
        email: 'noah.w@school.edu',
        joinDate: '2024-01-10',
        lastActive: '3 hours ago',
        progress: { earthquake: true, fire: true, flood: true, tornado: true, hurricane: true, firstaid: true },
        totalModulesCompleted: 6,
        badges: ['🌍', '🔥', '🌊', '🌪️', '🌀', '🏥'],
        timeSpent: 280
      },
      {
        id: '5',
        name: 'Ava Brown',
        email: 'ava.b@school.edu',
        joinDate: '2024-02-05',
        lastActive: '5 days ago',
        progress: { earthquake: true, fire: false, flood: false, tornado: false, hurricane: true, firstaid: false },
        totalModulesCompleted: 2,
        badges: ['🌍', '🌀'],
        timeSpent: 95
      }
    ];
    setStudents(mockStudents);
  }, []);

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filterBy === 'active') {
      return matchesSearch && (student.lastActive.includes('hour') || student.lastActive.includes('minute'));
    } else if (filterBy === 'inactive') {
      return matchesSearch && student.lastActive.includes('day');
    }
    return matchesSearch;
  });

  const totalStudents = students.length;
  const activeStudents = students.filter(s => s.lastActive.includes('hour') || s.lastActive.includes('minute')).length;
  const totalModulesCompleted = students.reduce((sum, student) => sum + student.totalModulesCompleted, 0);
  const averageProgress = Math.round((totalModulesCompleted / (totalStudents * 6)) * 100);
  const totalBadges = students.reduce((sum, student) => sum + student.badges.length, 0);

  const studentStats = [
    { label: 'Total Students', value: totalStudents.toString(), change: `${activeStudents} active now`, color: 'text-blue-600' },
    { label: 'Modules Completed', value: totalModulesCompleted.toString(), change: '+12 this week', color: 'text-green-600' },
    { label: 'Average Progress', value: `${averageProgress}%`, change: '+5% this month', color: 'text-purple-600' },
    { label: 'Badges Earned', value: totalBadges.toString(), change: '+7 this week', color: 'text-yellow-600' }
  ];

  const recentActivities = [
    { student: 'Emma Johnson', activity: 'Completed Fire Safety module', time: '2 hours ago', badge: '🔥' },
    { student: 'Liam Chen', activity: 'Earned Earthquake Safety badge', time: '4 hours ago', badge: '🌍' },
    { student: 'Sophia Davis', activity: 'Started First Aid learning', time: '6 hours ago', badge: '🏥' },
    { student: 'Noah Wilson', activity: 'Completed Flood Safety quiz', time: '1 day ago', badge: '🌊' },
    { student: 'Ava Brown', activity: 'Finished Hurricane preparedness', time: '1 day ago', badge: '🌀' }
  ];

  const renderOverview = () => (
    <>
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {studentStats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                <p className="text-xs text-gray-500 mt-1">{stat.change}</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-full">
                {index === 0 && <Users className="h-6 w-6 text-blue-500" />}
                {index === 1 && <BookOpen className="h-6 w-6 text-green-500" />}
                {index === 2 && <TrendingUp className="h-6 w-6 text-purple-500" />}
                {index === 3 && <Award className="h-6 w-6 text-yellow-500" />}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8 mb-8">
        {/* Recent Student Activity */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Recent Student Activity</h3>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="text-2xl">{activity.badge}</div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{activity.student}</p>
                  <p className="text-sm text-gray-600">{activity.activity}</p>
                </div>
                <div className="text-xs text-gray-500">{activity.time}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h3>
          <div className="space-y-3">
            <button 
              onClick={() => setCurrentView('students')}
              className="w-full text-left p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors group"
            >
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-500 rounded-lg group-hover:bg-blue-600 transition-colors">
                  <Users className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">View All Students</p>
                  <p className="text-sm text-gray-600">Manage student accounts</p>
                </div>
              </div>
            </button>
            
            <button 
              onClick={() => setCurrentView('analytics')}
              className="w-full text-left p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors group"
            >
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-purple-500 rounded-lg group-hover:bg-purple-600 transition-colors">
                  <TrendingUp className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">View Analytics</p>
                  <p className="text-sm text-gray-600">Detailed progress reports</p>
                </div>
              </div>
            </button>

            <button className="w-full text-left p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors group">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-500 rounded-lg group-hover:bg-green-600 transition-colors">
                  <BookOpen className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Create Assignment</p>
                  <p className="text-sm text-gray-600">Assign learning modules</p>
                </div>
              </div>
            </button>

            <button className="w-full text-left p-4 bg-yellow-50 hover:bg-yellow-100 rounded-lg transition-colors group">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-yellow-500 rounded-lg group-hover:bg-yellow-600 transition-colors">
                  <Award className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Manage Badges</p>
                  <p className="text-sm text-gray-600">Create custom rewards</p>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </>
  );

  const renderStudentManagement = () => (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100">
      <div className="p-6 border-b border-gray-100">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h3 className="text-xl font-bold text-gray-900">Student Management</h3>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search students..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <select
              value={filterBy}
              onChange={(e) => setFilterBy(e.target.value as 'all' | 'active' | 'inactive')}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Students</option>
              <option value="active">Active Today</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="grid gap-4">
          {filteredStudents.map((student) => (
            <div key={student.id} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                    {student.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{student.name}</h4>
                    <p className="text-sm text-gray-600">{student.email}</p>
                    <div className="flex items-center space-x-4 mt-1">
                      <span className="text-xs text-gray-500">Joined: {student.joinDate}</span>
                      <span className="text-xs text-gray-500">Last active: {student.lastActive}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-6">
                  <div className="text-center">
                    <p className="text-lg font-bold text-green-600">{student.totalModulesCompleted}/6</p>
                    <p className="text-xs text-gray-500">Modules</p>
                  </div>
                  
                  <div className="flex space-x-1">
                    {student.badges.map((badge, index) => (
                      <span key={index} className="text-lg">{badge}</span>
                    ))}
                  </div>
                  
                  <div className="text-center">
                    <p className="text-sm font-medium text-gray-700">{student.timeSpent}m</p>
                    <p className="text-xs text-gray-500">Time spent</p>
                  </div>
                  
                  <button
                    onClick={() => setSelectedStudent(student)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <Eye className="h-4 w-4" />
                  </button>
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="mt-4">
                <div className="flex justify-between text-xs text-gray-600 mb-1">
                  <span>Overall Progress</span>
                  <span>{Math.round((student.totalModulesCompleted / 6) * 100)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(student.totalModulesCompleted / 6) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Learning Analytics</h3>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-700 mb-4">Module Completion Rates</h4>
            <div className="space-y-3">
              {[
                { name: 'Earthquake Safety', completed: 4, total: 5, icon: '🌍' },
                { name: 'Fire Safety', completed: 3, total: 5, icon: '🔥' },
                { name: 'First Aid', completed: 3, total: 5, icon: '🏥' },
                { name: 'Flood Safety', completed: 2, total: 5, icon: '🌊' },
                { name: 'Tornado Safety', completed: 2, total: 5, icon: '🌪️' },
                { name: 'Hurricane Safety', completed: 2, total: 5, icon: '🌀' }
              ].map((module, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">{module.icon}</span>
                    <span className="text-sm font-medium text-gray-700">{module.name}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: `${(module.completed / module.total) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-600">{module.completed}/{module.total}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-700 mb-4">Student Engagement</h4>
            <div className="space-y-4">
              <div className="p-4 bg-green-50 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <UserCheck className="h-5 w-5 text-green-600" />
                  <span className="font-medium text-green-800">High Performers</span>
                </div>
                <p className="text-sm text-green-700">2 students completed 5+ modules</p>
              </div>
              
              <div className="p-4 bg-yellow-50 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Clock className="h-5 w-5 text-yellow-600" />
                  <span className="font-medium text-yellow-800">Average Session</span>
                </div>
                <p className="text-sm text-yellow-700">25 minutes per learning session</p>
              </div>
              
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Star className="h-5 w-5 text-blue-600" />
                  <span className="font-medium text-blue-800">Most Popular</span>
                </div>
                <p className="text-sm text-blue-700">Fire Safety module (80% completion)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-green-500 to-blue-600 p-2 rounded-lg">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Mentor Dashboard</h1>
                <p className="text-sm text-gray-600">Welcome, {user.name}</p>
              </div>
            </div>
            
            {/* Navigation */}
            <div className="flex items-center space-x-4">
              <nav className="flex space-x-1">
                <button
                  onClick={() => setCurrentView('overview')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    currentView === 'overview'
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Overview
                </button>
                <button
                  onClick={() => setCurrentView('students')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    currentView === 'students'
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Students
                </button>
                <button
                  onClick={() => setCurrentView('analytics')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    currentView === 'analytics'
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Analytics
                </button>
              </nav>
              
              <button
                onClick={onLogout}
                className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-red-600 transition-colors"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentView === 'overview' && renderOverview()}
        {currentView === 'students' && renderStudentManagement()}
        {currentView === 'analytics' && renderAnalytics()}

        {/* Student Detail Modal */}
        {selectedStudent && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-900">Student Details</h3>
                <button
                  onClick={() => setSelectedStudent(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                    {selectedStudent.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900">{selectedStudent.name}</h4>
                    <p className="text-gray-600">{selectedStudent.email}</p>
                    <p className="text-sm text-gray-500">Member since {selectedStudent.joinDate}</p>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h5 className="font-semibold text-gray-700 mb-3">Module Progress</h5>
                    <div className="space-y-2">
                      {Object.entries(selectedStudent.progress).map(([disaster, completed]) => (
                        <div key={disaster} className="flex items-center justify-between">
                          <span className="text-sm capitalize">{disaster.replace('firstaid', 'first aid')}</span>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            completed ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
                          }`}>
                            {completed ? 'Completed' : 'Not Started'}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h5 className="font-semibold text-gray-700 mb-3">Achievements</h5>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {selectedStudent.badges.map((badge, index) => (
                        <span key={index} className="text-2xl p-2 bg-gray-50 rounded-lg">{badge}</span>
                      ))}
                    </div>
                    <div className="space-y-2 text-sm text-gray-600">
                      <p>Time spent learning: {selectedStudent.timeSpent} minutes</p>
                      <p>Last active: {selectedStudent.lastActive}</p>
                      <p>Completion rate: {Math.round((selectedStudent.totalModulesCompleted / 6) * 100)}%</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Emergency Contacts */}
        {currentView === 'overview' && <EmergencyContacts />}
      </div>
    </div>
  );
};

export default MentorDashboard;