// components/Footer.tsx
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { LanguageContext } from '../App';
import { Language } from '../types';

const Footer: React.FC = () => {
  const { language } = useContext(LanguageContext);
  return (
    <footer className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white py-6 mt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm">
        <p>&copy; {new Date().getFullYear()} Samvidhan Setu. {language === Language.ENGLISH ? 'All rights reserved.' : 'सर्वाधिकार सुरक्षित।'}</p>
        <div className="mt-2">
          <Link to="/privacy-policy" className="text-blue-200 hover:text-white underline">
            {language === Language.ENGLISH ? 'Privacy Policy' : 'गोपनीयता नीति'}
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
