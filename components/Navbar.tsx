// components/Navbar.tsx
import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../App';
import { LanguageContext } from '../App';
import { Language } from '../types';
import Button from './Button';
import Modal from './Modal';

const Navbar: React.FC = () => {
  const { isAuthenticated, currentUser, logout } = useContext(AuthContext);
  const { language, setLanguage } = useContext(LanguageContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [hasNewNotifications, setHasNewNotifications] = useState(false);

  useEffect(() => {
    if (currentUser?.notifications && currentUser.notifications.length > 0) {
      setHasNewNotifications(true);
    } else {
      setHasNewNotifications(false);
    }
  }, [currentUser?.notifications]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleNotificationsClick = () => {
    setShowNotifications(true);
    setHasNewNotifications(false); // Mark notifications as seen
  };

  return (
    <nav className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white shadow-lg sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 text-2xl font-bold tracking-wide hover:text-blue-200">
              Samvidhan Setu
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link to="/laws" className="hover:bg-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                {language === Language.ENGLISH ? 'Laws Database' : 'कानून डेटाबेस'}
              </Link>
              <Link to="/problem-solver" className="hover:bg-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                {language === Language.ENGLISH ? 'Problem Solver' : 'समस्या निवारक'}
              </Link>
              <Link to="/chatbot" className="hover:bg-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                {language === Language.ENGLISH ? 'Legal Chatbot' : 'कानूनी चैटबॉट'}
              </Link>
              {isAuthenticated && currentUser?.role === 'admin' && (
                <Link to="/admin" className="hover:bg-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                  {language === Language.ENGLISH ? 'Admin' : 'प्रशासक'}
                </Link>
              )}
              {isAuthenticated ? (
                <>
                  <button onClick={handleNotificationsClick} className="relative hover:bg-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                    {language === Language.ENGLISH ? 'Notifications' : 'सूचनाएँ'}
                    {hasNewNotifications && (
                      <span className="absolute -top-1 -right-1 flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                      </span>
                    )}
                  </button>
                  <Button onClick={logout} variant="outline" size="sm" className="ml-2 text-white border-white hover:bg-blue-50 hover:text-blue-800">
                    {language === Language.ENGLISH ? `Logout (${currentUser.username})` : `लॉग आउट (${currentUser.username})`}
                  </Button>
                </>
              ) : (
                <Link to="/auth" className="hover:bg-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                  {language === Language.ENGLISH ? 'Login / Signup' : 'लॉगिन / साइनअप'}
                </Link>
              )}
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as Language)}
                className="ml-4 bg-blue-600 border border-blue-500 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-1.5"
              >
                <option value={Language.ENGLISH}>English</option>
                <option value={Language.HINDI}>हिंदी</option>
              </select>
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-blue-200 hover:text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state. */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/laws" className="text-gray-100 hover:bg-blue-600 block px-3 py-2 rounded-md text-base font-medium" onClick={toggleMobileMenu}>
              {language === Language.ENGLISH ? 'Laws Database' : 'कानून डेटाबेस'}
            </Link>
            <Link to="/problem-solver" className="text-gray-100 hover:bg-blue-600 block px-3 py-2 rounded-md text-base font-medium" onClick={toggleMobileMenu}>
              {language === Language.ENGLISH ? 'Problem Solver' : 'समस्या निवारक'}
            </Link>
            <Link to="/chatbot" className="text-gray-100 hover:bg-blue-600 block px-3 py-2 rounded-md text-base font-medium" onClick={toggleMobileMenu}>
              {language === Language.ENGLISH ? 'Legal Chatbot' : 'कानूनी चैटबॉट'}
            </Link>
            {isAuthenticated && currentUser?.role === 'admin' && (
              <Link to="/admin" className="text-gray-100 hover:bg-blue-600 block px-3 py-2 rounded-md text-base font-medium" onClick={toggleMobileMenu}>
                {language === Language.ENGLISH ? 'Admin' : 'प्रशासक'}
              </Link>
            )}
            {isAuthenticated ? (
              <>
                <button onClick={handleNotificationsClick} className="w-full text-left relative text-gray-100 hover:bg-blue-600 block px-3 py-2 rounded-md text-base font-medium">
                  {language === Language.ENGLISH ? 'Notifications' : 'सूचनाएँ'}
                  {hasNewNotifications && (
                    <span className="absolute top-2 right-4 flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                    </span>
                  )}
                </button>
                <Button onClick={() => { logout(); toggleMobileMenu(); }} variant="outline" size="sm" className="w-full text-white border-white hover:bg-blue-50 hover:text-blue-800 mt-2">
                  {language === Language.ENGLISH ? `Logout (${currentUser.username})` : `लॉग आउट (${currentUser.username})`}
                </Button>
              </>
            ) : (
              <Link to="/auth" className="text-gray-100 hover:bg-blue-600 block px-3 py-2 rounded-md text-base font-medium" onClick={toggleMobileMenu}>
                {language === Language.ENGLISH ? 'Login / Signup' : 'लॉगिन / साइनअप'}
              </Link>
            )}
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as Language)}
              className="mt-2 w-full bg-blue-600 border border-blue-500 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-1.5"
            >
              <option value={Language.ENGLISH}>English</option>
              <option value={Language.HINDI}>हिंदी</option>
            </select>
          </div>
        </div>
      )}

      {/* Notifications Modal */}
      <Modal isOpen={showNotifications} onClose={() => setShowNotifications(false)} title={language === Language.ENGLISH ? 'Notifications' : 'सूचनाएँ'}>
        {currentUser?.notifications && currentUser.notifications.length > 0 ? (
          <ul className="space-y-3">
            {currentUser.notifications.map((notification, index) => (
              <li key={index} className="p-3 bg-blue-50 border border-blue-200 rounded-md text-sm text-gray-800">
                {notification}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">{language === Language.ENGLISH ? 'No new notifications.' : 'कोई नई सूचना नहीं।'}</p>
        )}
      </Modal>
    </nav>
  );
};

export default Navbar;
