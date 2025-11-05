// components/LawCard.tsx
import React, { useContext } from 'react';
import { Law, Language } from '../types';
import { LanguageContext } from '../App';

interface LawCardProps {
  law: Law;
  onClick?: (law: Law) => void;
  className?: string;
}

const LawCard: React.FC<LawCardProps> = ({ law, onClick, className = '' }) => {
  const { language } = useContext(LanguageContext);
  const title = language === Language.ENGLISH ? law.title : law.hindiTitle;
  const articleOrSection = language === Language.ENGLISH ? law.articleOrSection : law.hindiArticleOrSection;
  const explanation = language === Language.ENGLISH ? law.explanation : law.hindiExplanation;

  return (
    <div
      className={`bg-white border border-gray-200 rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow duration-200 cursor-pointer ${className}`}
      onClick={() => onClick && onClick(law)}
    >
      <h3 className="text-lg font-semibold text-blue-700 mb-1">{title}</h3>
      <p className="text-sm text-gray-600 mb-2">{law.category} - {articleOrSection}</p>
      <p className="text-gray-700 text-sm line-clamp-3">{explanation}</p>
    </div>
  );
};

export default LawCard;
