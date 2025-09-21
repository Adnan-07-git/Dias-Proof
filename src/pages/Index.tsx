import React, { useState, useEffect } from 'react';
import LandingPage from '../components/LandingPage';
import StudentDashboard from '../components/StudentDashboard';
import MentorDashboard from '../components/MentorDashboard';
import LearningModule from '../components/LearningModule';

export interface User {
  id: string;
  name: string;
  role: 'student' | 'mentor';
  email?: string;
}

export interface Progress {
  [disaster: string]: boolean;
}

export interface QuizScore {
  [disaster: string]: number;
}

function Index() {
  const [user, setUser] = useState<User | null>(null);
  const [currentView, setCurrentView] = useState<'landing' | 'dashboard' | 'learning'>('landing');
  const [selectedDisaster, setSelectedDisaster] = useState<string>('');
  const [progress, setProgress] = useState<Progress>({});
  const [quizScores, setQuizScores] = useState<QuizScore>({});

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const savedProgress = localStorage.getItem('progress');
    const savedQuizScores = localStorage.getItem('quizScores');
    
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setCurrentView('dashboard');
    }
    
    if (savedProgress) {
      setProgress(JSON.parse(savedProgress));
    }
    
    if (savedQuizScores) {
      setQuizScores(JSON.parse(savedQuizScores));
    }
  }, []);

  const handleLogin = (userData: User) => {
    setUser(userData);
    setCurrentView('dashboard');
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentView('landing');
    localStorage.removeItem('user');
  };

  const handleStartLearning = (disaster: string) => {
    setSelectedDisaster(disaster);
    setCurrentView('learning');
  };

  const handleBackToDashboard = () => {
    setCurrentView('dashboard');
    setSelectedDisaster('');
  };

  const handleCompleteModule = (disaster: string, score: number) => {
    const newProgress = { ...progress, [disaster]: true };
    const newQuizScores = { ...quizScores, [disaster]: score };
    setProgress(newProgress);
    setQuizScores(newQuizScores);
    localStorage.setItem('progress', JSON.stringify(newProgress));
    localStorage.setItem('quizScores', JSON.stringify(newQuizScores));
    setCurrentView('dashboard');
  };

  if (currentView === 'landing') {
    return <LandingPage onLogin={handleLogin} />;
  }

  if (currentView === 'learning') {
    return (
      <LearningModule
        disaster={selectedDisaster}
        onComplete={handleCompleteModule}
        onBack={handleBackToDashboard}
      />
    );
  }

  if (user?.role === 'student') {
    return (
      <StudentDashboard
        user={user}
        progress={progress}
        quizScores={quizScores}
        onStartLearning={handleStartLearning}
        onLogout={handleLogout}
      />
    );
  }

  return (
    <MentorDashboard
      user={user!}
      onLogout={handleLogout}
    />
  );
}

export default Index;