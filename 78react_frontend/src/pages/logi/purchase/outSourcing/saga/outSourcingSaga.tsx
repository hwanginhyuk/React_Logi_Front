import { call, fork, put, all, takeLatest } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';
import { outSourcingListApi } from '../api/outSourcingApi';
import { fetchOutSourcingFailure, fetchOutSourcingSuccess } from '../actions/outSourcingAction';

/**
 * [78inhyuk]
 * 데이터 조회기능 구현완료
 */

// ✔️조회
function* fetchOutSourcingList(action: any) {
    const { fromDate, toDate } = action.payload; // 액션의 페이로드에서 fromDate와 toDate 값을 추출
    console.log('fromDate:', fromDate, 'toDate:', toDate);

    try {
        const response: AxiosResponse = yield call(outSourcingListApi, { fromDate, toDate }); // fromDate와 toDate 값을 API 호출 시에 함께 전달
        console.log('API 응답:', response);
        yield put(fetchOutSourcingSuccess(response.data)); // API 호출 성공 시 액션 디스패치

    } catch (errorCode) {
        console.log('API 호출 오류:', errorCode);
        yield put(fetchOutSourcingFailure()); // API 호출 실패 시 액션 디스패치
    }
}

export function* RequestOutsourcingList() {
    yield takeLatest('FETCH_OUTSOURCING_REQUEST', fetchOutSourcingList);
}

export default function* outSourcingSaga() {
    yield all([fork(RequestOutsourcingList)]);
}