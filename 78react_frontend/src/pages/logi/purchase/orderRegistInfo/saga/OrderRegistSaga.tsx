import { call, fork, put, all, takeLatest } from 'redux-saga/effects';
import { searchOrderList, searchOrderDialogList, registerOrder } from 'pages/logi/purchase/orderRegistInfo/api';
import { getOrderList, getOrderListSuccess, getOrderListError,
  getOrderDailogList, getOrderDailogListSuccess, getOrderDailogListError,
  registerOrderDailog, registerOrderDailogSuccess, registerOrderDailogError } from 'pages/logi/purchase/orderRegistInfo/redux/OrderRegistToolkit';

/**
 * [78inhyuk]
 * 간단한 설명 및 소스코드 분석 완료
 * RootSaga에 적용확인
 * @param action 
 */

function* handleSearchOrderList(action: any) {
  try {
    const param = action.payload;
    const response = yield call( searchOrderList, param );
    console.log(response);
    const OrderList = response.data.gridRowJson
    yield put(getOrderListSuccess({OrderList}));
  } catch (error) {
    yield put(getOrderListError());
  }
}

function* handleSearchOrderDailogList(action: any) {
  try {
    const param = action.payload;
    const response = yield call( searchOrderDialogList, param );
    console.log(response);
    const OrderDailogList = response.data.gridRowJson
    yield put(getOrderDailogListSuccess({OrderDailogList}));
  } catch (error) {
    yield put(getOrderDailogListError());
  }
}

function* handleRegisterOrderDailog(action: any) {
  try {
    console.log(action.payload);
    const param = action.payload;
    const response = yield call( registerOrder, param );
    // response : 등록요청이 성공하면 서버로부터 받는 응답에 대한 처리를 하기위해 response도 필요하다
    console.log(response);
    yield put(registerOrderDailogSuccess());
  } catch (error) {
    yield put(registerOrderDailogError());
  }
}

function* watchOrderRegistSaga() {
  yield takeLatest(getOrderList, handleSearchOrderList);
  yield takeLatest(getOrderDailogList, handleSearchOrderDailogList);
  yield takeLatest(registerOrderDailog, handleRegisterOrderDailog);
}
/**
 * [78inhyuk]
 * takeEvery : 특정 액션이 dispatch될 때마다 지정된 함수를 실행하는 역할
 * 비동기 작업이나, 특정 액션 감시가 필요할 때 사용한다
 */

export default function* orderRegistSaga() {
  yield all([fork(watchOrderRegistSaga)]);
}