// pages/LawsPage.tsx
import React, { useState, useContext, useEffect } from 'react';
import { LawContext, LanguageContext } from '../App';
import { Law, Language } from '../types';
import Input from '../components/Input';
import Button from '../components/Button';
import LawCard from '../components/LawCard';
import Modal from '../components/Modal';
import { LAW_CATEGORIES } from '../constants';

const LawsPage: React.FC = () => {
  const { laws, searchLaws } = useContext(LawContext);
  const { language } = useContext(LanguageContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filteredLaws, setFilteredLaws] = useState<Law[]>([]);
  const [selectedLaw, setSelectedLaw] = useState<Law | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    let results = searchLaws(searchTerm, language);
    if (selectedCategory !== 'All') {
      results = results.filter(law => law.category === selectedCategory);
    }
    setFilteredLaws(results);
  }, [searchTerm, selectedCategory, laws, language, searchLaws]);

  const handleLawCardClick = (law: Law) => {
    setSelectedLaw(law);
    setIsModalOpen(true);
  };

  const currentLawsTitle = language === Language.ENGLISH ? 'Laws Database' : 'कानून डेटाबेस';
  const searchPlaceholder = language === Language.ENGLISH ? 'Search by title, article, keyword...' : 'शीर्षक, अनुच्छेद, कीवर्ड द्वारा खोजें...';
  const categoryLabel = language === Language.ENGLISH ? 'Filter by Category:' : 'श्रेणी द्वारा फ़िल्टर करें:';
  const allCategoriesLabel = language === Language.ENGLISH ? 'All' : 'सभी';
  const noLawsFound = language === Language.ENGLISH ? 'No laws found matching your criteria.' : 'आपके मानदंडों से मेल खाने वाले कोई कानून नहीं मिले।';
  const updatedAtLabel = language === Language.ENGLISH ? 'Updated At:' : 'अपडेट किया गया:';

  return (
    <div className="py-8">
      <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-8">{currentLawsTitle}</h1>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex-grow">
          <Input
            id="law-search"
            type="search"
            placeholder={searchPlaceholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>
        <div className="flex items-center gap-2 md:w-1/3">
          <label htmlFor="category-select" className="text-gray-700 text-sm font-medium whitespace-nowrap">
            {categoryLabel}
          </label>
          <select
            id="category-select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          >
            <option value="All">{allCategoriesLabel}</option>
            {LAW_CATEGORIES.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredLaws.length > 0 ? (
          filteredLaws.map(law => (
            <LawCard key={law.id} law={law} onClick={handleLawCardClick} />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-600 text-lg">{noLawsFound}</p>
        )}
      </div>

      {selectedLaw && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={language === Language.ENGLISH ? 'Law Details' : 'कानून का विवरण'}>
          <h3 className="text-2xl font-bold text-blue-700 mb-2">{language === Language.ENGLISH ? selectedLaw.title : selectedLaw.hindiTitle}</h3>
          <p className="text-md text-gray-600 mb-4">{selectedLaw.category} - {language === Language.ENGLISH ? selectedLaw.articleOrSection : selectedLaw.hindiArticleOrSection}</p>
          <p className="text-gray-800 mb-4 leading-relaxed">{language === Language.ENGLISH ? selectedLaw.explanation : selectedLaw.hindiExplanation}</p>
          <p className="text-sm text-gray-500 mt-4">
            {updatedAtLabel} {new Date(selectedLaw.updatedAt).toLocaleDateString()}
          </p>
        </Modal>
      )}
    </div>
  );
};

export default LawsPage;
