import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export const Container: React.FC<ContainerProps> = ({ children, className = '' }) => (
  <div className={`container ${className}`}>
    {children}
  </div>
);

interface RowProps {
  children: React.ReactNode;
  className?: string;
  justifyContent?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
  marginBottom?: '0' | '1' | '2' | '3' | '4' | '5';
}

export const Row: React.FC<RowProps> = ({ 
  children, 
  className = '', 
  justifyContent = 'center', 
  marginBottom = '4' 
}) => (
  <div className={`row justify-content-${justifyContent} mb-${marginBottom} ${className}`}>
    {children}
  </div>
);