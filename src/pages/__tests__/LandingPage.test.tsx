import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LandingPage from '../LandingPage';
import { mockVehicles } from '../../data/mockVehicles';

// Mock framer-motion to simplify testing
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
    h1: ({ children }: { children: React.ReactNode }) => <h1>{children}</h1>,
    p: ({ children }: { children: React.ReactNode }) => <p>{children}</p>,
  },
}));

describe('LandingPage', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('renders the landing page with search functionality', () => {
    render(<LandingPage />);

    // Check main elements
    expect(screen.getByText('Find Your Vehicle Details')).toBeInTheDocument();
    expect(screen.getByText('Enter your vehicle registration number to get instant access to all details')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter vehicle registration number')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();

    // Check feature cards
    expect(screen.getByText('Secure Access')).toBeInTheDocument();
    expect(screen.getByText('Instant Results')).toBeInTheDocument();
    expect(screen.getByText('Verified Data')).toBeInTheDocument();
  });

  it('handles successful vehicle search', async () => {
    render(<LandingPage />);

    const input = screen.getByPlaceholderText('Enter vehicle registration number');
    const searchButton = screen.getByRole('button', { name: /search/i });

    // Enter a valid registration number
    fireEvent.change(input, { target: { value: mockVehicles[0].registrationNumber } });
    fireEvent.click(searchButton);

    // Check loading state
    expect(screen.getByText('Searching...')).toBeInTheDocument();

    // Fast forward the timer
    jest.advanceTimersByTime(1000);

    // Wait for the vehicle details to appear
    await waitFor(() => {
      expect(screen.getByText(`${mockVehicles[0].make} ${mockVehicles[0].model}`)).toBeInTheDocument();
      expect(screen.getByText(mockVehicles[0].registrationNumber)).toBeInTheDocument();
    });
  });

  it('handles back button click', async () => {
    render(<LandingPage />);

    // First search for a vehicle
    const input = screen.getByPlaceholderText('Enter vehicle registration number');
    const searchButton = screen.getByRole('button', { name: /search/i });

    fireEvent.change(input, { target: { value: mockVehicles[0].registrationNumber } });
    fireEvent.click(searchButton);

    // Fast forward the timer
    jest.advanceTimersByTime(1000);

    // Wait for the vehicle details to appear
    await waitFor(() => {
      expect(screen.getByText(`${mockVehicles[0].make} ${mockVehicles[0].model}`)).toBeInTheDocument();
    });

    // Click back button
    fireEvent.click(screen.getByText('Back to Search'));

    // Check if we're back to the search view
    expect(screen.getByText('Find Your Vehicle Details')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter vehicle registration number')).toBeInTheDocument();
  });

  it('handles search with non-existent registration number', async () => {
    render(<LandingPage />);

    const input = screen.getByPlaceholderText('Enter vehicle registration number');
    const searchButton = screen.getByRole('button', { name: /search/i });

    // Enter an invalid registration number
    fireEvent.change(input, { target: { value: 'XX00XX0000' } });
    fireEvent.click(searchButton);

    // Fast forward the timer
    jest.advanceTimersByTime(1000);

    // Check if we're still on the search view
    expect(screen.getByText('Find Your Vehicle Details')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter vehicle registration number')).toBeInTheDocument();
  });
}); 