// components/Card.tsx
import React from 'react';

interface CardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ title, children, className = '' }) => {
  return (
    <div className={`bg-white shadow-lg rounded-xl p-6 ${className}`}>
      {title && <h3 className="text-xl font-semibold text-gray-900 mb-4">{title}</h3>}
      {children}
    </div>
  );
};

export default Card;
