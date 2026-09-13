import React, {
  createContext,
  useContext,
  useReducer,
  useCallback,
} from 'react';
import type { LocationDTO } from '../../dto/LocationsDTO';
import { listLocations } from '../../services/locations.services';

type State = {
  locations: LocationDTO[];
  loading: boolean;
  error: string | null;
};

type Action =
  | { type: 'FETCH_LOCATIONS_START' }
  | { type: 'FETCH_LOCATIONS_SUCCESS'; payload: LocationDTO[] }
  | { type: 'FETCH_LOCATIONS_ERROR'; payload: string };

const initialState: State = {
  locations: [],
  loading: false,
  error: null,
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'FETCH_LOCATIONS_START':
      return { ...state, loading: true, error: null };
    case 'FETCH_LOCATIONS_SUCCESS':
      return { ...state, loading: false, locations: action.payload };
    case 'FETCH_LOCATIONS_ERROR':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

interface LocationsContextValue {
  state: State;
  fetchLocations: () => Promise<void>;
}

const LocationsContext = createContext<LocationsContextValue | null>(null);

export const LocationsProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchLocations = useCallback(async () => {
    try {
      dispatch({ type: 'FETCH_LOCATIONS_START' });
      const response = await listLocations();
      dispatch({ type: 'FETCH_LOCATIONS_SUCCESS', payload: response.data });
    } catch (error) {
      dispatch({
        type: 'FETCH_LOCATIONS_ERROR',
        payload: error instanceof Error ? error.message : 'An error occurred',
      });
    }
  }, []);

  return (
    <LocationsContext.Provider value={{ state, fetchLocations }}>
      {children}
    </LocationsContext.Provider>
  );
};

export const useLocations = () => {
  const context = useContext(LocationsContext);
  if (!context) {
    throw new Error('useLocations must be used within a LocationsProvider');
  }
  return context;
};
