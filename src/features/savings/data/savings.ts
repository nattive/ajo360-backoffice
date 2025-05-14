import { Savings } from './schema';


export const savings: Savings[] = [
  {
    id: 'f3d1c888-1d23-4c3b-babc-775a018cde12',
    savingsAccountNumber: 'SAV12345678',
    savingsAccountName: 'John Doe Target Savings',
    targetAmount: '500000',
    balance: '100000',
    frequency: 'MONTHLY',
    nextWithdrawalDate: '2025-06-01T00:00:00.000Z',
    status: 'ACTIVE',
    createdAt: '2025-04-01T10:00:00.000Z',
    updatedAt: '2025-05-08T21:10:21.031Z',
    user: {
      id: 'bb36dc9f-8d59-4cf6-9806-992d722f2995',
      firstName: 'John',
      lastName: 'Doe',
      otherName: 'Jim',
      email: 'john.doe@example.com',
      phoneNumber: '+2348012345678',
      password: '$2a$10$JmKE9Xw5Xddy60O6ORTtDeimvJ8qnLsKfco9DNGZcgc3u991mUVd.',
      bvn: null,
      dateOfBirth: '1990-01-01T00:00:00.000Z',
      profilePicture: 'https://example.com/profile.jpg',
      deviceId: null,
      createdAt: '2025-03-22T09:02:56.612Z',
      updatedAt: '2025-05-08T21:07:58.819Z',
      emailVerified: true,
      phoneNumberVerified: false,
      address: '123 Main St',
      state: 'California',
      country: 'United States',
    },
  },
]