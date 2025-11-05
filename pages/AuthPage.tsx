// pages/AuthPage.tsx
import React, { useState, useContext, useEffect } from 'react';
import Input from '../components/Input';
import Button from '../components/Button';
import Card from '../components/Card';
import { AuthContext, LanguageContext } from '../App';
import { useNavigate } from 'react-router-dom';
import { Language } from '../types';

const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const { login, signup, isAuthenticated } = useContext(AuthContext);
  const { language } = useContext(LanguageContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/'); // Redirect authenticated users away from auth page
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!username || !password || (!isLogin && !email)) {
      setError(language === Language.ENGLISH ? 'All fields are required.' : 'सभी फ़ील्ड आवश्यक हैं।');
      return;
    }

    if (!isLogin && password !== confirmPassword) {
      setError(language === Language.ENGLISH ? 'Passwords do not match.' : 'पासवर्ड मेल नहीं खाते।');
      return;
    }

    try {
      if (isLogin) {
        const loggedIn = await login(username, password);
        if (loggedIn) {
          setSuccess(language === Language.ENGLISH ? 'Logged in successfully!' : 'सफलतापूर्वक लॉग इन किया गया!');
          navigate('/');
        } else {
          setError(language === Language.ENGLISH ? 'Invalid username or password.' : 'अवैध उपयोगकर्ता नाम या पासवर्ड।');
        }
      } else {
        const signedUp = await signup(username, email, password);
        if (signedUp) {
          setSuccess(language === Language.ENGLISH ? 'Account created and logged in successfully!' : 'खाता बनाया गया और सफलतापूर्वक लॉग इन किया गया!');
          navigate('/');
        } else {
          setError(language === Language.ENGLISH ? 'Username or email already exists.' : 'उपयोगकर्ता नाम या ईमेल पहले से मौजूद है।');
        }
      }
    } catch (err: any) {
      console.error('Authentication error:', err);
      setError(err.message || (language === Language.ENGLISH ? 'An unexpected error occurred. Please try again.' : 'एक अनपेक्षित त्रुटि हुई। कृपया पुन: प्रयास करें।'));
    }
  };

  const formTitle = isLogin ? (language === Language.ENGLISH ? 'Login' : 'लॉगिन') : (language === Language.ENGLISH ? 'Sign Up' : 'साइन अप करें');
  const toggleFormText = isLogin ? (language === Language.ENGLISH ? 'Need an account? Sign Up' : 'एक खाता चाहिए? साइन अप करें') : (language === Language.ENGLISH ? 'Already have an account? Login' : 'पहले से एक खाता है? लॉगिन करें');
  const usernameLabel = language === Language.ENGLISH ? 'Username' : 'उपयोगकर्ता नाम';
  const emailLabel = language === Language.ENGLISH ? 'Email' : 'ईमेल';
  const passwordLabel = language === Language.ENGLISH ? 'Password' : 'पासवर्ड';
  const confirmPasswordLabel = language === Language.ENGLISH ? 'Confirm Password' : 'पासवर्ड की पुष्टि करें';
  const submitButtonText = isLogin ? (language === Language.ENGLISH ? 'Login' : 'लॉगिन') : (language === Language.ENGLISH ? 'Sign Up' : 'साइन अप करें');

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-160px)] py-8">
      <Card title={formTitle} className="max-w-md w-full">
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <p className="text-red-600 text-sm">{error}</p>}
          {success && <p className="text-green-600 text-sm">{success}</p>}

          <Input
            id="username"
            label={usernameLabel}
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          {!isLogin && (
            <Input
              id="email"
              label={emailLabel}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          )}
          <Input
            id="password"
            label={passwordLabel}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {!isLogin && (
            <Input
              id="confirm-password"
              label={confirmPasswordLabel}
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          )}
          <Button type="submit" className="w-full">
            {submitButtonText}
          </Button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          <button onClick={() => setIsLogin(!isLogin)} className="text-blue-600 hover:underline">
            {toggleFormText}
          </button>
        </p>
      </Card>
    </div>
  );
};

export default AuthPage;
