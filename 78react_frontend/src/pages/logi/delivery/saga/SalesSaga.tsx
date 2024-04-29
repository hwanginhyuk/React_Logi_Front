import { call, fork, put, all, takeLatest } from 'redux-saga/effects';
import {
  deliveryAvailableRequest,
  deliveryAvailableRequestSuccess,
  deliveryCompleteRequest,
  deliveryCompleteRequestSuccess
} from '../reducer/SalesReducer';
import { deleveryCompleteApi, deliveryAvailableApi } from '../api/index';
import { AxiosResponse } from 'axios';

// ✔️조회
function* fetchDeliveryList(action: any) {
  console.log('왔니', action.payload.ableContractInfo);
  try {
    const response: AxiosResponse = yield call(deliveryAvailableApi, action.payload.ableContractInfo);
    console.log('됫나?', response);
    yield put(deliveryAvailableRequestSuccess(response));
  } catch (error) {
    console.log('에러', error);
  }
}

export function* watchFetchDeliveryList() {
  yield takeLatest(deliveryAvailableRequest, fetchDeliveryList);
}

// ✔️납품 현황
function* fetchCompleteList(action: any) {
  console.log('saga에 왔니?');
  try {
    const response: AxiosResponse = yield call(deleveryCompleteApi);
    console.log('API호출?', response);
    yield put(deliveryCompleteRequestSuccess(response));
  } catch (error) {
    console.log('SagaError', error);
  }
}

export function* watchFetchCompleteList() {
  yield takeLatest(deliveryCompleteRequest, fetchCompleteList);
}

export default function* SalesSaga() {
  yield all([fork(watchFetchDeliveryList), fork(watchFetchCompleteList)]);
}