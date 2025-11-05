// pages/ChatbotPage.tsx
import React, { useState, useEffect, useRef, useContext, useCallback } from 'react';
import { LanguageContext } from '../App';
import { ChatMessage, Language } from '../types';
import Input from '../components/Input';
import Button from '../components/Button';
import ChatMessageComponent from '../components/ChatMessage';
import { startNewChatSession, sendMessageToChatbot, resetActiveChatSession } from '../services/geminiService';

// Simple ID generator
const generateUniqueId = () => Date.now().toString(36) + Math.random().toString(36).substring(2, 9);

const ChatbotPage: React.FC = () => {
  const { language } = useContext(LanguageContext);

  const [chatSession, setChatSession] = useState<ChatMessage[]>([]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatInstanceRef = useRef<any>(null); // To hold the chat session object from Gemini SDK

  // Auto-scroll to the bottom of the chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatSession]);

  // Initialize and clean up chat session
  useEffect(() => {
    // Start a new chat session when the component mounts
    chatInstanceRef.current = startNewChatSession();
    console.log('New chat session started.');

    // Clean up function: reset the active chat session when the component unmounts
    return () => {
      resetActiveChatSession();
      console.log('Chat session reset.');
    };
  }, []); // Empty dependency array ensures this runs only on mount and unmount

  const handleSendMessage = useCallback(async (e?: React.FormEvent) => {
    e?.preventDefault(); // Prevent default form submission if triggered by form
    if (!userInput.trim() || isLoading) return;

    setError(null);
    const userMessageId = generateUniqueId();
    const newUserMessage: ChatMessage = {
      id: userMessageId,
      sender: 'user',
      text: userInput,
      timestamp: new Date().toISOString(),
    };

    setChatSession((prev) => [...prev, newUserMessage]);
    setUserInput('');
    setIsLoading(true);

    // Placeholder for bot's streaming response
    const botMessageId = generateUniqueId();
    const initialBotMessage: ChatMessage = {
      id: botMessageId,
      sender: 'bot',
      text: language === Language.ENGLISH ? '...' : '...', // Indicate loading
      timestamp: new Date().toISOString(),
    };
    setChatSession((prev) => [...prev, initialBotMessage]);

    try {
      await sendMessageToChatbot(
        newUserMessage.text,
        (chunk: string) => {
          setChatSession((prev) => {
            const lastMessage = prev[prev.length - 1];
            if (lastMessage && lastMessage.id === botMessageId) {
              return prev.map((msg) =>
                msg.id === botMessageId ? { ...msg, text: chunk } : msg
              );
            }
            // Fallback in case initialBotMessage wasn't added or was replaced for some reason
            return [...prev.filter(msg => msg.id !== botMessageId), { ...initialBotMessage, text: chunk }];
          });
        },
        () => {
          setIsLoading(false);
          // The onNewChunk should have captured the final response text.
        },
        (err: string) => {
          setError(err);
          setIsLoading(false);
          setChatSession((prev) => prev.map((msg) =>
            msg.id === botMessageId ? { ...msg, text: `${(language === Language.ENGLISH ? 'Error: ' : 'त्रुटि: ') + err}` } : msg
          ));
        }
      );
    } catch (err: any) {
      console.error('Failed to send message:', err);
      const errorMessage = err.message || (language === Language.ENGLISH ? 'Failed to get a response from the AI.' : 'AI से प्रतिक्रिया प्राप्त करने में विफल रहा।');
      setError(errorMessage);
      setIsLoading(false);
      setChatSession((prev) => prev.map((msg) =>
        msg.id === botMessageId ? { ...msg, text: `${(language === Language.ENGLISH ? 'Error: ' : 'त्रुटि: ') + errorMessage}` } : msg
      ));
    }
  }, [userInput, isLoading, language]);

  const initialGreeting = language === Language.ENGLISH
    ? "Hello! I am Samvidhan Setu, your AI legal assistant. How can I help you understand Indian laws today? Remember, always consult a legal professional for specific advice."
    : "नमस्ते! मैं संविधान सेतु हूं, आपकी AI कानूनी सहायक। आज मैं आपको भारतीय कानूनों को समझने में कैसे मदद कर सकता हूं? याद रखें, विशिष्ट सलाह के लिए हमेशा एक कानूनी पेशेवर से परामर्श करें।";

  useEffect(() => {
    // Only add initial greeting if the chat is empty and not currently loading a response
    if (chatSession.length === 0 && !isLoading) {
      const greetingMessage: ChatMessage = {
        id: generateUniqueId(),
        sender: 'bot',
        text: initialGreeting,
        timestamp: new Date().toISOString(),
      };
      setChatSession([greetingMessage]);
    }
  }, [chatSession.length, isLoading, initialGreeting]);

  const chatbotTitle = language === Language.ENGLISH ? 'Legal Chatbot' : 'कानूनी चैटबॉट';
  const chatPlaceholder = language === Language.ENGLISH ? 'Type your legal question...' : 'अपना कानूनी प्रश्न टाइप करें...';
  const sendButtonText = language === Language.ENGLISH ? 'Send' : 'भेजें';

  return (
    <div className="flex flex-col h-full bg-gray-50"> {/* Full height and flex column */}
      <h1 className="sr-only">{chatbotTitle}</h1> {/* Screen reader only title */}
      
      {/* Chat messages area */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 space-y-4 max-w-4xl mx-auto w-full"> {/* Wide, centered, and scrollable */}
        {chatSession.map((message) => (
          <ChatMessageComponent key={message.id} message={message} />
        ))}
        {isLoading && (
          <div className="flex self-start items-end mb-4">
            <div className="flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold bg-gray-700 text-white mr-2">
              SS
            </div>
            <div className="max-w-xs md:max-w-md lg:max-w-lg p-3 rounded-xl shadow-md bg-gray-200 text-gray-800 rounded-bl-none">
              <div className="animate-pulse flex space-x-2">
                <div className="h-2 w-2 bg-gray-400 rounded-full"></div>
                <div className="h-2 w-2 bg-gray-400 rounded-full"></div>
                <div className="h-2 w-2 bg-gray-400 rounded-full"></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input and Disclaimer Area */}
      <div className="bg-white border-t border-gray-200 p-4 md:p-6 lg:p-8 shadow-lg">
        {error && (
          <div className="p-2 bg-red-100 text-red-700 text-sm text-center mb-2 max-w-4xl mx-auto">
            {error}
          </div>
        )}
        <form onSubmit={handleSendMessage} className="flex items-center gap-2 max-w-4xl mx-auto">
          <Input
            id="chat-input"
            type="text"
            placeholder={chatPlaceholder}
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            className="flex-grow m-0"
            disabled={isLoading}
          />
          <Button type="submit" disabled={!userInput.trim() || isLoading}>
            {sendButtonText}
          </Button>
        </form>

        <div className="text-center text-xs text-gray-500 mt-4 max-w-4xl mx-auto">
          {language === Language.ENGLISH
            ? 'Disclaimer: This information is for educational purposes only and not legal advice. Always consult a qualified legal professional for specific legal guidance.'
            : 'अस्वीकरण: यह जानकारी केवल शैक्षिक उद्देश्यों के लिए है और कानूनी सलाह नहीं है। विशिष्ट कानूनी मार्गदर्शन के लिए हमेशा एक योग्य कानूनी पेशेवर से परामर्श करें।'}
        </div>
      </div>
    </div>
  );
};

export default ChatbotPage;