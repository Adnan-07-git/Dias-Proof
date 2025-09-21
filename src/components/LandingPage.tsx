import React, { useState } from 'react';
import { Shield, Users, GraduationCap, AlertTriangle } from 'lucide-react';
import { User } from '../pages/Index';

interface LandingPageProps {
  onLogin: (user: User) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onLogin }) => {
  const [loginType, setLoginType] = useState<'student' | 'mentor'>('student');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  // Hard-coded users for demo purposes
  const users = [
    { name: 'Josh', password: 'hehe1234', role: 'student' },
    { name: 'sir', password: 'lol1234', role: 'mentor', email: 'siremail@gmail.com' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Find matching user
    const matchedUser = users.find(
      u =>
        u.name === formData.name &&
        u.password === formData.password &&
        u.role === loginType
    );

    if (matchedUser) {
      // Login successful
      const user: User = {
        id: Date.now().toString(),
        name: matchedUser.name,
        role: matchedUser.role,
        ...(matchedUser.role === 'mentor' && { email: matchedUser.email })
      };
      onLogin(user);
    } else {
      // Login failed
      alert('Wrong username or password, try again!');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Images */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/60 z-10"></div>
        <div className="grid grid-cols-3 h-full opacity-80">
          <div
            className="bg-cover bg-center"
            style={{
              backgroundImage: 'url(https://images.pexels.com/photos/1462935/pexels-photo-1462935.jpeg?auto=compress&cs=tinysrgb&w=800)'
            }}
          ></div>
          <div
            className="bg-cover bg-center"
            style={{
              backgroundImage: 'url(https://images.pexels.com/photos/266487/pexels-photo-266487.jpeg?auto=compress&cs=tinysrgb&w=800)'
            }}
          ></div>
          <div
            className="bg-cover bg-center"
            style={{
              backgroundImage: 'url(https://images.pexels.com/photos/552779/pexels-photo-552779.jpeg?auto=compress&cs=tinysrgb&w=800)'
            }}
          ></div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 grid grid-cols-3 h-1/2 opacity-60">
          <div
            className="bg-cover bg-center"
            style={{
              backgroundImage: 'url(https://images.pexels.com/photos/1446076/pexels-photo-1446076.jpeg?auto=compress&cs=tinysrgb&w=800)'
            }}
          ></div>
          <div
            className="bg-cover bg-center"
            style={{
              backgroundImage: 'url(https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?auto=compress&cs=tinysrgb&w=800)'
            }}
          ></div>
          <div
            className="bg-cover bg-center"
            style={{
              backgroundImage: 'url(https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg?auto=compress&cs=tinysrgb&w=800)'
            }}
          ></div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-20">
        {/* Hero Section */}
        <div className="relative overflow-hidden">
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20">
            <div className="text-center">
              <div className="flex justify-center mb-8">
                <div className="bg-gradient-to-r from-orange-500 to-red-500 p-4 rounded-full shadow-xl">
                  <Shield className="h-16 w-16 text-white" />
                </div>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">
                <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                  Dias Proof
                </span>
                <br />
                <span className="text-3xl md:text-4xl text-white/90">
                  Learn. Prepare. Stay Safe.
                </span>
              </h1>
              <p className="text-xl text-white/90 max-w-3xl mx-auto mb-12 drop-shadow">
                An interactive disaster management education platform designed to teach children 
                essential safety skills through engaging lessons and quizzes.
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all border border-white/20">
                <div className="bg-blue-500 p-3 rounded-full w-fit mb-4">
                  <GraduationCap className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Interactive Learning</h3>
                <p className="text-white/80">
                  Engaging lessons on various disasters with visual aids and interactive elements.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all border border-white/20">
                <div className="bg-green-500 p-3 rounded-full w-fit mb-4">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Progress Tracking</h3>
                <p className="text-white/80">
                  Track learning progress with badges and quiz scores for completed modules.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all border border-white/20">
                <div className="bg-orange-500 p-3 rounded-full w-fit mb-4">
                  <AlertTriangle className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Emergency Ready</h3>
                <p className="text-white/80">
                  Quick access to emergency contacts and essential safety information.
                </p>
              </div>
            </div>

            {/* Login Section */}
            <div className="max-w-md mx-auto bg-white/95 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-white/20">
              <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">
                Get Started
              </h2>

              {/* Role Selection */}
              <div className="flex mb-6 bg-gray-100 p-1 rounded-lg">
                <button
                  onClick={() => setLoginType('student')}
                  className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                    loginType === 'student'
                      ? 'bg-blue-500 text-white shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Student
                </button>
                <button
                  onClick={() => setLoginType('mentor')}
                  className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                    loginType === 'mentor'
                      ? 'bg-green-500 text-white shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Mentor
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    placeholder="Enter your name"
                  />
                </div>

                {loginType === 'mentor' && (
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                      placeholder="Enter your email"
                    />
                  </div>
                )}

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    required
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-all"
                    placeholder="Create a password"
                  />
                </div>

                <button
                  type="submit"
                  className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-all shadow-lg hover:shadow-xl ${
                    loginType === 'student'
                      ? 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700'
                      : 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700'
                  } focus:ring-2 focus:ring-offset-2 ${
                    loginType === 'student' ? 'focus:ring-blue-500' : 'focus:ring-green-500'
                  }`}
                >
                  Join as {loginType === 'student' ? 'Student' : 'Mentor'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;