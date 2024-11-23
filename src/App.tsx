import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import WeekPage from './pages/WeekPage';
import ResourcesPage from './pages/ResourcesPage';
import CoursesPage from './pages/CoursesPage';
import QRCodePage from './pages/QRCodePage';
import AILearningInterface from './components/AILearningInterface';
import ErrorBoundary from './components/ErrorBoundary';

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-900 text-gray-100">
        <Navigation />
        
        <ErrorBoundary>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/week/:weekId" element={<WeekPage />} />
            <Route path="/resources" element={<ResourcesPage />} />
            <Route path="/courses" element={<CoursesPage />} />
            <Route path="/qr-scanner" element={<QRCodePage />} />
            <Route path="/ai-learning" element={<AILearningInterface />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </ErrorBoundary>

        <div className="fixed top-0 left-0 w-1 h-screen bg-gradient-to-b from-cyan-500 to-transparent opacity-50"></div>
        <div className="fixed top-0 right-0 w-1 h-screen bg-gradient-to-b from-red-500 to-transparent opacity-50"></div>
      </div>
    </Router>
  );
};

export default App;