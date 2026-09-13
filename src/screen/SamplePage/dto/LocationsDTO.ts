export interface LocationDTO {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  status: 'active' | 'inactive';
  createdAt: string;
}

export interface ListLocationsResponse {
  data: LocationDTO[];
  total: number;
}
