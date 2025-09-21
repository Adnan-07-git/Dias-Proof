import React from 'react';
import { Play, CheckCircle } from 'lucide-react';

interface Disaster {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  image: string;
}

interface DisasterCardProps {
  disaster: Disaster;
  isCompleted: boolean;
  onStart: () => void;
}

const DisasterCard: React.FC<DisasterCardProps> = ({ disaster, isCompleted, onStart }) => {
  return (
    <div className="group relative bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      {/* Background Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={disaster.image}
          alt={disaster.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className={`absolute inset-0 bg-gradient-to-t ${disaster.color} opacity-80`}></div>
        
        {/* Completion Badge */}
        {isCompleted && (
          <div className="absolute top-4 right-4 bg-green-500 text-white p-2 rounded-full shadow-lg">
            <CheckCircle className="h-5 w-5" />
          </div>
        )}

        {/* Icon */}
        <div className="absolute top-4 left-4 text-4xl drop-shadow-lg">
          {disaster.icon}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{disaster.name}</h3>
        <p className="text-gray-600 mb-4 text-sm leading-relaxed">{disaster.description}</p>
        
        <button
          onClick={onStart}
          className={`w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-lg font-medium transition-all ${
            isCompleted
              ? 'bg-green-100 text-green-700 hover:bg-green-200'
              : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 shadow-lg hover:shadow-xl'
          }`}
        >
          {isCompleted ? (
            <>
              <CheckCircle className="h-4 w-4" />
              <span>Review Module</span>
            </>
          ) : (
            <>
              <Play className="h-4 w-4" />
              <span>Start Learning</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default DisasterCard;