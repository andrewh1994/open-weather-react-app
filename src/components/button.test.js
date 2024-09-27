import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Button } from './Button';  // Ensure the path to Button is correct

describe('Button', () => {
  it('should render in the document', () => {
    render(<Button />);
    expect(screen.getByText('Hello test button')).toBeInTheDocument();
  });
});
