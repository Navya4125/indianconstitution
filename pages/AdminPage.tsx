// pages/AdminPage.tsx
import React, { useState, useContext, useEffect } from 'react';
import { AuthContext, LawContext, LanguageContext } from '../App';
import { Law, Language } from '../types';
import Input, { TextArea } from '../components/Input';
import Button from '../components/Button';
import Card from '../components/Card';
import { LAW_CATEGORIES } from '../constants';
import { useNavigate } from 'react-router-dom';

const AdminPage: React.FC = () => {
  const { isAuthenticated, currentUser, updateCurrentUser } = useContext(AuthContext); // Added updateCurrentUser
  const { laws, addLaw, updateLaw, deleteLaw } = useContext(LawContext);
  const { language } = useContext(LanguageContext);
  const navigate = useNavigate();

  const [form, setForm] = useState<Omit<Law, 'id' | 'updatedAt' | 'keywords'>>({
    category: LAW_CATEGORIES[0],
    title: '',
    articleOrSection: '',
    hindiTitle: '',
    hindiArticleOrSection: '',
    explanation: '',
    hindiExplanation: '',
  });
  const [keywordsInput, setKeywordsInput] = useState<string>('');
  const [editingLawId, setEditingLawId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated || currentUser?.role !== 'admin') {
      navigate('/auth'); // Redirect non-admins or unauthenticated users
    }
  }, [isAuthenticated, currentUser, navigate]);

  const resetForm = () => {
    setForm({
      category: LAW_CATEGORIES[0],
      title: '',
      articleOrSection: '',
      hindiTitle: '',
      hindiArticleOrSection: '',
      explanation: '',
      hindiExplanation: '',
    });
    setKeywordsInput('');
    setEditingLawId(null);
    setError(null);
    setSuccess(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const keywordsArray = keywordsInput.split(',').map(kw => kw.trim()).filter(kw => kw.length > 0);

    const lawToSave: Omit<Law, 'id' | 'updatedAt'> = {
      ...form,
      keywords: keywordsArray,
    };

    if (!lawToSave.title || !lawToSave.explanation || !lawToSave.category) {
      setError(language === Language.ENGLISH ? 'Please fill in all required fields (Title, Explanation, Category).' : 'कृपया सभी आवश्यक फ़ील्ड (शीर्षक, स्पष्टीकरण, श्रेणी) भरें।');
      return;
    }

    if (editingLawId) {
      // Update existing law
      const updated = updateLaw({ ...lawToSave, id: editingLawId }, updateCurrentUser); // Pass updateCurrentUser
      if (updated) {
        setSuccess(language === Language.ENGLISH ? 'Law updated successfully!' : 'कानून सफलतापूर्वक अपडेट किया गया!');
        resetForm();
      } else {
        setError(language === Language.ENGLISH ? 'Failed to update law.' : 'कानून अपडेट करने में विफल रहा।');
      }
    } else {
      // Add new law
      const newLaw = addLaw(lawToSave, updateCurrentUser); // Pass updateCurrentUser
      if (newLaw) {
        setSuccess(language === Language.ENGLISH ? 'Law added successfully!' : 'कानून सफलतापूर्वक जोड़ा गया!');
        resetForm();
      } else {
        setError(language === Language.ENGLISH ? 'Failed to add law.' : 'कानून जोड़ने में विफल रहा।');
      }
    }
  };

  const handleEdit = (law: Law) => {
    setForm({
      category: law.category,
      title: law.title,
      articleOrSection: law.articleOrSection,
      hindiTitle: law.hindiTitle,
      hindiArticleOrSection: law.hindiArticleOrSection,
      explanation: law.explanation,
      hindiExplanation: law.hindiExplanation,
    });
    setKeywordsInput(law.keywords.join(', '));
    setEditingLawId(law.id);
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to top for editing
  };

  const handleDelete = (id: string) => {
    if (window.confirm(language === Language.ENGLISH ? 'Are you sure you want to delete this law?' : 'क्या आप वाकई इस कानून को हटाना चाहते हैं?')) {
      const deleted = deleteLaw(id);
      if (deleted) {
        setSuccess(language === Language.ENGLISH ? 'Law deleted successfully!' : 'कानून सफलतापूर्वक हटा दिया गया!');
      } else {
        setError(language === Language.ENGLISH ? 'Failed to delete law.' : 'कानून हटाने में विफल रहा।');
      }
    }
  };

  if (!isAuthenticated || currentUser?.role !== 'admin') {
    return (
      <div className="text-center py-12">
        <h1 className="text-3xl font-bold text-red-600">
          {language === Language.ENGLISH ? 'Access Denied' : 'पहुंच अस्वीकृत'}
        </h1>
        <p className="text-lg text-gray-600 mt-4">
          {language === Language.ENGLISH ? 'You do not have administrative privileges to view this page.' : 'आपके पास इस पृष्ठ को देखने के लिए प्रशासनिक विशेषाधिकार नहीं हैं।'}
        </p>
        <Button onClick={() => navigate('/')} className="mt-6">
          {language === Language.ENGLISH ? 'Go to Home' : 'होम पर जाएं'}
        </Button>
      </div>
    );
  }

  const adminPanelTitle = language === Language.ENGLISH ? 'Admin Panel' : 'प्रशासक पैनल';
  const addUpdateLawTitle = language === Language.ENGLISH ? (editingLawId ? 'Edit Law' : 'Add New Law') : (editingLawId ? 'कानून संपादित करें' : 'नया कानून जोड़ें');
  const categoryLabel = language === Language.ENGLISH ? 'Category:' : 'श्रेणी:';
  const titleEnLabel = language === Language.ENGLISH ? 'Title (English):' : 'शीर्षक (अंग्रेजी):';
  const articleEnLabel = language === Language.ENGLISH ? 'Article/Section (English):' : 'अनुच्छेद/धारा (अंग्रेजी):';
  const explanationEnLabel = language === Language.ENGLISH ? 'Explanation (English):' : 'स्पष्टीकरण (अंग्रेजी):';
  const titleHiLabel = language === Language.ENGLISH ? 'Title (Hindi):' : 'शीर्षक (हिंदी):';
  const articleHiLabel = language === Language.ENGLISH ? 'Article/Section (Hindi):' : 'अनुच्छेद/धारा (हिंदी):';
  const explanationHiLabel = language === Language.ENGLISH ? 'Explanation (Hindi):' : 'स्पष्टीकरण (हिंदी):';
  const keywordsLabel = language === Language.ENGLISH ? 'Keywords (comma-separated):' : 'कीवर्ड (अल्पविराम से अलग किए गए):';
  const submitButtonLabel = language === Language.ENGLISH ? (editingLawId ? 'Update Law' : 'Add Law') : (editingLawId ? 'कानून अपडेट करें' : 'कानून जोड़ें');
  const cancelButtonLabel = language === Language.ENGLISH ? 'Cancel Edit' : 'संपादन रद्द करें';
  const existingLawsTitle = language === Language.ENGLISH ? 'Existing Laws' : 'मौजूदा कानून';
  const editButtonLabel = language === Language.ENGLISH ? 'Edit' : 'संपादित करें';
  const deleteButtonLabel = language === Language.ENGLISH ? 'Delete' : 'हटाएँ';
  const noLawsYet = language === Language.ENGLISH ? 'No laws added yet.' : 'अभी तक कोई कानून नहीं जोड़ा गया है।';

  return (
    <div className="py-8">
      <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-8">{adminPanelTitle}</h1>

      <Card title={addUpdateLawTitle} className="max-w-4xl mx-auto mb-12">
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <p role="alert" className="text-red-600 text-sm mb-4">{error}</p>}
          {success && <p role="alert" className="text-green-600 text-sm mb-4">{success}</p>}

          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
              {categoryLabel}
            </label>
            <select
              id="category"
              name="category"
              value={form.category}
              onChange={handleChange}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              aria-label={categoryLabel}
            >
              {LAW_CATEGORIES.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          <Input id="title" name="title" label={titleEnLabel} value={form.title} onChange={handleChange} required />
          <Input id="articleOrSection" name="articleOrSection" label={articleEnLabel} value={form.articleOrSection} onChange={handleChange} />
          <TextArea id="explanation" name="explanation" label={explanationEnLabel} value={form.explanation} onChange={handleChange} required />

          <Input id="hindiTitle" name="hindiTitle" label={titleHiLabel} value={form.hindiTitle} onChange={handleChange} />
          <Input id="hindiArticleOrSection" name="hindiArticleOrSection" label={articleHiLabel} value={form.hindiArticleOrSection} onChange={handleChange} />
          <TextArea id="hindiExplanation" name="hindiExplanation" label={explanationHiLabel} value={form.hindiExplanation} onChange={handleChange} />

          <Input id="keywordsInput" name="keywordsInput" label={keywordsLabel} value={keywordsInput} onChange={(e) => setKeywordsInput(e.target.value)} placeholder={language === Language.ENGLISH ? 'e.g., crime, punishment, rights' : 'उदा., अपराध, दंड, अधिकार'} />

          <div className="flex gap-4 mt-6">
            <Button type="submit" className="flex-grow">
              {submitButtonLabel}
            </Button>
            {editingLawId && (
              <Button type="button" variant="secondary" onClick={resetForm} className="flex-grow">
                {cancelButtonLabel}
              </Button>
            )}
          </div>
        </form>
      </Card>

      <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">{existingLawsTitle}</h2>
      <div className="bg-white shadow-lg rounded-xl p-6 max-w-6xl mx-auto">
        {laws.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {language === Language.ENGLISH ? 'Title' : 'शीर्षक'}
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {language === Language.ENGLISH ? 'Category' : 'श्रेणी'}
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {language === Language.ENGLISH ? 'Article/Section' : 'अनुच्छेद/धारा'}
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {language === Language.ENGLISH ? 'Updated At' : 'अपडेट किया गया'}
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {laws.map((law) => (
                  <tr key={law.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {language === Language.ENGLISH ? law.title : law.hindiTitle}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {law.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {language === Language.ENGLISH ? law.articleOrSection : law.hindiArticleOrSection}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(law.updatedAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Button variant="secondary" size="sm" onClick={() => handleEdit(law)} className="mr-2">
                        {editButtonLabel}
                      </Button>
                      <Button variant="danger" size="sm" onClick={() => handleDelete(law.id)}>
                        {deleteButtonLabel}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center text-gray-600 text-lg">{noLawsYet}</p>
        )}
      </div>
    </div>
  );
};

export default AdminPage;