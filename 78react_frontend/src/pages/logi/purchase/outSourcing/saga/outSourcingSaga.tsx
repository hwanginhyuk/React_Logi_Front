import { call, fork, put, all, takeLatest } from 'redux-saga/effects';
import {
    outSourcingListRequest,
    outSourcingListRequestSuccess
} from '../redux/outSourcingReducer';
import { outSourcingListApi } from '../api/index';
import { AxiosResponse } from 'axios';

// ✔️조회
function* fetchOutSourcingList(action: any) {
    console.log('왔니?', action.payload.ableContractInfo);
    try {
        const response: AxiosResponse = yield call(outSourcingListApi, action.payload.ableContractInfo);
        console.log('됫니?', response);
        yield put(outSourcingListRequestSuccess(response));
    } catch (error) {
        console.log('에러임', error);
    }
}

export function* watchFetchCompleteList() {
    yield takeLatest(outSourcingListRequest, fetchOutSourcingList);
}

export default function* outSourcingSaga() {
    yield all([fork(watchFetchCompleteList)]);
}