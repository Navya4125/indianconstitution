// AppRouter.tsx
import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import LawsPage from './pages/LawsPage';
import ProblemSolverPage from './pages/ProblemSolverPage';
import ChatbotPage from './pages/ChatbotPage';
import AdminPage from './pages/AdminPage';
import AuthPage from './pages/AuthPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/laws" element={<LawsPage />} />
          <Route path="/problem-solver" element={<ProblemSolverPage />} />
          <Route path="/chatbot" element={<ChatbotPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          {/* Fallback route for unmatched paths */}
          <Route path="*" element={<HomePage />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default AppRouter;
