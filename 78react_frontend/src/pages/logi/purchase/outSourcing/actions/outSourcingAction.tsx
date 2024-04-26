import { createAction } from '@reduxjs/toolkit';
import * as type from './outSourcingActionType'

/********************************* 외주관리조회 ***********************************/
export const fetchOutSourcingRequest = createAction(type.FETCH_OUTSOURCING_REQUEST);
export const fetchOutSourcingSuccess = createAction(type.FETCH_OUTSOURCING_SUCCESS);
export const fetchOutSourcingFailure = createAction(type.FETCH_OUTSOURCING_FAILURE);