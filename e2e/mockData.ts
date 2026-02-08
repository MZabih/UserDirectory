/**
 * E2E Mock Data
 * Mock data for E2E tests - provides instant responses without network delays
 */

import type { User, UsersResponse } from '../src/types/user.types';

// Generate mock users for E2E tests
const generateMockUsers = (count: number, startId: number = 1): User[] => {
  const users: User[] = [];
  const firstNames = ['John', 'Jane', 'Alice', 'Bob', 'Charlie', 'Diana', 'Eve', 'Frank'];
  const lastNames = ['Doe', 'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller'];

  for (let i = 0; i < count; i++) {
    const id = startId + i;
    const firstName = firstNames[i % firstNames.length];
    const lastName = lastNames[i % lastNames.length];
    
    users.push({
      id,
      firstName,
      lastName,
      maidenName: '',
      age: 25 + (i % 20),
      gender: i % 2 === 0 ? 'male' : 'female',
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`,
      phone: `+1-555-${String(1000 + i).slice(-4)}`,
      username: `${firstName.toLowerCase()}${lastName.toLowerCase()}`,
      password: 'password123',
      birthDate: '1990-01-01',
      image: `https://i.pravatar.cc/150?img=${id}`,
      bloodGroup: 'O+',
      height: 170,
      weight: 70,
      eyeColor: 'brown',
      hair: { color: 'black', type: 'straight' },
      ip: '192.168.1.1',
      address: {
        address: `${id} Main St`,
        city: 'San Francisco',
        state: 'CA',
        stateCode: 'CA',
        postalCode: '94102',
        country: 'USA',
        coordinates: { lat: 37.7749, lng: -122.4194 },
      },
      macAddress: '00:00:00:00:00:00',
      university: 'University',
      bank: {
        cardExpire: '12/25',
        cardNumber: '1234-5678-9012-3456',
        cardType: 'Visa',
        currency: 'USD',
        iban: 'US123456789',
      },
      company: {
        name: 'Tech Corp',
        title: 'Software Engineer',
        department: 'Engineering',
        address: {
          address: '100 Tech Blvd',
          city: 'San Francisco',
          state: 'CA',
          stateCode: 'CA',
          postalCode: '94102',
          country: 'USA',
          coordinates: { lat: 37.7749, lng: -122.4194 },
        },
      },
      ein: '12-3456789',
      ssn: '123-45-6789',
      userAgent: 'Mozilla/5.0',
      crypto: {
        coin: 'Bitcoin',
        wallet: '0x123',
        network: 'Ethereum',
      },
      role: 'user',
    });
  }

  return users;
};

// Generate enough users for pagination and search tests
const allMockUsers = generateMockUsers(100, 1);

// Mock response for initial users list
export const getMockUsersResponse = (limit: number = 30, skip: number = 0): UsersResponse => {
  const users = allMockUsers.slice(skip, skip + limit);
  return {
    users,
    total: allMockUsers.length,
    skip,
    limit,
  };
};

// Mock response for user search
export const getMockSearchResponse = (query: string, limit: number = 30, skip: number = 0): UsersResponse => {
  const lowerQuery = query.toLowerCase();
  const filtered = allMockUsers.filter(
    (user) =>
      `${user.firstName} ${user.lastName}`.toLowerCase().includes(lowerQuery) ||
      user.email.toLowerCase().includes(lowerQuery) ||
      user.username.toLowerCase().includes(lowerQuery)
  );

  const users = filtered.slice(skip, skip + limit);
  return {
    users,
    total: filtered.length,
    skip,
    limit,
  };
};

// Mock response for single user
export const getMockUser = (id: number): User | undefined => {
  return allMockUsers.find((user) => user.id === id);
};
