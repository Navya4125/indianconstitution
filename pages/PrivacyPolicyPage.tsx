// pages/PrivacyPolicyPage.tsx
import React, { useContext } from 'react';
import { PRIVACY_POLICY_CONTENT_EN, PRIVACY_POLICY_CONTENT_HI } from '../constants';
import Card from '../components/Card';
import { LanguageContext } from '../App';
import { Language } from '../types';

const PrivacyPolicyPage: React.FC = () => {
  const { language } = useContext(LanguageContext);
  const content = language === Language.ENGLISH ? PRIVACY_POLICY_CONTENT_EN : PRIVACY_POLICY_CONTENT_HI;
  const pageTitle = language === Language.ENGLISH ? 'Privacy Policy' : 'गोपनीयता नीति';

  return (
    <div className="py-8">
      <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-8">{pageTitle}</h1>
      <Card className="max-w-4xl mx-auto p-6 md:p-8 leading-relaxed text-gray-700">
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </Card>
    </div>
  );
};

export default PrivacyPolicyPage;
