import { createAction } from '@reduxjs/toolkit';
import * as type from './outSourcingActionType'

/**
 * [78inhyuk]
 * createAction을 사용하여 액션 생성자 함수를 생성한다
 * 각각의 액션은 데이터를 가져오는(혹은 보내는) 요청의 타입에 따라 디스패치한다
 * 디스패치는 Redux에서 액션을 스토에에 보내는 프로세스를 의미한다
 * import에서 Redux Toolkit를 사용하기때문에 Redux Toolkit dispatch 함수를 사용하여 보내야한다
 * 다만 현재 프로젝트에서 RootSaga를 이용하여 관리하고 있기 대문에 dispatch는 index.tsx에서 정의하고 있는 dispatch를 사용해야한다
 */

/********************************* 외주관리조회 ***********************************/
export const fetchOutSourcingRequest = createAction(type.FETCH_OUTSOURCING_REQUEST);
export const fetchOutSourcingSuccess = createAction(type.FETCH_OUTSOURCING_SUCCESS);
export const fetchOutSourcingFailure = createAction(type.FETCH_OUTSOURCING_FAILURE);