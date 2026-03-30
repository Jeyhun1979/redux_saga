import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import servicesReducer from "./servicesSlice";
import { watchServices } from "./servicesSaga";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    services: servicesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(watchServices);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
