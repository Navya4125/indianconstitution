// pages/ProblemSolverPage.tsx
import React, { useState, useContext, useEffect, useCallback } from 'react';
import { LanguageContext, LawContext } from '../App';
import { Language, Law, ProblemSolverResult } from '../types';
import Input, { TextArea } from '../components/Input';
import Button from '../components/Button';
import Card from '../components/Card';
import LawCard from '../components/LawCard';
import Modal from '../components/Modal';
import { analyzeProblemForKeywords, explainProblemInDetail } from '../services/geminiService';

const ProblemSolverPage: React.FC = () => {
  const { language } = useContext(LanguageContext);
  const { searchLaws, getLawById } = useContext(LawContext);

  const [problemDescription, setProblemDescription] = useState<string>('');
  const [extractedKeywords, setExtractedKeywords] = useState<string[]>([]);
  const [relevantLaws, setRelevantLaws] = useState<Law[]>([]);
  const [aiExplanation, setAiExplanation] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLaw, setSelectedLaw] = useState<Law | null>(null);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setExtractedKeywords([]);
    setRelevantLaws([]);
    setAiExplanation(null);

    if (!problemDescription.trim()) {
      setError(language === Language.ENGLISH ? 'Please describe your problem.' : 'कृपया अपनी समस्या का वर्णन करें।');
      return;
    }

    setIsLoading(true);
    try {
      // Step 1: Analyze problem for keywords using Gemini
      const keywords = await analyzeProblemForKeywords(problemDescription);
      setExtractedKeywords(keywords);
      console.log('Extracted Keywords:', keywords);

      // Step 2: Search local database for laws based on keywords
      let foundLaws: Law[] = [];
      const uniqueLawIds = new Set<string>(); // Use a Set to store unique law IDs

      for (const keyword of keywords) {
        // Search in English context first (as keywords are usually English), then filter later for Hindi display
        const lawsByKeyword = searchLaws(keyword, Language.ENGLISH);
        lawsByKeyword.forEach(law => {
          if (!uniqueLawIds.has(law.id)) {
            foundLaws.push(law);
            uniqueLawIds.add(law.id);
          }
        });
      }
      setRelevantLaws(foundLaws);
      console.log('Relevant Laws from DB:', foundLaws);

      // Step 3: Get detailed explanation from Gemini, incorporating the found laws
      const explanation = await explainProblemInDetail(problemDescription, foundLaws, language);
      setAiExplanation(explanation);
      console.log('AI Explanation:', explanation);

    } catch (err: any) {
      console.error("Problem Solver Error:", err);
      setError(err.message || (language === Language.ENGLISH ? 'An unexpected error occurred. Please try again.' : 'एक अनपेक्षित त्रुटि हुई। कृपया पुन: प्रयास करें।'));
    } finally {
      setIsLoading(false);
    }
  }, [problemDescription, language, searchLaws]);

  const handleLawCardClick = (law: Law) => {
    setSelectedLaw(law);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedLaw(null);
  };

  const resetSolver = () => {
    setProblemDescription('');
    setExtractedKeywords([]);
    setRelevantLaws([]);
    setAiExplanation(null);
    setIsLoading(false);
    setError(null);
    setSelectedLaw(null);
    setIsModalOpen(false);
  };

  const pageTitle = language === Language.ENGLISH ? 'Legal Problem Solver' : 'कानूनी समस्या निवारक';
  const problemInputLabel = language === Language.ENGLISH ? 'Describe Your Problem' : 'अपनी समस्या का वर्णन करें';
  const problemInputPlaceholder = language === Language.ENGLISH ? 'E.g., "My neighbor built a wall on my property line." or "My employer is not paying minimum wage."' : 'उदाहरण के लिए, "मेरे पड़ोसी ने मेरी संपत्ति की सीमा पर एक दीवार बनाई है।" या "मेरा नियोक्ता न्यूनतम मजदूरी का भुगतान नहीं कर रहा है।"';
  const solveButtonText = language === Language.ENGLISH ? 'Analyze Problem' : 'समस्या का विश्लेषण करें';
  const resetButtonText = language === Language.ENGLISH ? 'Reset' : 'रीसेट करें';
  const loadingText = language === Language.ENGLISH ? 'Analyzing your problem...' : 'आपकी समस्या का विश्लेषण किया जा रहा है...';
  const disclaimerText = language === Language.ENGLISH ? 'Disclaimer: This tool provides general legal insights based on available information and AI analysis. It is not a substitute for professional legal advice. Always consult a qualified legal professional for specific legal guidance.' : 'अस्वीकरण: यह उपकरण उपलब्ध जानकारी और एआई विश्लेषण के आधार पर सामान्य कानूनी जानकारी प्रदान करता है। यह पेशेवर कानूनी सलाह का विकल्प नहीं है। विशिष्ट कानूनी मार्गदर्शन के लिए हमेशा एक योग्य कानूनी पेशेवर से परामर्श करें।';
  const keywordsSectionTitle = language === Language.ENGLISH ? 'Identified Legal Concepts:' : 'पहचानी गई कानूनी अवधारणाएँ:';
  const relevantLawsSectionTitle = language === Language.ENGLISH ? 'Potentially Relevant Laws:' : 'संभावित संबंधित कानून:';
  const explanationSectionTitle = language === Language.ENGLISH ? 'AI Explanation:' : 'एआई स्पष्टीकरण:';
  const noLawsFoundMessage = language === Language.ENGLISH ? 'No specific laws found in our database related to your problem.' : 'आपकी समस्या से संबंधित हमारे डेटाबेस में कोई विशिष्ट कानून नहीं मिला।';
  const updatedAtLabel = language === Language.ENGLISH ? 'Updated At:' : 'अपडेट किया गया:';

  return (
    <div className="py-8">
      <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-8">{pageTitle}</h1>

      <Card title={problemInputLabel} className="max-w-4xl mx-auto mb-8">
        <form onSubmit={handleSubmit} className="space-y-4">
          <TextArea
            id="problem-description"
            label="" // Label is in Card title, so keep this empty for cleaner UI
            value={problemDescription}
            onChange={(e) => setProblemDescription(e.target.value)}
            placeholder={problemInputPlaceholder}
            rows={6}
            required
            disabled={isLoading}
          />
          <div className="flex gap-4">
            <Button type="submit" className="flex-grow" disabled={isLoading}>
              {isLoading ? (language === Language.ENGLISH ? 'Analyzing...' : 'विश्लेषण कर रहा है...') : solveButtonText}
            </Button>
            <Button type="button" variant="secondary" onClick={resetSolver} disabled={isLoading || (!problemDescription && !aiExplanation)}>
              {resetButtonText}
            </Button>
          </div>
        </form>
      </Card>

      {isLoading && (
        <Card className="max-w-4xl mx-auto mb-8 text-center animate-pulse">
          <p className="text-lg text-blue-600">{loadingText}</p>
          <div className="mt-4 flex justify-center space-x-2">
            <div className="h-3 w-3 bg-blue-400 rounded-full animate-bounce delay-100"></div>
            <div className="h-3 w-3 bg-blue-500 rounded-full animate-bounce delay-200"></div>
            <div className="h-3 w-3 bg-blue-600 rounded-full animate-bounce delay-300"></div>
          </div>
        </Card>
      )}

      {error && (
        <Card className="max-w-4xl mx-auto mb-8 bg-red-50 border border-red-200 text-red-700">
          <p className="font-semibold">{language === Language.ENGLISH ? 'Error:' : 'त्रुटि:'}</p>
          <p>{error}</p>
        </Card>
      )}

      {aiExplanation && (
        <>
          <Card title={explanationSectionTitle} className="max-w-4xl mx-auto mb-8 bg-blue-50">
            <p className="text-gray-800 whitespace-pre-wrap">{aiExplanation}</p>
            {extractedKeywords.length > 0 && (
              <div className="mt-6 pt-4 border-t border-blue-200">
                <h4 className="text-lg font-semibold text-blue-700 mb-2">{keywordsSectionTitle}</h4>
                <div className="flex flex-wrap gap-2">
                  {extractedKeywords.map((keyword, index) => (
                    <span key={index} className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </Card>

          <Card title={relevantLawsSectionTitle} className="max-w-4xl mx-auto mb-8">
            {relevantLaws.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {relevantLaws.map(law => (
                  <LawCard key={law.id} law={law} onClick={handleLawCardClick} />
                ))}
              </div>
            ) : (
              <p className="text-gray-600 italic">{noLawsFoundMessage}</p>
            )}
          </Card>
        </>
      )}

      <div className="max-w-4xl mx-auto text-center text-sm text-gray-500 mt-8 p-4 bg-gray-50 rounded-lg shadow-inner">
        {disclaimerText}
      </div>

      {selectedLaw && (
        <Modal isOpen={isModalOpen} onClose={closeModal} title={language === Language.ENGLISH ? 'Law Details' : 'कानून का विवरण'}>
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

export default ProblemSolverPage;