import React from 'react';
import { Phone, AlertCircle, MapPin, Heart } from 'lucide-react';

const EmergencyContacts: React.FC = () => {
  const emergencyContacts = [
    {
      service: 'Emergency Services',
      number: '911',
      description: 'Fire, Police, Medical Emergency',
      icon: AlertCircle,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200'
    },
    {
      service: 'Poison Control',
      number: '1800-11-6117',
      description: 'Poisoning emergencies',
      icon: Heart,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200'
    },
    {
      service: 'Red Cross Emergency',
      number: '+91-11-2371-6441',
      description: 'Disaster assistance',
      icon: MapPin,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200'
    },
    {
      service: 'Non-Emergency Police',
      number: '311',
      description: 'Non-urgent police matters',
      icon: Phone,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200'
    }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <div className="bg-red-500 p-3 rounded-full">
            <Phone className="h-8 w-8 text-white" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Emergency Contacts</h2>
        <p className="text-gray-600">Important numbers to remember in case of emergency</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {emergencyContacts.map((contact, index) => (
          <div
            key={index}
            className={`p-6 rounded-xl border-2 ${contact.bgColor} ${contact.borderColor} hover:shadow-lg transition-shadow`}
          >
            <div className="flex items-center space-x-4">
              <div className={`p-3 rounded-full bg-white ${contact.color}`}>
                <contact.icon className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 text-lg">{contact.service}</h3>
                <p className="text-sm text-gray-600 mb-2">{contact.description}</p>
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 text-gray-500" />
                  <span className={`font-mono font-bold text-lg ${contact.color}`}>
                    {contact.number}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 p-6 bg-yellow-50 border-2 border-yellow-200 rounded-xl">
        <div className="flex items-start space-x-3">
          <AlertCircle className="h-6 w-6 text-yellow-600 mt-0.5" />
          <div>
            <h4 className="font-bold text-yellow-900 mb-2">Remember:</h4>
            <ul className="text-sm text-yellow-800 space-y-1">
              <li>• Stay calm and speak clearly when calling emergency services</li>
              <li>• Know your address and location</li>
              <li>• Keep these numbers written down in case your phone isn't available</li>
              <li>• Program these numbers into your phone contacts</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmergencyContacts;
