import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import VehicleSearch from '../VehicleSearch';

// Mock framer-motion to simplify testing
jest.mock('framer-motion', () => ({
  motion: {
    form: ({ children }: { children: React.ReactNode }) => <form>{children}</form>,
    div: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  },
}));

describe('VehicleSearch', () => {
  const mockOnSearch = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders search input and button', () => {
    render(<VehicleSearch onSearch={mockOnSearch} />);
    
    expect(screen.getByPlaceholderText(/enter vehicle registration number/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });

  it('validates empty input', async () => {
    render(<VehicleSearch onSearch={mockOnSearch} />);
    
    const searchButton = screen.getByRole('button', { name: /search/i });
    fireEvent.click(searchButton);

    expect(await screen.findByText(/please enter a registration number/i)).toBeInTheDocument();
    expect(mockOnSearch).not.toHaveBeenCalled();
  });

  it('validates incorrect registration number format', async () => {
    render(<VehicleSearch onSearch={mockOnSearch} />);
    
    const input = screen.getByPlaceholderText(/enter vehicle registration number/i);
    fireEvent.change(input, { target: { value: 'ABC123' } });
    fireEvent.click(screen.getByRole('button', { name: /search/i }));

    expect(await screen.findByText(/invalid registration number format/i)).toBeInTheDocument();
    expect(mockOnSearch).not.toHaveBeenCalled();
  });

  it('handles valid registration number', async () => {
    render(<VehicleSearch onSearch={mockOnSearch} />);
    
    const input = screen.getByPlaceholderText(/enter vehicle registration number/i);
    fireEvent.change(input, { target: { value: 'MH12AB1234' } });
    fireEvent.click(screen.getByRole('button', { name: /search/i }));

    // Check loading state
    expect(screen.getByText(/searching/i)).toBeInTheDocument();

    // Wait for the search to complete
    await waitFor(() => {
      expect(mockOnSearch).toHaveBeenCalledWith('MH12AB1234');
    });
  });

  it('converts input to uppercase', async () => {
    render(<VehicleSearch onSearch={mockOnSearch} />);
    
    const input = screen.getByPlaceholderText(/enter vehicle registration number/i);
    fireEvent.change(input, { target: { value: 'mh12ab1234' } });
    fireEvent.click(screen.getByRole('button', { name: /search/i }));

    await waitFor(() => {
      expect(mockOnSearch).toHaveBeenCalledWith('MH12AB1234');
    });
  });
}); 