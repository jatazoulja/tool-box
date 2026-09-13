import type { ListLocationsResponse } from '../dto/LocationsDTO';

// Sample mock service demonstrating async data fetching for the screen
export const listLocations = async (): Promise<ListLocationsResponse> => {
  // Simulate network latency
  await new Promise((resolve) => setTimeout(resolve, 600));

  return {
    total: 3,
    data: [
      {
        id: 'loc-001',
        name: 'Downtown Tech Hub',
        address: '100 Innovation Way',
        city: 'San Francisco',
        state: 'CA',
        zipCode: '94105',
        status: 'active',
        createdAt: '2026-01-15T08:30:00Z',
      },
      {
        id: 'loc-002',
        name: 'Midtown Logistics Center',
        address: '450 Commerce Blvd',
        city: 'Austin',
        state: 'TX',
        zipCode: '78701',
        status: 'active',
        createdAt: '2026-02-10T14:20:00Z',
      },
      {
        id: 'loc-003',
        name: 'Seattle Operations Base',
        address: '789 Cloud Ave',
        city: 'Seattle',
        state: 'WA',
        zipCode: '98101',
        status: 'inactive',
        createdAt: '2026-03-01T11:00:00Z',
      },
    ],
  };
};
