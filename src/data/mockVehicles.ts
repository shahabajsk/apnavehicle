export interface Vehicle {
  registrationNumber: string;
  ownerName: string;
  vehicleType: string;
  manufacturer: string;
  model: string;
  year: number;
  insurance: {
    provider: string;
    validUntil: string;
    policyNumber: string;
  };
  challans: Array<{
    date: string;
    amount: number;
    description: string;
    status: 'paid' | 'pending';
  }>;
}

export const mockVehicles: Vehicle[] = [
  {
    registrationNumber: 'MH12AB1234',
    ownerName: 'Rajesh Kumar',
    vehicleType: 'Car',
    manufacturer: 'Maruti Suzuki',
    model: 'Swift',
    year: 2020,
    insurance: {
      provider: 'ICICI Lombard',
      validUntil: '2024-12-31',
      policyNumber: 'ICICI123456789',
    },
    challans: [
      {
        date: '2024-03-15',
        amount: 500,
        description: 'Signal Jumping',
        status: 'pending',
      },
      {
        date: '2024-02-20',
        amount: 1000,
        description: 'Over Speeding',
        status: 'paid',
      },
    ],
  },
  {
    registrationNumber: 'DL01CD5678',
    ownerName: 'Priya Sharma',
    vehicleType: 'Motorcycle',
    manufacturer: 'Honda',
    model: 'Activa',
    year: 2021,
    insurance: {
      provider: 'Bajaj Allianz',
      validUntil: '2025-06-30',
      policyNumber: 'BAJAJ987654321',
    },
    challans: [
      {
        date: '2024-03-10',
        amount: 200,
        description: 'No Helmet',
        status: 'pending',
      },
    ],
  },
  {
    registrationNumber: 'KA05EF9012',
    ownerName: 'Amit Patel',
    vehicleType: 'Car',
    manufacturer: 'Hyundai',
    model: 'Creta',
    year: 2022,
    insurance: {
      provider: 'HDFC Ergo',
      validUntil: '2024-09-30',
      policyNumber: 'HDFC456789123',
    },
    challans: [],
  },
];

export const validateRegistrationNumber = (number: string): boolean => {
  // Indian vehicle registration number pattern
  const pattern = /^[A-Z]{2}[0-9]{1,2}[A-Z]{1,2}[0-9]{4}$/;
  return pattern.test(number.toUpperCase());
};

export const maskSensitiveInfo = (info: string): string => {
  if (info.length <= 4) return info;
  return '*'.repeat(info.length - 4) + info.slice(-4);
}; 