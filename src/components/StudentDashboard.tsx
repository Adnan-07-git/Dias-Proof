import React from 'react';
import { LogOut, Star, Trophy, Phone, AlertCircle, MapPin } from 'lucide-react';
import { User, Progress, QuizScore } from '../pages/Index';
import DisasterCard from './DisasterCard';
import EmergencyContacts from './EmergencyContacts';

interface StudentDashboardProps {
  user: User;
  progress: Progress;
  quizScores: QuizScore;
  onStartLearning: (disaster: string) => void;
  onLogout: () => void;
}

const disasters = [
  {
    id: 'earthquake',
    name: 'Earthquake',
    description: 'Learn how to stay safe during earthquakes',
    icon: '🌍',
    color: 'from-orange-400 to-red-500',
    image: 'https://images.pexels.com/photos/1462935/pexels-photo-1462935.jpeg?auto=compress&cs=tinysrgb&w=500'
  },
  {
    id: 'fire',
    name: 'Fire Safety',
    description: 'Understanding fire prevention and escape routes',
    icon: '🔥',
    color: 'from-red-400 to-orange-600',
    image: 'https://images.pexels.com/photos/266487/pexels-photo-266487.jpeg?auto=compress&cs=tinysrgb&w=500'
  },
  {
    id: 'flood',
    name: 'Flood',
    description: 'Water safety and flood preparedness',
    icon: '🌊',
    color: 'from-blue-400 to-cyan-500',
    image: 'https://images.pexels.com/photos/552779/pexels-photo-552779.jpeg?auto=compress&cs=tinysrgb&w=500'
  },
  {
    id: 'tornado',
    name: 'Tornado',
    description: 'Severe weather safety and shelter procedures',
    icon: '🌪️',
    color: 'from-gray-400 to-blue-600',
    image: 'https://images.pexels.com/photos/1446076/pexels-photo-1446076.jpeg?auto=compress&cs=tinysrgb&w=500'
  },
  {
    id: 'hurricane',
    name: 'Hurricane',
    description: 'Storm preparation and evacuation planning',
    icon: '🌀',
    color: 'from-teal-400 to-blue-600',
    image: 'https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?auto=compress&cs=tinysrgb&w=500'
  },
  {
    id: 'firstaid',
    name: 'First Aid',
    description: 'Basic medical emergency response skills',
    icon: '🏥',
    color: 'from-green-400 to-emerald-600',
    image: 'https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg?auto=compress&cs=tinysrgb&w=500'
  }
];

const StudentDashboard: React.FC<StudentDashboardProps> = ({
  user,
  progress,
  quizScores,
  onStartLearning,
  onLogout
}) => {
  const completedModules = Object.values(progress).filter(Boolean).length;
  const totalModules = disasters.length;
  const completionPercentage = (completedModules / totalModules) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-lg">
                <Star className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">SafetyFirst</h1>
                <p className="text-sm text-gray-600">Welcome back, {user.name}!</p>
              </div>
            </div>
            <button
              onClick={onLogout}
              className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-red-600 transition-colors"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Your Progress</h2>
            <div className="flex items-center space-x-2">
              <Trophy className="h-6 w-6 text-yellow-500" />
              <span className="text-lg font-semibold text-gray-700">
                {completedModules}/{totalModules} Completed
              </span>
            </div>
          </div>
          
          <div className="mb-6">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Overall Progress</span>
              <span>{Math.round(completionPercentage)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-300"
                style={{ width: `${completionPercentage}%` }}
              ></div>
            </div>
          </div>

          {/* Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {disasters.map(disaster => (
              <div
                key={disaster.id}
                className={`p-4 rounded-xl text-center transition-all ${
                  progress[disaster.id]
                    ? 'bg-gradient-to-br from-green-100 to-emerald-100 border-2 border-green-300'
                    : 'bg-gray-50 border-2 border-gray-200'
                }`}
              >
                <div className="text-2xl mb-2">{disaster.icon}</div>
                <div className="text-xs font-medium text-gray-700">{disaster.name}</div>
                {progress[disaster.id] && (
                  <div className="mt-2">
                    <div className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-500 text-white">
                      ✓ Complete
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Learning Modules */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Start Learning</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {disasters.map(disaster => (
              <DisasterCard
                key={disaster.id}
                disaster={disaster}
                isCompleted={progress[disaster.id] || false}
                onStart={() => onStartLearning(disaster.id)}
              />
            ))}
          </div>
        </div>

        {/* Emergency Contacts */}
        <EmergencyContacts />
      </div>
    </div>
  );
};

export default StudentDashboard;