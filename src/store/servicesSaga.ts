import { call, put, takeLatest } from "redux-saga/effects";
import {
  fetchServicesFailed,
  fetchServicesRequested,
  fetchServicesSucceeded,
  fetchServiceDetailsFailed,
  fetchServiceDetailsRequested,
  fetchServiceDetailsSucceeded,
} from "./servicesSlice";
import { fetchServiceDetails, fetchServices } from "../api/servicesApi";

function* loadServices() {
  try {
    const data = (yield call(fetchServices)) as unknown;
    yield put(fetchServicesSucceeded(data as any));
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    yield put(fetchServicesFailed(message));
  }
}

function* loadServiceDetails(
  action: ReturnType<typeof fetchServiceDetailsRequested>,
) {
  try {
    const payload = action.payload as string | undefined;
    if (!payload) {
      throw new Error("Invalid service id");
    }
    const data = (yield call(fetchServiceDetails, payload)) as unknown;
    yield put(fetchServiceDetailsSucceeded(data as any));
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    yield put(fetchServiceDetailsFailed(message));
  }
}

export function* watchServices() {
  yield takeLatest(fetchServicesRequested.type, loadServices);
  yield takeLatest(fetchServiceDetailsRequested.type, loadServiceDetails);
}
