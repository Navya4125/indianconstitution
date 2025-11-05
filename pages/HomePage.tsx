// pages/HomePage.tsx
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import Card from '../components/Card';
import { LanguageContext } from '../App';
import { Language } from '../types';

const HomePage: React.FC = () => {
  const { language } = useContext(LanguageContext);

  return (
    <div className="text-center py-12 md:py-16">
      {/* Hero Section */}
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
          {language === Language.ENGLISH ? 'Samvidhan Setu: Bridging You to Justice' : 'संविधान सेतु: आपको न्याय से जोड़ना'}
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-8">
          {language === Language.ENGLISH
            ? 'Your easy guide to understanding Indian laws and legal rights. Empowering every citizen with accessible legal knowledge.'
            : 'भारतीय कानूनों और कानूनी अधिकारों को समझने के लिए आपका आसान मार्गदर्शक। प्रत्येक नागरिक को सुलभ कानूनी ज्ञान के साथ सशक्त बनाना।'}
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link to="/problem-solver">
            <Button size="lg" className="w-full sm:w-auto">
              {language === Language.ENGLISH ? 'Solve a Problem' : 'समस्या हल करें'}
            </Button>
          </Link>
          <Link to="/chatbot">
            <Button variant="outline" size="lg" className="w-full sm:w-auto border-blue-600 text-blue-600 hover:bg-blue-50">
              {language === Language.ENGLISH ? 'Ask the Chatbot' : 'चैटबॉट से पूछें'}
            </Button>
          </Link>
        </div>
      </div>

      {/* Feature Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 max-w-6xl mx-auto">
        <Card title={language === Language.ENGLISH ? 'Problem Solver' : 'समस्या निवारक'}>
          <p className="text-gray-700 mb-4">
            {language === Language.ENGLISH
              ? 'Describe your real-life situation in simple terms and get relevant Indian laws, articles, and sections explained.'
              : 'अपनी वास्तविक जीवन की स्थिति को सरल शब्दों में वर्णित करें और संबंधित भारतीय कानूनों, अनुच्छेदों और धाराओं की व्याख्या प्राप्त करें।'}
          </p>
          <Link to="/problem-solver">
            <Button variant="secondary" className="w-full">
              {language === Language.ENGLISH ? 'Get Legal Insights' : 'कानूनी जानकारी प्राप्त करें'}
            </Button>
          </Link>
        </Card>

        <Card title={language === Language.ENGLISH ? 'Legal Chatbot' : 'कानूनी चैटबॉट'}>
          <p className="text-gray-700 mb-4">
            {language === Language.ENGLISH
              ? 'Have your legal questions answered naturally by our AI chatbot, available in both English and Hindi.'
              : 'हमारे एआई चैटबॉट द्वारा अपने कानूनी सवालों के जवाब स्वाभाविक रूप से प्राप्त करें, जो अंग्रेजी और हिंदी दोनों में उपलब्ध है।'}
          </p>
          <Link to="/chatbot">
            <Button variant="secondary" className="w-full">
              {language === Language.ENGLISH ? 'Chat Now' : 'अभी चैट करें'}
            </Button>
          </Link>
        </Card>

        <Card title={language === Language.ENGLISH ? 'Laws Database' : 'कानून डेटाबेस'}>
          <p className="text-gray-700 mb-4">
            {language === Language.ENGLISH
              ? 'Explore a comprehensive database of Indian laws, searchable by keywords or categories, in English and Hindi.'
              : 'भारतीय कानूनों के व्यापक डेटाबेस का अन्वेषण करें, कीवर्ड या श्रेणियों द्वारा खोज योग्य, अंग्रेजी और हिंदी में।'}
          </p>
          <Link to="/laws">
            <Button variant="secondary" className="w-full">
              {language === Language.ENGLISH ? 'Browse Laws' : 'कानून ब्राउज़ करें'}
            </Button>
          </Link>
        </Card>
      </div>

      {/* Mission Statement */}
      <div className="mt-16 bg-blue-50 p-8 rounded-xl shadow-inner max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-blue-800 mb-4">
          {language === Language.ENGLISH ? 'Our Mission' : 'हमारा मिशन'}
        </h2>
        <p className="text-lg text-gray-700">
          {language === Language.ENGLISH
            ? 'Samvidhan Setu aims to democratize legal knowledge in India. We believe that understanding one\'s rights and duties is fundamental to a just society. By simplifying complex legal jargon and making information readily available, we empower individuals to navigate their legal landscape with confidence.'
            : 'संविधान सेतु का लक्ष्य भारत में कानूनी ज्ञान का लोकतंत्रीकरण करना है। हमारा मानना है कि अपने अधिकारों और कर्तव्यों को समझना एक न्यायपूर्ण समाज के लिए मौलिक है। जटिल कानूनी शब्दावली को सरल बनाकर और जानकारी को आसानी से उपलब्ध कराकर, हम व्यक्तियों को आत्मविश्वास के साथ अपने कानूनी परिदृश्य में नेविगेट करने के लिए सशक्त बनाते हैं।'}
        </p>
      </div>
    </div>
  );
};

export default HomePage;
