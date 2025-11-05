// components/Layout.tsx
import React from 'react';
import { useLocation } from 'react-router-dom'; // Import useLocation
import Navbar from './Navbar';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const isChatbotPage = location.pathname === '/chatbot';

  // Conditionally adjust mainClasses for ChatbotPage
  const mainClasses = isChatbotPage
    ? `flex-grow py-8 w-full` // Full width for chatbot, retain vertical padding
    : `flex-grow py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`; // Standard centered layout for others

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className={mainClasses}>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;