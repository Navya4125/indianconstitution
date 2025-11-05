// App.tsx
import React, { useState, useEffect, createContext, useCallback } from 'react';
import AppRouter from './AppRouter';
import { AuthContextType, LawContextType, User, Law, Language, LanguageContextType } from './types';
import * as authService from './services/authService';
import * as lawService from './services/lawService';

// Create Auth Context
export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  currentUser: null,
  login: async () => false,
  signup: async () => false,
  logout: () => {},
  // The 'updateCurrentUser' property is now correctly defined in AuthContextType
  // so we can remove the placeholder default value here.
  updateCurrentUser: () => {}, 
});

// Create Law Context
export const LawContext = createContext<LawContextType>({
  laws: [],
  addLaw: () => {},
  updateLaw: () => {},
  deleteLaw: () => {},
  searchLaws: () => [],
  getLawById: () => undefined,
});

// Create Language Context
export const LanguageContext = createContext<LanguageContextType>({
  language: Language.ENGLISH,
  setLanguage: () => {},
});

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [laws, setLaws] = useState<Law[]>([]);
  const [language, setLanguage] = useState<Language>(Language.ENGLISH);

  useEffect(() => {
    // Initialize authentication state
    const user = authService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
      setIsAuthenticated(true);
    }

    // Initialize laws data
    setLaws(lawService.getAllLaws());
  }, []);

  // Auth Context implementations
  const login = useCallback(async (username: string, password: string) => {
    const user = await authService.login(username, password);
    if (user) {
      setCurrentUser(user);
      setIsAuthenticated(true);
      return true;
    }
    return false;
  }, []);

  const signup = useCallback(async (username: string, email: string, password: string) => {
    const user = await authService.signup(username, email, password);
    if (user) {
      setCurrentUser(user);
      setIsAuthenticated(true);
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    authService.logout();
    setCurrentUser(null);
    setIsAuthenticated(false);
  }, []);

  // Function to update current user state from child components/services
  const updateCurrentUser = useCallback((user: User) => {
    setCurrentUser(authService.updateCurrentUserInStorage(user)); // Update in localStorage and state
  }, []);

  // Law Context implementations
  const addLaw = useCallback((newLaw: Omit<Law, 'id' | 'updatedAt'>, updateCurrentUserInApp: (user: User) => void) => {
    const law = lawService.addLaw(newLaw, updateCurrentUserInApp);
    setLaws(lawService.getAllLaws()); // Re-fetch all laws to ensure state is updated
  }, []);

  const updateLaw = useCallback((updatedLaw: Omit<Law, 'updatedAt'>, updateCurrentUserInApp: (user: User) => void) => {
    const law = lawService.updateLaw(updatedLaw, updateCurrentUserInApp);
    setLaws(lawService.getAllLaws());
  }, []);

  const deleteLaw = useCallback((id: string) => {
    const success = lawService.deleteLaw(id);
    if (success) {
      setLaws(lawService.getAllLaws());
    }
    return success;
  }, []);

  const searchLaws = useCallback((query: string, lang: Language) => {
    return lawService.searchLaws(query, lang);
  }, []);

  const getLawById = useCallback((id: string) => {
    return lawService.getLawById(id);
  }, []);

  const authContextValue: AuthContextType = {
    isAuthenticated,
    currentUser,
    login,
    signup,
    logout,
    updateCurrentUser, // Provided in context
  };

  const lawContextValue: LawContextType = {
    laws,
    addLaw,
    updateLaw,
    deleteLaw,
    searchLaws,
    getLawById,
  };

  const languageContextValue: LanguageContextType = {
    language,
    setLanguage,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      <LawContext.Provider value={lawContextValue}>
        <LanguageContext.Provider value={languageContextValue}>
          <AppRouter />
        </LanguageContext.Provider>
      </LawContext.Provider>
    </AuthContext.Provider>
  );
};

export default App;