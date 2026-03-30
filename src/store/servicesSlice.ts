import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type Service = {
  id: string;
  name: string;
  price: number;
};

export type ServiceDetails = Service & {
  content: string;
};

type RequestState<T> = {
  loading: boolean;
  error: string | null;
  data: T | null;
};

type RequestStateWithId<T> = RequestState<T> & {
  id: string | null;
};

type ServicesState = {
  list: RequestState<Service[]>;
  details: RequestStateWithId<ServiceDetails>;
};

const initialState: ServicesState = {
  list: { loading: false, error: null, data: null },
  details: { loading: false, error: null, data: null, id: null },
};

const servicesSlice = createSlice({
  name: "services",
  initialState,
  reducers: {
    fetchServicesRequested(state) {
      state.list.loading = true;
      state.list.error = null;
    },
    fetchServicesSucceeded(state, action: PayloadAction<Service[]>) {
      state.list.loading = false;
      state.list.data = action.payload;
      state.list.error = null;
    },
    fetchServicesFailed(state, action: PayloadAction<string>) {
      state.list.loading = false;
      state.list.error = action.payload;
    },

    fetchServiceDetailsRequested(state, action: PayloadAction<string>) {
      state.details.loading = true;
      state.details.error = null;
      state.details.data = null;
      state.details.id = action.payload;
    },
    fetchServiceDetailsSucceeded(state, action: PayloadAction<ServiceDetails>) {
      state.details.loading = false;
      state.details.data = action.payload;
      state.details.error = null;
    },
    fetchServiceDetailsFailed(state, action: PayloadAction<string>) {
      state.details.loading = false;
      state.details.error = action.payload;
    },
  },
});

export const {
  fetchServicesRequested,
  fetchServicesSucceeded,
  fetchServicesFailed,
  fetchServiceDetailsRequested,
  fetchServiceDetailsSucceeded,
  fetchServiceDetailsFailed,
} = servicesSlice.actions;

export default servicesSlice.reducer;
