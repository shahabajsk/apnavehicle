import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import VehicleDetails from '../VehicleDetails';
import { mockVehicles } from '../../data/mockVehicles';

// Mock framer-motion to simplify testing
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  },
}));

describe('VehicleDetails', () => {
  const mockVehicle = mockVehicles[0];
  const mockOnBack = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders vehicle information correctly', () => {
    render(<VehicleDetails vehicle={mockVehicle} onBack={mockOnBack} />);

    // Check header information
    expect(screen.getByText(`${mockVehicle.make} ${mockVehicle.model}`)).toBeInTheDocument();
    expect(screen.getByText(mockVehicle.registrationNumber)).toBeInTheDocument();
    expect(screen.getByText(mockVehicle.year.toString())).toBeInTheDocument();
    expect(screen.getByText(mockVehicle.color)).toBeInTheDocument();

    // Check tabs
    expect(screen.getByText('Details')).toBeInTheDocument();
    expect(screen.getByText('Challans')).toBeInTheDocument();
    expect(screen.getByText('Insurance')).toBeInTheDocument();
    expect(screen.getByText('Specifications')).toBeInTheDocument();
  });

  it('displays owner information in Details tab', () => {
    render(<VehicleDetails vehicle={mockVehicle} onBack={mockOnBack} />);

    expect(screen.getByText('Owner Information')).toBeInTheDocument();
    expect(screen.getByText(mockVehicle.owner.name)).toBeInTheDocument();
    expect(screen.getByText(mockVehicle.owner.phone)).toBeInTheDocument();
    expect(screen.getByText(mockVehicle.owner.address)).toBeInTheDocument();
  });

  it('displays registration details in Details tab', () => {
    render(<VehicleDetails vehicle={mockVehicle} onBack={mockOnBack} />);

    expect(screen.getByText('Registration Details')).toBeInTheDocument();
    expect(screen.getByText(mockVehicle.registration.date)).toBeInTheDocument();
    expect(screen.getByText(mockVehicle.registration.validity)).toBeInTheDocument();
    expect(screen.getByText(mockVehicle.registration.rto)).toBeInTheDocument();
  });

  it('displays challans information', () => {
    render(<VehicleDetails vehicle={mockVehicle} onBack={mockOnBack} />);

    fireEvent.click(screen.getByText('Challans'));

    if (mockVehicle.challans.length > 0) {
      mockVehicle.challans.forEach((challan) => {
        expect(screen.getByText(challan.description)).toBeInTheDocument();
        expect(screen.getByText(`₹${challan.amount}`)).toBeInTheDocument();
        expect(screen.getByText(challan.status)).toBeInTheDocument();
      });
    } else {
      expect(screen.getByText('No challans found')).toBeInTheDocument();
    }
  });

  it('displays insurance information', () => {
    render(<VehicleDetails vehicle={mockVehicle} onBack={mockOnBack} />);

    fireEvent.click(screen.getByText('Insurance'));

    expect(screen.getByText(mockVehicle.insurance.provider)).toBeInTheDocument();
    expect(screen.getByText(mockVehicle.insurance.policyNumber)).toBeInTheDocument();
    expect(screen.getByText(mockVehicle.insurance.validity)).toBeInTheDocument();
  });

  it('displays specifications information', () => {
    render(<VehicleDetails vehicle={mockVehicle} onBack={mockOnBack} />);

    fireEvent.click(screen.getByText('Specifications'));

    expect(screen.getByText(mockVehicle.specifications.engineNumber)).toBeInTheDocument();
    expect(screen.getByText(mockVehicle.specifications.chassisNumber)).toBeInTheDocument();
    expect(screen.getByText(mockVehicle.specifications.fuelType)).toBeInTheDocument();
    expect(screen.getByText(mockVehicle.specifications.seatingCapacity.toString())).toBeInTheDocument();
    expect(screen.getByText(mockVehicle.specifications.bodyType)).toBeInTheDocument();
  });

  it('calls onBack when back button is clicked', () => {
    render(<VehicleDetails vehicle={mockVehicle} onBack={mockOnBack} />);

    fireEvent.click(screen.getByText('Back to Search'));
    expect(mockOnBack).toHaveBeenCalledTimes(1);
  });
}); 