// components/Input.tsx
import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  id: string;
  type?: 'text' | 'email' | 'password' | 'number' | 'search' | 'url';
  error?: string;
  className?: string;
}

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  id: string;
  error?: string;
  className?: string;
}

const Input: React.FC<InputProps> = ({ label, id, type = 'text', error, className = '', ...props }) => {
  const inputBaseStyles = `
    block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm
    focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm
    ${error ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}
  `;

  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <input
        id={id}
        name={id}
        type={type}
        className={inputBaseStyles}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export const TextArea: React.FC<TextAreaProps> = ({ label, id, error, className = '', ...props }) => {
  const textareaBaseStyles = `
    block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm
    focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm
    ${error ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}
  `;

  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <textarea
        id={id}
        name={id}
        className={textareaBaseStyles}
        rows={4}
        {...props}
      ></textarea>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default Input;
