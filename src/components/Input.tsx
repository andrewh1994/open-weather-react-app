import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  autoFocus?: boolean;
  disabled?: boolean;
  className?: string;
}

export const Input: React.FC<InputProps> = ({
  type = 'text',
  placeholder = '',
  value,
  onChange,
  onKeyDown,
  autoFocus = false,
  disabled = false,
  className = '',
  ...props
}) => (
  <input
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    onKeyDown={onKeyDown}
    autoFocus={autoFocus}
    disabled={disabled}
    className={`form-control ${className}`}
    style={{ 
      paddingLeft: '12px',
      paddingRight: '12px',
      paddingTop: '8px',
      paddingBottom: '8px'
    }}
    {...props}
  />
);