// components/ChatMessage.tsx
import React from 'react';
import { ChatMessage } from '../types';

interface ChatMessageProps {
  message: ChatMessage;
}

const ChatMessageComponent: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.sender === 'user';
  
  const bubbleClasses = isUser
    ? 'bg-blue-600 text-white rounded-br-none'
    : 'bg-gray-200 text-gray-800 rounded-bl-none';
  
  const alignmentClasses = isUser ? 'self-end' : 'self-start';
  const flexClasses = isUser ? 'flex-row-reverse' : 'flex-row';
  const avatarText = isUser ? 'You' : 'SS'; // SS for Samvidhan Setu

  return (
    <div className={`flex ${flexClasses} items-end mb-4 max-w-[90%] ${alignmentClasses}`}>
      <div className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold ${isUser ? 'bg-blue-200 text-blue-800 ml-2' : 'bg-gray-700 text-white mr-2'}`}>
        {avatarText}
      </div>
      <div className={`max-w-xs md:max-w-md lg:max-w-lg p-3 rounded-xl shadow-md ${bubbleClasses}`}>
        <p className="text-sm break-words whitespace-pre-wrap">{message.text}</p>
      </div>
      <span className={`text-xs text-gray-500 mt-1 ${isUser ? 'mr-auto pr-2' : 'ml-auto pl-2'}`}>
        {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </span>
    </div>
  );
};

export default ChatMessageComponent;