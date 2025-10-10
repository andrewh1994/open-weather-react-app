import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from '../components/Button';

describe('Button', () => {
  it('should render in the document', () => {
    render(<Button>Display weather in chosen city</Button>);
    expect(screen.getByText('Display weather in chosen city')).toBeInTheDocument();
  });

  it('should render custom children text', () => {
    render(<Button>Click Me</Button>);
    expect(screen.getByText('Click Me')).toBeInTheDocument();
  });

  it('should call onClick handler when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click Me</Button>);
    
    const button = screen.getByText('Click Me');
    userEvent.click(button);
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should not call onClick when disabled', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick} disabled>Click Me</Button>);
    
    const button = screen.getByText('Click Me');
    userEvent.click(button);
    
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('should have correct CSS classes', () => {
    render(<Button>Test Button</Button>);
    const button = screen.getByText('Test Button');
    
    expect(button).toHaveClass('btn');
    expect(button).toHaveClass('btn-warning');
    expect(button).toHaveClass('rounded');
  });

  it('should apply additional className prop', () => {
    render(<Button className="custom-class">Test</Button>);
    const button = screen.getByText('Test');
    
    expect(button).toHaveClass('custom-class');
    expect(button).toHaveClass('btn');
  });

  it('should be disabled when disabled prop is true', () => {
    render(<Button disabled>Disabled Button</Button>);
    const button = screen.getByText('Disabled Button');
    
    expect(button).toBeDisabled();
  });

  it('should not be disabled by default', () => {
    render(<Button>Enabled Button</Button>);
    const button = screen.getByText('Enabled Button');
    
    expect(button).not.toBeDisabled();
  });
});