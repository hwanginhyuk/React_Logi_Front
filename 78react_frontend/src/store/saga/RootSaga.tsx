
/**
 * [78inhyuk]
 * RootSaga 추가 및 정리
 * RootSaga : Redux 애플리케이션에서 여러 사가를 함께 실행하고 조율하는 역할
 */
import { all, fork } from 'redux-saga/effects';
import BasicInfoSaga from '../../pages/logi/basicinfo/saga/BasicInfoSaga';
import EstimateSaga from 'pages/logi/estimate/saga/EstimateSaga';
import LogisticsInfoSaga from 'pages/logi/basicinfo/saga/LogisticsInfoSaga';
import SalesSaga from 'pages/logi/delivery/saga/SalesSaga';                                 // 🌟new
import outSourcingSaga from 'pages/logi/purchase/outSourcing/saga/outSourcingSaga';         // 🌟new
import mrpSimulatorSaga from 'pages/logi/mrp/saga/mrpSimulatorSaga';
import mrpSaga from 'pages/logi/mrp/saga/mrpSaga';
import gatherSaga from 'pages/logi/mrp/saga/GatherSaga';
import orderRegistSaga from 'pages/logi/purchase/orderRegistInfo/saga/OrderRegistSaga';
import orderInfoSaga from 'pages/logi/purchase/orderRegistInfo/saga/OrderInfoSaga';
import stockSaga from 'pages/logi/purchase/stockInfo/saga/StockSaga';
import workSiteSaga from 'pages/logi/production/worksite/saga/workSiteSaga';

export default function* LogiRootSaga() {
  yield all([fork(BasicInfoSaga), fork(EstimateSaga), fork(LogisticsInfoSaga), fork(SalesSaga),
    fork(mrpSaga), fork(mrpSimulatorSaga), fork(gatherSaga), fork(orderRegistSaga), fork(orderInfoSaga),
    fork(stockSaga), fork(workSiteSaga), fork(outSourcingSaga)]);
}