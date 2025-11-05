// services/lawService.ts
import { Law, Language, User } from '../types';
import { MOCK_LAWS } from '../constants';
import { updateUserNotification, getCurrentUser } from './authService';

const LAWS_STORAGE_KEY = 'samvidhan_setu_laws';

const getLawsFromStorage = (): Law[] => {
  const lawsJson = localStorage.getItem(LAWS_STORAGE_KEY);
  if (lawsJson) {
    return JSON.parse(lawsJson);
  }
  // Initialize with mock data if no laws found in storage
  localStorage.setItem(LAWS_STORAGE_KEY, JSON.stringify(MOCK_LAWS));
  return MOCK_LAWS;
};

const saveLawsToStorage = (laws: Law[]) => {
  localStorage.setItem(LAWS_STORAGE_KEY, JSON.stringify(laws));
};

let lawsData: Law[] = getLawsFromStorage();

export const getAllLaws = (): Law[] => {
  return [...lawsData];
};

export const getLawById = (id: string): Law | undefined => {
  return lawsData.find(law => law.id === id);
};

export const searchLaws = (query: string, language: Language = Language.ENGLISH): Law[] => {
  const lowerCaseQuery = query.toLowerCase().trim();
  if (!lowerCaseQuery) {
    return getAllLaws();
  }

  return lawsData.filter(law => {
    const titleMatch = language === Language.ENGLISH ? law.title.toLowerCase().includes(lowerCaseQuery) : law.hindiTitle.toLowerCase().includes(lowerCaseQuery);
    const explanationMatch = language === Language.ENGLISH ? law.explanation.toLowerCase().includes(lowerCaseQuery) : law.hindiExplanation.toLowerCase().includes(lowerCaseQuery);
    const categoryMatch = law.category.toLowerCase().includes(lowerCaseQuery);
    const articleSectionMatch = language === Language.ENGLISH ? law.articleOrSection.toLowerCase().includes(lowerCaseQuery) : law.hindiArticleOrSection.toLowerCase().includes(lowerCaseQuery);
    const keywordMatch = law.keywords.some(keyword => keyword.toLowerCase().includes(lowerCaseQuery));
    
    return titleMatch || explanationMatch || categoryMatch || articleSectionMatch || keywordMatch;
  });
};

export const addLaw = (newLaw: Omit<Law, 'id' | 'updatedAt'>, updateCurrentUserInApp: (user: User) => void): Law => {
  const law: Law = {
    ...newLaw,
    id: `law-${Date.now()}`,
    updatedAt: new Date().toISOString(),
  };
  lawsData.push(law);
  saveLawsToStorage(lawsData);
  // Notify users about new law
  const currentUser = getCurrentUser();
  if (currentUser) {
    const updatedUser = updateUserNotification(currentUser.id, `New law added: ${law.title} (${law.category})`);
    if (updatedUser) updateCurrentUserInApp(updatedUser);
  }
  return law;
};

export const updateLaw = (updatedLaw: Omit<Law, 'updatedAt'>, updateCurrentUserInApp: (user: User) => void): Law | null => {
  const index = lawsData.findIndex(law => law.id === updatedLaw.id);
  if (index > -1) {
    const law: Law = { ...updatedLaw, updatedAt: new Date().toISOString() };
    lawsData[index] = law;
    saveLawsToStorage(lawsData);
    // Notify users about updated law
    const currentUser = getCurrentUser();
    if (currentUser) {
      const updatedUser = updateUserNotification(currentUser.id, `Law updated: ${law.title} (${law.category})`);
      if (updatedUser) updateCurrentUserInApp(updatedUser);
    }
    return law;
  }
  return null;
};

export const deleteLaw = (id: string): boolean => {
  const initialLength = lawsData.length;
  lawsData = lawsData.filter(law => law.id !== id);
  if (lawsData.length < initialLength) {
    saveLawsToStorage(lawsData);
    // Notify users about deleted law (optional, could be less critical)
    const currentUser = getCurrentUser();
    if (currentUser) {
      updateUserNotification(currentUser.id, `Law deleted with ID: ${id}`);
      // No immediate update to currentUser in app for deletion as it's less direct feedback
    }
    return true;
  }
  return false;
};