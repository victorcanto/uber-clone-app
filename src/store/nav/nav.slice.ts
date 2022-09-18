import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Point } from 'react-native-google-places-autocomplete';
import { RootState } from '../store';

interface GoogleNav {
  location?: Point;
  description: string;
}
interface TravelTimeInformation {
  distance: {
    text: string;
    value: number;
  };
  duration: {
    text: string;
    value: number;
  };
  status: string;
}

export interface NavState {
  origin: GoogleNav | null;
  destination: GoogleNav | null;
  travelTimeInformation: TravelTimeInformation | null;
}

const NAV_INITIAL_STATE: NavState = {
  origin: null,
  destination: null,
  travelTimeInformation: null,
};

export const navSlice = createSlice({
  name: 'nav',
  initialState: NAV_INITIAL_STATE,
  reducers: {
    setOrigin: (state, action: PayloadAction<NavState['origin']>) => {
      state.origin = action.payload;
    },
    setDestination: (state, action: PayloadAction<NavState['destination']>) => {
      state.destination = action.payload;
    },
    setTravelTimeInformation: (state, action) => {
      state.travelTimeInformation = action.payload;
    },
  },
});

export const { setOrigin, setDestination, setTravelTimeInformation } =
  navSlice.actions;

const selectNavReducer =
  <K extends keyof RootState['nav']>(key: K) =>
  (state: RootState): RootState['nav'][K] => {
    return state.nav[key];
  };

// Selectors
export const selectOrigin = selectNavReducer('origin');
export const selectDestination = selectNavReducer('destination');
export const selectTravelTimeInformation = selectNavReducer(
  'travelTimeInformation'
);

export default navSlice.reducer;
