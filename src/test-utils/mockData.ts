/**
 * Mock Data for Tests
 * Centralized test data to ensure consistency across tests
 */

import type { User, UsersResponse } from '@types';

export const mockUser = {
  id: 1,
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  phone: '+1-555-123-4567',
  username: 'johndoe',
  age: 30,
  gender: 'male',
  birthDate: '1993-01-01',
  bloodGroup: 'O+',
  image: 'https://example.com/avatar.jpg',
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
  address: {
    address: '123 Main St',
    city: 'San Francisco',
    state: 'CA',
    stateCode: 'CA',
    postalCode: '94102',
    country: 'USA',
    coordinates: { lat: 37.7749, lng: -122.4194 },
  },
} as User;

export const mockUser2 = {
  id: 2,
  firstName: 'Jane',
  lastName: 'Smith',
  email: 'jane.smith@example.com',
  phone: '+1-555-987-6543',
  username: 'janesmith',
  age: 28,
  gender: 'female',
  birthDate: '1995-05-15',
  bloodGroup: 'A+',
  image: 'https://example.com/avatar2.jpg',
  company: {
    name: 'Design Studio',
    title: 'UX Designer',
    department: 'Design',
    address: {
      address: '200 Design Plaza',
      city: 'New York',
      state: 'NY',
      stateCode: 'NY',
      postalCode: '10001',
      country: 'USA',
      coordinates: { lat: 40.7128, lng: -74.0060 },
    },
  },
  address: {
    address: '456 Oak Ave',
    city: 'New York',
    state: 'NY',
    stateCode: 'NY',
    postalCode: '10001',
    country: 'USA',
    coordinates: { lat: 40.7128, lng: -74.0060 },
  },
} as User;

export const mockUser3 = {
  id: 3,
  firstName: 'Alice',
  lastName: 'Johnson',
  email: 'alice.johnson@example.com',
  phone: '+1-555-456-7890',
  username: 'alicejohnson',
  age: 32,
  gender: 'female',
  birthDate: '1991-08-22',
  bloodGroup: 'B+',
  image: 'https://example.com/avatar3.jpg',
  company: {
    name: 'Marketing Inc',
    title: 'Product Manager',
    department: 'Product',
    address: {
      address: '300 Marketing Way',
      city: 'Austin',
      state: 'TX',
      stateCode: 'TX',
      postalCode: '78701',
      country: 'USA',
      coordinates: { lat: 30.2672, lng: -97.7431 },
    },
  },
  address: {
    address: '789 Pine Rd',
    city: 'Austin',
    state: 'TX',
    stateCode: 'TX',
    postalCode: '78701',
    country: 'USA',
    coordinates: { lat: 30.2672, lng: -97.7431 },
  },
} as User;

export const mockUsers = [mockUser, mockUser2, mockUser3] as User[];

export const mockUsersResponse: UsersResponse = {
  users: mockUsers,
  total: 100,
  skip: 0,
  limit: 30,
};

export const mockEmptyUsersResponse: UsersResponse = {
  users: [],
  total: 0,
  skip: 0,
  limit: 30,
};

export const mockSearchResponse: UsersResponse = {
  users: [mockUser],
  total: 1,
  skip: 0,
  limit: 30,
};
